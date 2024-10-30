import React, { useRef } from 'react';

import { useOidcClient } from '../../../login/client/hooks';
import { useSignalTrackingWithReturnValue } from '../../../login/beacon/hooks';
import { triggerForAllOidcClientSignals } from '../../../login/client/signals';
import { IconSignout } from '../../../../icons';
import { HeaderActionBarItemButtonProps } from '../headerActionBarItem/HeaderActionBarItemButton';
import { NotificationProps } from '../../../notification';
import { HeaderActionBarSubItem, HeaderActionBarSubItemProps } from '../headerActionBarSubItem';
import { HeaderErrorFocusShifter } from '../headerError/HeaderErrorFocusShifter';
import { HeaderErrorUsageType, useHeaderError } from '../headerError/useHeaderError';
import { HeaderLoadIndicator } from '../headerLoadIndicator/HeaderLoadIndicator';
import { LogoutProps } from '../../../login';
import { useActiveLanguage } from '../../LanguageContext';

export type HeaderLogoutSubmenuButtonProps = {
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
  loggingOutText: string;
  /**
   * The id attribute of the element.
   */
  id: string;
  /**
   * Properties appended to the url when redirecting.
   */
  redirectionProps?: LogoutProps;
  /**
   * Should current Header language be appended to logout parameters
   */
  redirectWithLanguage?: boolean;
  /**
   * Called when the component is clicked and before the oidcClient.logout() is called.
   */
  onClick?: HeaderActionBarItemButtonProps['onClick'];
} & HeaderActionBarItemButtonProps;

/**
 * LoginButton handles the redirection to the OIDC server and also errors if the server rejects the request for OpenID configuration.
 * @param props HeaderLoginButtonProps
 */

export function HeaderLogoutSubmenuButton({
  spinnerColor = undefined,
  errorText,
  errorLabel,
  errorCloseAriaLabel,
  errorPosition,
  loggingOutText,
  redirectionProps,
  redirectWithLanguage,
  onClick,
  ...buttonProps
}: HeaderLogoutSubmenuButtonProps): React.ReactElement | null {
  const { triggerError, elementProps } = useHeaderError({
    usage: HeaderErrorUsageType.Logout,
    errorText,
    errorLabel,
    errorCloseAriaLabel,
    errorPosition,
  });
  // this ensures the component re-renders when login changes
  useSignalTrackingWithReturnValue(triggerForAllOidcClientSignals);
  const { logout, getState } = useOidcClient();
  const isLoggingOut = getState() === 'LOGGING_OUT';
  const wasClicked = useRef(false);
  const isActive = isLoggingOut && wasClicked.current;
  const language = useActiveLanguage();
  // for some reason LoadingSpinner theme has no effect
  const iconRight = isActive ? (
    <HeaderLoadIndicator loadingText={loggingOutText} spinnerColor={spinnerColor} />
  ) : (
    <IconSignout />
  );

  const combinedButtonProps: HeaderActionBarSubItemProps = {
    ...(buttonProps as HeaderLogoutSubmenuButtonProps),
    ...elementProps,
    iconRight,
    bold: true,
    onClick: (e: React.MouseEvent<HTMLButtonElement>) => {
      e.preventDefault();
      if (isLoggingOut) {
        return;
      }
      if (onClick) {
        onClick(e);
      }
      wasClicked.current = true;
      const logoutProps: LogoutProps = { ...redirectionProps };
      if (redirectWithLanguage && language) {
        logoutProps.language = language;
      }
      logout(logoutProps).catch(() => {
        wasClicked.current = false;
        triggerError();
      });
    },
  };

  return (
    <>
      <HeaderActionBarSubItem {...combinedButtonProps} />
      <HeaderErrorFocusShifter />
    </>
  );
}
