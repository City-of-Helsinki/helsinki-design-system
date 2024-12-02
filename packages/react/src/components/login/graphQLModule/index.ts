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
  /**
   * Cancels current query. The pending query is aborted.
   */
  cancel: () => void;
  /**
   * Calls cancel() and also clears errors and results. Emits a GRAPHQL_MODULE_CLEARED event.
   */
  clear: () => void;
  /**
   * Returns array of query errors and/or errors in the result data.
   */
  getClientErrors: () => ApolloError[];
  /**
   * Returns the data property of last successful query result.
   */
  getData: () => Q | undefined;
  /**
   * Returns a query error.
   */
  getError: () => GraphQLModuleError | undefined;
  /**
   * Returns the current pending query promise or an immediately rejected promise.
   */
  getQueryPromise: () => Promise<ApolloQueryResult<Q>>;
  /**
   * Returns the latest query result.
   */
  getResult: () => ApolloQueryResult<Q> | undefined;
  /**
   * Returns true if a query fetch is currently active.
   */
  isLoading: () => boolean;
  /**
   * Returns true if the module is waiting for api tokens or query results.
   */
  isPending: () => boolean;
  /**
   * Executes a query.
   */
  query: (props?: Partial<GraphQLModuleModuleProps<T, Q>>) => Promise<ApolloQueryResult<Q>>;
  /**
   * Calls query(options) with fetchPolicy: 'cache-only' in options.
   */
  queryCache: (props?: Partial<GraphQLModuleModuleProps<T, Q>>) => Promise<ApolloQueryResult<Q>>;
  /**
   * Calls query(options) with fetchPolicy: 'network-only' in options.
   */
  queryServer: (props?: Partial<GraphQLModuleModuleProps<T, Q>>) => Promise<ApolloQueryResult<Q>>;
  /**
   * Sets the graphQLClient.
   */
  setClient: (client: ApolloClient<T>) => void;
  /**
   * Returns a promise that is resolved when api tokens are found.
   */
  waitForApiTokens: () => Promise<boolean>;
};

export type GraphQLModuleModuleProps<T = NormalizedCacheObject, Q = GraphQLQueryResult> = {
  /**
   * Optional property, but must be set before the query is executed.
   */
  graphQLClient?: ApolloClient<T>;
  /**
   * Get the client from modules.
   */
  useApolloClientModule?: boolean;
  /**
   * GraphQL module options.
   */
  options?: Partial<{
    /**
     * Should query be executed automatically on initialization. Default true.
     */
    autoFetch: boolean;
    /**
     * Are api tokens required for queries. Default true.
     */
    requireApiTokens: boolean;
    /**
     * Should an on-going query be aborted when querying again. Default true.
     */
    abortIfLoading: boolean;
    /**
     * Should old result be kept, if a newer query fails. Default false.
     */
    keepOldResultOnError: boolean;
    /**
     * How long in milliseconds should api tokens be awaited before rejecting a query. Default 15 000.
     */
    apiTokensWaitTime: number;
    /**
     * An object key for the api token to use in a query.
     */
    apiTokenKey?: string;
  }>;
  /**
   * A graphQL query document.
   */
  query?: TypedDocumentNode<Q, OperationVariables> | DocumentNode;
  /**
   * This function is called before a query is executed. The options object returned by the function is used as query options.
   */
  queryHelper?: (
    currentOptions: QueryOptions<OperationVariables, Q>,
    apiTokenClient: ApiTokenClient | undefined,
    beacon: Beacon | undefined,
  ) => QueryOptions<OperationVariables, Q>;
  /**
   * Other ApolloClient queryOptions except query document.
   */
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
