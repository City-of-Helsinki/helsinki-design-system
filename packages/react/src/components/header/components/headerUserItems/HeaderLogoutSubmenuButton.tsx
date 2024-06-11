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

export type HeaderLogoutSubmenuButtonProps = {
  spinnerColor?: string;
  errorLabel: string;
  errorText: string;
  errorCloseAriaLabel: string;
  errorPosition?: NotificationProps['position'];
  id: string;
  loggingOutText: string;
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
      wasClicked.current = true;
      logout().catch(() => {
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
