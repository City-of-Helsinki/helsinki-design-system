import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { disableFetchMocks, enableFetchMocks } from 'jest-fetch-mock';

import { getDefaultOidcClientTestProps } from '../testUtils/oidcClientTestUtil';
import { LoginContextProvider } from './LoginContext';
import { LoginButton, LoginButtonProps } from './LoginButton';
import { Beacon, ConnectedModule } from '../beacon/beacon';
import { OidcClient, oidcClientNamespace } from '../client';
import { advanceUntilDoesNotThrow, createTimedPromise } from '../testUtils/timerTestUtil';

const loginProps = getDefaultOidcClientTestProps();
loginProps.userManagerSettings.automaticSilentRenew = false;

const buttonText = 'Log in';
const props: Omit<LoginButtonProps, 'children'> = {
  errorText: 'Cannot login',
  variant: 'danger',
  loggingInText: 'Logging in',
  redirectionProps: { language: 'de', extraQueryParams: { extra: 'extra' } },
};

beforeEach(() => {
  jest.useFakeTimers();
});
afterEach(() => {
  jest.runOnlyPendingTimers();
  jest.useRealTimers();
  jest.restoreAllMocks();
  sessionStorage.clear();
});

beforeAll(() => {
  enableFetchMocks();
});

afterAll(() => {
  disableFetchMocks();
});

describe('LoginButton', () => {
  let beacon: Beacon;
  const renderComponent = (extraProps?: Partial<LoginButtonProps>) => {
    const helperModule: ConnectedModule = {
      namespace: 'helper',
      connect: (targetBeacon) => {
        beacon = targetBeacon;
      },
    };
    return render(
      <LoginContextProvider loginProps={loginProps} modules={[helperModule]}>
        <div id="root">
          <p>Some content</p>
          <LoginButton {...({ ...props, ...extraProps } as LoginButtonProps)}>{buttonText}</LoginButton>
        </div>
      </LoginContextProvider>,
    );
  };

  const getButtonElement = () => (screen.getByText(buttonText) as HTMLElement).parentNode as HTMLElement;
  const getErrorElement = () => screen.getAllByText(props.errorText)[0] as HTMLElement;
  const spyOnOidcClientLogin = (reject: boolean) => {
    const oidcClient = beacon.getSignalContext(oidcClientNamespace) as OidcClient;
    const promise = createTimedPromise(reject ? new Error('Login failed') : null);
    return jest.spyOn(oidcClient.getUserManager(), 'signinRedirect').mockResolvedValue(promise as Promise<void>);
  };

  it('the button text is rendered', async () => {
    renderComponent();
    expect(getButtonElement()).toMatchSnapshot();
  });
  it('Click calls oidcClient.login() and error is not visible', async () => {
    renderComponent();
    const spy = spyOnOidcClientLogin(false);
    fireEvent.click(getButtonElement());
    expect(spy).toHaveBeenCalledTimes(1);
    expect(getErrorElement).toThrow();
  });
  it('Given redirectionParams are appended. "language" is converted in oidcClient to "ui_locales"', async () => {
    renderComponent();
    const spy = spyOnOidcClientLogin(false);
    fireEvent.click(getButtonElement());
    expect(spy).toHaveBeenCalledWith({
      extraQueryParams: {
        extra: 'extra',
        ui_locales: 'de',
      },
    });
    expect(getErrorElement).toThrow();
  });
  it('If onClick is set, it is called with the event when button is clicked', async () => {
    const onClick = jest.fn();
    renderComponent({ onClick });
    const spy = spyOnOidcClientLogin(false);
    fireEvent.click(getButtonElement());
    expect(spy).toHaveBeenCalledTimes(1);
    expect(onClick).toHaveBeenCalledTimes(1);
    expect(getErrorElement).toThrow();
  });
  it('when error occurs the error text is shown', async () => {
    renderComponent();
    const spy = spyOnOidcClientLogin(true);
    fireEvent.click(getButtonElement());
    expect(spy).toHaveBeenCalledTimes(1);
    await advanceUntilDoesNotThrow(() => {
      expect(getErrorElement()).not.toBeNull();
    });
  });
});
