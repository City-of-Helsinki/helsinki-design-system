/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-underscore-dangle */
/* eslint-disable camelcase */
import { UserManager, OidcClient as OidcClientFromNpm, SigninResponse } from 'oidc-client-ts';
import fetchMock from 'jest-fetch-mock';
import { waitFor } from '@testing-library/react';

import createOidcClient, { OidcClient, OidcClientProps, LoginProps } from '../client/oidcClient';
// eslint-disable-next-line jest/no-mocks-import
import openIdConfiguration from '../__mocks__/openIdConfiguration.json';
import { UserCreationProps, createSignInResponse } from './userTestUtil';

export type InitTestResult = {
  oidcClient: OidcClient;
  userManager: UserManager;
};

const authority = 'https://api.hel.fi/sso/openid';
const client_id = 'test-client';
const scope = 'openid profile';
const defaultOidcClientTestProps: OidcClientProps = {
  userManagerSettings: {
    authority,
    client_id,
    scope,
  },
};

export function getDefaultOidcClientTestProps(): OidcClientProps {
  return { ...defaultOidcClientTestProps };
}

function getPrivateUserManagerClient(userManager: UserManager): OidcClientFromNpm {
  const client = ((userManager as unknown) as {
    _client: OidcClientFromNpm;
  })._client;

  return client;
}

export function mockSignInResponse(userManager: UserManager, userProps: UserCreationProps = {}): SigninResponse {
  const client = getPrivateUserManagerClient(userManager);
  const response = createSignInResponse(userProps);
  jest.spyOn(client, 'processSigninResponse').mockImplementation(() => Promise.resolve(response));
  return response;
}

export function createOidcClientTestSuite() {
  let oidcClient: OidcClient;
  let userManager: UserManager;

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
      ...defaultOidcClientTestProps,
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

  const getDefaultOidcClientProps = () => defaultOidcClientTestProps;

  return {
    initTests,
    waitForLoginToTimeout,
    cleanUp,
    getOidcClient,
    getUserManager,
    getDefaultOidcClientProps,
    setSignInResponse: (userProps?: UserCreationProps) => {
      return mockSignInResponse(userManager, userProps);
    },
  };
}
