import React, { useMemo } from 'react';
import { InMemoryCache } from '@apollo/client/cache';
import { ApolloProvider } from '@apollo/client';

import { ApolloClientModuleProps } from '../apolloClient/index';
import { createApolloClientModule } from '../apolloClient/apolloClientModule';
import { LoginProvider, LoginProviderProps } from './LoginProvider';

export type LoginProviderWithApolloContextProps<T = InMemoryCache> = LoginProviderProps & {
  apolloClientSettings: ApolloClientModuleProps<T>;
};

/**
 * Renders LoginProvider with ApolloProvider. Creates an ApolloClientModule and appends it to modules.
 * @param props LoginProviderWithApolloContextProps
 */
export const LoginProviderWithApolloContext = ({
  apolloClientSettings,
  modules,
  children,
  ...rest
}: React.PropsWithChildren<LoginProviderWithApolloContextProps>) => {
  const mods = modules ? [...modules] : [];
  const apolloClient = useMemo(() => {
    return createApolloClientModule(apolloClientSettings);
  }, [apolloClientSettings]);
  mods.push(apolloClient);
  const client = apolloClient.getClient();
  return (
    <LoginProvider {...rest} modules={mods}>
      <ApolloProvider client={client}>{children}</ApolloProvider>
    </LoginProvider>
  );
};
