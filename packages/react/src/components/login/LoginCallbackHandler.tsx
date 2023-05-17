import React from 'react';
import { User } from 'oidc-client-ts';

import { useOidcClient } from './hooks';
import { OidcClientError } from './client/oidcClientError';

type Props = {
  children: React.ReactNode | React.ReactNode[] | null;
  onSuccess: (user: User) => void;
  onError: (error?: OidcClientError) => void;
};

export function LoginCallbackHandler({ children, onSuccess, onError }: Props): React.ReactElement | null {
  const { handleCallback, getState } = useOidcClient();
  // if this component is used inside a component that re-renders, for example after state change,
  // then handleCallback would be called twice without state check
  if (getState() === 'NO_SESSION') {
    handleCallback()
      .then((data) => {
        onSuccess(data);
      })
      .catch((err) => {
        onError(err);
      });
  }
  return <>{children}</>;
}
