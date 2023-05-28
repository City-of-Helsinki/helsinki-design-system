import to from 'await-to-js';
import { User, UserManagerSettings, SigninResponse } from 'oidc-client-ts';
import { waitFor } from '@testing-library/react';

// eslint-disable-next-line jest/no-mocks-import
import mockWindowLocation from '../__mocks__/mockWindowLocation';
// eslint-disable-next-line jest/no-mocks-import
import { jwtWithHelloStringAmr, jwtWithHelloWorldArrayAmr } from '../__mocks__/jwtTokens';
import {
  InitTestResult,
  createOidcClientTestSuite,
  getDefaultOidcClientTestProps,
} from '../testUtils/oidcClientTestUtil';
import {
  LoginProps,
  LogoutProps,
  OidcClient,
  RenewalResult,
  UserReturnType,
  oidcClientEvents,
  oidcClientStates,
} from './index';
import { getUserFromStorage, getUserStoreKey, isUserExpired, isValidUser } from './oidcClient';
import { OidcClientError } from './oidcClientError';
import { createSignInResponse, createUser } from '../testUtils/userTestUtil';
import {
  createConnectedBeaconModule,
  getAllErrorSignals,
  getErrorSignals,
  getListenerSignals,
} from '../testUtils/beaconTestUtil';
import { advanceUntilListenerCalled, listenToPromise } from '../testUtils/timerTestUtil';
import { OidcClientEventSignal, createOidcClientEventSignal } from './signals';
import { createRenewalTestUtil, mockUserManagerRefreshResponse } from '../testUtils/renewalTestUtil';
import {
  ErrorSignal,
  EventPayload,
  EventSignal,
  NamespacedBeacon,
  ScopedSignalListener,
  createErrorTriggerProps,
  errorSignalType,
  eventSignalType,
  stateChangeSignalType,
} from '../beacon/signals';
import { Signal, SignalNamespace } from '../beacon/beacon';
import { getAllMockCallArgs, getLastMockCallArgs } from '../../../utils/testHelpers';
import { waitForFetchMockRequestsToFinish } from '../testUtils/fetchMockTestUtil';

const {
  initTests,
  waitForLoginToTimeout,
  waitForLogoutToTimeout,
  cleanUp,
  setSignInResponse,
  placeUserToStorage,
} = createOidcClientTestSuite();

describe('oidcClient', () => {
  let testData: InitTestResult;
  const mockedWindowControls = mockWindowLocation();
  afterAll(() => {
    mockedWindowControls.restore();
  });
  afterEach(() => {
    cleanUp();
    mockedWindowControls.reset();
  });
  describe('.getUserManager()', () => {
    it('returns the userManager', async () => {
      const { oidcClient, userManager } = await initTests({});
      expect(oidcClient.getUserManager()).toBe(userManager);
    });
  });
  describe('.login()', () => {
    beforeEach(async () => {
      testData = await initTests({});
    });
    it('should add given language to the login url', async () => {
      const { userManager } = testData;
      const signinRedirect = jest.spyOn(userManager, 'signinRedirect');
      const loginParams = { language: 'sv' };
      await waitForLoginToTimeout(loginParams);
      expect(signinRedirect).toHaveBeenNthCalledWith(1, {
        extraQueryParams: {
          ui_locales: loginParams.language,
        },
      });
      await waitFor(() => {
        expect(mockedWindowControls.getCallParameters().get('ui_locales')).toBe(loginParams.language);
      });
    });
    it('should pass other LoginProps than "language" to signinRedirect and convert "language" to an extraQueryParam', async () => {
      const { userManager } = testData;
      const signinRedirect = jest.spyOn(userManager, 'signinRedirect');
      const loginParams: LoginProps = {
        scope: 'scope',
        redirect_uri: 'redirect_uri',
        prompt: 'prompt',
        acr_values: 'acr_values',
        extraQueryParams: { extraParam1: 'extra' },
        extraTokenParams: { extraTokenParam1: 'extra' },
        nonce: 'nonce',
        state: { stateValue: 1, path: '/applications' },
      };
      await waitForLoginToTimeout({ ...loginParams, language: 'sv' });
      expect(signinRedirect).toHaveBeenNthCalledWith(1, {
        ...loginParams,
        extraQueryParams: {
          ...loginParams.extraQueryParams,
          ui_locales: 'sv',
        },
      });
    });
  });
  describe('.logout()', () => {
    beforeEach(async () => {
      testData = await initTests({});
      const { oidcClient } = testData;
      setSignInResponse();
      await oidcClient.handleCallback();
    });
    it('should add given language to the logout url', async () => {
      const { oidcClient, userManager } = testData;
      const signoutRedirectSpy = jest.spyOn(userManager, 'signoutRedirect');
      const loginParams = { language: 'sv' };
      await waitForLogoutToTimeout(loginParams);
      expect(signoutRedirectSpy).toHaveBeenCalledTimes(1);
      expect(signoutRedirectSpy).toHaveBeenNthCalledWith(1, {
        extraQueryParams: {
          ui_locales: loginParams.language,
        },
      });
      await waitFor(() => {
        expect(mockedWindowControls.getCallParameters().get('ui_locales')).toBe(loginParams.language);
      });
      expect(oidcClient.isAuthenticated()).toBeFalsy();
    });
    it('should pass other LogoutProps than "language" to signoutRedirect and convert "language" to an extraQueryParam', async () => {
      const { userManager } = testData;
      const signoutRedirectSpy = jest.spyOn(userManager, 'signoutRedirect');
      const loginParams: LogoutProps = {
        extraQueryParams: { extraParam1: 'extra' },
        state: { stateValue: 2, path: '/logout' },
        id_token_hint: 'id_token_hint',
        post_logout_redirect_uri: 'post_logout_redirect_uri',
      };
      await waitForLogoutToTimeout({ ...loginParams, language: 'sv' });
      expect(signoutRedirectSpy).toHaveBeenNthCalledWith(1, {
        ...loginParams,
        extraQueryParams: {
          ...loginParams.extraQueryParams,
          ui_locales: 'sv',
        },
      });
    });
    it('should remove the user from sessionStorage', async () => {
      const userManagerProps = getDefaultOidcClientTestProps().userManagerSettings as UserManagerSettings;
      const userFromStorage = getUserFromStorage(userManagerProps);
      expect(userFromStorage).not.toBeNull();
      await waitForLogoutToTimeout();
      const userFromStorageAfterLogout = getUserFromStorage(userManagerProps);
      expect(userFromStorageAfterLogout).toBeNull();
    });
  });
  describe('.handleCallback()', () => {
    it('should return the same user returned from signinRedirectCallback. Except state is converted to an object and userState is removed (by the oidc-client-ts)', async () => {
      const { oidcClient } = await initTests({});
      const mockedResponse = setSignInResponse();
      const user = await oidcClient.handleCallback();
      expect({ ...mockedResponse, state: {}, userState: undefined }).toMatchObject(user as User);
      expect(oidcClient.isAuthenticated()).toBeTruthy();
    });
    it('should return an error when user is invalid.', async () => {
      const { oidcClient } = await initTests({});
      setSignInResponse({ invalidUser: true });
      const [error] = await to(oidcClient.handleCallback());
      expect(error).toBeInstanceOf(Error);
      expect((error as OidcClientError).isInvalidUserError).toBeTruthy();
      expect(oidcClient.isAuthenticated()).toBeFalsy();
    });
    it('should return an error when user is expired.', async () => {
      const { oidcClient } = await initTests({});
      setSignInResponse({ expiredUser: true });
      const [error] = await to(oidcClient.handleCallback());
      expect(error).toBeInstanceOf(Error);
      expect((error as OidcClientError).isInvalidUserError).toBeTruthy();
      expect(oidcClient.isAuthenticated()).toBeFalsy();
    });
    it('should return an error when signinRedirectCallback throws', async () => {
      const { oidcClient } = await initTests({});
      const [error] = await to(oidcClient.handleCallback());
      expect(error).toBeInstanceOf(Error);
      expect((error as OidcClientError).isSignInError).toBeTruthy();
    });
    it('should set the user to sessionStorage', async () => {
      const { oidcClient } = await initTests({});
      const setSpy = jest.spyOn(Storage.prototype, 'setItem');
      expect(setSpy).toHaveBeenCalledTimes(0);
      setSignInResponse();
      await oidcClient.handleCallback();
      expect(setSpy).toHaveBeenCalledTimes(1);
      expect(oidcClient.isAuthenticated()).toBeTruthy();
    });
  });
  describe('.isAuthenticated()', () => {
    it('should return true when current user is valid', async () => {
      const { oidcClient } = await initTests({ userProps: {} });
      expect(oidcClient.isAuthenticated()).toBeTruthy();
    });
    it('should return true when current user is expired', async () => {
      const { oidcClient } = await initTests({ userProps: { expiredUser: true } });
      expect(oidcClient.isAuthenticated()).toBeFalsy();
    });
    it('should return true when user is does not exist', async () => {
      const { oidcClient } = await initTests({});
      expect(oidcClient.isAuthenticated()).toBeFalsy();
    });
  });
  describe('.getUser()', () => {
    it('returns user from sessionStorage. Or null if not found. Function is syncronous and works like asyncronous userManager.getUser()', async () => {
      const { oidcClient } = await initTests({});
      const getSpy = jest.spyOn(Storage.prototype, 'getItem');
      expect(getSpy).toHaveBeenCalledTimes(0);
      setSignInResponse();
      await oidcClient.handleCallback();
      const userViaClientGetUser = oidcClient.getUser();
      expect(getSpy).toHaveBeenCalledTimes(1);
      const userViaUserManagerGetUser = await oidcClient.getUserManager().getUser();
      expect(getSpy).toHaveBeenCalledTimes(2);
      expect(userViaClientGetUser).toMatchObject(userViaUserManagerGetUser as User);
      oidcClient.getUser();
      expect(getSpy).toHaveBeenCalledTimes(3);
    });
    it('should also return an expired user.', async () => {
      const { oidcClient } = await initTests({});
      setSignInResponse({ expiredUser: true });
      await to(oidcClient.handleCallback());
      const userViaClientGetUser = oidcClient.getUser();
      expect(userViaClientGetUser).not.toBeNull();
      expect(userViaClientGetUser?.expires_in).not.toBeNull();
      expect(isUserExpired(userViaClientGetUser)).toBeTruthy();
    });
    it('returns null if user is not found.', async () => {
      const { oidcClient } = await initTests({});
      const userViaClientGetUser = oidcClient.getUser();
      expect(userViaClientGetUser).toBeNull();
      const userViaUserManagerGetUser = await oidcClient.getUserManager().getUser();
      expect(userViaUserManagerGetUser).toBeNull();
    });
  });
  describe('getUserStoreKey()', () => {
    it('returns the same storage key as userManager.getUser uses', async () => {
      const { oidcClient } = await initTests({});
      const key = getUserStoreKey(getDefaultOidcClientTestProps().userManagerSettings);
      const getSpy = jest.spyOn(Storage.prototype, 'getItem');
      await oidcClient.getUserManager().getUser();
      expect(getSpy.mock.calls[0][0]).toBe(key);
    });
  });
  describe('getUserFromStorage()', () => {
    it('gets user from sessionstorage', async () => {
      const user = createUser();
      jest.spyOn(Storage.prototype, 'getItem').mockReturnValue(user.toStorageString());
      const userFromStorage = getUserFromStorage(
        getDefaultOidcClientTestProps().userManagerSettings as UserManagerSettings,
      );
      expect(user).toMatchObject(userFromStorage as User);
    });
    it('handles invalid sessionstorage data', async () => {
      jest.spyOn(Storage.prototype, 'getItem').mockReturnValue('{invalidJSON]]');
      const userFromStorage = getUserFromStorage(
        getDefaultOidcClientTestProps().userManagerSettings as UserManagerSettings,
      );
      expect(userFromStorage).toBeNull();
    });
  });
  describe('getAmr()', () => {
    const createUserProps = (idToken?: string) => ({
      userProps: {
        invalidUser: false,
        signInResponseProps: {
          id_token: idToken,
        },
        signInResponseProfileProps: {
          amr: undefined,
        },
      },
    });
    it('returns the amr in user.profile, if found', async () => {
      const { oidcClient } = await initTests({ userProps: { invalidUser: false } });
      expect(oidcClient.getAmr()).toEqual(['validAmr']);
    });
    it('decodes the amr from user.id_token and returns it as an array', async () => {
      const { oidcClient } = await initTests(createUserProps(jwtWithHelloWorldArrayAmr));
      expect(oidcClient.getAmr()).toEqual(['hello', 'world']);
    });
    it('decodes the amr from user.id_token and returns it as an array, if it was a string originally', async () => {
      const { oidcClient } = await initTests(createUserProps(jwtWithHelloStringAmr));
      expect(oidcClient.getAmr()).toEqual(['hello']);
    });
    it('returns undefined, if token is malformed', async () => {
      const { oidcClient } = await initTests(createUserProps('invalid'));
      expect(oidcClient.getAmr()).toBeUndefined();
    });
    it('returns undefined, if amr has invalid value and id_token is not set ', async () => {
      const amrValue = 'notAnArray';
      const initProps = {
        ...createUserProps(undefined),
      };
      ((initProps.userProps.signInResponseProfileProps as unknown) as Record<string, string>).amr = amrValue;
      const { oidcClient } = await initTests(initProps);
      expect(oidcClient.getAmr()).toBeUndefined();
    });
  });
  describe('.getTokens()', () => {
    beforeEach(() => {
      jest.useFakeTimers();
    });
    afterEach(() => {
      jest.useRealTimers();
    });
    const verifyTokens = async (oidcClient: OidcClient, assumedTokens: Partial<SigninResponse>) => {
      expect(assumedTokens).toMatchObject({
        access_token: oidcClient.getToken('access'),
        id_token: oidcClient.getToken('id'),
        refresh_token: oidcClient.getToken('refresh'),
      });
    };
    const signInResponseProps = {
      access_token: 'initial access token',
      id_token: 'initial id token',
      refresh_token: 'initial refresh token',
    };
    const refreshSignInResponseProps = {
      access_token: 'new access token',
      id_token: 'new id token',
      refresh_token: 'new refresh token',
    };
    it('returns a token of given type and renew updates them', async () => {
      const { oidcClient, userManager } = await initTests({
        userProps: { signInResponseProps },
      });
      verifyTokens(oidcClient, signInResponseProps);
      const fulfillmentListener = mockUserManagerRefreshResponse(
        userManager,
        createSignInResponse({ signInResponseProps: refreshSignInResponseProps }),
      );
      oidcClient.renewUser();
      const newAccessTokenPromise = oidcClient.getToken('access');
      await advanceUntilListenerCalled(fulfillmentListener);
      await waitFor(() => {
        expect(oidcClient.isRenewing()).toBeFalsy();
      });
      verifyTokens(oidcClient, refreshSignInResponseProps);
      const newAccessToken = await newAccessTokenPromise;
      expect(newAccessToken).toBe(refreshSignInResponseProps.access_token);
    });

    it('handles errors too', async () => {
      const { oidcClient, userManager } = await initTests({
        userProps: { signInResponseProps },
      });
      verifyTokens(oidcClient, signInResponseProps);
      const fulfillmentListener = mockUserManagerRefreshResponse(userManager, new Error('UPS'));
      oidcClient.renewUser();
      await advanceUntilListenerCalled(fulfillmentListener);
      await waitFor(() => {
        expect(oidcClient.isRenewing()).toBeFalsy();
      });
      verifyTokens(oidcClient, signInResponseProps);
    });
    it('returns undefined, if user is not valid', async () => {
      const { oidcClient } = await initTests({
        userProps: { expiredUser: true, signInResponseProps },
      });
      expect(await oidcClient.getToken('access')).toBeUndefined();
      expect(await oidcClient.getToken('id')).toBeUndefined();
      expect(await oidcClient.getToken('refresh')).toBeUndefined();
    });
    it('returns undefined, if user is not found', async () => {
      const { oidcClient } = await initTests();
      expect(await oidcClient.getToken('access')).toBeUndefined();
      expect(await oidcClient.getToken('id')).toBeUndefined();
      expect(await oidcClient.getToken('refresh')).toBeUndefined();
    });
  });
  describe('isUserExpired()', () => {
    it('returns true, if user is expired', async () => {
      expect(isUserExpired(createUser({ expiredUser: true }))).toBeTruthy();
    });
    it('returns user.expired, if it exists', async () => {
      const user = createUser();
      expect(isUserExpired({ ...user, expired: true })).toBeTruthy();
      expect(isUserExpired({ ...user, expired: false })).toBeFalsy();
    });
    it('uses user.expires_at, if user.expired is undefined', async () => {
      const user = createUser();
      const testUser = { ...user, expired: undefined };
      const timeNowInSeconds = Math.floor(Date.now() / 1000);
      expect(isUserExpired({ ...testUser, expires_at: timeNowInSeconds - 1 })).toBeTruthy();
      expect(isUserExpired({ ...testUser, expires_at: timeNowInSeconds + 1 })).toBeFalsy();
    });
    it('returns true, if user.expired or user.expires_at exists', async () => {
      const user = createUser({ expiredUser: false });
      expect(isUserExpired({ ...user, expired: undefined, expires_at: undefined })).toBeTruthy();
    });
    it('returns true, if user is not set', async () => {
      expect(isUserExpired(undefined)).toBeTruthy();
    });
  });
  describe('isValidUser()', () => {
    it('returns true, if user is valid', async () => {
      expect(isValidUser(createUser({ invalidUser: false, expiredUser: false }))).toBeTruthy();
    });
    it('returns false, if user is expired', async () => {
      expect(isValidUser(createUser({ invalidUser: false, expiredUser: true }))).toBeFalsy();
    });
    it('returns false, if user.access_token is not valid', async () => {
      const validUser = createUser({ invalidUser: false, expiredUser: false });
      expect(isValidUser({ ...validUser, access_token: '' } as User)).toBeFalsy();
      const invaliduser = createUser({ invalidUser: true, expiredUser: false });
      expect(isValidUser(invaliduser)).toBeFalsy();
    });
    it('returns false, if user is not set', async () => {
      expect(isValidUser(undefined)).toBeFalsy();
    });
  });
  describe('state changes should be emitted', () => {
    let listenerModule: ReturnType<typeof createConnectedBeaconModule>;
    beforeEach(async () => {
      listenerModule = createConnectedBeaconModule('oidcClientTests');
      listenerModule.listenTo('*:*');
    });
    it('state is NO_SESSION when valid user does not exist on init. No change is emitted.', async () => {
      const { oidcClient } = await initTests({ modules: [listenerModule] });
      expect(oidcClient.getState()).toBe(oidcClientStates.NO_SESSION);
      expect(listenerModule.getListener()).toHaveBeenCalledTimes(0);
    });
    it('state is VALID_SESSION when valid user does exist on init.  No change is emitted.', async () => {
      placeUserToStorage();
      const { oidcClient } = await initTests({ modules: [listenerModule] });
      expect(oidcClient.getState()).toBe(oidcClientStates.VALID_SESSION);
      expect(listenerModule.getListener()).toHaveBeenCalledTimes(0);
    });
    it('state changes when login is called. Payload has the state change', async () => {
      await initTests({ modules: [listenerModule] });
      await waitForLoginToTimeout();
      const emittedSignals = getListenerSignals(listenerModule.getListener());
      expect(emittedSignals).toHaveLength(1);
      expect(emittedSignals[0].type).toBe(stateChangeSignalType);
      expect(emittedSignals[0].payload).toMatchObject({
        state: oidcClientStates.LOGGING_IN,
        previousState: oidcClientStates.NO_SESSION,
      });
    });
    it('state changes when logout is called. Payload has the state change. USER_REMOVED event is emitted.', async () => {
      placeUserToStorage();
      await initTests({ modules: [listenerModule] });
      await waitForLogoutToTimeout();
      const emittedSignals = getListenerSignals(listenerModule.getListener());
      expect(emittedSignals).toHaveLength(2);
      expect(emittedSignals[0].type).toBe(stateChangeSignalType);
      expect(emittedSignals[0].payload).toMatchObject({
        state: oidcClientStates.LOGGING_OUT,
        previousState: oidcClientStates.VALID_SESSION,
      });
      expect(emittedSignals[1].type).toBe(eventSignalType);
      expect(emittedSignals[1].payload).toMatchObject({ type: oidcClientEvents.USER_REMOVED });
    });
    it('state changes twice when handleCallback is called and successful. Payloads have state changes. USER_UPDATED event is emitted with user.', async () => {
      const { oidcClient } = await initTests({ modules: [listenerModule] });
      const signInResponseProfileProps = { name: 'updated user' };
      setSignInResponse({ signInResponseProfileProps });
      await oidcClient.handleCallback();
      const emittedSignals = getListenerSignals(listenerModule.getListener());
      expect(emittedSignals).toHaveLength(3);
      expect(emittedSignals[0].payload).toMatchObject({
        state: oidcClientStates.HANDLING_LOGIN_CALLBACK,
        previousState: oidcClientStates.NO_SESSION,
      });
      expect(emittedSignals[1].payload).toMatchObject({
        state: oidcClientStates.VALID_SESSION,
        previousState: oidcClientStates.HANDLING_LOGIN_CALLBACK,
      });
      const payload = emittedSignals[2].payload as EventPayload;
      const user = (emittedSignals[2].payload as EventPayload).data as User;
      expect(payload.type).toBe(oidcClientEvents.USER_UPDATED);
      expect(user.profile.name).toBe(signInResponseProfileProps.name);
    });
    it('state changes twice when handleCallback is called and fails. Payloads have state changes and error', async () => {
      const { oidcClient } = await initTests({ modules: [listenerModule] });
      setSignInResponse({ invalidUser: true });
      const [error] = await to(oidcClient.handleCallback());
      const emittedSignals = getListenerSignals(listenerModule.getListener());
      expect(emittedSignals).toHaveLength(3);
      expect(emittedSignals[0].payload).toMatchObject({
        state: oidcClientStates.HANDLING_LOGIN_CALLBACK,
        previousState: oidcClientStates.NO_SESSION,
      });
      expect((emittedSignals[1].payload as OidcClientError).isInvalidUserError).toBeTruthy();
      expect(emittedSignals[1].payload).toBe(error);
      expect(emittedSignals[2].payload).toMatchObject({
        state: oidcClientStates.NO_SESSION,
        previousState: oidcClientStates.HANDLING_LOGIN_CALLBACK,
      });
    });
  });
  describe('User expiration and renewal', () => {
    const listenerForEverything = jest.fn();
    const moduleNamespaces = ['module1', 'module2', 'module3'];
    const reEmittingModule = moduleNamespaces[1];

    const storeToListener = (signal: Signal, module: NamespacedBeacon, info?: string) => {
      listenerForEverything({ ...signal }, module.namespace, info);
    };

    const filterListenerCallsPerModule = (moduleName: SignalNamespace): Signal[] => {
      const calls = getAllMockCallArgs(listenerForEverything);
      const filtered = calls.filter((args: unknown[]) => {
        return args[1] === moduleName;
      });
      return filtered.map((args: unknown[]) => {
        return args[0] as Signal;
      });
    };

    const listAllSignals = (): string[] => {
      const calls = getAllMockCallArgs(listenerForEverything);
      return calls.map((args: unknown[]) => {
        const signal = args[0] as Signal;
        const listenerNamespace = args[1] as SignalNamespace;
        const type = signal.type === eventSignalType ? (signal as EventSignal).payload?.type : signal.type;
        const error = signal.type === errorSignalType ? ((signal as ErrorSignal).payload as OidcClientError).type : '';
        return `${error || type}:${signal.namespace}@${listenerNamespace}`;
      });
    };

    const getResultsFromRenawalListeners = (
      listener: jest.Mock,
      usersOnly = false,
    ): Array<OidcClientError | UserReturnType> => {
      const calls = getAllMockCallArgs(listener);
      return calls.map((args) => {
        const errorOrUserTuple = args[0] as RenewalResult;
        return usersOnly ? errorOrUserTuple[1] : errorOrUserTuple[1] || errorOrUserTuple[0];
      });
    };

    const listAllUserRenewalCompletions = (): [User | null, SignalNamespace][] => {
      const calls = getAllMockCallArgs(listenerForEverything);
      const filtered = calls.filter((args: unknown[]) => {
        const signal = args[0] as Signal;
        const { payload } = signal as OidcClientEventSignal;
        if (signal.type !== eventSignalType) {
          return false;
        }
        if (!payload || payload.type !== oidcClientEvents.USER_UPDATED) {
          return false;
        }
        return true;
      });
      return filtered.map((args: unknown[]) => {
        const signal = args[0] as Signal;
        const payload = (signal as EventSignal).payload as EventPayload;
        const namespace = args[1] as SignalNamespace;
        return [payload ? (payload.data as User) : null, namespace];
      });
    };

    const createModule = (namespace: SignalNamespace) => {
      const beaconModule = createConnectedBeaconModule(namespace);
      const renewalErrorListener: ScopedSignalListener = (signal, module) => {
        storeToListener(signal, module);
      };
      const renewalStartedListener: ScopedSignalListener = (signal, module) => {
        storeToListener(signal, module);
        if ((signal as OidcClientEventSignal).payload.type === oidcClientEvents.USER_RENEWAL_STARTED) {
          if (module.namespace === reEmittingModule) {
            storeToListener({ type: 'RE_EMIT_RENEWAL', namespace: signal.namespace }, module);
            module.emit('RE_EMIT_RENEWAL');
          }
          storeToListener({ type: 'RENEWAL_HANDLED', namespace: signal.namespace }, module);
        }
        if ((signal as OidcClientEventSignal).payload.type === oidcClientEvents.USER_UPDATED) {
          //
        }
        return undefined;
      };
      beaconModule.addListener(createOidcClientEventSignal(), renewalStartedListener);
      beaconModule.addListener(createErrorTriggerProps(), renewalErrorListener);
      return beaconModule;
    };

    const initRenewalTests = async (validResponse = true, createListeningModules = false) => {
      const modules = createListeningModules
        ? moduleNamespaces.map((namespace) => {
            return createModule(namespace);
          })
        : [];
      // this module listens all events, but only delays completion of the 'RE_EMIT_RENEWAL of module2
      // making sure promises are awaited for
      const reEmitListeningModule = createConnectedBeaconModule('re-emitter');
      reEmitListeningModule.addListener('*:*', (signal, module) => {
        if (signal.type === 'RE_EMIT_RENEWAL' && signal.namespace === reEmittingModule) {
          storeToListener({ type: 'RE_EMIT_STARTED', namespace: signal.namespace }, module);
          storeToListener({ type: 'RE_EMIT_OVER', namespace: signal.namespace }, module);
        } else {
          storeToListener(signal, module);
        }
      });
      const { init } = createRenewalTestUtil();

      const refreshTokens = {
        initial: 'initialToken',
        renewed: 'renewedToken',
      };
      const response = validResponse
        ? createSignInResponse({ signInResponseProps: { refresh_token: refreshTokens.renewed } })
        : new Error('Failed');
      const clientData = await initTests({
        modules: createListeningModules ? [reEmitListeningModule, ...modules] : undefined,
        userProps: { signInResponseProps: { refresh_token: refreshTokens.initial } },
      });
      const renewalFunctions = init({ userManager: clientData.userManager });

      const fulfillmentListener = renewalFunctions.setListenerToRefreshResponse(response);
      const waitForRefreshToEnd = async () => {
        await advanceUntilListenerCalled(fulfillmentListener);
      };
      return {
        ...clientData,
        renewalFunctions,
        waitForRefreshToEnd,
        refreshTokens,
        modules,
      };
    };
    beforeEach(async () => {
      jest.useFakeTimers();
    });

    afterEach(async () => {
      jest.runOnlyPendingTimers();
      jest.useRealTimers();
      jest.resetAllMocks();
      await waitForFetchMockRequestsToFinish();
    });

    // eventlisteners are called in the order listeners are assigned: re-emitter, module1, module2, module3
    // new events are not emitted until all listeners of the initial event are fulfilled
    // signals are mapped for output as <eventType or signalType>:<event emitter namespace>@<listener namespace>
    const signalsWhenProcessIsSuccessful = [
      'USER_RENEWAL_STARTED:oidcClient@re-emitter',
      'USER_RENEWAL_STARTED:oidcClient@module1',
      'RENEWAL_HANDLED:oidcClient@module1',
      'USER_RENEWAL_STARTED:oidcClient@module2',
      'RE_EMIT_RENEWAL:oidcClient@module2',
      'RENEWAL_HANDLED:oidcClient@module2',
      'USER_RENEWAL_STARTED:oidcClient@module3',
      'RENEWAL_HANDLED:oidcClient@module3',
      'RE_EMIT_STARTED:module2@re-emitter',
      'RE_EMIT_OVER:module2@re-emitter',
      'USER_UPDATED:oidcClient@re-emitter',
      'USER_UPDATED:oidcClient@module1',
      'USER_UPDATED:oidcClient@module2',
      'USER_UPDATED:oidcClient@module3',
    ];

    // when it fails, error signals are also sent, before USER_UPDATED signal
    const signalsWhenProcessIsFails = [
      ...signalsWhenProcessIsSuccessful.slice(0, 10),
      ...[
        'RENEWAL_FAILED:oidcClient@re-emitter',
        'RENEWAL_FAILED:oidcClient@module1',
        'RENEWAL_FAILED:oidcClient@module2',
        'RENEWAL_FAILED:oidcClient@module3',
      ],
      ...signalsWhenProcessIsSuccessful.slice(10),
    ];

    describe('Automatic renewal, when tokens are expiring, is handled and signals are emitted.', () => {
      it('Events are emitted and listeners awaited until new ones sent. isRenewing() changes with the process.', async () => {
        const { renewalFunctions, oidcClient, waitForRefreshToEnd, refreshTokens } = await initRenewalTests(true, true);
        expect(oidcClient.isRenewing()).toBeFalsy();
        const initialUser = oidcClient.getUser() as User;
        renewalFunctions.raiseExpiringEvent();
        expect(oidcClient.isAuthenticated()).toBeTruthy();
        await waitForRefreshToEnd();
        await waitFor(() => {
          expect(oidcClient.isRenewing()).toBeFalsy();
        });
        const reportedErrors = getAllErrorSignals(listenerForEverything);
        expect(reportedErrors).toHaveLength(0);
        const renewedUser = oidcClient.getUser() as User;
        expect(renewedUser).not.toMatchObject(initialUser);
        expect(renewedUser.refresh_token).toBe(refreshTokens.renewed);
        expect(initialUser.refresh_token).toBe(refreshTokens.initial);
        expect(listAllSignals()).toEqual(signalsWhenProcessIsSuccessful);
        const allRenewResults = listAllUserRenewalCompletions();
        expect(allRenewResults.filter(([user]) => user?.refresh_token === renewedUser.refresh_token)).toHaveLength(4);
        expect(oidcClient.isAuthenticated()).toBeTruthy();
      });
      it('Errors are handled and emitted. Failed renewal does not invalidate user.', async () => {
        const { renewalFunctions, oidcClient, waitForRefreshToEnd, modules } = await initRenewalTests(false, true);
        expect(oidcClient.isRenewing()).toBeFalsy();
        const initialUser = oidcClient.getUser() as User;
        renewalFunctions.raiseExpiringEvent();
        await waitFor(() => {
          expect(oidcClient.isRenewing()).toBeTruthy();
        });
        await waitForRefreshToEnd();
        await waitFor(() => {
          expect(oidcClient.isRenewing()).toBeFalsy();
        });
        const sameUser = oidcClient.getUser() as User;
        expect(sameUser).toMatchObject(initialUser);
        [...modules].forEach((mod) => {
          const reportedErrors = getErrorSignals(filterListenerCallsPerModule(mod.namespace));
          expect(reportedErrors).toHaveLength(1);
          expect(((reportedErrors[0] as ErrorSignal).payload as OidcClientError).isRenewalError).toBeTruthy();
        });
        expect(listAllSignals()).toEqual(signalsWhenProcessIsFails);
        const allRenewResults = listAllUserRenewalCompletions();
        expect(allRenewResults.filter(([user]) => user === null)).toHaveLength(4);
        expect(oidcClient.isAuthenticated()).toBeTruthy();
      });
    });
    describe('Manual renewal can be started with renewUser()', () => {
      it('It is handled like the automatic renewal. Can be run. Returns user', async () => {
        const { oidcClient, waitForRefreshToEnd, refreshTokens } = await initRenewalTests(true, true);
        expect(oidcClient.isRenewing()).toBeFalsy();
        const initialUser = oidcClient.getUser() as User;
        const promise = oidcClient.renewUser();
        const promiseListener = listenToPromise(promise);
        await waitForRefreshToEnd();
        await waitFor(() => {
          expect(oidcClient.isRenewing()).toBeFalsy();
        });
        await advanceUntilListenerCalled(promiseListener);
        const renewedUser = getResultsFromRenawalListeners(promiseListener, true)[0] as User;
        expect(renewedUser).not.toMatchObject(initialUser);
        expect(renewedUser.refresh_token).toBe(refreshTokens.renewed);
        expect(initialUser.refresh_token).toBe(refreshTokens.initial);
        expect(listAllSignals()).toEqual(signalsWhenProcessIsSuccessful);
      });
      it('If renewUser is called while automatic is in progress or vice versa, new process is not started.', async () => {
        const { oidcClient, waitForRefreshToEnd, renewalFunctions } = await initRenewalTests(false, true);
        expect(oidcClient.isRenewing()).toBeFalsy();
        renewalFunctions.raiseExpiringEvent();
        await waitFor(() => {
          expect(oidcClient.isRenewing()).toBeTruthy();
        });
        const promise = oidcClient.renewUser();
        const promise2 = oidcClient.renewUser();
        const promiseListener = listenToPromise(promise);
        const promiseListener2 = listenToPromise(promise2);

        await waitForRefreshToEnd();
        await waitFor(() => {
          expect(oidcClient.isRenewing()).toBeFalsy();
        });
        await advanceUntilListenerCalled(promiseListener);
        await advanceUntilListenerCalled(promiseListener2);
        const allRenewResults = listAllUserRenewalCompletions();
        expect(allRenewResults.filter(([user]) => user === null)).toHaveLength(4);
        expect(listAllSignals()).toEqual(signalsWhenProcessIsFails);
        const errorResult = getLastMockCallArgs(promiseListener)[0][0];
        const errorResult2 = getLastMockCallArgs(promiseListener2)[0][0];
        expect(errorResult).toBeInstanceOf(Error);
        expect(errorResult === errorResult2).toBeTruthy();
        renewalFunctions.removeListeners();
        await waitForRefreshToEnd();
      });
    });
  });
});
