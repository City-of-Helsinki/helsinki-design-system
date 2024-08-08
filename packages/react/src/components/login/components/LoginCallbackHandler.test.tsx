import React from 'react';
import { render, waitFor } from '@testing-library/react';
import { disableFetchMocks, enableFetchMocks } from 'jest-fetch-mock';

import { getDefaultOidcClientTestProps } from '../testUtils/oidcClientTestUtil';
import { LoginContextProvider } from './LoginContext';
import { LoginCallbackHandler } from './LoginCallbackHandler';
import { isHandlingLoginCallbackError } from './LoginCallbackHandler.util';
import { Beacon, ConnectedModule } from '../beacon/beacon';
import { OidcClient, OidcClientState, oidcClientStates } from '../client';
import { getLastMockCallArgs } from '../../../utils/testHelpers';
import { isValidUser } from '../client/oidcClient';
import { triggerForAllOidcClientSignals } from '../client/signals';
import { createUser } from '../testUtils/userTestUtil';
import { OidcClientError } from '../client/oidcClientError';

const loginProps = getDefaultOidcClientTestProps();
loginProps.userManagerSettings.automaticSilentRenew = false;

const onError = jest.fn();
const onSuccess = jest.fn();

const getLastError = () => getLastMockCallArgs(onError)[0];
const getReturnedUser = () => getLastMockCallArgs(onSuccess)[0];

beforeEach(() => {
  jest.useFakeTimers();
});
afterEach(() => {
  jest.runOnlyPendingTimers();
  jest.useRealTimers();
  jest.restoreAllMocks();
  onError.mockReset();
  onSuccess.mockReset();
  sessionStorage.clear();
});

beforeAll(() => {
  enableFetchMocks();
});

afterAll(() => {
  disableFetchMocks();
});

describe('LoginCallbackHandler', () => {
  const notificationText = 'Logging in...';
  let beacon: Beacon;
  const handleError = new Error('Handlecallback failed');
  const renderComponent = (state: OidcClientState, returnUser: boolean) => {
    const helperModule: ConnectedModule = {
      namespace: 'helper',
      connect: (targetBeacon) => {
        beacon = targetBeacon;
        beacon.addListener(triggerForAllOidcClientSignals, (signal) => {
          const validUser = createUser();
          const oidcClient = signal.context as OidcClient;
          jest.spyOn(oidcClient, 'getState').mockReturnValue(state);
          jest.spyOn(oidcClient, 'getUser').mockReturnValue(validUser);
          if (!returnUser) {
            jest.spyOn(oidcClient, 'handleCallback').mockRejectedValue(handleError);
          } else {
            jest.spyOn(oidcClient, 'handleCallback').mockResolvedValue(validUser);
          }
        });
      },
    };

    return render(
      <LoginContextProvider loginProps={loginProps} modules={[helperModule]}>
        <div id="root">
          <LoginCallbackHandler onError={onError} onSuccess={onSuccess}>
            <span>{notificationText}</span>
          </LoginCallbackHandler>
        </div>
      </LoginContextProvider>,
    );
  };

  it('calls onSuccess with user object, if user already exists', async () => {
    renderComponent(oidcClientStates.VALID_SESSION, true);
    await waitFor(() => {
      expect(onSuccess).toHaveBeenCalledTimes(1);
    });
    expect(isValidUser(getReturnedUser())).toBeTruthy();
  });
  it(`calls onError, if oidc client state is other than ${oidcClientStates.NO_SESSION} or ${oidcClientStates.VALID_SESSION} `, async () => {
    renderComponent(oidcClientStates.LOGGING_IN, true);
    await waitFor(() => {
      expect(onError).toHaveBeenCalledTimes(1);
    });
    const error = getLastError() as OidcClientError;
    expect(isHandlingLoginCallbackError(error)).toBeFalsy();
    expect(error.isInvalidUserError).toBeFalsy();
    expect(error.isRenewalError).toBeFalsy();
    expect(error.isSignInError).toBeTruthy();
  });
  it(`isHandlingLoginCallbackError returns true when error.type === SIGNING_ERROR and error.message is certain.`, async () => {
    renderComponent(oidcClientStates.HANDLING_LOGIN_CALLBACK, false);
    await waitFor(() => {
      expect(onError).toHaveBeenCalledTimes(1);
    });
    const error = getLastError() as OidcClientError;
    expect(isHandlingLoginCallbackError(error)).toBeTruthy();
    expect(error.isInvalidUserError).toBeFalsy();
    expect(error.isRenewalError).toBeFalsy();
    expect(error.isSignInError).toBeTruthy();
  });
  it('calls onSuccess when no session exists and handleCallback succeeds', async () => {
    renderComponent(oidcClientStates.NO_SESSION, true);
    await waitFor(() => {
      expect(onSuccess).toHaveBeenCalledTimes(1);
    });
    expect(isValidUser(getReturnedUser())).toBeTruthy();
  });
  it('calls onError when no session exists and handleCallback fails', async () => {
    renderComponent(oidcClientStates.NO_SESSION, false);
    await waitFor(() => {
      expect(onError).toHaveBeenCalledTimes(1);
    });
    expect(getLastError()).toBe(handleError);
  });
});
