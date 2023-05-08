import to from 'await-to-js';
import { User } from 'oidc-client-ts';

// eslint-disable-next-line jest/no-mocks-import
import mockWindowLocation from '../__mocks__/mockWindowLocation';
import { InitTestResult, createOidcClientTestSuite } from '../testUtils/oidcClientTestUtil';
import { LoginProps } from './oidcClient';
import { OidcClientError } from './oidcClientError';

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
});
