import React, { useRef } from 'react';

import styles from './LoginButton.module.scss';
import { useAuthenticatedUser, useOidcClient } from '../client/hooks';
import { useSignalTrackingWithReturnValue } from '../beacon/hooks';
import {
  triggerForAllOidcClientStateChanges,
  isLoggingInSignal,
  triggerForAllOidcClientErrors,
} from '../client/signals';
import { Button, ButtonProps } from '../../button/Button';
import { LoadingSpinner } from '../../loadingSpinner';
import { IconAlertCircleFill } from '../../../icons';
import { Notification } from '../../notification';
import { LoginProps } from '../client';

export type LoginButtonProps = {
  /**
   * Color of the loading spinner.
   * @default --header-spinner-color or --color-black-60
   */
  spinnerColor?: string;
  /**
   * Text shown when login redirection fails
   */
  errorText: string;
  /**
   * Screen reader text for the load indicator.
   */
  loggingInText: string;
  /**
   * Properties appended to the url when redirecting.
   */
  redirectionProps?: LoginProps;
  /**
   * Called when the component is clicked and before the oidcClient.login() is called.
   */
  onClick?: ButtonProps['onClick'];
} & ButtonProps;
/**
 * LoginButton handles the redirection to the OIDC server and also errors if the server rejects the request for OpenID configuration.
 * @param props LoginButtonProps
 */
export function LoginButton({
  spinnerColor = 'var(--color-white)',
  children,
  errorText,
  loggingInText,
  redirectionProps,
  onClick,
  ...buttonProps
}: LoginButtonProps): React.ReactElement | null {
  const { login } = useOidcClient();
  const user = useAuthenticatedUser();
  const [lastSignal] = useSignalTrackingWithReturnValue(triggerForAllOidcClientStateChanges);
  const [loginError, resetLoginError] = useSignalTrackingWithReturnValue(triggerForAllOidcClientErrors);
  const isLoggingIn = isLoggingInSignal(lastSignal);
  // login can be started in Header (or elsewhere too)
  const wasClicked = useRef(false);
  if (user) {
    return null;
  }
  const isActive = isLoggingIn && wasClicked.current;
  // for some reason LoadingSpinner theme has no effect
  const iconStart = isActive ? (
    <LoadingSpinner
      small
      loadingText={loggingInText}
      loadingFinishedText=""
      style={{ '--spinner-color': spinnerColor } as React.HTMLProps<HTMLDivElement>['style']}
    />
  ) : undefined;
  const combinedButtonProps = {
    ...buttonProps,
    iconStart,
    disabled: isActive,
    onClick: (e) => {
      if (isLoggingIn) {
        return;
      }
      if (onClick) {
        onClick(e);
      }
      wasClicked.current = true;
      resetLoginError();
      login(redirectionProps).then(() => {
        wasClicked.current = false;
      });
    },
  };
  return (
    <div className={styles.container}>
      <Button {...combinedButtonProps}>{children}</Button>
      {loginError && (
        <div className={styles.loginError}>
          <IconAlertCircleFill className={styles.icon} />
          <span className={styles.text}>{errorText}</span>
          <Notification type="alert" invisible>
            {errorText}
          </Notification>
        </div>
      )}
    </div>
  );
}
