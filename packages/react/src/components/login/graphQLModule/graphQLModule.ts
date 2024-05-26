import { ApolloClient, ApolloError, ApolloQueryResult, QueryOptions } from '@apollo/client/core';

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
import { isApiTokensRemovedSignal, isApiTokensUpdatedSignal } from '../apiTokensClient/signals';
import { graphQLModuleError, GraphQLModuleError } from './graphQLModuleError';
import { appendFetchOptions, mergeQueryOptionModifiers } from './utils';
import { cloneObject } from '../../../utils/cloneObject';

export function createGraphQLModule<Q = GraphQLQueryResult, T = GraphQLCache>({
  graphQLClient,
  query,
  queryOptions,
  options = {},
  queryHelper,
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
  const emitApiTokenAwaitRejectionSignal = () => {
    if (!apiTokenAwaitPromise) {
      return;
    }
    const beacon = dedicatedBeacon.getBeacon();
    if (beacon) {
      beacon.emit({ type: signalTypeToRejectApiTokenAwait });
    }
  };

  // current promise for a query
  let queryPromise: Promise<ApolloQueryResult<Q>> | undefined;
  // store client
  let client: ApolloClient<T> | undefined = graphQLClient;

  let state: GraphQLModuleState = graphQLModuleStates.IDLE;
  // saved last result
  let result: ApolloQueryResult<Q> | undefined;
  // saved last error
  let error: GraphQLModuleError | undefined;
  // if api tokens have been fetched once, no need to check existance again.
  let apiTokensHaveBeenLoadedOnce: boolean = false;

  const getApiTokensClient = () => {
    const beacon = dedicatedBeacon.getBeacon();
    return beacon ? (beacon.getSignalContext(apiTokensClientNamespace) as ApiTokenClient) : undefined;
  };

  const emptyPromiseCatcher = () => {
    // promise rejection catcher to avoid "unhandled promise" exception
  };

  const getData: GraphQLModule<T, Q>['getData'] = () => {
    return result ? result.data : undefined;
  };

  const setAndEmitError = (graphQLEror: GraphQLModuleError) => {
    if (!mergedOptions.keepOldResultOnError) {
      result = undefined;
    }
    error = graphQLEror;
    dedicatedBeacon.emitError(error);
  };

  // attaches .then and .catch to a promise
  const handleQueryPromise = (promise: Promise<ApolloQueryResult<Q>>) => {
    if (queryPromise) {
      throw new Error('queryPromise already exists');
    }
    queryPromise = promise;
    queryPromise
      .then((queryResult: ApolloQueryResult<Q>) => {
        error = undefined;
        result = queryResult;
        state = graphQLModuleStates.IDLE;
        queryPromise = undefined;
        dedicatedBeacon.emitEvent(graphQLModuleEvents.GRAPHQL_MODULE_LOAD_SUCCESS, getData());
      })
      .catch((queryError: ApolloError) => {
        state = graphQLModuleStates.IDLE;
        queryPromise = undefined;
        if (isAbortError(queryError.networkError as Error)) {
          error = undefined;
          dedicatedBeacon.emitEvent(graphQLModuleEvents.GRAPHQL_MODULE_LOAD_ABORTED);
        } else {
          setAndEmitError(
            new GraphQLModuleError('Graphql query failed', graphQLModuleError.GRAPHQL_LOAD_FAILED, queryError),
          );
        }
      });
    return queryPromise;
  };

  const doApiTokensExist = () => {
    const apiTokenClient = getApiTokensClient();
    return !!apiTokenClient && !!apiTokenClient.getTokens();
  };

  // if query is started when api tokens are renewed, wait for it to complete.
  const waitForApiTokens: GraphQLModule['waitForApiTokens'] = async (timeout = 0) => {
    if (apiTokenAwaitPromise) {
      return apiTokenAwaitPromise;
    }
    if (doApiTokensExist()) {
      return Promise.resolve(true);
    }
    let timeOutId: ReturnType<typeof setTimeout> | null = null;
    const beacon = dedicatedBeacon.getBeacon() as Beacon;
    if (!beacon) {
      return Promise.reject(new Error('No Beacon found'));
    }

    apiTokenAwaitPromise = null;
    const signalPromise = waitForSignals(
      dedicatedBeacon.getBeacon() as Beacon,
      [{ payload: { type: apiTokensClientEvents.API_TOKENS_UPDATED } }],
      {
        rejectOn: [{ payload: { type: graphQLModuleEvents.GRAPHQL_MODULE_CLEARED } }, signalTypeToRejectApiTokenAwait],
      },
    );

    const timeoutPromise = timeout
      ? new Promise((resolve, reject) => {
          timeOutId = setTimeout(() => {
            reject(new Error('Timeout for waitForApiTokens() reached'));
            timeOutId = null;
          }, timeout);
        })
      : null;

    apiTokenAwaitPromise = (timeoutPromise ? Promise.race([signalPromise, timeoutPromise]) : signalPromise)
      .then(() => {
        if (timeOutId) {
          clearTimeout(timeOutId);
          timeOutId = null;
        }
        apiTokenAwaitPromise = null;
        return Promise.resolve(true);
      })
      .catch(() => {
        apiTokenAwaitPromise = null;
        return Promise.resolve(false);
      });

    return apiTokenAwaitPromise;
  };

  const queryExecutor: GraphQLModule<T, Q>['query'] = async (props = {}) => {
    // if aborting is not enabled and there is an active query, return the current promise
    if (queryPromise && !mergedOptions.abortIfLoading) {
      return queryPromise;
    }
    // abort and wait for current promise to end
    if (queryPromise) {
      fetchAborter.abort();
      await queryPromise.catch(emptyPromiseCatcher);
    }
    if (props.graphQLClient) {
      client = props.graphQLClient;
    }
    if (!client) {
      setAndEmitError(new GraphQLModuleError('No client defined', graphQLModuleError.GRAPHQL_NO_CLIENT));
      return Promise.reject(error);
    }

    if (mergedOptions.requireApiTokens && !apiTokensHaveBeenLoadedOnce) {
      setAndEmitError(
        new GraphQLModuleError('Required apiTokens not loaded', graphQLModuleError.GRAPHQL_NO_API_TOKENS),
      );
      return Promise.reject(error);
    }

    if (mergedOptions.requireApiTokens && apiTokensHaveBeenLoadedOnce && !doApiTokensExist()) {
      await waitForApiTokens(mergedOptions.apiTokensWaitTime);
      if (!doApiTokensExist()) {
        setAndEmitError(new GraphQLModuleError('ApiTokens timed out', graphQLModuleError.GRAPHQL_NO_API_TOKENS));
        return Promise.reject(error);
      }
    }

    const queryDocument = props.query || query;
    if (!queryDocument) {
      setAndEmitError(
        new GraphQLModuleError('No query document (TypedDocumentNode)', graphQLModuleError.GRAPHQL_LOAD_FAILED),
      );
      return Promise.reject(error);
    }
    try {
      const cloneAndMergeOptions = () => {
        const initialContext = queryOptions && queryOptions.context ? cloneObject(queryOptions.context) : {};
        const propsContext =
          props && props.queryOptions && props.queryOptions.context ? cloneObject(props.queryOptions.context) : {};
        return {
          ...{ ...queryOptions, ...props.queryOptions },
          context: {
            ...initialContext,
            ...propsContext,
          },
          query: queryDocument,
        };
      };

      const addAbortSignalToQueryOptions = (currentOptions: QueryOptions) => {
        return appendFetchOptions(currentOptions, { signal: fetchAborter.getSignal() });
      };

      const queryOptionsModifier = mergeQueryOptionModifiers({ options, queryHelper });
      const promise = client.query<Q>(
        addAbortSignalToQueryOptions(
          queryOptionsModifier(cloneAndMergeOptions(), getApiTokensClient(), dedicatedBeacon.getBeacon()),
        ),
      );
      state = graphQLModuleStates.LOADING;
      dedicatedBeacon.emitEvent(graphQLModuleEvents.GRAPHQL_MODULE_LOADING);
      return handleQueryPromise(promise);
    } catch (e) {
      state = graphQLModuleStates.IDLE;
      setAndEmitError(new GraphQLModuleError('Graphql query failed', graphQLModuleError.GRAPHQL_LOAD_FAILED, e));
      return Promise.reject(error);
    }
  };

  const cancel = () => {
    emitApiTokenAwaitRejectionSignal();
    fetchAborter.abort();
  };

  // autoLoad is done only once
  const autoLoadWithApiTokens = async () => {
    if (!result && !queryPromise && mergedOptions.autoFetch && apiTokensHaveBeenLoadedOnce) {
      await queryExecutor().catch(emptyPromiseCatcher);
      mergedOptions.autoFetch = false;
    }
  };

  const apiTokensClientEventListener: SignalListener = (signal) => {
    const wasApiTokensUpdatedSignal = isApiTokensUpdatedSignal(signal);
    apiTokensHaveBeenLoadedOnce = apiTokensHaveBeenLoadedOnce || wasApiTokensUpdatedSignal;
    if (isApiTokensRemovedSignal(signal)) {
      cancel();
    } else if (wasApiTokensUpdatedSignal) {
      autoLoadWithApiTokens();
    }
  };

  const apiTokensClientInitListener: SignalListener = (signal) => {
    const apiTokensClient = signal.context as ApiTokenClient;
    if (apiTokensClient && apiTokensClient.getTokens()) {
      apiTokensHaveBeenLoadedOnce = true;
      autoLoadWithApiTokens();
    }
  };

  const listenToApiTokenClient = () => {
    if (mergedOptions.requireApiTokens) {
      dedicatedBeacon.addListener(createEventTriggerProps(apiTokensClientNamespace), apiTokensClientEventListener);
      dedicatedBeacon.addListener(createInitTriggerProps(apiTokensClientNamespace), apiTokensClientInitListener);
    }
  };

  return {
    namespace: 'graphQLModule',
    connect: (beacon) => {
      dedicatedBeacon.storeBeacon(beacon);
      listenToApiTokenClient();
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
    isPending: () => {
      return !!(apiTokenAwaitPromise || queryPromise);
    },
    query: queryExecutor,
    getQueryPromise: () => {
      return queryPromise || Promise.reject(new Error(`No ${graphQLModuleNamespace} load promise`));
    },
    cancel,
    clear: () => {
      cancel();
      queryPromise = undefined;
      result = undefined;
      error = undefined;
      dedicatedBeacon.emitEvent(graphQLModuleEvents.GRAPHQL_MODULE_CLEARED);
    },
    waitForApiTokens,
  };
}
