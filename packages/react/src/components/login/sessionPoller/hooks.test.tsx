import HttpStatusCode from 'http-status-typed';
import { disableFetchMocks, enableFetchMocks } from 'jest-fetch-mock';
import React, { useRef } from 'react';

import { UserCreationProps } from '../testUtils/userTestUtil';
import { ConnectedModule } from '../beacon/beacon';
import { EventPayload, isErrorSignal } from '../beacon/signals';
import { createControlledFetchMockUtil, Responder } from '../testUtils/fetchMockTestUtil';
// eslint-disable-next-line jest/no-mocks-import
import { createHookTestEnvironment, HookTestUtil } from '../testUtils/hooks.testUtil';
import createSessionPoller, { sessionPollerEvents, sessionPollerNamespace } from './sessionPoller';
import { SessionPollerError, sessionPollerErrors } from './sessionPollerError';
import { useSessionPoller, useSessionPollerTracking } from './hooks';
// eslint-disable-next-line jest/no-mocks-import
import openIdConfiguration from '../__mocks__/openIdConfiguration.json';
import { advanceUntilDoesNotThrow } from '../testUtils/timerTestUtil';
import { getSessionPollerEventPayload } from './signals';

describe('sessionPoller hooks testing', () => {
  const elementIds = {
    clientNamespace: 'client-namespace-element',
    clientError: 'client-error-element',
    lastSignal: 'last-signal-element',
    pollingError: 'polling-error-element',
  } as const;

  type ResponseType = {
    returnedStatus?: HttpStatusCode;
    body?: string;
    error?: boolean;
  };

  let testUtil: HookTestUtil;

  describe(`sessionPoller`, () => {
    const validResponse = 'Ok';
    const endPointPath = '/userInfoEndPoint';
    const successfulResponse: ResponseType = { returnedStatus: HttpStatusCode.OK };
    const unauthorizedResponse: ResponseType = { returnedStatus: HttpStatusCode.UNAUTHORIZED };
    const {
      waitUntilRequestStarted,
      waitUntilRequestFinished,
      cleanUp,
      setResponders,
      addResponse,
    } = createControlledFetchMockUtil([{ path: endPointPath }]);

    const openIdResponse = {
      status: HttpStatusCode.OK,
      body: JSON.stringify(openIdConfiguration),
      headers: {
        'content-type': 'application/json',
      },
    };
    const openIdResponder: Responder = {
      id: 'openIdConfig',
      path: '/openid-configuration',
      responses: [],
    };
    const userInfoPath = '/userinfo';
    const sessionPollerResponder: Responder = { id: 'sessionPollerResponder', path: userInfoPath };
    const responders: Responder[] = [sessionPollerResponder, openIdResponder];

    const pollIntervalInMs = 50000;

    const addPollResponse = ({ returnedStatus }: ResponseType) => {
      if (returnedStatus) {
        addResponse({ status: returnedStatus, body: validResponse }, sessionPollerResponder.id);
      } else {
        addResponse(new Error('Fetch failed'), sessionPollerResponder.id);
      }
    };

    const PollerCheck = () => {
      try {
        const client = useSessionPoller();
        return (
          <div>
            <span id={elementIds.clientNamespace}>{client.namespace}</span>
          </div>
        );
      } catch (error) {
        return <span id={elementIds.clientError}>{error ? error.message : ''}</span>;
      }
    };

    const SignalCheck = () => {
      const [signal, , sessionPoller] = useSessionPollerTracking();
      const error = signal && isErrorSignal(signal) ? (signal?.payload as SessionPollerError) : null;
      const eventPayload = signal ? getSessionPollerEventPayload(signal) : null;
      // useRef to store last error and payload
      const errorRef = useRef<SessionPollerError | undefined>(undefined);
      const payloadRef = useRef<EventPayload | undefined>(undefined);
      if (error) {
        errorRef.current = error;
      }
      if (eventPayload) {
        payloadRef.current = eventPayload;
      }
      return (
        <div>
          <span id={elementIds.lastSignal}>{payloadRef.current ? payloadRef.current.type : ''}</span>
          <span id={elementIds.pollingError}>{errorRef.current ? errorRef.current.type : ''}</span>
          <span>Making sure poller is found {sessionPoller.namespace}</span>
        </div>
      );
    };

    const init = ({
      component,
      userProps,
      responses,
      modules = [],
      noClient = false,
    }: {
      component: 'poller' | 'signals';
      userProps?: UserCreationProps;
      responses?: ResponseType[];
      modules?: ConnectedModule[];
      noClient?: boolean;
    }) => {
      if (responses && responses.length > 0) {
        responses.forEach((response) => {
          addPollResponse(response);
        });
      } else {
        addPollResponse(successfulResponse);
      }
      if (!noClient) {
        modules.push(createSessionPoller({ pollIntervalInMs }));
      }
      testUtil = createHookTestEnvironment(
        {
          userInStorage: userProps,
          waitForRenderToggle: false,
          children: [component === 'poller' ? <PollerCheck key={component} /> : <SignalCheck key={component} />],
          noOidcClient: true,
        },
        {},
        modules,
      );
      return testUtil;
    };

    beforeAll(() => {
      enableFetchMocks();
    });

    beforeEach(() => {
      jest.useFakeTimers();
      responders.forEach((responder) => {
        if (responder.responses) {
          // eslint-disable-next-line no-param-reassign
          responder.responses.length = 0;
        }
        if (responder.id === openIdResponder.id && responder.responses) {
          responder.responses.push(openIdResponse);
        }
      });
      setResponders(responders);
    });

    afterEach(async () => {
      sessionStorage.clear();
      await cleanUp();
      jest.runOnlyPendingTimers();
      jest.useRealTimers();
      jest.clearAllMocks();
    });

    afterAll(() => {
      disableFetchMocks();
    });
    describe('useSessionPoller hook', () => {
      it('Returns the client', async () => {
        const { getInnerHtml } = init({ component: 'poller' });
        expect(getInnerHtml(elementIds.clientNamespace)).toBe(sessionPollerNamespace);
      });
      it('Throws an error if sessionPoller does not exist', async () => {
        const { getInnerHtml } = init({ component: 'poller', noClient: true });
        expect(getInnerHtml(elementIds.clientError).length > 1).toBeTruthy();
      });
    });
    describe('useSessionPollerTracking', () => {
      it('tracks events and errors when polling fails', async () => {
        const { getInnerHtml } = init({
          component: 'signals',
          userProps: { invalidUser: false },
          responses: [unauthorizedResponse],
        });
        await waitUntilRequestStarted({ id: sessionPollerResponder.id, advanceTime: 20 });
        expect(getInnerHtml(elementIds.lastSignal)).toBe(sessionPollerEvents.SESSION_POLLING_STARTED);
        await waitUntilRequestFinished();
        await advanceUntilDoesNotThrow(() => {
          expect(getInnerHtml(elementIds.lastSignal)).toBe(sessionPollerEvents.SESSION_POLLING_STOPPED);
        });
        expect(getInnerHtml(elementIds.pollingError)).toBe(sessionPollerErrors.SESSION_ENDED);
      });
      it('tracks events when polling succeeds', async () => {
        const { getInnerHtml } = init({
          component: 'signals',
          userProps: { invalidUser: false },
        });
        await waitUntilRequestStarted({ id: sessionPollerResponder.id, advanceTime: 20 });
        expect(getInnerHtml(elementIds.lastSignal)).toBe(sessionPollerEvents.SESSION_POLLING_STARTED);
        await waitUntilRequestFinished();
        expect(getInnerHtml(elementIds.pollingError)).toBe('');
      });
    });
  });
});
