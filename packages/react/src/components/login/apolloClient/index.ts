import { ApolloClient, InMemoryCache, ApolloClientOptions } from '@apollo/client/core';

import { TokenData } from '../apiTokensClient';
import { ApiTokenClientTracker } from '../apiTokensClient/createApiTokenClientTracker';
import { ConnectedModule } from '../beacon/beacon';

export type TokenSetter = (headers: Record<string, string>, tokens: TokenData) => Record<string, string>;

export type ApolloClientModule<T = InMemoryCache> = ConnectedModule & {
  /**
   * Returns the client.
   */
  getClient: () => ApolloClient<T>;
  /**
   * Returns the apiTokenClient tracker.
   */
  getTracker: () => ApiTokenClientTracker;
  /**
   * Resets the client and apiTokenTracker.
   */
  reset: () => Promise<void>;
};

export type ApolloClientModuleProps<T = InMemoryCache> = {
  /**
   * How long in milliseconds should api tokens be awaited before rejecting a query.
   * Default 15 000, set in createApiTokenClientTracker.
   */
  apiTokensWaitTime?: number;
  /**
   * Function to return tokens appended to the headers
   * @param headers Current headers in the request
   * @param tokens All tokens from the apiTokenClient
   */
  tokenSetter?: TokenSetter;
  /**
   * Options for the ApolloClient. If "uri" option is given, a HttpLink is automatically created from it.
   * The module adds its own AplloLink(s) before other links.
   * Default cache is InMemoryCache.
   */
  clientOptions: Partial<ApolloClientOptions<T>>;
  /**
   * If true, the stored api tokens are not cleared when renewal starts.
   * Default true, set in createApiTokenClientTracker.
   */
  keepTokensWhileRenewing?: boolean;
  /**
   * If true, a ApolloLink is added to wait for possible api token renewal to end.
   * If false, there might be times when queries are made with old api tokens. Unlikely, but possible.
   * Default true.
   */
  preventQueriesWhileRenewing?: boolean;
};

export const apolloClientModuleEvents = {
  APOLLO_CLIENT_MODULE_RESET: 'APOLLO_CLIENT_MODULE_RESET',
} as const;

export type ApolloClientModuleEvent = keyof typeof apolloClientModuleEvents;

export const apolloClientModuleNamespace = 'apolloClient';

export const defaultOptions: Partial<ApolloClientModuleProps> = {
  preventQueriesWhileRenewing: true,
};
