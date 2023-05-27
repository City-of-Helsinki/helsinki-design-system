import React from 'react';

import { useAuthenticatedUser, useOidcClient, useSignalTrackingWithReturnValue } from './hooks';
import { triggerForAllOidcClientStateChanges, isLoggingInSignal } from './client/signals';
import { Button, ButtonProps } from '../button/Button';
import { LoadingSpinner } from '../loadingSpinner';

type LoginButtonProps = { spinnerColor?: string } & ButtonProps;
export function LoginButton({
  spinnerColor = '#fff',
  children,
  ...buttonProps
}: LoginButtonProps): React.ReactElement | null {
  const { login } = useOidcClient();
  const user = useAuthenticatedUser();
  const [lastSignal] = useSignalTrackingWithReturnValue(triggerForAllOidcClientStateChanges);
  const isLoggingIn = isLoggingInSignal(lastSignal);
  if (user) {
    return null;
  }
  // for some reason LoadingSpinner theme has no effect
  const iconLeft = isLoggingIn ? (
    <LoadingSpinner small style={{ '--spinner-color': spinnerColor } as React.HTMLProps<HTMLDivElement>['style']} />
  ) : undefined;
  const combinedButtonProps = { ...buttonProps, iconLeft, disabled: isLoggingIn, onClick: () => login() };
  return (
    <>
      <div>
        <Button {...combinedButtonProps}>{children}</Button>
      </div>
    </>
  );
}
