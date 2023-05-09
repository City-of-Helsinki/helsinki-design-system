import { UserManager, SigninResponse } from 'oidc-client-ts';

import { getPrivateUserManagerClient } from './oidcClientTestUtil';
import { raiseTokenExpiringEvent, raiseUserUnloadedEvent } from './userTestUtil';

export function mockUserManagerRefreshResponse(
  userManager: UserManager,
  response: SigninResponse | Error,
  delay?: number,
) {
  const client = getPrivateUserManagerClient(userManager);
  const fulfillmentListener = jest.fn();
  jest.spyOn(client, 'useRefreshToken').mockImplementationOnce(() => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (response instanceof Error) {
          reject(response);
        } else {
          resolve(response);
        }
        if (fulfillmentListener) {
          fulfillmentListener(response);
        }
      }, delay || 1);
    });
  });
  return fulfillmentListener;
}

export function createRenewalTestUtil() {
  const expiringListener = jest.fn();
  const userLoadedListener = jest.fn();
  const silentRenewErrorListener = jest.fn();

  const reset = () => {
    expiringListener.mockReset();
    userLoadedListener.mockReset();
    silentRenewErrorListener.mockReset();
  };

  const init = ({ userManager }: { userManager: UserManager }) => {
    userManager.events.addAccessTokenExpiring(expiringListener);
    userManager.events.addUserLoaded(userLoadedListener);
    userManager.events.addSilentRenewError(silentRenewErrorListener);
    const removeListeners = () => {
      userManager.events.removeAccessTokenExpiring(expiringListener);
      userManager.events.removeUserLoaded(userLoadedListener);
      userManager.events.removeSilentRenewError(silentRenewErrorListener);
    };

    const setListenerToRefreshResponse = (response: SigninResponse | Error, delay?: number | undefined) => {
      return mockUserManagerRefreshResponse(userManager, response, delay);
    };

    const raiseExpiringEvent = () => {
      raiseTokenExpiringEvent(userManager);
    };
    const raiseUnloadedEvent = () => {
      raiseUserUnloadedEvent(userManager);
    };

    return {
      removeListeners,
      setListenerToRefreshResponse,
      raiseExpiringEvent,
      raiseUnloadedEvent,
      getListener: (type: 'expiring' | 'userLoaded' | 'error') => {
        if (type === 'expiring') {
          return expiringListener;
        }
        if (type === 'userLoaded') {
          return userLoadedListener;
        }
        return silentRenewErrorListener;
      },
    };
  };

  return {
    init,
    reset,
  };
}
