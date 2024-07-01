import React from 'react';
import { render, fireEvent, act } from '@testing-library/react';

import { Beacon, ConnectedModule } from '../../../login/beacon/beacon';
import { oidcClientNamespace, OidcClient } from '../../../login/client';
import { LoginContextProvider } from '../../../login/components/LoginContext';
import { getDefaultOidcClientTestProps } from '../../../login/testUtils/oidcClientTestUtil';
import {
  createTimedPromise,
  advanceUntilDoesNotThrow,
  advanceUntilPromiseResolved,
} from '../../../login/testUtils/timerTestUtil';
import { Header } from '../../Header';
import { createUserAndPlaceUserToStorage } from '../../../login/testUtils/userTestUtil';
import { HeaderLoginButtonProps } from './HeaderLoginButton';
import { HeaderLogoutSubmenuButtonProps } from './HeaderLogoutSubmenuButton';
import { Profile } from '../../../login';

export const jestHelpers = {
  beforeEach: () => {
    jest.useFakeTimers();
  },
  afterEach: () => {
    jest.runOnlyPendingTimers();
    jest.useRealTimers();
    jest.restoreAllMocks();
    sessionStorage.clear();
  },
};

export function initTests(
  props: HeaderLoginButtonProps | HeaderLogoutSubmenuButtonProps | Record<string, unknown>,
  Component: (
    props: HeaderLoginButtonProps | HeaderLogoutSubmenuButtonProps | Record<string, unknown>,
  ) => React.ReactElement,
  isUserAuthenticated: boolean,
  user?: Partial<Profile>,
) {
  const loginProps = getDefaultOidcClientTestProps();
  loginProps.userManagerSettings.automaticSilentRenew = false;

  let beacon: Beacon;
  const renderComponent = () => {
    const helperModule: ConnectedModule = {
      namespace: 'helper',
      connect: (targetBeacon) => {
        beacon = targetBeacon;
      },
    };
    const result = render(
      <Header>
        <LoginContextProvider loginProps={loginProps} modules={[helperModule]}>
          <div id="root">
            <Component {...props} />
          </div>
        </LoginContextProvider>
        ,
      </Header>,
    );
    const getButtonElement = () => {
      return result.container.querySelector(`#${props.id}`) as HTMLButtonElement;
    };
    const getErrorElement = () => {
      return result.getByRole('alert') as HTMLElement;
    };
    const getLoadIndicator = () => {
      const loadingText =
        (props as HeaderLoginButtonProps).loggingInText || (props as HeaderLogoutSubmenuButtonProps).loggingOutText;
      return result.getByText(loadingText) as HTMLElement;
    };
    const getErrorElementButton = () => {
      return getErrorElement().querySelector('button');
    };
    const getUserMenuButton = () => {
      return result.container.querySelector(`#root > div:first-child button`) as HTMLButtonElement;
    };
    const getFocusShifter = () => {
      const errorNotification = getErrorElement();
      const closeButtons = Array.from(
        result.container.querySelectorAll(`button[aria-label="${props.errorCloseAriaLabel}"]`),
      );
      const focusShifterButton = closeButtons.filter((btn) => !errorNotification.contains(btn))[0];
      return focusShifterButton || null;
    };
    return {
      ...result,
      getButtonElement,
      getErrorElement,
      getErrorElementButton,
      getFocusShifter,
      getLoadIndicator,
      getUserMenuButton,
    };
  };

  const spyOnOidcClientLogin = (reject: boolean) => {
    const oidcClient = beacon.getSignalContext(oidcClientNamespace) as OidcClient;
    const userManager = oidcClient.getUserManager();
    const promise = createTimedPromise(reject ? new Error('Login failed') : null);
    const mock = jest.fn().mockReturnValue(promise);
    userManager.signinRedirect = mock;
    return { mock, promise };
  };

  const spyOnOidcClientLogout = (reject: boolean) => {
    const oidcClient = beacon.getSignalContext(oidcClientNamespace) as OidcClient;
    const userManager = oidcClient.getUserManager();
    const { metadataService } = oidcClient.getUserManager();
    const promise = createTimedPromise(reject ? new Error('Login failed') : null);
    const mock = jest.fn().mockReturnValue(promise);
    userManager.signoutRedirect = mock;
    metadataService.getEndSessionEndpoint = mock;
    return { mock, promise };
  };

  const clickAndAdvanceUntilErrorShown = async (result: ReturnType<typeof renderComponent>, login: boolean) => {
    const { getButtonElement, getErrorElement, getLoadIndicator } = result;
    expect(getErrorElement).toThrow();
    expect(getLoadIndicator).toThrow();
    getButtonElement().focus();
    const { mock, promise } = login ? spyOnOidcClientLogin(true) : spyOnOidcClientLogout(true);
    act(() => {
      fireEvent.click(getButtonElement());
    });
    expect(mock).toHaveBeenCalledTimes(1);

    await advanceUntilDoesNotThrow(() => {
      expect(getLoadIndicator).toThrow();
      expect(getErrorElement()).not.toBeNull();
    });
    await advanceUntilPromiseResolved(promise);
    return result;
  };

  const setUser = () => {
    const signInResponseProfileProps = {
      name: 'Authenticated User',
      email: 'email@domain.com',
      given_name: 'FirstName',
      family_name: 'LastName',
      ...user,
    };
    createUserAndPlaceUserToStorage(loginProps.userManagerSettings, { signInResponseProfileProps });
  };

  if (isUserAuthenticated) {
    setUser();
  }

  const result = renderComponent();

  return {
    ...result,
    setUser,
    clickAndAdvanceUntilErrorShown,
    spyOnOidcClientLogin,
    spyOnOidcClientLogout,
  };
}
