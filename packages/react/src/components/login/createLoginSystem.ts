import { LoginProviderProps } from './LoginProvider';
import { createApiTokenClient } from './apiTokensClient/apiTokensClient';
import { Beacon, createBeacon } from './beacon/beacon';
import { emitInitializationSignals } from './beacon/signals';
import { OidcClientProps } from './client';
import { createOidcClient } from './client/oidcClient';
import { createSessionPoller } from './sessionPoller/sessionPoller';

export function createLoginSystem(props: Exclude<LoginProviderProps, 'children'>): Beacon {
  const { userManagerSettings, apiTokensClientSettings, sessionPollerSettings, debug, modules } = props;
  const loginProps: OidcClientProps = {
    userManagerSettings: {
      ...userManagerSettings,
    },
    debug,
  };

  const beacon = createBeacon();

  const oidcClient = createOidcClient({
    ...loginProps,
  });

  beacon.addSignalContext(oidcClient);

  if (sessionPollerSettings) {
    beacon.addSignalContext(createSessionPoller(sessionPollerSettings));
  }
  if (apiTokensClientSettings) {
    beacon.addSignalContext(createApiTokenClient(apiTokensClientSettings));
  }

  if (modules) {
    modules.forEach((module) => {
      beacon.addSignalContext(module);
    });
  }

  emitInitializationSignals(beacon);

  return beacon;
}
