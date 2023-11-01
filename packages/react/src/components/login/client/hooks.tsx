import { useContext, useState } from 'react';

import { Amr, OidcClient, UserReturnType, oidcClientNamespace } from './index';
import { isValidUser } from './oidcClient';
import { triggerForAllOidcClientSignals } from './signals';
import { LoginContext } from '../components/LoginContext';
import { useSignalTrackingWithReturnValue } from '../beacon/hooks';
import { Signal } from '../beacon/beacon';

export const useOidcClient = (): OidcClient => {
  const { getModule } = useContext(LoginContext);
  return getModule(oidcClientNamespace);
};

export const useAuthenticatedUser = (): UserReturnType => {
  const client = useOidcClient();
  const user = client.getUser();
  if (!isValidUser(user)) {
    return null;
  }
  return user;
};

export const useCachedAmr = (): Amr | undefined => {
  const client = useOidcClient();
  const [cachedAmr] = useState<Amr | undefined>(() => client.getAmr());
  return cachedAmr;
};

export const useOidcClientTracking = (): [Signal | undefined, () => void, OidcClient] => {
  const client = useOidcClient();
  return [...useSignalTrackingWithReturnValue(triggerForAllOidcClientSignals), client];
};
