import { QueryOptions } from '@apollo/client';
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

export function mergeQueryOptions(
  target: Partial<GraphQLModuleModuleProps['queryOptions']>,
  overrides: Partial<GraphQLModuleModuleProps['queryOptions']>,
) {
  return merge(target, overrides);
}

/* No need to export to hds-react package */
export function mergeQueryOptionsToModuleProps<T, Q>(
  target: Partial<GraphQLModuleModuleProps<T, Q>>,
  queryOptions: Partial<QueryOptions<Q>>,
) {
  const { query, ...rest } = queryOptions;
  // eslint-disable-next-line no-param-reassign
  target.queryOptions = mergeQueryOptions(target.queryOptions || {}, rest);
  if (query) {
    // eslint-disable-next-line no-param-reassign
    target.query = query;
  }
  return target;
}

export function setBearerToQueryOptions(queryOptions: QueryOptions, token: string) {
  if (!token) {
    return queryOptions;
  }
  return mergeAuthorizationHeaderToQueryOptions(queryOptions, `Bearer ${token}`);
}

export function appendFetchOptions(queryOptions: QueryOptions, newOptions: Partial<Parameters<typeof fetch>[1]>) {
  if (!queryOptions.context) {
    // eslint-disable-next-line no-param-reassign
    queryOptions.context = {};
  }

  // eslint-disable-next-line no-param-reassign
  queryOptions.context.fetchOptions = {
    ...queryOptions.context.fetchOptions,
    ...newOptions,
  };
  return queryOptions;
}

/* No need to export to hds-react package */
export function mergeQueryOptionModifiers({
  options,
  queryHelper,
}: Pick<GraphQLModuleModuleProps, 'queryHelper' | 'options'>): Required<GraphQLModuleModuleProps>['queryHelper'] {
  const { apiTokenKey } = options || {};
  if (!apiTokenKey && !queryHelper) {
    return (opt: QueryOptions) => opt;
  }

  if (!apiTokenKey && queryHelper) {
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

  if (!queryHelper) {
    return apiTokenSetter;
  }

  return (opt, apiTokenClient, beacon) => {
    return queryHelper(apiTokenSetter(opt, apiTokenClient, beacon), apiTokenClient, beacon);
  };
}
