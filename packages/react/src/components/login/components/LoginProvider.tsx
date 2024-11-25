import React, { useMemo } from 'react';

import { LoginContextProvider } from './LoginContext';
import { OidcClientProps } from '../client/index';
import { createSessionPoller, SessionPollerOptions } from '../sessionPoller/sessionPoller';
import { createApiTokenClient } from '../apiTokensClient/apiTokensClient';
import { ConnectedModule } from '../beacon/beacon';
import { ApiTokenClientProps } from '../apiTokensClient';

export type LoginProviderProps = {
  userManagerSettings: OidcClientProps['userManagerSettings'];
  apiTokensClientSettings?: ApiTokenClientProps;
  sessionPollerSettings?: SessionPollerOptions;
  debug?: boolean;
  modules?: ConnectedModule[];
};

/**
 * LoginProvider creates a React context and initialises all modules.
 * @param props LoginProviderProps
 * @returns
 */
export const LoginProvider = ({
  userManagerSettings,
  apiTokensClientSettings,
  sessionPollerSettings,
  debug,
  modules,
  children,
}: React.PropsWithChildren<LoginProviderProps>) => {
  const loginProps: OidcClientProps = {
    userManagerSettings: {
      ...userManagerSettings,
    },
    debug,
  };

  // Settings are not intentionally not used in memoization,
  // because they should not change in runtime and using them would require memoizing
  // them up in the component tree or memoization is useless.
  const mods = useMemo(() => {
    const currentMods = modules ? [...modules] : [];
    if (sessionPollerSettings) {
      currentMods.push(createSessionPoller(sessionPollerSettings));
    }
    if (apiTokensClientSettings) {
      currentMods.push(createApiTokenClient(apiTokensClientSettings));
    }
    return currentMods;
  }, [modules]);

  return (
    <LoginContextProvider loginProps={loginProps} modules={mods}>
      {children}
    </LoginContextProvider>
  );
};
