import HttpStatusCode from 'http-status-typed';
import { disableFetchMocks, enableFetchMocks } from 'jest-fetch-mock';
import { User } from 'oidc-client-ts';
import { waitFor } from '@testing-library/react';

import {
  API_TOKEN_SESSION_STORAGE_KEY,
  API_TOKEN_SESSION_USER_REFERENCE_KEY,
  ApiTokenClient,
  ApiTokenClientProps,
  apiTokensClientEvents,
  apiTokensClientNamespace,
} from './index';
import {
  createApiTokenClient,
  getUserReferenceFromStorage,
  setApiTokensToStorage,
  setUserReferenceToStorage,
} from './apiTokensClient';
// eslint-disable-next-line jest/no-mocks-import
import apiTokens from '../__mocks__/apiTokens.json';
import { getAllMockCallArgs, getLastMockCallArgs } from '../../../utils/testHelpers';
import { ApiTokensClientError } from './apiTokensClientError';
import { createMockTestUtil } from '../testUtils/mockTestUtil';
import {
  createControlledFetchMockUtil,
  getFetchMockCalls,
  waitForFetchMockResultFulfillment,
} from '../testUtils/fetchMockTestUtil';
import { UserCreationProps, createUser } from '../testUtils/userTestUtil';
import {
  advanceUntilPromiseResolved,
  advanceUntilPromiseResolvedAndReturnValue,
  getPromiseResultLater,
  listenToPromise,
} from '../testUtils/timerTestUtil';
import { Beacon, SignalNamespace, createBeacon } from '../beacon/beacon';
import {
  createErrorTriggerProps,
  emitInitializationSignals,
  filterSignals,
  initSignalType,
  waitForSignals,
} from '../beacon/signals';
import {
  createConnectedBeaconModule,
  createTestListenerModule,
  emitEvent,
  getListenerSignals,
  getReceivedErrorSignalPayloads,
  getReceivedEventSignalPayloads,
} from '../testUtils/beaconTestUtil';
import { createMockOidcClient } from '../testUtils/oidcClientTestUtil';
import { OidcClient, oidcClientEvents, oidcClientNamespace } from '../client';
import { ApiTokensEventSignal, createApiTokensClientEventTriggerProps } from './signals';

type ResponseType = {
  returnedStatus?: HttpStatusCode;
  body?: string;
  error?: boolean;
};

type InitProps = {
  apiTokenClientProps?: Partial<ApiTokenClientProps>;
  userProps?: UserCreationProps;
  createModules?: boolean;
  emitInitSignal?: boolean;
  removeUserAfterInit?: boolean;
  responses?: ResponseType[];
};

const mockMapAborter = createMockTestUtil();
const mockActualAbortFetch = jest.requireActual('../utils/abortFetch');

jest.mock('../utils/abortFetch', () => ({
  __esModule: true,
  createFetchAborter: () => {
    const aborter = mockActualAbortFetch.createFetchAborter();
    mockMapAborter.reset();
    mockMapAborter.addSpy(aborter, 'abort');
    mockMapAborter.addSpy(aborter, 'getSignal');
    return aborter;
  },
  isAbortError: (error: Error) => {
    return mockActualAbortFetch.isAbortError(error);
  },
}));

describe(`apiTokenClient`, () => {
  const endPointPath = '/api-tokens';
  let currentUser: User | null;
  let currentApiTokenClient: ApiTokenClient;
  let currentBeacon: Beacon;
  let currentOidcClient: OidcClient;
  let listenerModule: ReturnType<typeof createConnectedBeaconModule>;
  const successfulResponse: ResponseType = { returnedStatus: HttpStatusCode.OK };
  const errorResponse: ResponseType = { returnedStatus: HttpStatusCode.NOT_FOUND };
  const forbiddenResponse: ResponseType = { returnedStatus: HttpStatusCode.FORBIDDEN };
  const unauthorizedResponse: ResponseType = { returnedStatus: HttpStatusCode.UNAUTHORIZED };

  const retryInterval = 20000;
  const defaultClientProps: ApiTokenClientProps = {
    url: `http://userinfo.net${endPointPath}`,
    maxRetries: 2,
    retryInterval,
  };
  const defaultTestProps: InitProps = {
    apiTokenClientProps: { maxRetries: 0 },
    userProps: {},
    responses: [successfulResponse],
    createModules: true,
    emitInitSignal: true,
    removeUserAfterInit: false,
  };

  const {
    waitUntilRequestFinished,
    waitUntilRequestStarted,
    cleanUp,
    setResponders,
    addResponse,
    getRequestCount,
  } = createControlledFetchMockUtil([{ path: endPointPath }]);

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

  const initTests = ({
    apiTokenClientProps,
    userProps,
    createModules = true,
    removeUserAfterInit = false,
    responses,
  }: InitProps) => {
    if (responses) {
      responses.forEach(addFetchResponse);
    }
    currentUser = userProps ? createUser(userProps) : null;
    currentApiTokenClient = createApiTokenClient({ ...defaultClientProps, ...apiTokenClientProps });
    listenerModule = createTestListenerModule(apiTokensClientNamespace);
    const { oidcClient, setGetUserReturnValue } = createMockOidcClient();
    currentOidcClient = oidcClient;
    setGetUserReturnValue(currentUser);
    currentBeacon = createBeacon();
    if (createModules) {
      currentBeacon.addSignalContext(currentApiTokenClient);
      currentBeacon.addSignalContext(listenerModule);
      currentBeacon.addSignalContext(currentOidcClient);
      emitInitializationSignals(currentBeacon);
    }
    if (removeUserAfterInit) {
      setGetUserReturnValue(null);
    }
    return currentApiTokenClient;
  };

  const getEmittedErrors = () => {
    return getReceivedErrorSignalPayloads<ApiTokensClientError>(listenerModule);
  };

  const getEmittedEventPayloads = () => {
    return getReceivedEventSignalPayloads<ApiTokensEventSignal['payload']>(listenerModule);
  };

  const getEmittedInitSignals = (namespace: SignalNamespace) => {
    return filterSignals(getListenerSignals(listenerModule.getListener()), { type: initSignalType, namespace });
  };

  const initTestsWithDefaultPropsAndWaitForInit = async (
    props: Omit<InitProps, 'responses'> & { additionalResponses?: ResponseType[] } = {},
  ) => {
    const initProps: InitProps = {
      ...defaultTestProps,
      ...props,
    };

    if (props.additionalResponses) {
      initProps.responses = initProps.responses
        ? [...initProps.responses, ...props.additionalResponses]
        : props.additionalResponses;
    }

    const apiTokenClient = initTests(initProps);
    // fetch wont start without modules and init signal
    if (initProps.createModules !== false) {
      await waitUntilRequestFinished();
      const eventPayloads = getEmittedEventPayloads();
      expect(eventPayloads).toHaveLength(2);
      expect(eventPayloads[0].type).toBe(apiTokensClientEvents.API_TOKENS_RENEWAL_STARTED);
      expect(eventPayloads[1].type).toBe(apiTokensClientEvents.API_TOKENS_UPDATED);
    }
    return apiTokenClient;
  };

  beforeAll(() => {
    enableFetchMocks();
  });

  beforeEach(() => {
    jest.useFakeTimers();
    setResponders([{ path: endPointPath }]);
  });

  afterEach(async () => {
    if (getRequestCount() > 0) {
      await waitUntilRequestFinished();
    }
    currentApiTokenClient.clear();
    await cleanUp();
    jest.runOnlyPendingTimers();
    jest.useRealTimers();
    jest.clearAllMocks();
  });

  afterAll(() => {
    disableFetchMocks();
  });

  describe(`.fetch()`, () => {
    it('Calls the end point with user.access_token in the Authorization header', async () => {
      const apiTokenClient = await initTestsWithDefaultPropsAndWaitForInit({ createModules: false });
      await advanceUntilPromiseResolvedAndReturnValue(apiTokenClient.fetch(currentUser as User));
      const fetchCalls = getFetchMockCalls();
      expect(fetchCalls).toHaveLength(1);
      expect(fetchCalls[0]).toMatchInlineSnapshot(`
        Array [
          "${defaultClientProps.url}",
          Object {
            "headers": Headers {
              Symbol(map): Object {
                "Authorization": Array [
                  "Bearer ${(currentUser as User).access_token}",
                ],
              },
            },
            "method": "POST",
            "signal": AbortSignal {},
          },
        ]
      `);
    });
    it('Can be aborted with clear(). Errors are not returned or emitted on abort. isRenewing() changes with the process.', async () => {
      const apiTokenClient = await initTestsWithDefaultPropsAndWaitForInit({ createModules: false });
      const resultGetter = getPromiseResultLater(apiTokenClient.fetch(createUser()));
      // abort is called always when starting new fetch
      expect(mockMapAborter.getCalls('abort')).toHaveLength(1);
      expect(apiTokenClient.isRenewing()).toBeTruthy();
      await waitUntilRequestStarted();
      expect(mockMapAborter.getCalls('getSignal')).toHaveLength(1);
      apiTokenClient.clear();
      expect(mockMapAborter.getCalls('abort')).toHaveLength(2);
      const responses = await waitUntilRequestFinished();
      expect(responses).toHaveLength(1);
      expect(await resultGetter()).toEqual({});
      expect(getEmittedErrors()).toHaveLength(0);
      expect(apiTokenClient.isRenewing()).toBeFalsy();
    });
    it('gets tokens from the server and returns them. Tokens are stored in session storage with user reference. isRenewing() changes with the process.', async () => {
      const setSpy = jest.spyOn(Storage.prototype, 'setItem');
      const apiTokenClient = await initTestsWithDefaultPropsAndWaitForInit({ createModules: false });
      const promise = apiTokenClient.fetch(createUser());
      expect(apiTokenClient.isRenewing()).toBeTruthy();
      await waitUntilRequestFinished();
      const tokens = await promise;
      expect(apiTokenClient.getTokens()).toMatchObject(apiTokens);
      expect(tokens).toMatchObject(apiTokens);
      expect(setSpy).toHaveBeenCalledTimes(2);
      expect(getLastMockCallArgs(setSpy)[0]).toBe(API_TOKEN_SESSION_STORAGE_KEY);
      expect(apiTokenClient.isRenewing()).toBeFalsy();
    });
    it('Fetching is attempted as many times as maxRetries indicates', async () => {
      const apiTokenClient = initTests({
        apiTokenClientProps: { maxRetries: 3 },
        responses: [errorResponse, unauthorizedResponse, forbiddenResponse, successfulResponse],
      });
      // need to know exactly when the fetch is fullfilled
      let fetchFulfilled = false;
      apiTokenClient.fetch(createUser()).finally(() => {
        fetchFulfilled = true;
      });
      const result1 = (await waitForFetchMockResultFulfillment(0)) as Response;
      expect(result1.status).toBe(HttpStatusCode.NOT_FOUND);
      expect(fetchFulfilled).toBeFalsy();
      const result2 = (await waitForFetchMockResultFulfillment(1)) as Response;
      expect(result2.status).toBe(HttpStatusCode.UNAUTHORIZED);
      expect(fetchFulfilled).toBeFalsy();
      const result3 = (await waitForFetchMockResultFulfillment(2)) as Response;
      expect(result3.status).toBe(HttpStatusCode.FORBIDDEN);
      expect(fetchFulfilled).toBeFalsy();
      const result4 = (await waitForFetchMockResultFulfillment(3)) as Response;
      expect(result4.status).toBe(HttpStatusCode.OK);
      expect(fetchFulfilled).toBeTruthy();
      expect(getEmittedErrors()).toHaveLength(0);
    });
    it('Returns invalid tokens error when returned data is not a valid json. An error is emitted', async () => {
      const apiTokenClient = initTests({
        userProps: { invalidUser: true },
        responses: [{ returnedStatus: HttpStatusCode.OK, body: 'invalid json' }],
      });
      const result = await advanceUntilPromiseResolvedAndReturnValue(apiTokenClient.fetch(createUser()));
      expect((result as ApiTokensClientError).isInvalidTokensError).toBeTruthy();
      const emittedErrors = getEmittedErrors();
      expect(emittedErrors).toHaveLength(1);
      expect(emittedErrors[0].isInvalidTokensError).toBeTruthy();
    });
    it('Returns a fetch error when fetch fails for a network error or other status. An error is emitted. ', async () => {
      const apiTokenClient = initTests({
        apiTokenClientProps: { maxRetries: 0 },
        responses: [{ error: true }, errorResponse],
      });
      // user is not created in initTests to avoid automatic fetch start
      const user = createUser({});
      await advanceUntilPromiseResolvedAndReturnValue(apiTokenClient.fetch(user));
      await advanceUntilPromiseResolvedAndReturnValue(apiTokenClient.fetch(user));
      const emittedErrors = getEmittedErrors();
      expect(emittedErrors).toHaveLength(2);
      expect(emittedErrors[0].isFetchError).toBeTruthy();
      expect(emittedErrors[1].isFetchError).toBeTruthy();
      expect(apiTokenClient.isRenewing()).toBeFalsy();
    });
    it('If fetch fails, tokens are cleared.', async () => {
      const apiTokenClient = await initTestsWithDefaultPropsAndWaitForInit({
        additionalResponses: [forbiddenResponse],
      });
      // first successful response so api tokens are stored
      await waitForFetchMockResultFulfillment(0);
      expect(apiTokenClient.getTokens()).toMatchObject(apiTokens);
      listenToPromise(currentApiTokenClient.fetch(currentUser as User));
      await waitForFetchMockResultFulfillment(1);
      expect(currentApiTokenClient.getTokens()).toBeNull();
      expect(getEmittedErrors()).toHaveLength(1);
      expect(apiTokenClient.isRenewing()).toBeFalsy();
    });
  });
  describe(`.getTokens()`, () => {
    it('Returns tokens or null', async () => {
      const apiTokenClient = await initTestsWithDefaultPropsAndWaitForInit({ createModules: false });
      expect(apiTokenClient.getTokens()).toBeNull();
      await advanceUntilPromiseResolved(apiTokenClient.fetch(createUser()));
      expect(apiTokenClient.getTokens()).toMatchObject(apiTokens);
    });
    it('updates after a new fetch', async () => {
      const secondJSON = { token: 'a token' };
      const apiTokenClient = await initTestsWithDefaultPropsAndWaitForInit({
        additionalResponses: [{ returnedStatus: HttpStatusCode.OK, body: JSON.stringify(secondJSON) }],
      });
      expect(apiTokenClient.getTokens()).toMatchObject(apiTokens);
      listenToPromise(apiTokenClient.fetch(currentUser as User));
      await waitForFetchMockResultFulfillment(1);
      expect(currentApiTokenClient.getTokens()).toMatchObject(secondJSON);
    });
  });
  describe(`.clear()`, () => {
    it('Removes current tokens, also from storage. User reference is also removed. API_TOKENS_REMOVED event is emitted.', async () => {
      const removeSpy = jest.spyOn(Storage.prototype, 'removeItem');
      const apiTokenClient = await initTestsWithDefaultPropsAndWaitForInit();
      expect(removeSpy).toHaveBeenCalledTimes(4);
      expect(apiTokenClient.getTokens()).not.toBeNull();
      apiTokenClient.clear();
      expect(apiTokenClient.getTokens()).toBeNull();
      expect(getUserReferenceFromStorage()).toBeNull();
      expect(removeSpy).toHaveBeenCalledTimes(6);
      expect(getAllMockCallArgs(removeSpy)[0][0]).toBe(API_TOKEN_SESSION_STORAGE_KEY);
      expect(getAllMockCallArgs(removeSpy)[1][0]).toBe(API_TOKEN_SESSION_USER_REFERENCE_KEY);
      expect(getEmittedErrors()).toHaveLength(0);
      await waitFor(() => {
        const eventPayloads = getEmittedEventPayloads();
        // renewal events are #0 and #1
        expect(eventPayloads).toHaveLength(3);
        expect(eventPayloads[2].type).toBe(apiTokensClientEvents.API_TOKENS_REMOVED);
        expect(eventPayloads[2].data).toBeNull();
      });
    });
  });
  describe(`When init signal is received `, () => {
    it('and user matches api token reference, tokens are restored from storage. API_TOKENS_UPDATED event is emitted', async () => {
      const tokens = { token: 'a token' };
      const userAccessToken = 'an access token';
      setApiTokensToStorage(tokens);
      setUserReferenceToStorage(userAccessToken);
      const apiTokenClient = initTests({
        apiTokenClientProps: { maxRetries: 0 },
        userProps: { signInResponseProps: { access_token: userAccessToken } },
      });
      expect(apiTokenClient.getTokens()).toMatchObject(tokens);
      expect(getRequestCount()).toBe(0);
      await waitFor(() => {
        const eventPayloads = getEmittedEventPayloads();
        expect(eventPayloads).toHaveLength(1);
        expect(eventPayloads[0].type).toBe(apiTokensClientEvents.API_TOKENS_UPDATED);
        expect(eventPayloads[0].data).toMatchObject(tokens);
      });
      expect(apiTokenClient.isRenewing()).toBeFalsy();
    });
    it('and user does not match the api token reference, tokens are cleared and fetched. Appropriate events are emitted.', async () => {
      const removeSpy = jest.spyOn(Storage.prototype, 'removeItem');
      const tokens = { token: 'a token' };
      const userAccessToken = 'an access token';
      setApiTokensToStorage(tokens);
      setUserReferenceToStorage(userAccessToken);
      const apiTokenClient = initTests({
        apiTokenClientProps: { maxRetries: 0 },
        userProps: {},
        responses: [successfulResponse],
      });
      expect(removeSpy).toHaveBeenCalledTimes(2);
      expect(apiTokenClient.getTokens()).toBeNull();
      expect(getUserReferenceFromStorage()).toBeNull();
      expect(apiTokenClient.isRenewing()).toBeTruthy();
      await waitUntilRequestFinished();
      expect(apiTokenClient.getTokens()).toMatchObject(apiTokens);
      expect(getUserReferenceFromStorage()).toMatch((currentUser as User).access_token);
      const eventPayloads = getEmittedEventPayloads();
      expect(eventPayloads).toHaveLength(2);
      expect(eventPayloads[0].type).toBe(apiTokensClientEvents.API_TOKENS_RENEWAL_STARTED);
      expect(eventPayloads[0].data).toBeNull();
      expect(eventPayloads[1].type).toBe(apiTokensClientEvents.API_TOKENS_UPDATED);
      expect(eventPayloads[1].data).toMatchObject(apiTokens);
      expect(apiTokenClient.isRenewing()).toBeFalsy();
    });
  });
  describe(`reacts to emitted events`, () => {
    it('starts on init signal, if valid user exists', async () => {
      const apiTokenClient = await initTestsWithDefaultPropsAndWaitForInit();
      const responses = await waitUntilRequestFinished();
      expect(responses).toHaveLength(1);
      expect(getEmittedInitSignals(apiTokensClientNamespace)).toHaveLength(1);
      expect(apiTokenClient.isRenewing()).toBeFalsy();
    });
    it('does not start on init signal, if valid user does not exists', async () => {
      initTests({
        apiTokenClientProps: { maxRetries: 0 },
        userProps: { invalidUser: true },
      });
      jest.advanceTimersByTime(10000);
      expect(getFetchMockCalls()).toHaveLength(0);
      expect(getEmittedInitSignals(apiTokensClientNamespace)).toHaveLength(1);
    });
    it('tokens are removed, if user is removed', async () => {
      const apiTokenClient = await initTestsWithDefaultPropsAndWaitForInit();
      const responses = await waitUntilRequestFinished();
      expect(getEmittedInitSignals(apiTokensClientNamespace)).toHaveLength(1);
      expect(responses).toHaveLength(1);
      const currentEventCount = getEmittedEventPayloads().length;
      const renewalPromise = waitForSignals(currentBeacon, [
        createApiTokensClientEventTriggerProps({ type: apiTokensClientEvents.API_TOKENS_REMOVED }),
      ]);
      emitEvent(currentBeacon, oidcClientNamespace, { type: oidcClientEvents.USER_REMOVED });
      await renewalPromise;
      const eventPayloads = getEmittedEventPayloads();
      expect(eventPayloads[currentEventCount].type).toBe(apiTokensClientEvents.API_TOKENS_REMOVED);
      expect(apiTokenClient.getTokens()).toBeNull();
    });
    it('tokens are renewed, if user is renewed', async () => {
      const newTokens = { tokens: 'renewed token' };
      const renewedAccessToken = 'an access token';
      const apiTokenClient = await initTestsWithDefaultPropsAndWaitForInit({
        additionalResponses: [{ returnedStatus: HttpStatusCode.OK, body: JSON.stringify(newTokens) }],
      });
      expect(apiTokenClient.isRenewing()).toBeFalsy();
      const eventPayloads = getEmittedEventPayloads();
      expect(eventPayloads).toHaveLength(2);
      expect(eventPayloads[0].type).toBe(apiTokensClientEvents.API_TOKENS_RENEWAL_STARTED);
      expect(eventPayloads[1].type).toBe(apiTokensClientEvents.API_TOKENS_UPDATED);
      const eventPromise = waitForSignals(currentBeacon, [
        createApiTokensClientEventTriggerProps({ type: apiTokensClientEvents.API_TOKENS_UPDATED }),
      ]);
      emitEvent(currentBeacon, oidcClientNamespace, {
        type: oidcClientEvents.USER_UPDATED,
        data: createUser({ signInResponseProps: { access_token: renewedAccessToken } }),
      });
      expect(apiTokenClient.isRenewing()).toBeTruthy();
      await advanceUntilPromiseResolved(eventPromise);
      const eventPayloadsAfter = getEmittedEventPayloads();
      expect(eventPayloadsAfter).toHaveLength(4);
      expect(eventPayloadsAfter[0].type).toBe(apiTokensClientEvents.API_TOKENS_RENEWAL_STARTED);
      expect(eventPayloadsAfter[1].type).toBe(apiTokensClientEvents.API_TOKENS_UPDATED);
      expect(eventPayloadsAfter[2].type).toBe(apiTokensClientEvents.API_TOKENS_RENEWAL_STARTED);
      expect(eventPayloadsAfter[3].type).toBe(apiTokensClientEvents.API_TOKENS_UPDATED);
      expect(apiTokenClient.getTokens()).toMatchObject(newTokens);
      expect(apiTokenClient.isRenewing()).toBeFalsy();
    });

    it('tokens are not renewed, if USER_UPDATED event has no valid user ', async () => {
      const apiTokenClient = await initTestsWithDefaultPropsAndWaitForInit({ removeUserAfterInit: true });
      const eventPayloads = getEmittedEventPayloads();
      expect(eventPayloads).toHaveLength(2);
      expect(eventPayloads[0].type).toBe(apiTokensClientEvents.API_TOKENS_RENEWAL_STARTED);
      expect(eventPayloads[1].type).toBe(apiTokensClientEvents.API_TOKENS_UPDATED);
      const eventPromise = waitForSignals(currentBeacon, [createErrorTriggerProps()]);
      emitEvent(currentBeacon, oidcClientNamespace, {
        type: oidcClientEvents.USER_UPDATED,
        data: null,
      });
      await advanceUntilPromiseResolved(eventPromise);
      const emittedErrors = getEmittedErrors();
      expect(emittedErrors).toHaveLength(1);
      expect(emittedErrors[0].isInvalidApiTokensUserError).toBeTruthy();
      expect(apiTokenClient.getTokens()).toMatchObject(apiTokens);
      expect(apiTokenClient.isRenewing()).toBeFalsy();
    });
    it('an error is emitted, if tokens renewal failed when user is renewed', async () => {
      const renewedAccessToken = 'an access token';
      const apiTokenClient = await initTestsWithDefaultPropsAndWaitForInit({
        additionalResponses: [{ returnedStatus: HttpStatusCode.FORBIDDEN }],
      });
      const eventPayloads = getEmittedEventPayloads();
      expect(eventPayloads).toHaveLength(2);
      expect(eventPayloads[0].type).toBe(apiTokensClientEvents.API_TOKENS_RENEWAL_STARTED);
      expect(eventPayloads[1].type).toBe(apiTokensClientEvents.API_TOKENS_UPDATED);
      const eventPromise = waitForSignals(currentBeacon, [createErrorTriggerProps()]);
      emitEvent(currentBeacon, oidcClientNamespace, {
        type: oidcClientEvents.USER_UPDATED,
        data: createUser({ signInResponseProps: { access_token: renewedAccessToken } }),
      });
      await advanceUntilPromiseResolved(eventPromise);
      const eventPayloadsAfter = getEmittedEventPayloads();
      expect(eventPayloadsAfter).toHaveLength(3);
      expect(eventPayloadsAfter[0].type).toBe(apiTokensClientEvents.API_TOKENS_RENEWAL_STARTED);
      expect(eventPayloadsAfter[1].type).toBe(apiTokensClientEvents.API_TOKENS_UPDATED);
      expect(eventPayloadsAfter[2].type).toBe(apiTokensClientEvents.API_TOKENS_RENEWAL_STARTED);
      const emittedErrors = getEmittedErrors();
      expect(emittedErrors).toHaveLength(1);
      expect(emittedErrors[0].isFetchError).toBeTruthy();
      expect(apiTokenClient.getTokens()).toBeNull();
    });
    it('isRenewal() changes to true when USER_RENEWAL_STARTED signal is received and false when renewal is complete', async () => {
      const apiTokenClient = await initTestsWithDefaultPropsAndWaitForInit();
      emitEvent(currentBeacon, oidcClientNamespace, {
        type: oidcClientEvents.USER_RENEWAL_STARTED,
      });
      expect(apiTokenClient.isRenewing()).toBeTruthy();
      emitEvent(currentBeacon, oidcClientNamespace, {
        type: oidcClientEvents.USER_UPDATED,
        data: createUser({ signInResponseProps: { access_token: 'any token' } }),
      });
      await advanceUntilPromiseResolved(waitForSignals(currentBeacon, [createErrorTriggerProps()]));
      expect(apiTokenClient.isRenewing()).toBeFalsy();
    });
  });
});
