import { useContext } from 'react';

import { OidcClient } from './client/oidcClient';
import { LoginContext } from './LoginContext';

export const useOidcClient = (): OidcClient => {
  const { getOidcClient } = useContext(LoginContext);
  return getOidcClient();
};
