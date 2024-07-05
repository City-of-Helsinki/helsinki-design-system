import { useMemo } from 'react';
import { ApolloQueryResult } from '@apollo/client';

import { useConnectedModule, useSignalTrackingWithReturnValue } from '../beacon/hooks';
import { graphQLModuleNamespace, GraphQLModule, GraphQLQueryResult, GraphQLCache } from './index';
import { triggerForAllGraphQLModuleSignals } from './signals';
import { GraphQLModuleError } from './graphQLModuleError';
import { Signal } from '../beacon/beacon';

export type UseGraphQLModuleHookObject<T, Q> = {
  data: Q | undefined;
  error: GraphQLModuleError | undefined;
  loading: boolean;
  refetch: GraphQLModule<T, Q>['query'];
};
export type UseGraphQLModuleHookReturnType<T, Q> = [GraphQLModule<T, Q>['query'], UseGraphQLModuleHookObject<T, Q>];

/**
 * Returns the GraphQL module.
 * @returns GraphQLModule
 */
export const useGraphQLModule = <T = GraphQLCache, Q = GraphQLQueryResult>(): GraphQLModule<T, Q> => {
  const graphQLModule = useConnectedModule<GraphQLModule<T, Q>>(graphQLModuleNamespace);
  if (!graphQLModule) {
    throw new Error('Cannot find graphQLModule from LoginContext.');
  }
  return graphQLModule;
};

/**
 * The hook forces the component using it to re-render each time the listener is triggered.
 * @returns [Signal, resetFunction, GraphQL module instance]
 */
export const useGraphQLModuleTracking = (): [Signal | undefined, () => void, GraphQLModule] => {
  const module = useGraphQLModule();
  return [...useSignalTrackingWithReturnValue(triggerForAllGraphQLModuleSignals), module];
};

/**
 * Mimics the useLazyQuery hook of the Apollo GraphQL library. The hook forces the component using it to re-render each time the module emits a signal.
 * @returns [query, {data, error, loading, refetch}]
 */
export const useGraphQL = <T = GraphQLCache, Q = GraphQLQueryResult>(): UseGraphQLModuleHookReturnType<T, Q> => {
  const graphQLModule = useGraphQLModule<T, Q>();
  const catchedQuery: GraphQLModule<T, Q>['query'] = async (props) => {
    const promise = graphQLModule.queryServer(props).catch(() => {
      // catch error to prevent "unhandled promise" error.
    });
    return promise as Promise<ApolloQueryResult<Q>>;
  };
  // causes re-render when the module emits something
  useGraphQLModuleTracking();
  const createReturnObject = useMemo<() => UseGraphQLModuleHookObject<T, Q>>(() => {
    return () => {
      return {
        data: graphQLModule.getData() || undefined,
        error: graphQLModule.getError() || undefined,
        loading: graphQLModule.isLoading(),
        refetch: catchedQuery,
      };
    };
  }, [graphQLModule]);
  return [catchedQuery, createReturnObject()];
};
