import React from 'react';
import { render } from '@testing-library/react';

import { getDefaultOidcClientTestProps } from './testUtils/oidcClientTestUtil';
import { LoginContextProvider } from './LoginContext';
import { LoginCallbackHandler } from './LoginCallbackHandler';
import { Beacon, ConnectedModule } from './beacon/beacon';
import { OidcClient, OidcClientState, oidcClientStates } from './client';
import { getLastMockCallArgs } from '../../utils/testHelpers';
import { isValidUser } from './client/oidcClient';
import { triggerForAllOidcClientSignals } from './client/signals';
import { createUser } from './testUtils/userTestUtil';
import { OidcClientError } from './client/oidcClientError';

const loginProps = getDefaultOidcClientTestProps();
const onError = jest.fn();
const onSuccess = jest.fn();

beforeEach(() => {
  jest.useFakeTimers();
});
afterEach(() => {
  jest.runOnlyPendingTimers();
  jest.useRealTimers();
  jest.restoreAllMocks();
  sessionStorage.clear();
});

describe('LoginCallbackHandler', () => {
  const notificationText = 'Logging in...';
  let beacon: Beacon;
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
            jest.spyOn(oidcClient, 'handleCallback').mockRejectedValue(new Error('failed'));
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

  it('calls onSuccess with user object, if user already exists ', async () => {
    renderComponent(oidcClientStates.VALID_SESSION, true);
    expect(onSuccess).toHaveBeenCalledTimes(1);
    expect(isValidUser(getLastMockCallArgs(onSuccess)[0])).toBeTruthy();
  });
  it(`calls onError, if oidc client state is other than ${oidcClientStates.NO_SESSION} or ${oidcClientStates.VALID_SESSION} `, async () => {
    renderComponent(oidcClientStates.LOGGING_IN, true);
    expect(onError).toHaveBeenCalledTimes(1);
  });
  it('calls onSuccess when no session exists and handleCallback succeeds', async () => {
    renderComponent(oidcClientStates.NO_SESSION, true);
    expect(onSuccess).toHaveBeenCalledTimes(1);
    expect(isValidUser(getLastMockCallArgs(onSuccess)[0])).toBeTruthy();
  });
  it('calls onError when no session exists and handleCallback fails', async () => {
    renderComponent(oidcClientStates.NO_SESSION, false);
    expect(onError).toHaveBeenCalledTimes(1);
    expect((getLastMockCallArgs(onError)[0] as OidcClientError).isSignInError).toBeTruthy();
  });
});
