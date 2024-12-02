import { ApolloClient, InMemoryCache } from '@apollo/client';

import { useConnectedModule } from '../beacon/hooks';
import { ApolloClientModule, apolloClientModuleNamespace } from './index';

/**
 * Returns the ApolloClient module.
 * @returns ApolloClient
 */
export const useApolloClientModule = <T = InMemoryCache,>(): ApolloClientModule<T> => {
  const apolloClientModule = useConnectedModule<ApolloClientModule<T>>(apolloClientModuleNamespace);
  if (!apolloClientModule) {
    throw new Error('Cannot find apolloClientModule from LoginContext.');
  }
  return apolloClientModule;
};

/**
 * Returns the ApolloClient.
 * @returns ApolloClient
 */
export const useApolloClient = <T = InMemoryCache,>(): ApolloClient<T> => {
  const apolloClientModule = useApolloClientModule<T>();
  return apolloClientModule.getClient();
};
