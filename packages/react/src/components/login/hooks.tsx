import { useContext } from 'react';

import { isValidUser, OidcClient, UserReturnType } from './client/oidcClient';
import { LoginContext } from './LoginContext';

export const useOidcClient = (): OidcClient => {
  const { getOidcClient } = useContext(LoginContext);
  return getOidcClient();
};

export const useAuthenticatedUser = (): UserReturnType => {
  const client = useOidcClient();
  const user = client.getUser();
  if (!isValidUser(user)) {
    return null;
  }
  return user;
};
