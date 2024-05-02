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
import { ApiTokenClient, apiTokensClientNamespace } from '../apiTokensClient';
import {
  ApiTokensEventSignal,
  isApiTokensRemovedSignal,
  isApiTokensRenewalStartedSignal,
  isApiTokensUpdatedSignal,
} from '../apiTokensClient/signals';
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

  const fetchAborter = createFetchAborter();
  let queryPromise: Promise<ApolloQueryResult<Q>> | undefined;
  let client: ApolloClient<T> | undefined = graphQLClient;

  let state: GraphQLModuleState = graphQLModuleStates.IDLE;
  let result: ApolloQueryResult<Q> | undefined;
  let error: GraphQLModuleError | undefined;
  let apiTokensHaveBeenLoadedOnce: boolean = false;
  let lastApiTokensSignal: ApiTokensEventSignal | null = null;
  const emptyPromiseCatcher = () => {
    // just catching to avoid "unhandled promise" exception
  };

  const getData: GraphQLModule<T, Q>['getData'] = () => {
    return result ? result.data : undefined;
  };

  const handleQueryPromise = (promise: Promise<ApolloQueryResult<Q>>) => {
    queryPromise = promise;
    promise
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
          error = new GraphQLModuleError('LOAD_FAILED', 'LOAD_FAILED', queryError);
          dedicatedBeacon.emitError(error);
        }
      });
    return promise;
  };

  const waitForApiTokens: GraphQLModule['waitForApiTokens'] = async (timeout = 0) => {
    // store last apitoken signal?
    let timeOutId: ReturnType<typeof setTimeout> | null = null;
    const signalPromise = waitForSignals(dedicatedBeacon as unknown as Beacon, ['dd'], { rejectOn: ['fdf'] });

    const timeoutPromise = timeout
      ? new Promise((resolve, reject) => {
          timeOutId = setTimeout(() => {
            reject(new Error('Timeout for waitForApiTokens() reached'));
            timeOutId = null;
          }, timeout);
        })
      : null;

    return timeoutPromise
      ? Promise.race([signalPromise, timeoutPromise])
          .finally(() => {
            if (timeOutId) {
              clearTimeout(timeOutId);
              timeOutId = null;
            }
          })
          .catch(emptyPromiseCatcher)
      : signalPromise.catch(emptyPromiseCatcher);
  };

  const areApiTokensValid = () => {
    if (!lastApiTokensSignal) {
      return apiTokensHaveBeenLoadedOnce;
    }
    return isApiTokensUpdatedSignal(lastApiTokensSignal);
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

    if (mergedOptions.requireApiTokens && apiTokensHaveBeenLoadedOnce && !areApiTokensValid()) {
      await waitForApiTokens(options.apiTokensWaitTime);
    }

    const queryDocument = props.query || query;
    if (!queryDocument) {
      return Promise.reject(new Error('No query document (TypedDocumentNode)'));
    }

    try {
      /*
        add headers:
          const [loadData, { loading, data }] = useLazyQuery(Query, {
          context: { headers: { authorization: `Bearer ${token}` } }
      })
      */
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
      const promise = client.query<Q>(mergeProps());
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
    if (!result && !queryPromise && mergedOptions.autoFetch && apiTokensHaveBeenLoadedOnce) {
      queryExecutor();
    }
  };

  const apiTokensClientEventListener: SignalListener = (signal) => {
    apiTokensHaveBeenLoadedOnce = apiTokensHaveBeenLoadedOnce || isApiTokensUpdatedSignal(signal);
    if (isApiTokensRemovedSignal(signal) || isApiTokensRenewalStartedSignal(signal)) {
      //
    }
    lastApiTokensSignal = signal as ApiTokensEventSignal;
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
