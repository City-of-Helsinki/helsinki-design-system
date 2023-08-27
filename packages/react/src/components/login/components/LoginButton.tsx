import React from 'react';

import { useAuthenticatedUser, useOidcClient } from '../client/hooks';
import { useSignalTrackingWithReturnValue } from '../beacon/hooks';
import {
  triggerForAllOidcClientStateChanges,
  isLoggingInSignal,
  triggerForAllOidcClientErrors,
} from '../client/signals';
import { Button, ButtonProps } from '../../button/Button';
import { LoadingSpinner } from '../../loadingSpinner';
import { IconAlertCircleFill } from '../../../icons/ui/IconAlertCircleFill';
import styles from './LoginButton.module.scss';

export type LoginButtonProps = { spinnerColor?: string; errorText: string } & ButtonProps;
/**
 * LoginButton handles the redirection to the OIDC server and also errors if the server rejects the request for OpenID configuration.
 * @param props LoginButtonProps
 */
export function LoginButton({
  spinnerColor = 'var(--color-white)',
  children,
  errorText,
  ...buttonProps
}: LoginButtonProps): React.ReactElement | null {
  const { login } = useOidcClient();
  const user = useAuthenticatedUser();
  const [lastSignal] = useSignalTrackingWithReturnValue(triggerForAllOidcClientStateChanges);
  const [loginError, resetLoginError] = useSignalTrackingWithReturnValue(triggerForAllOidcClientErrors);
  const isLoggingIn = isLoggingInSignal(lastSignal);
  if (user) {
    return null;
  }
  const isActive = isLoggingIn && !loginError;
  // for some reason LoadingSpinner theme has no effect
  const iconLeft = isActive ? (
    <LoadingSpinner small style={{ '--spinner-color': spinnerColor } as React.HTMLProps<HTMLDivElement>['style']} />
  ) : undefined;
  const combinedButtonProps = {
    ...buttonProps,
    iconLeft,
    disabled: isActive,
    onClick: () => {
      resetLoginError();
      login();
    },
  };
  return (
    <>
      <div className={styles.container}>
        <Button {...combinedButtonProps}>{children}</Button>
        {loginError && (
          <div className={styles.loginError}>
            <IconAlertCircleFill className={styles.icon} />
            <span className={styles.text}>{errorText}</span>
          </div>
        )}
      </div>
    </>
  );
}
