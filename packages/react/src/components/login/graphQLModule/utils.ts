import { QueryOptions } from '@apollo/client/core';
import { merge } from 'lodash';

import { GraphQLModuleModuleProps } from '.';
import { ApiTokenClient } from '../apiTokensClient';

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
  const { query } = overrides;
  // eslint-disable-next-line no-param-reassign
  target.query = undefined;
  return { ...merge(target, overrides), query };
}

/* No need to export to hds-react package */
export function mergeQueryOptionsToModuleProps<T, Q>(
  target: Partial<GraphQLModuleModuleProps<T, Q>>,
  queryOptions: Partial<QueryOptions<Q>>,
) {
  // eslint-disable-next-line no-param-reassign
  target.queryOptions = mergeQueryOptions(target.queryOptions || {}, queryOptions);
  return target;
}

export function setBearerToQueryOptions(queryOptions: QueryOptions, token: string) {
  if (!token) {
    return queryOptions;
  }
  return mergeAuthorizationHeaderToQueryOptions(queryOptions, `Bearer ${token}`);
}

/* No need to export to hds-react package */
export function mergeQueryOptionModifiers({
  options,
  queryHelper,
}: Pick<GraphQLModuleModuleProps, 'queryHelper' | 'options'>): Required<GraphQLModuleModuleProps>['queryHelper'] {
  const { apiTokenKey } = options || {};
  if (!apiTokenKey || !queryHelper) {
    return (opt: QueryOptions) => opt;
  }

  if (!apiTokenKey) {
    return queryHelper;
  }

  const tokenPicker = (apiTokenClient: ApiTokenClient, key: string) => {
    if (!apiTokenClient) {
      return undefined;
    }
    const tokens = apiTokenClient.getTokens();
    return tokens ? tokens[key] : undefined;
  };

  const apiTokenSetter: GraphQLModuleModuleProps['queryHelper'] = (opt, apiTokenClient) => {
    if (!apiTokenKey || !apiTokenClient) {
      return opt;
    }
    const token = tokenPicker(apiTokenClient, apiTokenKey);
    if (token) {
      return setBearerToQueryOptions(opt, token);
    }
    return opt;
  };

  return (opt, apiTokenClient, beacon) => {
    return queryHelper(apiTokenSetter(opt, apiTokenClient, beacon), apiTokenClient, beacon);
  };
}
