import { User, SigninResponse, UserManager } from 'oidc-client-ts';
import { disableFetchMocks, enableFetchMocks } from 'jest-fetch-mock';
import to from 'await-to-js';
import HttpStatusCode from 'http-status-typed';
import { waitFor } from '@testing-library/react';

// eslint-disable-next-line jest/no-mocks-import
import mockWindowLocation from './__mocks__/mockWindowLocation';
// eslint-disable-next-line jest/no-mocks-import
import apiTokens from './__mocks__/apiTokens.json';
// eslint-disable-next-line jest/no-mocks-import
import openIdConfiguration from './__mocks__/openIdConfiguration.json';
import { createOidcClientTestSuite } from './testUtils/oidcClientTestUtil';
import { oidcClientEvents, oidcClientNamespace, oidcClientStates } from './client/index';
import { ConnectedBeaconModule, createTestListenerModule, getListenerSignals } from './testUtils/beaconTestUtil';
import {
  EventSignal,
  emitInitializationSignals,
  eventSignalType,
  initSignalType,
  StateChangeSignalPayload,
  stateChangeSignalType,
  waitForSignals,
} from './beacon/signals';
import { LISTEN_TO_ALL_MARKER, SignalNamespace, createBeacon } from './beacon/beacon';
import { ApiTokenClientProps, TokenData, apiTokensClientEvents, apiTokensClientNamespace } from './apiTokensClient';
import createSessionPoller, { sessionPollerNamespace } from './sessionPoller/sessionPoller';
import createApiTokenClient, {
  setApiTokensToStorage,
  setUserReferenceToStorage,
} from './apiTokensClient/apiTokensClient';
import { Responder, createControlledFetchMockUtil } from './testUtils/fetchMockTestUtil';
import { createSignInResponse } from './testUtils/userTestUtil';
import { mockUserManagerRefreshResponse } from './testUtils/renewalTestUtil';
import { advanceUntilListenerCalled, advanceUntilPromiseResolved } from './testUtils/timerTestUtil';
import { createMockTestUtil } from './testUtils/mockTestUtil';
import { HttpPoller, HttpPollerProps, isSuccessfulHttpResponse } from './utils/httpPoller';
import { RetryingPollerProps } from './utils/httpPollerWithPromises';
import { createApiTokensChangeTrigger } from './apiTokensClient/signals';

type UserInScenarios = 'none' | 'valid' | 'invalid';
type ApiTokensInScenarios = 'none' | 'forUser' | 'otherUser';
type TestScenarioProps = {
  oidcClientProps: {
    userInStorageType?: UserInScenarios;
    signInResponseType?: HttpStatusCode;
    renewResponseType?: HttpStatusCode;
  };
  apiTokensClientProps: {
    tokensInStorage?: ApiTokensInScenarios;
    fetchResponseType?: HttpStatusCode;
    renewResponseType?: HttpStatusCode;
  };
  sessionPollerProps: {
    responseType: HttpStatusCode;
  };
};

const mockMapForSessionHttpPoller = createMockTestUtil();

let mockCurrentHttpPoller: HttpPoller;
const mockActualHttpPoller = jest.requireActual('./utils/httpPoller');
jest.mock('./utils/httpPoller', () => ({
  __esModule: true,
  default: (props: HttpPollerProps) => {
    if (mockCurrentHttpPoller) {
      mockCurrentHttpPoller.stop();
    }
    // this can only be sessionPoller's httpPoller,
    // because apiToken uses httpPoller via httpPollerWithPromises which is mocked below
    mockMapForSessionHttpPoller.reset();
    mockMapForSessionHttpPoller.addSpy(props, 'shouldPoll');
    mockCurrentHttpPoller = mockActualHttpPoller.default(props) as HttpPoller;
    mockMapForSessionHttpPoller.addSpy(mockCurrentHttpPoller, 'start');
    mockMapForSessionHttpPoller.addSpy(mockCurrentHttpPoller, 'stop');
    return mockCurrentHttpPoller;
  },
  isSuccessfulHttpResponse: (...args: unknown[]) => mockActualHttpPoller.isSuccessfulHttpResponse(...args),
}));

// cannot use asyc func inside jest.mock, so it is out here
const mockerHttpPollerWithPromises = async (props: RetryingPollerProps) => {
  const [err, response] = await to(props.pollFunction());
  if (!err && response && isSuccessfulHttpResponse(response)) {
    return Promise.resolve(response);
  }
  return Promise.reject(err);
};

jest.mock('./utils/httpPollerWithPromises', () => ({
  __esModule: true,
  default: (props: RetryingPollerProps) => {
    return mockerHttpPollerWithPromises(props);
  },
}));

describe('Test all modules together', () => {
  const retryInterval = 20000;
  const apiTokensPath = '/api-tokens';
  const defaultApiTokenClientProps: ApiTokenClientProps = {
    url: `http://userinfo.net${apiTokensPath}`,
    maxRetries: 2,
    retryInterval,
  };

  const userInfoPath = '/userinfo';
  const pollIntervalInMs = 50000;

  const {
    initTests,
    waitForLoginToTimeout,
    waitForLogoutToTimeout,
    cleanUp: oidcClientTestSuiteCleanUp,
    setSignInResponse,
    placeUserToStorage,
  } = createOidcClientTestSuite();

  const {
    waitUntilRequestFinished,
    cleanUp: fetchMockUtilCleanUp,
    setResponders,
    addResponse,
    getRequestCount,
    getRequestsInfoById,
  } = createControlledFetchMockUtil();

  const renewedSignInResponse = createSignInResponse({ signInResponseProps: { access_token: 'renewedAccessToken' } });
  const renewedApiTokens = { renewedTokens: 'new ones' };
  const apiTokensResponder: Responder = { id: 'apiTokensResponder', path: apiTokensPath };
  const sessionPollerResponder: Responder = { id: 'sessionPollerResponder', path: userInfoPath };
  const openIdResponder: Responder = {
    id: 'openIdConfig',
    path: '/openid-configuration',
    responses: [
      {
        status: HttpStatusCode.OK,
        body: JSON.stringify(openIdConfiguration),
        headers: {
          'content-type': 'application/json',
        },
      },
    ],
  };
  const responders: Responder[] = [apiTokensResponder, sessionPollerResponder, openIdResponder];

  const getTestProps = (props: Partial<TestScenarioProps>): TestScenarioProps => {
    const { oidcClientProps, apiTokensClientProps, sessionPollerProps } = props;
    const defaultOidcClientProps: TestScenarioProps['oidcClientProps'] = {
      userInStorageType: 'none',
      signInResponseType: HttpStatusCode.OK,
      renewResponseType: HttpStatusCode.OK,
    };
    const defaultApiTokensClientProps: TestScenarioProps['apiTokensClientProps'] = {
      tokensInStorage: 'none',
      fetchResponseType: HttpStatusCode.OK,
      renewResponseType: HttpStatusCode.OK,
    };
    const defaultSessionPollerProps: TestScenarioProps['sessionPollerProps'] = {
      responseType: HttpStatusCode.OK,
    };

    return {
      oidcClientProps: {
        ...defaultOidcClientProps,
        ...oidcClientProps,
      },
      apiTokensClientProps: {
        ...defaultApiTokensClientProps,
        ...apiTokensClientProps,
      },
      sessionPollerProps: {
        ...defaultSessionPollerProps,
        ...sessionPollerProps,
      },
    };
  };

  const setupInitialUser = (props: TestScenarioProps): User | null => {
    const { oidcClientProps } = props;
    if (oidcClientProps.userInStorageType === 'invalid') {
      return placeUserToStorage({ invalidUser: true });
    }
    if (oidcClientProps.userInStorageType === 'valid') {
      return placeUserToStorage();
    }
    return null;
  };

  const setupSignInResponse = (props: TestScenarioProps): SigninResponse | null => {
    const { oidcClientProps } = props;
    if (oidcClientProps.signInResponseType === HttpStatusCode.OK) {
      return setSignInResponse({});
    }
    return null;
  };

  const setupUserRenewalResponse = (props: TestScenarioProps, userManager: UserManager) => {
    const { oidcClientProps } = props;
    const response =
      oidcClientProps.renewResponseType === HttpStatusCode.OK ? renewedSignInResponse : new Error('renewal failed');
    mockUserManagerRefreshResponse(userManager, response, 1000);
  };

  const setupInitialApiTokens = (props: TestScenarioProps, user: User | null) => {
    if (!user) {
      return;
    }
    const { apiTokensClientProps } = props;
    if (apiTokensClientProps.tokensInStorage === 'forUser') {
      setUserReferenceToStorage(user.access_token);
      setApiTokensToStorage(apiTokens);
    } else if (apiTokensClientProps.tokensInStorage === 'otherUser') {
      setUserReferenceToStorage('otherUser');
      setApiTokensToStorage(apiTokens);
    }
  };

  const addApiTokensResponse = (httpStatus?: HttpStatusCode, tokens?: TokenData): void => {
    const body = httpStatus === HttpStatusCode.OK ? JSON.stringify(tokens) : undefined;
    addResponse({ status: httpStatus, body }, apiTokensResponder.id);
  };

  const setupApiTokensResponse = (props: TestScenarioProps): void => {
    const { apiTokensClientProps } = props;
    addApiTokensResponse(apiTokensClientProps.fetchResponseType, apiTokens);
  };

  const setupApiTokensRenewalResponse = (props: TestScenarioProps) => {
    const { apiTokensClientProps } = props;
    addApiTokensResponse(apiTokensClientProps.fetchResponseType, renewedApiTokens);
  };

  const addSessionPollerResponse = (props: TestScenarioProps): void => {
    const { sessionPollerProps } = props;

    addResponse({ status: sessionPollerProps.responseType }, sessionPollerResponder.id);
  };

  const getAllReceivedSignals = (listenerModule: ConnectedBeaconModule) => {
    return getListenerSignals(listenerModule.getListener());
  };

  const initAll = async (props: Partial<TestScenarioProps>) => {
    const testProps = getTestProps(props);
    const initialUser = setupInitialUser(testProps);

    const { oidcClient, userManager } = await initTests({});
    setupSignInResponse(testProps);
    setupUserRenewalResponse(testProps, userManager);

    setupInitialApiTokens(testProps, initialUser);
    setupApiTokensResponse(testProps);
    setupApiTokensRenewalResponse(testProps);
    const apiTokensClient = createApiTokenClient(defaultApiTokenClientProps);

    addSessionPollerResponse(testProps);
    const sessionPoller = createSessionPoller({ pollIntervalInMs });

    const oidcClientListener = createTestListenerModule(oidcClientNamespace, 'oidcClientListener');
    const apiTokensListener = createTestListenerModule(apiTokensClientNamespace, 'apiTokensListener');
    const sessionPollerListener = createTestListenerModule(sessionPollerNamespace, 'sessionPollerListener');
    const allListener = createTestListenerModule(LISTEN_TO_ALL_MARKER, 'allListener');
    const beacon = createBeacon();
    beacon.addSignalContext(allListener);
    beacon.addSignalContext(oidcClient);
    beacon.addSignalContext(apiTokensClient);
    beacon.addSignalContext(sessionPoller);
    beacon.addSignalContext(oidcClientListener);
    beacon.addSignalContext(apiTokensListener);
    beacon.addSignalContext(sessionPollerListener);
    emitInitializationSignals(beacon);
    const getListenerModule = (namespace: SignalNamespace) => {
      if (namespace === oidcClientNamespace) {
        return oidcClientListener;
      }
      if (namespace === apiTokensClientNamespace) {
        return apiTokensListener;
      }
      if (namespace === sessionPollerNamespace) {
        return sessionPollerListener;
      }
      return allListener;
    };
    const getReceivedSignals = (namespace: SignalNamespace) => {
      return getAllReceivedSignals(getListenerModule(namespace));
    };
    const getReceivedSignalTypes = (namespace: SignalNamespace) => {
      return getAllReceivedSignals(getListenerModule(namespace)).map((signal) => {
        if (signal.type === eventSignalType) {
          return signal.payload && (signal.payload as EventSignal).type;
        }
        if (signal.type === stateChangeSignalType) {
          return signal.payload && (signal.payload as StateChangeSignalPayload).state;
        }
        return signal.type;
      });
    };
    return {
      oidcClient,
      apiTokensClient,
      sessionPoller,
      beacon,
      oidcClientListener,
      apiTokensListener,
      sessionPollerListener,
      allListener,
      getReceivedSignals,
      getReceivedSignalTypes,
      createRefreshAdvancer: () => {
        const listener = jest.fn();
        userManager.events.addUserLoaded(listener);
        return async () => {
          await advanceUntilListenerCalled(listener);
        };
      },
    };
  };

  const mockedWindowControls = mockWindowLocation();
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
    });
    setResponders(responders);
  });

  afterEach(async () => {
    sessionStorage.clear();
    mockedWindowControls.reset();
    oidcClientTestSuiteCleanUp();
    await fetchMockUtilCleanUp();
    jest.runOnlyPendingTimers();
    jest.useRealTimers();
    jest.clearAllMocks();
  });

  afterAll(() => {
    disableFetchMocks();
    mockedWindowControls.restore();
  });

  describe('Test all clients together', () => {
    it('When user is not available, requests are not made and only emit signals are emitted', async () => {
      const { getReceivedSignalTypes } = await initAll({});
      jest.advanceTimersByTime(1000000);
      expect(getRequestCount()).toBe(0);
      expect(getReceivedSignalTypes(oidcClientNamespace)).toEqual([initSignalType]);
      expect(getReceivedSignalTypes(apiTokensClientNamespace)).toEqual([initSignalType]);
      expect(getReceivedSignalTypes(sessionPollerNamespace)).toEqual([initSignalType]);
      // allListener listens to all modules (oidc, apiTokens, sessionPoller and 3 listener modules)
      expect(getReceivedSignalTypes(LISTEN_TO_ALL_MARKER)).toHaveLength(6);
    });
    it('When login starts, only login process starts', async () => {
      const { getReceivedSignalTypes } = await initAll({});
      await waitForLoginToTimeout();
      // open id config is called on every login
      jest.advanceTimersByTime(1000000);
      expect(getRequestCount()).toBe(1);
      expect(getRequestsInfoById(openIdResponder.id as string)).toHaveLength(1);
      expect(getReceivedSignalTypes(oidcClientNamespace)).toEqual([initSignalType, oidcClientStates.LOGGING_IN]);
      expect(getReceivedSignalTypes(apiTokensClientNamespace)).toEqual([initSignalType]);
      expect(getReceivedSignalTypes(sessionPollerNamespace)).toEqual([initSignalType]);
      expect(getReceivedSignalTypes(LISTEN_TO_ALL_MARKER)).toHaveLength(7);
    });
    it('When login handleCallback is called and finished, apiTokens are fetched and session polling starts', async () => {
      const { getReceivedSignalTypes, oidcClient, beacon } = await initAll({});
      oidcClient.handleCallback();
      await advanceUntilPromiseResolved(
        waitForSignals(beacon, [createApiTokensChangeTrigger(apiTokensClientEvents.API_TOKENS_UPDATED)]),
      );
      // session poller start is called twice:
      // once when state changes to VALID_SESSION
      // and when USER_UPDATED is received
      // there is not harm to call it twice. USER_UPDATED is not emitted when user session exists on init.
      expect(mockMapForSessionHttpPoller.getCalls('start')).toHaveLength(2);
      expect(getReceivedSignalTypes(oidcClientNamespace)).toEqual([
        initSignalType,
        oidcClientStates.HANDLING_LOGIN_CALLBACK,
        oidcClientStates.VALID_SESSION,
        oidcClientEvents.USER_UPDATED,
      ]);
      expect(getReceivedSignalTypes(apiTokensClientNamespace)).toEqual([
        initSignalType,
        apiTokensClientEvents.API_TOKENS_RENEWAL_STARTED,
        apiTokensClientEvents.API_TOKENS_UPDATED,
      ]);
      // api tokens are fetched. Oidc client requests are mock in the the client itself.
      expect(getRequestCount()).toBe(1);
      expect(getReceivedSignalTypes(sessionPollerNamespace)).toEqual([initSignalType]);
      expect(getReceivedSignalTypes(LISTEN_TO_ALL_MARKER)).toHaveLength(11);
    });
    it("When user and user's tokens are already stored in sessionStorage, only polling starts", async () => {
      const { getReceivedSignalTypes } = await initAll({
        oidcClientProps: {
          userInStorageType: 'valid',
        },
        apiTokensClientProps: {
          tokensInStorage: 'forUser',
        },
      });
      expect(getReceivedSignalTypes(oidcClientNamespace)).toEqual([initSignalType]);
      // because apiTokens exist already and apiTokensClient listens on oidcClient, which also has user
      // API_TOKENS_UPDATED is emitted before init in this scenario.
      expect(getReceivedSignalTypes(apiTokensClientNamespace)).toEqual([
        apiTokensClientEvents.API_TOKENS_UPDATED,
        initSignalType,
      ]);
      expect(getRequestCount()).toBe(0);
      expect(getReceivedSignalTypes(sessionPollerNamespace)).toEqual([initSignalType]);
      // 6*init and one event
      expect(getReceivedSignalTypes(LISTEN_TO_ALL_MARKER)).toHaveLength(7);
      // session polling should start
      expect(mockMapForSessionHttpPoller.getCalls('start')).toHaveLength(1);
      jest.advanceTimersByTime(pollIntervalInMs + 1);
      expect(getRequestCount()).toBe(1);
    });
    it("When user's tokens exist, but not apiTokens, api tokens are fetched", async () => {
      const { getReceivedSignalTypes } = await initAll({
        oidcClientProps: {
          userInStorageType: 'valid',
        },
        apiTokensClientProps: {
          tokensInStorage: 'none',
        },
      });
      await waitUntilRequestFinished({ id: apiTokensResponder.id });
      expect(getReceivedSignalTypes(oidcClientNamespace)).toEqual([initSignalType]);
      expect(getReceivedSignalTypes(apiTokensClientNamespace)).toEqual([
        apiTokensClientEvents.API_TOKENS_RENEWAL_STARTED,
        initSignalType,
        apiTokensClientEvents.API_TOKENS_UPDATED,
      ]);
      expect(getReceivedSignalTypes(sessionPollerNamespace)).toEqual([initSignalType]);
      expect(mockMapForSessionHttpPoller.getCalls('start')).toHaveLength(1);
      jest.advanceTimersByTime(pollIntervalInMs + 1);
      expect(getRequestCount()).toBe(2);
    });
    it('When user is renewed, api tokens are fetched and session polling is stopped and started again', async () => {
      const { getReceivedSignalTypes, oidcClient, createRefreshAdvancer, beacon } = await initAll({
        oidcClientProps: {
          userInStorageType: 'valid',
        },
        apiTokensClientProps: {
          tokensInStorage: 'forUser',
        },
      });
      expect(mockMapForSessionHttpPoller.getCalls('start')).toHaveLength(1);
      expect(mockMapForSessionHttpPoller.getCalls('stop')).toHaveLength(0);
      const renewAdvancer = createRefreshAdvancer();
      const renewPromise = oidcClient.renewUser();

      expect(getReceivedSignalTypes(oidcClientNamespace)).toEqual([
        initSignalType,
        oidcClientEvents.USER_RENEWAL_STARTED,
      ]);
      expect(mockMapForSessionHttpPoller.getCalls('stop')).toHaveLength(1);
      expect(getReceivedSignalTypes(apiTokensClientNamespace)).toEqual([
        apiTokensClientEvents.API_TOKENS_UPDATED,
        initSignalType,
      ]);
      expect(getReceivedSignalTypes(sessionPollerNamespace)).toEqual([initSignalType]);
      await renewAdvancer();
      await advanceUntilPromiseResolved(
        waitForSignals(beacon, [createApiTokensChangeTrigger(apiTokensClientEvents.API_TOKENS_UPDATED)]),
      );
      await waitFor(() => {
        expect(getReceivedSignalTypes(oidcClientNamespace)).toEqual([
          initSignalType,
          oidcClientEvents.USER_RENEWAL_STARTED,
          oidcClientEvents.USER_UPDATED,
        ]);
      });
      expect(getReceivedSignalTypes(apiTokensClientNamespace)).toEqual([
        apiTokensClientEvents.API_TOKENS_UPDATED,
        initSignalType,
        apiTokensClientEvents.API_TOKENS_RENEWAL_STARTED,
        apiTokensClientEvents.API_TOKENS_UPDATED,
      ]);

      await renewPromise;

      expect(mockMapForSessionHttpPoller.getCalls('start')).toHaveLength(2);
      expect(mockMapForSessionHttpPoller.getCalls('stop')).toHaveLength(2);
    });
    it('When user is logs out, api tokens are removed and session polling is stopped.', async () => {
      const { getReceivedSignalTypes } = await initAll({
        oidcClientProps: {
          userInStorageType: 'valid',
        },
        apiTokensClientProps: {
          tokensInStorage: 'forUser',
        },
      });
      expect(mockMapForSessionHttpPoller.getCalls('start')).toHaveLength(1);
      expect(mockMapForSessionHttpPoller.getCalls('stop')).toHaveLength(0);
      await waitForLogoutToTimeout();
      expect(getReceivedSignalTypes(oidcClientNamespace)).toEqual([
        initSignalType,
        oidcClientStates.LOGGING_OUT,
        oidcClientEvents.USER_REMOVED,
      ]);
      expect(mockMapForSessionHttpPoller.getCalls('stop')).toHaveLength(2);
      expect(getReceivedSignalTypes(apiTokensClientNamespace)).toEqual([
        apiTokensClientEvents.API_TOKENS_UPDATED,
        initSignalType,
        apiTokensClientEvents.API_TOKENS_REMOVED,
      ]);
      expect(getReceivedSignalTypes(sessionPollerNamespace)).toEqual([initSignalType]);

      expect(mockMapForSessionHttpPoller.getCalls('start')).toHaveLength(1);
      expect(mockMapForSessionHttpPoller.getCalls('stop')).toHaveLength(2);
    });
  });
});
