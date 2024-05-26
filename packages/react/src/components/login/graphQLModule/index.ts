import {
  ApolloClient,
  TypedDocumentNode,
  OperationVariables,
  QueryOptions,
  NormalizedCacheObject,
  ApolloQueryResult,
  ApolloError,
  DocumentNode,
} from '@apollo/client/core';

import { ApiTokenClient } from '../apiTokensClient';
import { Beacon, ConnectedModule } from '../beacon/beacon';
import { GraphQLModuleError } from './graphQLModuleError';

export type GraphQLQueryResult = { [key: string]: unknown };
export type GraphQLCache = NormalizedCacheObject;

export type GraphQLModule<T = NormalizedCacheObject, Q = GraphQLQueryResult> = ConnectedModule & {
  cancel: () => void;
  clear: () => void;
  getClientErrors: () => ApolloError[];
  getData: () => Q | undefined;
  getError: () => GraphQLModuleError | undefined;
  getQueryPromise: () => Promise<ApolloQueryResult<Q>>;
  getResult: () => ApolloQueryResult<Q> | undefined;
  isLoading: () => boolean;
  isPending: () => boolean;
  query: (props?: Partial<GraphQLModuleModuleProps<T, Q>>) => Promise<ApolloQueryResult<Q>>;
  waitForApiTokens: (timeout?: number) => Promise<unknown>;
};

export type GraphQLModuleModuleProps<T = NormalizedCacheObject, Q = GraphQLQueryResult> = {
  graphQLClient?: ApolloClient<T>;
  options?: Partial<{
    autoFetch: boolean;
    requireApiTokens: boolean;
    abortIfLoading: boolean;
    keepOldResultOnError: boolean;
    apiTokensWaitTime: number;
    apiTokenKey?: string;
  }>;
  query?: TypedDocumentNode<Q, OperationVariables> | DocumentNode;
  queryHelper?: (
    currentOptions: QueryOptions<OperationVariables, Q>,
    apiTokenClient: ApiTokenClient | undefined,
    beacon: Beacon | undefined,
  ) => QueryOptions<OperationVariables, Q>;
  queryOptions?: Omit<QueryOptions<OperationVariables, Q>, 'query'>;
};

export type GraphQLModuleState = keyof typeof graphQLModuleStates;

export const graphQLModuleNamespace = 'graphQLModule';

export const graphQLModuleStates = {
  IDLE: 'IDLE',
  LOADING: 'LOADING',
} as const;

export type GraphQLModuleEvent = keyof typeof graphQLModuleEvents;

export const graphQLModuleEvents = {
  GRAPHQL_MODULE_LOADING: 'GRAPHQL_MODULE_LOADING',
  GRAPHQL_MODULE_LOAD_SUCCESS: 'GRAPHQL_MODULE_LOAD_SUCCESS',
  GRAPHQL_MODULE_LOAD_ABORTED: 'GRAPHQL_MODULE_LOAD_ABORTED',
  GRAPHQL_MODULE_CLEARED: 'GRAPHQL_MODULE_CLEARED',
} as const;

export const defaultOptions: GraphQLModuleModuleProps['options'] = {
  autoFetch: true,
  requireApiTokens: true,
  abortIfLoading: true,
  keepOldResultOnError: false,
  apiTokensWaitTime: 15000,
};
