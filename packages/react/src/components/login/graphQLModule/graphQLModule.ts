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
import { Beacon, SignalListener } from '../beacon/beacon';
import {
  createEventTriggerProps,
  createInitTriggerProps,
  createNamespacedBeacon,
  waitForSignals,
} from '../beacon/signals';
import { createFetchAborter, isAbortError } from '../utils/abortFetch';
import { ApiTokenClient, apiTokensClientEvents, apiTokensClientNamespace } from '../apiTokensClient';
import {
  isApiTokensRemovedSignal,
  isApiTokensRenewalStartedSignal,
  isApiTokensUpdatedSignal,
} from '../apiTokensClient/signals';
import { graphQLModuleError, GraphQLModuleError } from './graphQLModuleError';

export function createGraphQLModule<T = GraphQLCache, Q = GraphQLQueryResult>({
  graphQLClient,
  query,
  queryOptions,
  options = {},
  queryHelper = (queryProps) => queryProps,
}: GraphQLModuleModuleProps<T, Q>): GraphQLModule<T, Q> {
  const mergedOptions = {
    ...defaultOptions,
    ...options,
  };

  // custom beacon for sending signals in graphQLModuleNamespace
  const dedicatedBeacon = createNamespacedBeacon(graphQLModuleNamespace);
  // abortController for requests
  const fetchAborter = createFetchAborter();
  // tools for waiting for apiTokens and stopping awaits
  let apiTokenAwaitPromise: Promise<unknown> | null;
  const signalTypeToRejectApiTokenAwait = 'REJECT_API_TOKEN_AWAIT';
  const emitApiTokenAwaitRejectionSignal = (targetBeacon?: Beacon) => {
    if (!apiTokenAwaitPromise) {
      return;
    }
    const beacon = targetBeacon || dedicatedBeacon.getBeacon();
    if (beacon) {
      beacon.emit({ type: signalTypeToRejectApiTokenAwait });
    }
  };

  // current promise for a query
  let queryPromise: Promise<ApolloQueryResult<Q>> | undefined;
  let client: ApolloClient<T> | undefined = graphQLClient;

  let state: GraphQLModuleState = graphQLModuleStates.IDLE;
  let result: ApolloQueryResult<Q> | undefined;
  let error: GraphQLModuleError | undefined;
  // if api tokens have been fetched once, no need to wait for initialization before quering
  let apiTokensHaveBeenLoadedOnce: boolean = false;

  const getApiTokensClient = () => {
    const beacon = dedicatedBeacon.getBeacon();
    return beacon ? (beacon.getSignalContext(apiTokensClientNamespace) as ApiTokenClient) : undefined;
  };
  const emptyPromiseCatcher = () => {
    // just catching to avoid "unhandled promise" exception
  };

  const getData: GraphQLModule<T, Q>['getData'] = () => {
    return result ? result.data : undefined;
  };

  const handleQueryPromise = (promise: Promise<ApolloQueryResult<Q>>) => {
    if (queryPromise) {
      throw new Error('queryPromise already exists');
    }
    queryPromise = promise;
    queryPromise
      .then((queryResult: ApolloQueryResult<Q>) => {
        result = queryResult;
        state = graphQLModuleStates.IDLE;
        dedicatedBeacon.emitEvent(graphQLModuleEvents.GRAPHQL_MODULE_LOAD_SUCCESS, getData());
        queryPromise = undefined;
      })
      .catch((queryError: ApolloError) => {
        state = graphQLModuleStates.IDLE;
        queryPromise = undefined;
        if (isAbortError(queryError.networkError as Error)) {
          result = undefined;
          error = undefined;
          dedicatedBeacon.emitEvent(graphQLModuleEvents.GRAPHQL_MODULE_LOAD_ABORTED);
        } else {
          result = undefined;
          error = new GraphQLModuleError('Graphql query failed', graphQLModuleError.GRAPHQL_LOAD_FAILED, queryError);
          dedicatedBeacon.emitError(error);
        }
      });
    return queryPromise;
  };

  const waitForApiTokens: GraphQLModule['waitForApiTokens'] = async (timeout = 0) => {
    if (apiTokenAwaitPromise) {
      return apiTokenAwaitPromise;
    }
    let timeOutId: ReturnType<typeof setTimeout> | null = null;
    const beacon = dedicatedBeacon.getBeacon() as Beacon;
    if (!beacon) {
      return Promise.reject(new Error('No Beacon found'));
    }

    apiTokenAwaitPromise = null;
    const signalPromise = waitForSignals(
      dedicatedBeacon.getBeacon() as Beacon,
      [apiTokensClientEvents.API_TOKENS_UPDATED],
      { rejectOn: [graphQLModuleEvents.GRAPHQL_MODULE_CLEARED, signalTypeToRejectApiTokenAwait] },
    );

    const timeoutPromise = timeout
      ? new Promise((resolve, reject) => {
          timeOutId = setTimeout(() => {
            reject(new Error('Timeout for waitForApiTokens() reached'));
            timeOutId = null;
          }, timeout);
        })
      : null;

    apiTokenAwaitPromise = timeoutPromise
      ? Promise.race([signalPromise, timeoutPromise])
      : signalPromise
          .finally(() => {
            if (timeOutId) {
              clearTimeout(timeOutId);
              timeOutId = null;
            }
            apiTokenAwaitPromise = null;
          })
          .catch(emptyPromiseCatcher);

    return apiTokenAwaitPromise;
  };

  const doApiTokensExist = () => {
    const apiTokenClient = getApiTokensClient();
    return !!apiTokenClient && !!apiTokenClient.getTokens();
  };

  const queryExecutor: GraphQLModule<T, Q>['query'] = async (props = {}) => {
    // if aborting is not enabled and loading, return current promise
    if (queryPromise && !mergedOptions.abortIfLoading) {
      return queryPromise;
    }
    // wait for current promise to abort
    if (queryPromise) {
      fetchAborter.abort();
      await queryPromise.catch(emptyPromiseCatcher);
    }
    if (props.graphQLClient) {
      client = props.graphQLClient;
    }
    if (!client) {
      return Promise.reject(new Error('No client defined'));
    }

    if (mergedOptions.requireApiTokens && !apiTokensHaveBeenLoadedOnce) {
      return Promise.reject(new Error('Required apiTokens not loaded'));
    }

    if (mergedOptions.requireApiTokens && apiTokensHaveBeenLoadedOnce && !doApiTokensExist()) {
      // this might reject!
      await waitForApiTokens(options.apiTokensWaitTime);
    }

    const queryDocument = props.query || query;
    if (!queryDocument) {
      return Promise.reject(new Error('No query document (TypedDocumentNode)'));
    }

    try {
      const mergeProps = (): QueryOptions<OperationVariables, Q> => {
        const context: QueryOptions['context'] = {
          ...queryOptions?.context,
          ...props.queryOptions?.context,
        };
        if (!context.fetchOptions) {
          context.fetchOptions = {};
        }
        context.fetchOptions.signal = fetchAborter.getSignal();
        return {
          query: queryDocument,
          ...{ ...queryOptions, ...props.queryOptions },
          context,
        };
      };
      const promise = client.query<Q>(queryHelper(mergeProps(), getApiTokensClient(), dedicatedBeacon.getBeacon()));
      state = graphQLModuleStates.LOADING;
      dedicatedBeacon.emitEvent(graphQLModuleEvents.GRAPHQL_MODULE_LOADING);
      return handleQueryPromise(promise);
    } catch (e) {
      error = new GraphQLModuleError('Graphql query failed', graphQLModuleError.GRAPHQL_LOAD_FAILED, e);
      dedicatedBeacon.emitError(error);
      return Promise.reject(e);
    }
  };

  const autoLoadWithApiTokens = async () => {
    if (!result && !queryPromise && mergedOptions.autoFetch && apiTokensHaveBeenLoadedOnce) {
      await queryExecutor().catch(emptyPromiseCatcher);
    }
  };

  const apiTokensClientEventListener: SignalListener = (signal) => {
    apiTokensHaveBeenLoadedOnce = apiTokensHaveBeenLoadedOnce || isApiTokensUpdatedSignal(signal);
    if (isApiTokensRemovedSignal(signal) || isApiTokensRenewalStartedSignal(signal)) {
      //
    }
    autoLoadWithApiTokens();
  };

  const apiTokensClientInitListener: SignalListener = (signal) => {
    const apiTokensClient = signal.context as ApiTokenClient;
    if (apiTokensClient && apiTokensClient.getTokens()) {
      apiTokensHaveBeenLoadedOnce = true;
      autoLoadWithApiTokens();
    }
  };

  const connectToApiTokenClient = () => {
    if (mergedOptions.requireApiTokens) {
      dedicatedBeacon.addListener(createEventTriggerProps(apiTokensClientNamespace), apiTokensClientEventListener);
      dedicatedBeacon.addListener(createInitTriggerProps(apiTokensClientNamespace), apiTokensClientInitListener);
    }
  };

  const injectQueryOptions = (
    extraOptions: Partial<QueryOptions<Q>>,
    props: Partial<GraphQLModuleModuleProps<T, Q>> = {},
  ) => {
    const mergeResult = { ...props };
    mergeResult.queryOptions = { ...mergeResult.queryOptions, ...extraOptions };
    return mergeResult;
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
    getClientErrors: () => {
      if (error && error.originalError) {
        return [error.originalError as ApolloError];
      }
      if (result) {
        if (result.errors) {
          return result.errors as unknown as ApolloError[];
        }
        if (result.error) {
          return [result.error];
        }
      }
      return [];
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
      emitApiTokenAwaitRejectionSignal();
      fetchAborter.abort();
    },
    clear: () => {
      emitApiTokenAwaitRejectionSignal();
      fetchAborter.abort();
      queryPromise = undefined;
      result = undefined;
      error = undefined;
      dedicatedBeacon.emitEvent(graphQLModuleEvents.GRAPHQL_MODULE_CLEARED);
    },
    waitForApiTokens,
    queryCache: (props) => {
      return queryExecutor(injectQueryOptions({ fetchPolicy: 'cache-only' }, props));
    },
    queryServer: (props) => {
      return queryExecutor(injectQueryOptions({ fetchPolicy: 'network-only' }, props));
    },
  };
}
