/* eslint-disable no-underscore-dangle */
/* eslint-disable camelcase */
import { UserManager } from 'oidc-client-ts';
import fetchMock from 'jest-fetch-mock';
import { waitFor } from '@testing-library/react';

import createOidcClient, { OidcClient, OidcClientProps, LoginProps } from '../client/oidcClient';
// eslint-disable-next-line jest/no-mocks-import
import openIdConfiguration from '../__mocks__/openIdConfiguration.json';

export type InitTestResult = {
  oidcClient: OidcClient;
  userManager: UserManager;
};

export function createTestSuite() {
  let oidcClient: OidcClient;
  let userManager: UserManager;

  const authority = 'https://api.hel.fi/sso/openid';
  const client_id = 'test-client';
  const scope = 'openid profile';
  const defaultTestProps: OidcClientProps = {
    userManagerSettings: {
      authority,
      client_id,
      scope,
    },
  };

  const returnOpenIdConfiguration = () =>
    Promise.resolve({
      body: JSON.stringify(openIdConfiguration),
      headers: {
        'content-type': 'application/json',
      },
    });

  fetchMock.mockResponse((req) => {
    if (req.url.includes('well-known')) {
      return returnOpenIdConfiguration();
    }
    return Promise.reject(new Error(`Unknown url ${req.url}`));
  });

  // oidcClient.login redirects the browser.
  // The returned promise is never resolved.
  async function waitForLoginToTimeout(loginProps?: LoginProps) {
    await expect(() =>
      waitFor(() => oidcClient.login(loginProps), {
        timeout: 1000,
      }),
    ).rejects.toThrow();
  }

  const initTests = async (
    testProps: unknown,
    additionalOidcClientProps?: Partial<OidcClientProps>,
  ): Promise<InitTestResult> => {
    const oidcClientProps = {
      ...defaultTestProps,
      ...additionalOidcClientProps,
    };
    oidcClient = createOidcClient(oidcClientProps);
    userManager = oidcClient.getUserManager();
    return { oidcClient, userManager };
  };

  const getOidcClient = () => oidcClient;
  const getUserManager = () => userManager;

  const cleanUp = () => {
    sessionStorage.clear();
    jest.restoreAllMocks();
  };

  const getDefaultOidcClientProps = () => defaultTestProps;

  return {
    initTests,
    waitForLoginToTimeout,
    cleanUp,
    getOidcClient,
    getUserManager,
    getDefaultOidcClientProps,
  };
}
