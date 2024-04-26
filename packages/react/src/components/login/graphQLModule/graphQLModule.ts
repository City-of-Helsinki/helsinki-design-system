import { ApolloClient, ApolloError, ApolloQueryResult, OperationVariables, QueryOptions } from '@apollo/client/core';

import {
  GraphQLModuleModuleProps,
  GraphQLModule,
  GraphQLModuleState,
  graphQLModuleStates,
  GraphQLQueryResult,
  GraphQLCache,
  graphQLModuleNamespace,
  graphQLModuleEvents,
  defaultOptions,
} from '.';
import { Disposer, SignalListener } from '../beacon/beacon';
import { createEventTriggerProps, createInitTriggerProps, createNamespacedBeacon } from '../beacon/signals';
import { createFetchAborter, isAbortError } from '../utils/abortFetch';
import { ApiTokenClient, apiTokensClientNamespace } from '../apiTokensClient';
import { isApiTokensUpdatedSignal } from '../apiTokensClient/signals';
import { GraphQLModuleError } from './graphQLModuleError';

export function createGraphQLModule<T = GraphQLCache, Q = GraphQLQueryResult>({
  graphQLClient,
  query,
  queryOptions,
  options = {},
}: GraphQLModuleModuleProps<T, Q>): GraphQLModule<T, Q> {
  const mergedOptions = {
    ...defaultOptions,
    ...options,
  };

  const dedicatedBeacon = createNamespacedBeacon(graphQLModuleNamespace);
  const listenerDisposers: Disposer[] = [];

  const fetchAborter = createFetchAborter();
  let queryPromise: Promise<ApolloQueryResult<Q>> | undefined;
  let client: ApolloClient<T> | undefined = graphQLClient;

  let state: GraphQLModuleState = graphQLModuleStates.IDLE;
  let result: ApolloQueryResult<Q> | undefined;
  let error: GraphQLModuleError | undefined;
  let apiTokensAreLoaded: boolean = false;

  const isDisposed = () => {
    return state === graphQLModuleStates.DISPOSED;
  };

  const getData: GraphQLModule<T, Q>['getData'] = () => {
    return result ? result.data : undefined;
  };

  const handleQueryPromise = (promise: Promise<ApolloQueryResult<Q>>) => {
    queryPromise = promise;
    promise
      .then((queryResult: ApolloQueryResult<Q>) => {
        if (isDisposed()) {
          return;
        }
        result = queryResult;
        state = graphQLModuleStates.IDLE;
        dedicatedBeacon.emitEvent(graphQLModuleEvents.GRAPHQL_MODULE_LOAD_SUCCESS, getData());
        queryPromise = undefined;
      })
      .catch((queryError: ApolloError) => {
        if (isDisposed()) {
          return;
        }
        state = graphQLModuleStates.IDLE;
        queryPromise = undefined;
        if (isAbortError(queryError.networkError as Error)) {
          result = undefined;
          error = undefined;
          dedicatedBeacon.emitEvent(graphQLModuleEvents.GRAPHQL_MODULE_LOAD_ABORTED);
        } else {
          result = undefined;
          error = new GraphQLModuleError('LOAD_FAILED', 'LOAD_FAILED', queryError);
          dedicatedBeacon.emitError(error);
        }
      });
    return promise;
  };

  const queryExecutor: GraphQLModule<T, Q>['query'] = async (props = {}) => {
    if (isDisposed()) {
      return Promise.reject(new Error('GraphQLModule is disposed'));
    }
    // if aborting is not enabled and loading, return current promise
    if (queryPromise && !mergedOptions.abortIfLoading) {
      return queryPromise;
    }
    // wait for current promise to abort
    if (queryPromise) {
      fetchAborter.abort();
      await queryPromise.catch(() => {
        // just catching with this empty function
      });
    }
    if (props.graphQLClient) {
      client = props.graphQLClient;
    }
    if (!client) {
      return Promise.reject(new Error('No client defined'));
    }

    if (mergedOptions.requireApiTokens && !apiTokensAreLoaded) {
      return Promise.reject(new Error('Required apiTokens not loaded'));
    }

    const queryDocument = props.query || query;
    if (!queryDocument) {
      return Promise.reject(new Error('No query document (TypedDocumentNode)'));
    }

    try {
      const mergedProps: QueryOptions<OperationVariables, Q> = {
        query: queryDocument,
        ...{ ...queryOptions, ...props.queryOptions },
        context: {
          fetchOptions: {
            // getSignal() will abort previous signal
            signal: fetchAborter.getSignal(),
          },
        },
      };
      const promise = client.query<Q>(mergedProps);
      state = graphQLModuleStates.LOADING;
      dedicatedBeacon.emitEvent(graphQLModuleEvents.GRAPHQL_MODULE_LOADING);
      return handleQueryPromise(promise);
    } catch (e) {
      error = new GraphQLModuleError('LOAD_FAILED', 'LOAD_FAILED', e);
      dedicatedBeacon.emitError(error);
      return Promise.reject(e);
    }
  };

  const autoLoadWithApiTokens = () => {
    if (!result && !queryPromise && mergedOptions.autoFetch && apiTokensAreLoaded) {
      queryExecutor();
    }
  };

  const apiTokensClientEventListener: SignalListener = (signal) => {
    apiTokensAreLoaded = apiTokensAreLoaded || isApiTokensUpdatedSignal(signal);
    autoLoadWithApiTokens();
  };

  const apiTokensClientInitListener: SignalListener = (signal) => {
    const apiTokensClient = signal.context as ApiTokenClient;
    if (apiTokensClient && apiTokensClient.getTokens()) {
      apiTokensAreLoaded = true;
      autoLoadWithApiTokens();
    }
  };

  const connectToApiTokenClient = () => {
    if (mergedOptions.requireApiTokens) {
      listenerDisposers.push(
        dedicatedBeacon.addListener(createEventTriggerProps(apiTokensClientNamespace), apiTokensClientEventListener),
      );
      listenerDisposers.push(
        dedicatedBeacon.addListener(createInitTriggerProps(apiTokensClientNamespace), apiTokensClientInitListener),
      );
    }
  };

  return {
    namespace: 'graphQLModule',
    connect: (beacon) => {
      dedicatedBeacon.storeBeacon(beacon);
      connectToApiTokenClient();
    },
    getData,
    getError: () => {
      return error;
    },
    getResult: () => {
      return result;
    },
    isLoading: () => {
      return state === graphQLModuleStates.LOADING;
    },
    getState: () => {
      return state;
    },
    setClient: (newClient) => {
      client = newClient;
    },
    query: queryExecutor,
    getQueryPromise: () => {
      return queryPromise || Promise.reject(new Error(`No ${graphQLModuleNamespace} load promise`));
    },
    cancel: () => {
      queryPromise = undefined;
      return fetchAborter.abort();
    },
    clear: () => {
      state = graphQLModuleStates.DISPOSED;
      listenerDisposers.forEach((d) => d());
      listenerDisposers.length = 0;
      fetchAborter.abort();
      queryPromise = undefined;
      result = undefined;
      error = undefined;
      client = undefined;
    },
  };
}
