import React, { useRef } from 'react';
import HttpStatusCode from 'http-status-typed';
import { disableFetchMocks, enableFetchMocks } from 'jest-fetch-mock';
import { act } from '@testing-library/react';

import { getDefaultOidcClientTestProps } from '../testUtils/oidcClientTestUtil';
import { useApiTokens, useApiTokensClient, useApiTokensClientTracking } from './hooks';
import { createUser, createUserAndPlaceUserToStorage, UserCreationProps } from '../testUtils/userTestUtil';
import { ConnectedModule } from '../beacon/beacon';
import { createTriggerPropsForAllSignals, EventPayload, isErrorSignal } from '../beacon/signals';
import { ApiTokenClientProps, TokenData, apiTokensClientEvents, apiTokensClientNamespace } from '.';
import { Responder, createControlledFetchMockUtil } from '../testUtils/fetchMockTestUtil';
import { createApiTokenClient, setApiTokensToStorage, setUserReferenceToStorage } from './apiTokensClient';
// eslint-disable-next-line jest/no-mocks-import
import apiTokens from '../__mocks__/apiTokens.json';
import { createHookTestEnvironment, HookTestUtil } from '../testUtils/hooks.testUtil';
import { createOidcClientEventSignal } from '../client/signals';
import { useSignalTrackingWithReturnValue } from '../beacon/hooks';
import { advanceUntilDoesNotThrow } from '../testUtils/timerTestUtil';
import { oidcClientEvents } from '../client';
import { getApiTokensClientEventPayload } from './signals';
import { apiTokensClientError, ApiTokensClientError } from './apiTokensClientError';

describe('apiToken hooks testing', () => {
  const elementIds = {
    clientNamespace: 'client-namespace-element',
    clientError: 'client-error-element',
    tokens: 'tokens-element',
    tokensError: 'tokens-error-element',
    tokensIsRenewing: 'tokens-isRenewing-element',
    lastSignal: 'last-signal-element',
    error: 'error-element',
  } as const;

  type ResponseType = {
    returnedStatus?: HttpStatusCode;
    body?: string;
    error?: boolean;
  };

  let testUtil: HookTestUtil;

  const defaultOidcClientProps = getDefaultOidcClientTestProps();

  describe(`apiTokenClient`, () => {
    const endPointPath = '/api-tokens';
    const renewedTokens = { newTokens: 'token' };
    const successfulResponse: ResponseType = { returnedStatus: HttpStatusCode.OK };
    const renewalResponse: ResponseType = { returnedStatus: HttpStatusCode.OK, body: JSON.stringify(renewedTokens) };
    const errorResponse: ResponseType = { returnedStatus: HttpStatusCode.FORBIDDEN };

    const retryInterval = 20000;
    const defaultClientProps: ApiTokenClientProps = {
      url: `http://userinfo.net${endPointPath}`,
      maxRetries: 0,
      retryInterval,
    };

    const apiTokensResponder: Responder = { id: 'apiTokensResponder', path: endPointPath, delay: 10000 };

    const {
      waitUntilRequestFinished,
      waitUntilRequestStarted,
      cleanUp,
      setResponders,
      addResponse,
    } = createControlledFetchMockUtil([apiTokensResponder]);

    const getApiTokenResponseBody = () => {
      return {
        body: JSON.stringify(apiTokens),
      };
    };

    const addFetchResponse = ({ returnedStatus, body }: ResponseType) => {
      if (returnedStatus === HttpStatusCode.OK) {
        const bodyObject = body ? { body } : getApiTokenResponseBody();
        addResponse({ status: returnedStatus, ...bodyObject });
      } else if (returnedStatus) {
        addResponse({ status: returnedStatus, body: `Error ${returnedStatus}` });
      } else {
        addResponse(new Error('Fetch failed'));
      }
    };

    const Client = () => {
      try {
        const client = useApiTokensClient();
        return (
          <div>
            <span id={elementIds.clientNamespace}>{client.namespace}</span>
          </div>
        );
      } catch (error) {
        return <span id={elementIds.clientError}>{error ? error.message : ''}</span>;
      }
    };

    const Tokens = () => {
      const { getStoredApiTokens, isRenewing } = useApiTokens();
      const [error, tokens] = getStoredApiTokens();
      // this hook will cause this component to re-render on each change
      // if parent is re-rendered, this component is not.
      useSignalTrackingWithReturnValue(createTriggerPropsForAllSignals(apiTokensClientNamespace));
      return (
        <div>
          <span id={elementIds.tokens}>{tokens ? JSON.stringify(tokens) : ''}</span>
          <span id={elementIds.tokensIsRenewing}>{String(isRenewing())}</span>
          <span id={elementIds.tokensError}>{error ? error.message : ''}</span>
        </div>
      );
    };

    const ErrorTracking = () => {
      const [signal, , apiTokensClient] = useApiTokensClientTracking();
      const error = signal && isErrorSignal(signal) ? (signal?.payload as ApiTokensClientError) : null;
      const eventPayload = signal ? getApiTokensClientEventPayload(signal) : null;
      // useRef to store last error and payload
      const errorRef = useRef<ApiTokensClientError | undefined>(undefined);
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
          <span id={elementIds.error}>{errorRef.current ? errorRef.current.type : ''}</span>
          <span>Making sure client is found {apiTokensClient.namespace}</span>
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
      component: 'client' | 'tokens' | 'errorTracking';
      userProps?: UserCreationProps;
      responses?: ResponseType[];
      modules?: ConnectedModule[];
      noClient?: boolean;
    }) => {
      if (responses && responses.length > 0) {
        responses.forEach((response) => {
          addFetchResponse(response);
        });
      } else {
        addFetchResponse(successfulResponse);
      }
      if (!noClient) {
        modules.push(createApiTokenClient(defaultClientProps));
      }
      const getComponent = () => {
        if (component === 'errorTracking') {
          return <ErrorTracking key={component} />;
        }
        return component === 'client' ? <Client key={component} /> : <Tokens key={component} />;
      };
      testUtil = createHookTestEnvironment(
        {
          userInStorage: userProps,
          waitForRenderToggle: false,
          children: [getComponent()],
          noOidcClient: true,
        },
        {},
        modules,
      );
      return testUtil;
    };

    const getTokens = () => {
      return testUtil.getElementJSON(elementIds.tokens) as TokenData | undefined;
    };
    const getTokensError = () => {
      return testUtil.getInnerHtml(elementIds.tokensError);
    };
    const getTokensAreRenewing = () => {
      return testUtil.getInnerHtml(elementIds.tokensIsRenewing) === 'true';
    };

    beforeAll(() => {
      enableFetchMocks();
    });

    beforeEach(() => {
      jest.useFakeTimers();
      apiTokensResponder.responses = [];
      setResponders([apiTokensResponder]);
    });

    afterEach(async () => {
      sessionStorage.clear();
      await cleanUp();
      jest.runOnlyPendingTimers();
      jest.useRealTimers();
      jest.clearAllMocks();
      testUtil.afterEach();
    });

    afterAll(() => {
      disableFetchMocks();
    });
    describe('useApiTokensClient hook', () => {
      it('Returns the client', async () => {
        const { getInnerHtml } = init({ component: 'client' });
        expect(getInnerHtml(elementIds.clientNamespace)).toBe(apiTokensClientNamespace);
      });
      it('Throws an error if apiTokensClient does not exist', async () => {
        const { getInnerHtml } = init({ component: 'client', noClient: true });
        expect(getInnerHtml(elementIds.clientError).length > 1).toBeTruthy();
      });
    });
    describe('useApiTokens hook', () => {
      describe('Returns getStoredApiTokens function ', () => {
        it('which returns apiTokens, if user is authenticated and apiTokens are fetched', async () => {
          const user = createUserAndPlaceUserToStorage(defaultOidcClientProps.userManagerSettings);

          setUserReferenceToStorage(user.access_token);
          setApiTokensToStorage(apiTokens);
          init({ component: 'tokens' });
          expect(getTokens()).toMatchObject(apiTokens);
        });
        it('which returns null, if user is authenticated', async () => {
          // for some reason this had to wrapped with "act"
          await act(async () => {
            createUserAndPlaceUserToStorage(defaultOidcClientProps.userManagerSettings);
            init({ component: 'tokens' });
            expect(getTokens()).toBeNull();
          });
        });
        it('Returns an error if user is not authenticated', async () => {
          const { getElementById } = init({ component: 'tokens' });
          expect(getElementById(elementIds.tokens)).not.toBeNull();
          expect(getTokensError()).not.toBeUndefined();
        });
      });
      describe('Returns isRenewing function ', () => {
        it('which returns true, if apiTokens are renewing', async () => {
          createUserAndPlaceUserToStorage(defaultOidcClientProps.userManagerSettings);
          init({ component: 'tokens' });
          await waitUntilRequestStarted();
          expect(getTokensAreRenewing()).toBeTruthy();
          await waitUntilRequestFinished();
          expect(getTokensAreRenewing()).toBeFalsy();
          expect(getTokens()).toMatchObject(apiTokens);
        });
        it('which returns false, if apiTokens are not renewing', async () => {
          const user = createUserAndPlaceUserToStorage(defaultOidcClientProps.userManagerSettings);
          setUserReferenceToStorage(user.access_token);
          setApiTokensToStorage(apiTokens);
          const { emit } = init({ component: 'tokens', responses: [renewalResponse] });
          expect(getTokensAreRenewing()).toBeFalsy();
          act(() => {
            emit(
              createOidcClientEventSignal({
                type: oidcClientEvents.USER_UPDATED,
                data: createUser({ signInResponseProps: { access_token: 'token2' } }),
              }),
            );
          });
          await waitUntilRequestStarted();
          expect(getTokensAreRenewing()).toBeTruthy();
          await waitUntilRequestFinished();
          await advanceUntilDoesNotThrow(() => {
            expect(getTokensAreRenewing()).toBeFalsy();
          });
          expect(getTokens()).toMatchObject(renewedTokens);
        });
      });
    });
    describe('useApiTokensClientTracking', () => {
      it('tracks errors when fetching fails or api tokens are invalid', async () => {
        const { getInnerHtml } = init({
          component: 'errorTracking',
          userProps: { invalidUser: false },
          responses: [errorResponse],
        });
        // api tokens fetch starts immediately when client is created
        // the hook is rendered after that, so first signals are missed
        await waitUntilRequestStarted({ id: apiTokensResponder.id, advanceTime: 20 });
        await waitUntilRequestFinished();
        expect(getInnerHtml(elementIds.error)).toBe(apiTokensClientError.API_TOKEN_FETCH_FAILED);
      });
      it('tracks events when fetch succeeds', async () => {
        const { getInnerHtml } = init({
          component: 'errorTracking',
          userProps: { invalidUser: false },
        });
        await waitUntilRequestStarted({ id: apiTokensResponder.id, advanceTime: 1000 });
        await waitUntilRequestFinished();
        expect(getInnerHtml(elementIds.lastSignal)).toBe(apiTokensClientEvents.API_TOKENS_UPDATED);
        expect(getInnerHtml(elementIds.error)).toBe('');
      });
      it('Tracks renewal', async () => {
        const user = createUserAndPlaceUserToStorage(defaultOidcClientProps.userManagerSettings);
        setUserReferenceToStorage(user.access_token);
        setApiTokensToStorage(apiTokens);
        const { emit, getInnerHtml } = init({
          component: 'errorTracking',
          responses: [{ returnedStatus: HttpStatusCode.OK, body: '"invalid{json' }],
        });
        act(() => {
          emit(
            createOidcClientEventSignal({
              type: oidcClientEvents.USER_UPDATED,
              data: createUser({ signInResponseProps: { access_token: 'token2' } }),
            }),
          );
        });
        await waitUntilRequestStarted();
        expect(getInnerHtml(elementIds.lastSignal)).toBe(apiTokensClientEvents.API_TOKENS_RENEWAL_STARTED);
        await waitUntilRequestFinished();
        await advanceUntilDoesNotThrow(() => {
          expect(getTokensAreRenewing()).toBeFalsy();
        });
        expect(getInnerHtml(elementIds.error)).toBe(apiTokensClientError.INVALID_API_TOKENS);
      });
    });
  });
});
