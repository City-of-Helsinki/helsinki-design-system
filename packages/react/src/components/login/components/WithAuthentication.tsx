import { User } from 'oidc-client-ts';
import React from 'react';

import { useAuthenticatedUser } from '../client/hooks';

type WithAuthenticationProps = {
  AuthorisedComponent?: React.FC<{ user: User }>;
  UnauthorisedComponent?: React.FC<unknown>;
};

/**
 * WithAuthentication renders components conditionally, depending on is user authenticated or not.
 * @param props  WithAuthenticationProps
 * @returns
 */

export function WithAuthentication({
  AuthorisedComponent,
  UnauthorisedComponent,
}: WithAuthenticationProps): React.ReactElement | null {
  const user = useAuthenticatedUser();
  if (user && AuthorisedComponent) {
    return <AuthorisedComponent user={user} />;
  }
  if (!user && UnauthorisedComponent) {
    return <UnauthorisedComponent />;
  }
  return null;
}
