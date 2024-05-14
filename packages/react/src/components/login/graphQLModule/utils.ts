import { QueryOptions } from '@apollo/client/core';
import { merge } from 'lodash';

import { GraphQLModuleModuleProps } from '.';

type PartialContext = Partial<QueryOptions['context']>;
type QueryHeaders = Record<string, unknown>;

function mergeQueryOptionsContexts(target: PartialContext, overrides: PartialContext): PartialContext {
  return merge(target, overrides);
}

export function mergeQueryOptionContexts(options: QueryOptions, overrideContext: PartialContext): QueryOptions {
  const context: PartialContext = options.context || {};
  // eslint-disable-next-line no-param-reassign
  options.context = mergeQueryOptionsContexts(context, overrideContext);

  return options;
}

export function mergeHeadersToQueryOptions(options: QueryOptions, headers: QueryHeaders): QueryOptions {
  const context: PartialContext = {
    headers,
  };
  return mergeQueryOptionContexts(options, context);
}

export function mergeAuthorizationHeaderToQueryOptions(options: QueryOptions, authHeader: string): QueryOptions {
  const headers: QueryHeaders = {
    authorization: authHeader,
  };
  return mergeHeadersToQueryOptions(options, headers);
}

export function mergeQueryOptions(target: Partial<QueryOptions<unknown>>, overrides: Partial<QueryOptions<unknown>>) {
  return merge(target, overrides);
}

export function mergeQueryOptionsToModuleProps<T, Q>(
  target: Partial<GraphQLModuleModuleProps<T, Q>>,
  queryOptions: Partial<QueryOptions<Q>>,
) {
  // eslint-disable-next-line no-param-reassign
  target.queryOptions = mergeQueryOptions(target.queryOptions || {}, queryOptions);
  return target;
}
