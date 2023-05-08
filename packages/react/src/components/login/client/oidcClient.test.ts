import to from 'await-to-js';
import { User, UserManagerSettings } from 'oidc-client-ts';

// eslint-disable-next-line jest/no-mocks-import
import mockWindowLocation from '../__mocks__/mockWindowLocation';
import {
  InitTestResult,
  createOidcClientTestSuite,
  getDefaultOidcClientTestProps,
} from '../testUtils/oidcClientTestUtil';
import { LoginProps, getUserFromStorage, getUserStoreKey, isUserExpired, isValidUser } from './oidcClient';
import { OidcClientError } from './oidcClientError';
import { createUser } from '../testUtils/userTestUtil';

const { initTests, waitForLoginToTimeout, cleanUp, setSignInResponse } = createOidcClientTestSuite();

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
      expect(mockedWindowControls.getCallParameters().get('ui_locales')).toBe(loginParams.language);
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
  describe('.handleCallback()', () => {
    it('should return the same user returned from signinRedirectCallback. Except state is converted to an object and userState is removed (by the oidc-client-ts)', async () => {
      const { oidcClient } = await initTests({});
      const mockedResponse = setSignInResponse();
      const user = await oidcClient.handleCallback();
      expect({ ...mockedResponse, state: {}, userState: undefined }).toMatchObject(user as User);
    });
    it('should return an error when user is invalid.', async () => {
      const { oidcClient } = await initTests({});
      setSignInResponse({ invalidUser: true });
      const [error] = await to(oidcClient.handleCallback());
      expect(error).toBeInstanceOf(Error);
      expect((error as OidcClientError).isInvalidUserError).toBeTruthy();
    });
    it('should return an error when user is expired.', async () => {
      const { oidcClient } = await initTests({});
      setSignInResponse({ expiredUser: true });
      const [error] = await to(oidcClient.handleCallback());
      expect(error).toBeInstanceOf(Error);
      expect((error as OidcClientError).isInvalidUserError).toBeTruthy();
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
});
