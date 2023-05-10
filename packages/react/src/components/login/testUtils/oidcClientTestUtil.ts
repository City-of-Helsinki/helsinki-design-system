/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-underscore-dangle */
/* eslint-disable camelcase */
import { UserManager, OidcClient as OidcClientFromNpm, SigninResponse } from 'oidc-client-ts';
import fetchMock from 'jest-fetch-mock';
import { waitFor } from '@testing-library/react';

import { OidcClient, OidcClientProps, LoginProps, LogoutProps } from '../client/index';
import createOidcClient from '../client/oidcClient';
// eslint-disable-next-line jest/no-mocks-import
import openIdConfiguration from '../__mocks__/openIdConfiguration.json';
import { UserCreationProps, createSignInResponse, createUserAndPlaceUserToStorage } from './userTestUtil';
import { Beacon, ConnectedModule, createBeacon } from '../beacon/beacon';

export type InitTestResult = {
  oidcClient: OidcClient;
  userManager: UserManager;
  beacon?: Beacon;
};

export type InitTestProps = {
  modules?: ConnectedModule[];
  userProps?: UserCreationProps;
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

export function getPrivateUserManagerClient(userManager: UserManager): OidcClientFromNpm {
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
  let beacon: Beacon;

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

  // loginClient.logout redirects the browser.
  // The returned promise is never resolved.
  async function waitForLogoutToTimeout(logoutProps?: LogoutProps) {
    await expect(() => waitFor(() => oidcClient.logout(logoutProps), { timeout: 1000 })).rejects.toThrow();
  }

  const initTests = async (
    testProps: InitTestProps = {},
    additionalOidcClientProps?: Partial<OidcClientProps>,
  ): Promise<InitTestResult> => {
    const oidcClientProps = {
      ...defaultOidcClientTestProps,
      ...additionalOidcClientProps,
    };
    const { userProps, modules } = testProps;
    if (userProps) {
      createUserAndPlaceUserToStorage(oidcClientProps.userManagerSettings, userProps);
    }
    oidcClient = createOidcClient(oidcClientProps);
    userManager = oidcClient.getUserManager();
    if (modules) {
      beacon = createBeacon();
      modules.forEach((module) => {
        beacon.addSignalContext(module);
      });
      beacon.addSignalContext(oidcClient);
    }
    return { oidcClient, userManager, beacon };
  };

  const getOidcClient = () => oidcClient;
  const getUserManager = () => userManager;
  const getBeacon = () => beacon;

  const cleanUp = () => {
    if (beacon) {
      beacon.clear();
    }
    sessionStorage.clear();
    jest.restoreAllMocks();
  };

  const getDefaultOidcClientProps = () => defaultOidcClientTestProps;
  const placeUserToStorage = (
    userCreationProps?: UserCreationProps,
    userManagerSettings = defaultOidcClientTestProps.userManagerSettings,
  ) => createUserAndPlaceUserToStorage(userManagerSettings, userCreationProps);

  return {
    initTests,
    waitForLoginToTimeout,
    waitForLogoutToTimeout,
    cleanUp,
    getOidcClient,
    getUserManager,
    getBeacon,
    getDefaultOidcClientProps,
    setSignInResponse: (userProps?: UserCreationProps) => {
      return mockSignInResponse(userManager, userProps);
    },
    placeUserToStorage,
  };
}
