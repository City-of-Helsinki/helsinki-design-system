import {
  ApolloClient,
  TypedDocumentNode,
  OperationVariables,
  QueryOptions,
  NormalizedCacheObject,
  ApolloQueryResult,
  ApolloError,
} from '@apollo/client/core';

import { ApiTokenClient } from '../apiTokensClient';
import { Beacon, ConnectedModule } from '../beacon/beacon';
import { GraphQLModuleError } from './graphQLModuleError';

export type GraphQLQueryResult = { [key: string]: unknown };
export type GraphQLCache = NormalizedCacheObject;

export type GraphQLModule<T = NormalizedCacheObject, Q = GraphQLQueryResult> = ConnectedModule & {
  getData: () => Q | undefined;
  getState: () => GraphQLModuleState;
  getResult: () => ApolloQueryResult<Q> | undefined;
  setClient: (client: ApolloClient<T>) => void;
  query: (props?: Partial<GraphQLModuleModuleProps<T, Q>>) => Promise<ApolloQueryResult<Q>>;
  isLoading: () => boolean;
  getError: () => GraphQLModuleError | undefined;
  getClientErrors: () => ApolloError[];
  getQueryPromise: () => Promise<ApolloQueryResult<Q>>;
  cancel: () => void;
  clear: () => void;
  waitForApiTokens: (timeout?: number) => Promise<unknown>;
  queryCache: (props?: Partial<GraphQLModuleModuleProps<T, Q>>) => Promise<ApolloQueryResult<Q>>;
  queryServer: (props?: Partial<GraphQLModuleModuleProps<T, Q>>) => Promise<ApolloQueryResult<Q>>;
};

export type GraphQLModuleModuleProps<T = NormalizedCacheObject, Q = GraphQLQueryResult> = {
  graphQLClient?: ApolloClient<T>;
  query?: TypedDocumentNode<Q, OperationVariables>;
  queryOptions?: Omit<QueryOptions<OperationVariables, Q>, 'query'>;
  options?: Partial<{
    autoFetch: boolean;
    requireApiTokens: boolean;
    abortIfLoading: boolean;
    keepOldResultOnError: boolean;
    apiTokensWaitTime: number;
  }>;
  queryHelper?: (
    currentOptions: QueryOptions<OperationVariables, Q>,
    apiTokenClient: ApiTokenClient | undefined,
    beacon: Beacon | undefined,
  ) => QueryOptions<OperationVariables, Q>;
};

export type GraphQLModuleState = keyof typeof graphQLModuleStates;
export type GraphQLModuleEvent = keyof typeof graphQLModuleEvents;

export const graphQLModuleStates = {
  IDLE: 'IDLE',
  LOADING: 'LOADING',
} as const;

export const graphQLModuleEvents = {
  GRAPHQL_MODULE_LOADING: 'GRAPHQL_MODULE_LOADING',
  GRAPHQL_MODULE_LOAD_SUCCESS: 'GRAPHQL_MODULE_LOAD_SUCCESS',
  GRAPHQL_MODULE_LOAD_ERROR: 'GRAPHQL_MODULE_LOAD_ERROR',
  GRAPHQL_MODULE_LOAD_ABORTED: 'GRAPHQL_MODULE_LOAD_ABORTED',
  GRAPHQL_MODULE_CLEARED: 'GRAPHQL_MODULE_CLEARED',
} as const;

export const defaultOptions: GraphQLModuleModuleProps['options'] = {
  autoFetch: true,
  requireApiTokens: true,
  abortIfLoading: true,
  keepOldResultOnError: true,
  apiTokensWaitTime: 15000,
};

export const graphQLModuleNamespace = 'graphQLModule';
