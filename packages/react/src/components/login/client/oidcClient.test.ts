// eslint-disable-next-line jest/no-mocks-import
import mockWindowLocation from '../__mocks__/mockWindowLocation';
import { InitTestResult, createTestSuite } from '../testUtils/testUtil';
import { LoginProps } from './oidcClient';

const { initTests, waitForLoginToTimeout, cleanUp } = createTestSuite();

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
});
