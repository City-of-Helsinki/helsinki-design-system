import React, { createContext, useMemo } from 'react';

import createOidcClient, { OidcClient, OidcClientProps } from './client/oidcClient';

type ContextProps = {
  children: React.ReactNode | React.ReactNode[] | null;
  loginProps: OidcClientProps;
};

export type LoginContextData = {
  getOidcClient: () => OidcClient;
};

export const LoginContext = createContext<LoginContextData>({
  getOidcClient: () => {
    throw new Error('LoginContext is not initialized');
  },
});

export const LoginContextProvider = (props: ContextProps): React.ReactElement => {
  const { children, loginProps } = props;
  const oidcClient = useMemo(() => {
    return createOidcClient({
      ...loginProps,
    });
  }, []);

  const contextData = {
    getOidcClient: () => {
      return oidcClient;
    },
  };

  return <LoginContext.Provider value={contextData}>{children}</LoginContext.Provider>;
};

export const { Consumer } = LoginContext;
