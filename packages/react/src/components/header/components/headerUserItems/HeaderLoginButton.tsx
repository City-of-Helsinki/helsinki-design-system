import React, { useEffect, useRef } from 'react';

import { useAuthenticatedUser, useOidcClient } from '../../../login/client/hooks';
import { useSignalTrackingWithReturnValue } from '../../../login/beacon/hooks';
import { triggerForAllOidcClientSignals, isSigninErroSignal } from '../../../login/client/signals';
import { IconSignin } from '../../../../icons';
import {
  HeaderActionBarItemButtonProps,
  HeaderActionBarItemButton,
} from '../headerActionBarItem/HeaderActionBarItemButton';
import { NotificationProps } from '../../../notification';
import { HeaderErrorFocusShifter } from '../headerError/HeaderErrorFocusShifter';
import { HeaderErrorUsageType, useHeaderError } from '../headerError/useHeaderError';
import { HeaderLoadIndicator } from '../headerLoadIndicator/HeaderLoadIndicator';
import { LoginProps } from '../../../login';

export type HeaderLoginButtonProps = {
  /**
   * Color of the loading spinner.
   * @default --header-spinner-color or --color-black-60
   */
  spinnerColor?: string;
  /**
   * Label shown in the error notification.
   */
  errorLabel: string;
  /**
   * Text shown in the error notification.
   */
  errorText: string;
  /**
   * Aria-label of the close button in the error notification.
   */
  errorCloseAriaLabel: string;
  /**
   * Position of the error notification.
   * @default 'top-right'
   */
  errorPosition?: NotificationProps['position'];
  /**
   * Screen reader text for the load indicator.
   */
  loggingInText: string;
  /**
   * The id attribute of the element.
   */
  id: string;
  /**
   * Properties appended to the url when redirecting.
   */
  redirectionProps?: LoginProps;
} & HeaderActionBarItemButtonProps;

/**
 * LoginButton handles the redirection to the OIDC server and also errors if the server rejects the request for OpenID configuration.
 * @param props HeaderLoginButtonProps
 */

export function HeaderLoginButton({
  spinnerColor = undefined,
  errorText,
  errorLabel,
  errorCloseAriaLabel,
  errorPosition,
  loggingInText,
  redirectionProps,
  ...buttonProps
}: HeaderLoginButtonProps): React.ReactElement | null {
  const { login, getState } = useOidcClient();
  const user = useAuthenticatedUser();
  const [lastSignal, resetLastSignal] = useSignalTrackingWithReturnValue(triggerForAllOidcClientSignals);
  const isLoggingIn = getState() === 'LOGGING_IN';
  const isLoggingOut = getState() === 'LOGGING_OUT';
  const { elementProps, triggerError } = useHeaderError({
    errorText,
    errorLabel,
    errorCloseAriaLabel,
    errorPosition,
    usage: HeaderErrorUsageType.Login,
  });
  // login can be started from elsewhere too. Ignore those
  const wasClicked = useRef(false);
  const isActive = isLoggingIn && wasClicked.current;

  useEffect(() => {
    if (lastSignal && isSigninErroSignal(lastSignal) && wasClicked.current) {
      triggerError();
      resetLastSignal();
    }
  }, [lastSignal]);

  if (user || isLoggingOut) {
    return null;
  }

  // for some reason LoadingSpinner theme has no effect
  const ActiveStateIcon = () => <HeaderLoadIndicator loadingText={loggingInText} spinnerColor={spinnerColor} />;

  const combinedButtonProps: HeaderActionBarItemButtonProps = {
    ...(buttonProps as HeaderActionBarItemButtonProps),
    ...elementProps,
    icon: isActive ? <ActiveStateIcon /> : <IconSignin />,
    'aria-label': isActive ? loggingInText : String(buttonProps.label),
    onClick: () => {
      if (!isLoggingIn) {
        wasClicked.current = true;
        login(redirectionProps).then(() => {
          wasClicked.current = false;
        });
      }
    },
  };
  return (
    <>
      <HeaderActionBarItemButton {...combinedButtonProps} />
      <HeaderErrorFocusShifter />
    </>
  );
}
