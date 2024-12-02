import { ApolloCache, ApolloClient, from, HttpLink, InMemoryCache } from '@apollo/client/core';
import { setContext } from '@apollo/client/link/context';

import {
  ApolloClientModule,
  apolloClientModuleEvents,
  apolloClientModuleNamespace,
  ApolloClientModuleProps,
  defaultOptions,
} from '.';
import { createNamespacedBeacon } from '../beacon/signals';
import { createApiTokenClientTracker } from '../apiTokensClient/createApiTokenClientTracker';
import { createAuthLink } from './authLink';

/**
 * IMPORTANT NOTICE:
 *
 * Apollo HttpLink converts all header keys to lower-case by default.
 * To bypass this, the user has to provide a HttpLink and not to use options.uri, because HttpLink created here
 * does not change the default behaviour.
 *
 * Example: new HttpLink({ uri, preserveHeaderCase: true }
 *
 */
export function createApolloClientModule<T = InMemoryCache>(props: ApolloClientModuleProps<T>): ApolloClientModule<T> {
  // custom beacon for sending signals in apolloClientModuleNamespace
  const dedicatedBeacon = createNamespacedBeacon(apolloClientModuleNamespace);

  const mergedProps: ApolloClientModuleProps<T> = {
    ...defaultOptions,
    ...props,
  };

  const { clientOptions, keepTokensWhileRenewing, tokenSetter, apiTokensWaitTime, preventQueriesWhileRenewing } =
    mergedProps;

  // tool for waiting for apiTokens and stopping awaits
  const apiTokenTracker = createApiTokenClientTracker({ keepTokensWhileRenewing, timeout: apiTokensWaitTime });

  const { link, cache, uri, ...rest } = clientOptions;
  const links = [link || new HttpLink({ uri })];
  if (tokenSetter) {
    links.unshift(createAuthLink(tokenSetter, () => apiTokenTracker.getTokens()));
  }
  if (preventQueriesWhileRenewing) {
    links.unshift(
      setContext(async (_, previousContext) => {
        // waitForApiTokens() never rejects so not catching it.
        await apiTokenTracker.waitForApiTokens();
        return previousContext;
      }),
    );
  }

  const clientProps = {
    ...rest,
    cache: (cache || new InMemoryCache()) as ApolloCache<T>,
    link: from(links),
  };
  const client = new ApolloClient<T>(clientProps);

  return {
    namespace: apolloClientModuleNamespace,
    connect: (beacon) => {
      dedicatedBeacon.storeBeacon(beacon);
      apiTokenTracker.connect(beacon);
    },
    getClient: () => {
      return client;
    },
    getTracker: () => {
      return apiTokenTracker;
    },
    reset: async () => {
      dedicatedBeacon.emitEvent(apolloClientModuleEvents.APOLLO_CLIENT_MODULE_RESET);
      apiTokenTracker.dispose();
      client.stop();
      await client.resetStore();
    },
  };
}
