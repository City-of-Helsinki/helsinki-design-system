import { User } from 'oidc-client-ts';

import { UserReturnType, oidcClientNamespace, OidcClient } from '../client';
import { isValidUser } from '../client/oidcClient';
import { Signal } from './beacon';
import { getSignalEventPayload } from './signals';

export function getOidcClientFromSignal(signal: Signal): OidcClient | null {
  if (!signal.context || signal.context.namespace !== oidcClientNamespace || !(signal.context as OidcClient).getUser) {
    return null;
  }
  return signal.context as OidcClient;
}

export function getValidUserFromSignal(signal: Signal): UserReturnType {
  const payload = getSignalEventPayload(signal);
  if (payload && payload.data && isValidUser(payload.data as User)) {
    return payload.data as User;
  }
  const oidcClient = getOidcClientFromSignal(signal);
  if (!oidcClient) {
    return null;
  }
  const user = oidcClient.getUser();
  return isValidUser(user) ? (user as User) : null;
}
