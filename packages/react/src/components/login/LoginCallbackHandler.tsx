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
  const { handleCallback } = useOidcClient();

  handleCallback()
    .then((data) => {
      onSuccess(data);
    })
    .catch((err) => {
      onError(err);
    });

  return <>{children}</>;
}
