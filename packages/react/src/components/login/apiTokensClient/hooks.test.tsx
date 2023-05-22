import React from 'react';
import HttpStatusCode from 'http-status-typed';
import { disableFetchMocks, enableFetchMocks } from 'jest-fetch-mock';
import { act } from '@testing-library/react';

import { getDefaultOidcClientTestProps } from '../testUtils/oidcClientTestUtil';
import { useApiTokens, useApiTokensClient } from './hooks';
import { createUser, createUserAndPlaceUserToStorage, UserCreationProps } from '../testUtils/userTestUtil';
import { ConnectedModule } from '../beacon/beacon';
import { createTriggerForAllSignals } from '../beacon/signals';
import { ApiTokenClientProps, TokenData, apiTokensClientNamespace } from '.';
import { Responder, createControlledFetchMockUtil } from '../testUtils/fetchMockTestUtil';
import createApiTokenClient, { setApiTokensToStorage, setUserReferenceToStorage } from './apiTokensClient';
// eslint-disable-next-line jest/no-mocks-import
import apiTokens from '../__mocks__/apiTokens.json';
import { createHookTestEnvironment, HookTestUtil } from '../testUtils/hooks.testUtil';
import { createOidcClientEventTrigger } from '../client/signals';
import { useSignalTrackingWithReturnValue } from '../hooks';
import { advanceUntilDoesNotThrow } from '../testUtils/timerTestUtil';

describe('apiToken hooks testing', () => {
  // type ElementId = typeof elementIds[keyof typeof elementIds];
  const elementIds = {
    clientNamespace: 'client-namespace-element',
    clientError: 'client-error-element',
    tokens: 'tokens-element',
    tokensError: 'tokens-error-element',
    tokensIsRenewing: 'tokens-isRenewing-element',
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
      useSignalTrackingWithReturnValue(createTriggerForAllSignals(apiTokensClientNamespace));
      return (
        <div>
          <span id={elementIds.tokens}>{tokens ? JSON.stringify(tokens) : ''}</span>
          <span id={elementIds.tokensIsRenewing}>{String(isRenewing())}</span>
          <span id={elementIds.tokensError}>{error ? error.message : ''}</span>
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
      component: 'client' | 'tokens';
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
      testUtil = createHookTestEnvironment(
        {
          userInStorage: userProps,
          waitForRenderToggle: false,
          children: [component === 'client' ? <Client key={component} /> : <Tokens key={component} />],
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
            emit({
              ...createOidcClientEventTrigger(),
              payload: { type: 'USER_UPDATED', data: createUser({ signInResponseProps: { access_token: 'token2' } }) },
            });
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
  });
});
