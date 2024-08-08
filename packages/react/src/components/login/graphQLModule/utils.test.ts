import { DocumentNode, QueryOptions } from '@apollo/client';

import { cloneWithJSONConversion } from '../../../utils/cloneObject';
import {
  appendFetchOptions,
  mergeAuthorizationHeaderToQueryOptions,
  mergeHeadersToQueryOptions,
  mergeQueryOptionContexts,
  mergeQueryOptions,
  setBearerToQueryOptions,
} from './utils';

describe(`Utils`, () => {
  const createQueryOptions = ({
    id = 'default',
    errorPolicy = 'all',
    fetchPolicy = 'cache-first',
  }: { id: string } & Pick<QueryOptions, 'errorPolicy' | 'fetchPolicy'>): Required<QueryOptions> => {
    const queryOptionsContextFetchOptions: Parameters<typeof fetch>[1] = {
      headers: {
        [`${id}Prop1`]: `${id}Prop1Value`,
        [`${id}Prop2`]: `${id}Prop2Value`,
      },
      method: 'GET',
      signal: `${id}abortSignal` as unknown as AbortSignal,
    };
    const contextHeaders: Record<string, string> = {
      [`${id}ContextHeader1`]: `${id}ContextHeader1Value`,
      [`${id}ContextHeader2`]: `${id}ContextHeader2Value`,
      authorization: `${id}authorization`,
    };

    const queryOptionsContext: QueryOptions['context'] = {
      uri: `${id}queryOptionsContext.com`,
      fetchOptions: { ...queryOptionsContextFetchOptions },
      headers: { ...contextHeaders },
    };

    // omitted query because it makes object comparisons in Jest to fail
    return {
      query: {
        [`${id}Query`]: `${id}QueryValue`,
      } as unknown as DocumentNode,
      context: queryOptionsContext,
      variables: {
        [`${id}Var1`]: `${id}Var2Value`,
        [`${id}Var2`]: `${id}Var2Value`,
      },
      errorPolicy,
      fetchPolicy,
      pollInterval: 0,
      notifyOnNetworkStatusChange: false,
      returnPartialData: false,
      partialRefetch: false,
      canonizeResults: false,
    };
  };

  const getEmptyQueryOptions = () => {
    return {} as QueryOptions;
  };

  describe(`mergeQueryOptionContexts`, () => {
    it(`Deep merges a new context to existing context. Passed options are mutated. Passed context is not mutated.`, () => {
      const options1 = createQueryOptions({ id: 'one' });
      const options2 = createQueryOptions({ id: 'two', fetchPolicy: 'cache-only', errorPolicy: 'ignore' });
      const options1Clone = cloneWithJSONConversion(options1);
      const options2ContextClone = cloneWithJSONConversion(options2.context);
      const expectedResult = {
        uri: options2.context.uri,
        fetchOptions: {
          ...options1.context.fetchOptions,
          ...options2.context.fetchOptions,
          headers: {
            ...options1.context.fetchOptions.headers,
            ...options2.context.fetchOptions.headers,
          },
        },
        headers: {
          ...options1.context.headers,
          ...options2.context.headers,
        },
      };
      const result1 = mergeQueryOptionContexts(options1, options2.context);
      expect(result1.context).toEqual(expectedResult);
      expect(options1.context).toEqual(expectedResult);
      expect(options1).not.toMatchObject(options1Clone);
      expect(options2.context).toMatchObject(options2ContextClone);
      expect(mergeQueryOptionContexts(getEmptyQueryOptions(), options2.context).context).toEqual(options2.context);
      expect(mergeQueryOptionContexts(options1, {}).context).toEqual(options1.context);
    });
  });
  describe(`mergeQueryOptions`, () => {
    it(`Deep merges two queryOption objects. Second argument is merged to first, second is not mutated. Query objects are not deep merged.`, () => {
      const options1 = createQueryOptions({ id: 'one' });
      const options2 = createQueryOptions({ id: 'two', fetchPolicy: 'cache-only', errorPolicy: 'ignore' });
      Reflect.deleteProperty(options1, 'query');
      Reflect.deleteProperty(options2, 'query');
      const options1Clone = cloneWithJSONConversion(options1);
      const options2Clone = cloneWithJSONConversion(options2);
      const expectedContext = {
        uri: options2.context.uri,
        fetchOptions: {
          ...options1.context.fetchOptions,
          ...options2.context.fetchOptions,
          headers: {
            ...options1.context.fetchOptions.headers,
            ...options2.context.fetchOptions.headers,
          },
        },
        headers: {
          ...options1.context.headers,
          ...options2.context.headers,
        },
      };
      const expectedResult = {
        ...options2,
        context: expectedContext,
        variables: {
          ...options1.variables,
          ...options2.variables,
        },
      };

      const result1 = mergeQueryOptions(options1, options2);
      expect(result1).toEqual(expectedResult);
      expect(options1).toEqual(expectedResult);
      expect(options1).not.toMatchObject(options1Clone);
      expect(options2).toMatchObject(options2Clone);
      expect(mergeQueryOptions(getEmptyQueryOptions(), options2)).toEqual(options2);
      expect(mergeQueryOptions(options1, {})).toEqual(options1);
    });
  });
  describe(`mergeHeadersToQueryOptions`, () => {
    it(`Merges a new headers to existing context headers`, () => {
      const options1 = createQueryOptions({ id: 'one' });
      const options2 = createQueryOptions({ id: 'two', fetchPolicy: 'cache-only', errorPolicy: 'ignore' });
      const expectedResult = {
        ...options1.context.headers,
        ...options2.context.headers,
      };
      expect(mergeHeadersToQueryOptions(options1, options2.context.headers).context?.headers).toEqual(expectedResult);
      expect(mergeHeadersToQueryOptions(options1, {}).context?.headers).toEqual(options1.context.headers);
      expect(mergeHeadersToQueryOptions(getEmptyQueryOptions(), options2.context.headers).context?.headers).toEqual(
        options2.context.headers,
      );
    });
  });
  describe(`mergeAuthorizationHeaderToQueryOptions`, () => {
    it(`Adds a authorization prop to context headers`, () => {
      const options1 = createQueryOptions({ id: 'one' });
      const expectedResult = {
        ...options1.context.headers,
        authorization: 'hello',
      };
      expect(mergeAuthorizationHeaderToQueryOptions(options1, expectedResult.authorization).context?.headers).toEqual(
        expectedResult,
      );
    });
  });
  describe(`setBearerToQueryOptions`, () => {
    it(`Adds a authorization Bearer to context headers`, () => {
      const options1 = createQueryOptions({ id: 'one' });
      const token = 'token-1234';
      const expectedResult = {
        ...options1.context.headers,
        authorization: `Bearer ${token}`,
      };
      expect(setBearerToQueryOptions(options1, token).context?.headers).toEqual(expectedResult);
    });
  });
  describe(`appendFetchOptions`, () => {
    it(`Adds given props to context fetch Options`, () => {
      const options1 = createQueryOptions({ id: 'one' });
      const fetchOptions = {
        signal: 'fake-test-signal' as unknown as AbortSignal,
        method: 'POST',
      };
      const expectedResult = {
        ...options1.context.fetchOptions,
        ...fetchOptions,
      };
      expect(appendFetchOptions(options1, fetchOptions).context?.fetchOptions).toEqual(expectedResult);
    });
    it(`Adds context and fetchOptions if not found`, () => {
      const options1 = {} as QueryOptions;
      const fetchOptions = {
        signal: 'fake-test-signal' as unknown as AbortSignal,
        method: 'POST',
      };
      const expectedResult = {
        context: {
          fetchOptions,
        },
      };
      expect(appendFetchOptions(options1, fetchOptions)).toEqual(expectedResult);
    });
  });
});
