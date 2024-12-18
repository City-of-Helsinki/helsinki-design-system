/* eslint-disable jest/expect-expect */
/* eslint-disable jest/no-mocks-import */
import { disableFetchMocks, enableFetchMocks } from 'jest-fetch-mock';
import { ApolloClient, ApolloLink, HttpLink, InMemoryCache } from '@apollo/client';

import { Beacon, createBeacon } from '../beacon/beacon';
import { emitInitializationSignals, EventPayload, eventSignalType } from '../beacon/signals';
import { createControlledFetchMockUtil, getLastFetchMockCallArguments } from '../testUtils/fetchMockTestUtil';
import { createApolloClientModule } from './apolloClientModule';
import { apiTokensClientEvents, apiTokensClientNamespace, TokenData } from '../apiTokensClient';
import { advanceUntilPromiseResolved } from '../testUtils/timerTestUtil';
import { getLastMockCallArgs } from '../../../utils/testHelpers';
import { ApolloClientModule, ApolloClientModuleProps } from './index';
import { createApiTokenClient } from '../apiTokensClient/apiTokensClient';
import { USER_QUERY } from '../graphQLModule/__mocks__/mockData';
import { createQueryResponse } from '../graphQLModule/__mocks__/mockResponses';

describe(`apolloClientModule`, () => {
  const defaultApiTokens: TokenData = { token1: 'token1Value', token2: 'token2Value' };
  const uri = '/query';
  const { cleanUp, setResponders, addResponse } = createControlledFetchMockUtil([{ path: uri }]);

  let currentModule: ApolloClientModule;
  let currentBeacon: Beacon;
  let currentApolloClient: ApolloClient<InMemoryCache>;
  let apiTokenStorage: TokenData | null = null;
  let apolloClientQuerySpy: jest.SpyInstance | undefined;

  const getQueryParams = () => {
    if (!apolloClientQuerySpy) {
      return undefined;
    }
    return getLastMockCallArgs(apolloClientQuerySpy)[0];
  };
  const getLastQueryHeaders = () => {
    return getLastFetchMockCallArguments()[1].headers;
  };

  const initTests = ({
    apiTokens,
    moduleOptions = {},
  }: {
    apiTokens?: TokenData;
    moduleOptions?: Partial<ApolloClientModuleProps>;
  }) => {
    const links: ApolloLink[] = [new HttpLink({ uri })];
    const { clientOptions, ...rest } = moduleOptions;
    const { link } = clientOptions || {};
    if (link) {
      links.unshift(link);
    }
    const options = {
      ...clientOptions,
    };

    options.link = ApolloLink.from(links);

    addResponse({ status: 200, body: JSON.stringify(createQueryResponse({ id: 100 })) });

    currentModule = createApolloClientModule({ ...rest, clientOptions: options });
    currentApolloClient = currentModule.getClient();
    apolloClientQuerySpy = jest.spyOn(currentApolloClient, 'query');
    apiTokenStorage = apiTokens || defaultApiTokens;
    const apiTokensClient = createApiTokenClient({ url: '/does-not-matter' });
    jest.spyOn(apiTokensClient, 'getTokens').mockImplementation(() => {
      return apiTokenStorage;
    });
    currentBeacon = createBeacon();
    currentBeacon.addSignalContext(apiTokensClient);
    currentBeacon.addSignalContext(currentModule);

    // initialize all modules
    emitInitializationSignals(currentBeacon);
  };

  // helpers for emitting api token signals
  const emitApiTokensClientStateChange = (payload: EventPayload) => {
    currentBeacon.emit({ type: eventSignalType, namespace: apiTokensClientNamespace, payload });
  };

  const emitApiTokensRenewalStart = () => {
    const payload: EventPayload = { type: apiTokensClientEvents.API_TOKENS_RENEWAL_STARTED };
    emitApiTokensClientStateChange(payload);
  };

  const emitApiTokensUpdatedStateChange = (tokens: TokenData) => {
    apiTokenStorage = tokens;
    const payload: EventPayload = { type: apiTokensClientEvents.API_TOKENS_UPDATED, data: tokens };
    emitApiTokensClientStateChange(payload);
  };

  // ApolloClient emits errors when cached data is invalid. That does not matter in these tests.
  let consoleErrorSpy: jest.SpyInstance;

  beforeAll(() => {
    enableFetchMocks();
    consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => null);
  });

  beforeEach(() => {
    jest.useFakeTimers();
    setResponders([{ path: uri }]);
  });

  afterEach(async () => {
    jest.advanceTimersByTime(100000);
    const promise = currentModule.getTracker().waitForApiTokens();
    await advanceUntilPromiseResolved(promise);
    currentModule.reset();

    await cleanUp();
    jest.runOnlyPendingTimers();
    jest.useRealTimers();
    jest.clearAllMocks();
    currentBeacon.clear();
    apiTokenStorage = null;
  });

  afterAll(() => {
    disableFetchMocks();
    consoleErrorSpy.mockRestore();
  });
  describe(`create`, () => {
    it('The module is created and current tokens exist in the tracker.', async () => {
      initTests({});
      expect(currentModule.getTracker().getTokens()).toMatchObject(defaultApiTokens);
    });
  });
  describe(`tokenSetter`, () => {
    it('The token setter is called and headers set. Query variables are passed as usual.', async () => {
      const tokenSetter: ApolloClientModuleProps['tokenSetter'] = jest.fn().mockImplementation((headers, tokens) => {
        return {
          ...tokens,
          extraHeader: 'extraHeader',
        };
      });
      // add extra link to make sure all links are processed.
      const languageHeaderSetter = new ApolloLink((operation, forward) => {
        operation.setContext(({ headers }) => ({
          headers: {
            language: 'za',
            ...headers,
          },
        }));
        return forward(operation);
      });
      const xHeaderSetter = new ApolloLink((operation, forward) => {
        operation.setContext(({ headers }) => ({
          headers: {
            'x-header': 'x-value',
            token1: 'this-should-be-overridden-in-module',
            ...headers,
          },
        }));
        return forward(operation);
      });
      initTests({
        moduleOptions: { tokenSetter, clientOptions: { link: languageHeaderSetter.concat(xHeaderSetter) } },
      });
      const variables = { variable1: 'var1' };
      const promise = currentModule.getClient().query({ query: USER_QUERY, variables });

      await advanceUntilPromiseResolved(promise);
      expect(tokenSetter).toHaveBeenCalledTimes(1);
      const headers = getLastQueryHeaders();
      // note that extraHeader is lower-case because of ApolloLink default settings.
      expect(headers).toMatchObject({
        language: 'za',
        extraheader: 'extraHeader',
        'x-header': 'x-value',
        ...defaultApiTokens,
      });
      expect(getQueryParams()).toMatchObject({ variables });
    });
  });
  describe(`on-going api token renewal`, () => {
    it('Delays the query until tokens are renewed and new tokens are used.', async () => {
      const tokenSetter: ApolloClientModuleProps['tokenSetter'] = jest.fn().mockImplementation((headers, tokens) => {
        return {
          ...tokens,
        };
      });
      initTests({
        // keepTokensWhileRenewing is set to false, so if token timeout, header have no apiTokens
        moduleOptions: { tokenSetter, keepTokensWhileRenewing: false },
      });
      emitApiTokensRenewalStart();
      const tracker = currentModule.getTracker();
      const renewalPromiseTracker = jest.fn();
      // the renewalPromise returns false, if timed out
      tracker.waitForApiTokens().then(renewalPromiseTracker);
      const promise = currentModule.getClient().query({ query: USER_QUERY });
      jest.advanceTimersByTime(10000);
      const updatedTokens = { tokenx: 'tokenx', tokeny: 'tokeny' };
      emitApiTokensUpdatedStateChange(updatedTokens);
      await advanceUntilPromiseResolved(promise);
      expect(renewalPromiseTracker).toHaveBeenCalledWith(true);
      expect(tokenSetter).toHaveBeenCalledTimes(1);
      const headers = getLastQueryHeaders();
      expect(headers).toMatchObject({
        ...updatedTokens,
      });
    });
    it('If renewal is timed out, the query is executed anyway.', async () => {
      const tokenSetter: ApolloClientModuleProps['tokenSetter'] = jest.fn().mockImplementation((headers, tokens) => {
        return {
          ...tokens,
        };
      });
      initTests({
        // keepTokensWhileRenewing is set to false, so if token timeout, header have no apiTokens
        moduleOptions: { tokenSetter, keepTokensWhileRenewing: false },
      });
      emitApiTokensRenewalStart();
      const tracker = currentModule.getTracker();
      const renewalPromiseTracker = jest.fn();
      // the renewalPromise returns false, if timed out
      tracker.waitForApiTokens().then(renewalPromiseTracker);
      const promise = currentModule.getClient().query({ query: USER_QUERY });

      await advanceUntilPromiseResolved(promise);
      expect(renewalPromiseTracker).toHaveBeenCalledWith(false);
      expect(tokenSetter).toHaveBeenCalledTimes(1);
      const headers = getLastQueryHeaders();
      expect(headers.token1).toBeUndefined();
      expect(headers.token2).toBeUndefined();
    });
  });
});
