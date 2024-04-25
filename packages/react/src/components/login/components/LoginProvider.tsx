import React from 'react';

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

  const mods = modules || [];
  if (sessionPollerSettings) {
    mods.push(createSessionPoller(sessionPollerSettings));
  }
  if (apiTokensClientSettings) {
    mods.push(createApiTokenClient(apiTokensClientSettings));
  }
  return (
    <LoginContextProvider loginProps={loginProps} modules={mods}>
      {children}
    </LoginContextProvider>
  );
};
