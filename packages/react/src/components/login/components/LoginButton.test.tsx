import React from 'react';
import { render, screen, fireEvent, act } from '@testing-library/react';
import { disableFetchMocks, enableFetchMocks } from 'jest-fetch-mock';

import { getDefaultOidcClientTestProps } from '../testUtils/oidcClientTestUtil';
import { LoginContextProvider } from './LoginContext';
import { LoginButton, LoginButtonProps } from './LoginButton';
import { Beacon, ConnectedModule } from '../beacon/beacon';
import { OidcClient, oidcClientNamespace } from '../client';
import { advanceUntilDoesNotThrow, createTimedPromise } from '../testUtils/timerTestUtil';
import { ButtonVariant } from '../../button/Button';

const loginProps = getDefaultOidcClientTestProps();
loginProps.userManagerSettings.automaticSilentRenew = false;

const buttonText = 'Log in';
const props: Omit<LoginButtonProps, 'children'> = {
  errorText: 'Cannot login',
  variant: ButtonVariant.Danger,
  loggingInText: 'Logging in',
  redirectionProps: { language: 'de', extraQueryParams: { extra: 'extra' } },
};

beforeEach(() => {
  jest.useFakeTimers();
});
afterEach(async () => {
  await act(async () => {
    jest.runOnlyPendingTimers();
  });
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
  const renderComponent = async (extraProps?: Partial<LoginButtonProps>) => {
    const helperModule: ConnectedModule = {
      namespace: 'helper',
      connect: (targetBeacon) => {
        beacon = targetBeacon;
      },
    };
    let result: ReturnType<typeof render>;
    await act(async () => {
      result = render(
        <LoginContextProvider loginProps={loginProps} modules={[helperModule]}>
          <div id="root">
            <p>Some content</p>
            <LoginButton {...({ ...props, ...extraProps } as LoginButtonProps)}>{buttonText}</LoginButton>
          </div>
        </LoginContextProvider>,
      );
    });
    return result!;
  };

  const getButtonElement = () => (screen.getByText(buttonText) as HTMLElement).parentNode as HTMLElement;
  const getErrorElement = () => screen.getAllByText(props.errorText)[0] as HTMLElement;
  const spyOnOidcClientLogin = (reject: boolean) => {
    const oidcClient = beacon.getSignalContext(oidcClientNamespace) as OidcClient;
    const promise = createTimedPromise(reject ? new Error('Login failed') : null);
    return jest.spyOn(oidcClient.getUserManager(), 'signinRedirect').mockResolvedValue(promise as Promise<void>);
  };

  it('the button text is rendered', async () => {
    await renderComponent();
    expect(getButtonElement()).toMatchSnapshot();
  });
  it('Click calls oidcClient.login() and error is not visible', async () => {
    await renderComponent();
    const spy = spyOnOidcClientLogin(false);
    fireEvent.click(getButtonElement());
    expect(spy).toHaveBeenCalledTimes(1);
    expect(getErrorElement).toThrow();
  });
  it('Given redirectionParams are appended. "language" is converted in oidcClient to "ui_locales"', async () => {
    await renderComponent();
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
    await renderComponent({ onClick });
    const spy = spyOnOidcClientLogin(false);
    fireEvent.click(getButtonElement());
    expect(spy).toHaveBeenCalledTimes(1);
    expect(onClick).toHaveBeenCalledTimes(1);
    expect(getErrorElement).toThrow();
  });
  it('when error occurs the error text is shown', async () => {
    await renderComponent();
    const spy = spyOnOidcClientLogin(true);
    fireEvent.click(getButtonElement());
    expect(spy).toHaveBeenCalledTimes(1);
    await advanceUntilDoesNotThrow(() => {
      expect(getErrorElement()).not.toBeNull();
    });
  });
});
