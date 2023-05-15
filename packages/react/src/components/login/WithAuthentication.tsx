import { User } from 'oidc-client-ts';
import React from 'react';

import { useAuthenticatedUser } from './hooks';

export function WithAuthentication({
  AuthorisedComponent,
  UnauthorisedComponent,
}: {
  AuthorisedComponent?: React.FC<{ user: User }>;
  UnauthorisedComponent?: React.FC<unknown>;
}): React.ReactElement | null {
  const user = useAuthenticatedUser();
  if (user && AuthorisedComponent) {
    return <AuthorisedComponent user={user} />;
  }
  if (!user && UnauthorisedComponent) {
    return <UnauthorisedComponent />;
  }
  return null;
}
