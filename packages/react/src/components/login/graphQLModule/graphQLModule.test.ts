/* eslint-disable jest/no-mocks-import */
import HttpStatusCode from 'http-status-typed';
import { disableFetchMocks, enableFetchMocks } from 'jest-fetch-mock';
import { to } from 'await-to-js';
import { ApolloError, QueryResult, TypedDocumentNode } from '@apollo/client';
import { act, waitFor } from '@testing-library/react';

import { Beacon, ConnectedModule, createBeacon } from '../beacon/beacon';
import { emitInitializationSignals, EventPayload, eventSignalType } from '../beacon/signals';
import {
  createConnectedBeaconModule,
  createTestListenerModule,
  getReceivedErrorSignalPayloads,
  getReceivedEventSignalPayloads,
} from '../testUtils/beaconTestUtil';
import { createControlledFetchMockUtil } from '../testUtils/fetchMockTestUtil';
import { createGraphQLModule } from './graphQLModule';
import {
  GraphQLModule,
  GraphQLModuleEvent,
  graphQLModuleEvents,
  GraphQLModuleModuleProps,
  graphQLModuleNamespace,
  graphQLModuleStates,
  GraphQLQueryResult,
} from './index';
import { graphQLModuleError, GraphQLModuleError, GraphQLModuleErrorType } from './graphQLModuleError';
import { createApolloClientMock, mockedGraphQLUri } from './__mocks__/apolloClient.mock';
import { ApiTokenClient, apiTokensClientEvents, apiTokensClientNamespace, TokenData } from '../apiTokensClient';
import { createQueryResponse } from './__mocks__/mockResponses';
import { USER_QUERY } from './__mocks__/mockData';
import { advanceUntilPromiseResolved } from '../testUtils/timerTestUtil';
import { isAbortError } from '../utils/abortFetch';
import { getLastMockCallArgs } from '../../../utils/testHelpers';

type ResponseType = { returnedStatus: HttpStatusCode; data?: GraphQLQueryResult | null; error?: Error };

type TestQueryStep = {
  response?: ResponseType;
  eventSignals?: GraphQLModuleEvent[];
  errorSignals?: GraphQLModuleErrorType[];
  expectPromiseToFail?: boolean;
  expectedQueryError?: GraphQLModuleErrorType;
  expectedResult?: unknown;
  execute?: () => Promise<void>;
};

describe(`graphQLModule`, () => {
  const createSuccessResponse = (overrides: { id?: number; name?: string; profile?: unknown } = {}): ResponseType => {
    return { returnedStatus: HttpStatusCode.OK, data: createQueryResponse(overrides) };
  };
  const successfulResponse: ResponseType = createSuccessResponse();
  const errorResponse: ResponseType = {
    returnedStatus: HttpStatusCode.SERVICE_UNAVAILABLE,
    error: new Error('Failed'),
  };
  const defaultApiTokens: TokenData = { token1: 'token1', token2: 'token2' };
  const { cleanUp, setResponders, addResponse } = createControlledFetchMockUtil([{ path: mockedGraphQLUri }]);

  let currentModule: GraphQLModule<GraphQLQueryResult>;
  let currentBeacon: Beacon;
  let currentApolloClient: ReturnType<typeof createApolloClientMock>;
  let listenerModule: ReturnType<typeof createConnectedBeaconModule>;
  let apiTokenStorage: TokenData | null = null;

  const promiseCatcher = jest.fn();

  let apolloClientQuerySpy: jest.SpyInstance | undefined;
  const getQueryParams = () => {
    if (!apolloClientQuerySpy) {
      return undefined;
    }
    return getLastMockCallArgs(apolloClientQuerySpy)[0];
  };

  const initTests = ({
    responses,
    createApiTokenClient,
    apiTokens,
    moduleOptions = {},
    queryOptions = {},
    noApolloClient = false,
    noQuery = false,
  }: {
    responses: ResponseType[];
    createApiTokenClient?: boolean;
    noApolloClient?: boolean;
    noQuery?: boolean;
    apiTokens?: TokenData;
    moduleOptions?: GraphQLModuleModuleProps['options'];
    queryOptions?: GraphQLModuleModuleProps['queryOptions'];
  }) => {
    const defaultTestingModuleOptions: GraphQLModuleModuleProps['options'] = {
      requireApiTokens: false,
    };
    responses.forEach((response) => {
      addResponse({ status: response.returnedStatus, body: response.data ? JSON.stringify(response.data) : undefined });
    });
    currentApolloClient = createApolloClientMock();
    apolloClientQuerySpy = jest.spyOn(currentApolloClient, 'query');
    currentModule = createGraphQLModule({
      graphQLClient: noApolloClient ? undefined : currentApolloClient,
      query: noQuery ? undefined : USER_QUERY,
      queryOptions: {
        fetchPolicy: 'no-cache',
        ...queryOptions,
      },
      options: { ...defaultTestingModuleOptions, ...moduleOptions },
    });
    // A module for listening and tracking all events.
    listenerModule = createTestListenerModule(graphQLModuleNamespace, 'graphQLModuleListener');
    currentBeacon = createBeacon();
    currentBeacon.addSignalContext(currentModule);
    currentBeacon.addSignalContext(listenerModule);
    if (createApiTokenClient || apiTokens) {
      apiTokenStorage = apiTokens || null;
      const fakeApiTokensClient: ConnectedModule & Partial<ApiTokenClient> = {
        getTokens: () => {
          return apiTokenStorage;
        },
        connect: () => {},
        namespace: apiTokensClientNamespace,
      };
      currentBeacon.addSignalContext(fakeApiTokensClient);
    }
    emitInitializationSignals(currentBeacon);
  };

  const emitApiTokensClientStateChange = (payload: EventPayload) => {
    currentBeacon.emit({ type: eventSignalType, namespace: apiTokensClientNamespace, payload });
  };

  const emitApiTokensUpdatedStateChange = (tokens: TokenData) => {
    apiTokenStorage = tokens;
    const payload: EventPayload = { type: apiTokensClientEvents.API_TOKENS_UPDATED };
    emitApiTokensClientStateChange(payload);
  };

  const emitApiTokensRemovedStateChange = () => {
    apiTokenStorage = null;
    const payload: EventPayload = { type: apiTokensClientEvents.API_TOKENS_REMOVED };
    emitApiTokensClientStateChange(payload);
  };

  const initResponder = () => {
    setResponders([{ path: mockedGraphQLUri }]);
  };

  const getEmittedErrors = () => {
    return getReceivedErrorSignalPayloads<GraphQLModuleError>(listenerModule);
  };

  const getEmittedEventTypes = () => {
    return getReceivedEventSignalPayloads(listenerModule).map((payload) => payload.type);
  };

  const getResponseDataObj = (response: ResponseType) => {
    return response.data ? response.data.data : undefined;
  };

  beforeAll(() => {
    enableFetchMocks();
  });

  beforeEach(() => {
    jest.useFakeTimers();
    initResponder();
  });

  afterEach(async () => {
    if (currentModule) {
      const promise = currentModule.getQueryPromise().catch(promiseCatcher);
      jest.advanceTimersByTime(100000);
      await advanceUntilPromiseResolved(promise);
      currentModule.clear();
    }
    await cleanUp();
    jest.runOnlyPendingTimers();
    jest.useRealTimers();
    jest.clearAllMocks();
    currentBeacon.clear();
    apiTokenStorage = null;
  });

  afterAll(() => {
    disableFetchMocks();
  });

  it('The module is initiated in idle state.', async () => {
    initTests({
      responses: [],
    });
    expect(currentModule.getState()).toBe(graphQLModuleStates.IDLE);
    expect(currentModule.isLoading()).toBeFalsy();
    expect(currentModule.getClientErrors()).toHaveLength(0);
    expect(currentModule.getData()).toBeUndefined();
    expect(currentModule.getError()).toBeUndefined();
    expect(currentModule.getResult()).toBeUndefined();
  });

  it('Query() calls given url and event signals are emitted', async () => {
    initTests({
      responses: [successfulResponse, errorResponse],
    });
    expect(currentModule.getState()).toBe(graphQLModuleStates.IDLE);
    expect(currentModule.isLoading()).toBeFalsy();
    const promise = currentModule.query();
    expect(currentModule.getState()).toBe(graphQLModuleStates.LOADING);
    expect(currentModule.isLoading()).toBeTruthy();
    await advanceUntilPromiseResolved(promise);
    const [, result] = await to(promise);
    expect(currentModule.getState()).toBe(graphQLModuleStates.IDLE);
    expect(currentModule.isLoading()).toBeFalsy();

    expect(getEmittedEventTypes()).toEqual([
      graphQLModuleEvents.GRAPHQL_MODULE_LOADING,
      graphQLModuleEvents.GRAPHQL_MODULE_LOAD_SUCCESS,
    ]);
    expect(getEmittedErrors()).toEqual([]);
    expect(currentModule.getData()).toEqual(getResponseDataObj(successfulResponse));
    expect(currentModule.getData()).toEqual((result as QueryResult).data);
  });

  it('Failing queries are handled and error signals are emitted', async () => {
    initTests({
      responses: [errorResponse],
    });
    const errorPromise = currentModule.query();
    await advanceUntilPromiseResolved(errorPromise);
    const [error] = await to(errorPromise);
    expect(error).toBeInstanceOf(Error);
    expect(currentModule.getError()?.originalError).toBe(error);
    expect(currentModule.getError()?.isLoadError).toBeTruthy();
    expect(getEmittedEventTypes()).toEqual([graphQLModuleEvents.GRAPHQL_MODULE_LOADING]);
    const emittedErrors = getEmittedErrors();
    expect(emittedErrors).toHaveLength(1);
    expect(emittedErrors[0].isLoadError).toBeTruthy();
    expect(emittedErrors[0].originalError).toBeDefined();
    expect(currentModule.getData()).toBeUndefined();
    expect(currentModule.getResult()).toBeUndefined();
  });

  it('Clear() cancels query and removes all stored results', async () => {
    initTests({
      responses: [successfulResponse, errorResponse, successfulResponse],
    });
    const successPromise = currentModule.query();
    await advanceUntilPromiseResolved(successPromise);
    currentModule.clear();
    expect(currentModule.getClientErrors()).toHaveLength(0);
    expect(currentModule.getData()).toBeUndefined();
    expect(currentModule.getError()).toBeUndefined();
    expect(currentModule.getResult()).toBeUndefined();

    const errorPromise = currentModule.query().catch(promiseCatcher);
    await advanceUntilPromiseResolved(errorPromise);
    currentModule.clear();
    expect(currentModule.getClientErrors()).toHaveLength(0);
    expect(currentModule.getData()).toBeUndefined();
    expect(currentModule.getError()).toBeUndefined();
    expect(currentModule.getResult()).toBeUndefined();

    const abortedPromise = currentModule.query();
    currentModule.clear();
    await advanceUntilPromiseResolved(abortedPromise);
    expect(currentModule.getClientErrors()).toHaveLength(0);
    expect(currentModule.getData()).toBeUndefined();
    expect(currentModule.getError()).toBeUndefined();
    expect(currentModule.getResult()).toBeUndefined();

    expect(getEmittedEventTypes()).toEqual([
      graphQLModuleEvents.GRAPHQL_MODULE_LOADING,
      graphQLModuleEvents.GRAPHQL_MODULE_LOAD_SUCCESS,
      graphQLModuleEvents.GRAPHQL_MODULE_CLEARED,
      graphQLModuleEvents.GRAPHQL_MODULE_LOADING,
      graphQLModuleEvents.GRAPHQL_MODULE_CLEARED,
      graphQLModuleEvents.GRAPHQL_MODULE_LOADING,
      graphQLModuleEvents.GRAPHQL_MODULE_CLEARED,
      graphQLModuleEvents.GRAPHQL_MODULE_LOAD_ABORTED,
    ]);
  });

  it('getQueryPromise() returns a the promise currently active query. Or a rejected promise if a query is not pending', async () => {
    initTests({
      responses: [successfulResponse],
    });
    const [err] = await to(currentModule.getQueryPromise());
    expect(err).toBeDefined();
    // this must be catched as it is returned from an async func
    const promise = currentModule.query().catch(promiseCatcher);
    // no need to catch this, it is catched in the module
    const queryPromise = currentModule.getQueryPromise();
    await advanceUntilPromiseResolved(promise);
    const result1 = await queryPromise;
    const result2 = await promise;
    expect(result1).toMatchObject(result2);
  });

  it('Cancel() aborts the query and emits signals', async () => {
    initTests({
      responses: [successfulResponse, successfulResponse],
    });
    expect(currentModule.getState()).toBe(graphQLModuleStates.IDLE);
    expect(currentModule.isLoading()).toBeFalsy();
    const abortedLoad = currentModule.query();
    currentModule.cancel();
    await advanceUntilPromiseResolved(abortedLoad);
    const [abortErr, abortResult] = await to(abortedLoad);
    expect(isAbortError((abortErr as ApolloError).networkError as Error)).toBeTruthy();
    expect(abortResult).not.toBeDefined();
    expect(currentModule.isLoading()).toBeFalsy();
    expect(getEmittedEventTypes()).toEqual([
      graphQLModuleEvents.GRAPHQL_MODULE_LOADING,
      graphQLModuleEvents.GRAPHQL_MODULE_LOAD_ABORTED,
    ]);
  });

  it('Multiple query executions clear previous data and sets new', async () => {
    const createSuccessfulStep = (id: number): TestQueryStep => {
      const response = createSuccessResponse({ id });
      return {
        response,
        eventSignals: [graphQLModuleEvents.GRAPHQL_MODULE_LOADING, graphQLModuleEvents.GRAPHQL_MODULE_LOAD_SUCCESS],
        expectedResult: (response.data as GraphQLQueryResult).data,
      };
    };
    const errorResponseStep: TestQueryStep = {
      response: errorResponse,
      errorSignals: [graphQLModuleError.GRAPHQL_LOAD_FAILED],
      expectedQueryError: graphQLModuleError.GRAPHQL_LOAD_FAILED,
    };
    const abortStep: TestQueryStep = {
      execute: () => {
        const promise = currentModule.query().catch(promiseCatcher);
        currentModule.cancel();
        return promise;
      },
      expectPromiseToFail: true,
      response: createSuccessResponse({ id: 66 }),
      eventSignals: [graphQLModuleEvents.GRAPHQL_MODULE_LOADING, graphQLModuleEvents.GRAPHQL_MODULE_LOAD_ABORTED],
    };
    const emptyCancel: TestQueryStep = {
      execute: () => {
        currentModule.cancel();
        return Promise.resolve();
      },
    };
    const emptyClear: TestQueryStep = {
      execute: () => {
        currentModule.clear();
        return Promise.resolve();
      },
    };
    const sequence: TestQueryStep[] = [
      createSuccessfulStep(1),
      createSuccessfulStep(2),
      errorResponseStep,
      abortStep,
      createSuccessfulStep(3),
      errorResponseStep,
      errorResponseStep,
      emptyClear,
      emptyCancel,
      emptyCancel,
      emptyClear,
      createSuccessfulStep(4),
      createSuccessfulStep(5),
    ];
    initTests({
      responses: sequence.map((s) => s.response).filter((r) => !!r) as ResponseType[],
    });

    let queryPromise: Promise<QueryResult | void> | undefined;
    /* eslint-disable jest/no-conditional-expect, no-await-in-loop, no-restricted-syntax */
    // cannot use async/await with array.forEach
    for (const step of sequence) {
      const { execute, errorSignals, eventSignals, expectedQueryError, expectedResult, expectPromiseToFail } = step;
      const eventSignalsBefore = getEmittedEventTypes();
      const errorSignalsBefore = getEmittedErrors();
      // wait for previous promise to end
      if (queryPromise) {
        await to(queryPromise);
      }
      promiseCatcher.mockReset();

      queryPromise = execute ? execute() : currentModule.query().catch(promiseCatcher);
      await advanceUntilPromiseResolved(queryPromise);
      const error = getLastMockCallArgs(promiseCatcher);
      const result = (await queryPromise) as QueryResult;
      if (expectedResult) {
        expect(result).toBeDefined();
        expect(result.data).toBeDefined();
        expect(result.loading).toBeDefined();
        expect(result.networkStatus).toBeDefined();
        expect(expectedResult).toEqual(currentModule.getData());
        expect(currentModule.getError()).toBeUndefined();
        expect(currentModule.isLoading()).toBeFalsy();
        expect(currentModule.getClientErrors()).toHaveLength(0);
      } else {
        expect(result).toBeUndefined();
        expect(currentModule.getData()).toBeUndefined();
      }
      if (expectPromiseToFail && !expectedQueryError) {
        expect(error).toBeDefined();
      } else if (expectedQueryError) {
        expect(error).toBeDefined();
        expect(currentModule.getClientErrors()).toHaveLength(1);
        expect((currentModule.getError() as GraphQLModuleError).type).toBe(expectedQueryError);
      } else {
        expect(error).toBeUndefined();
        expect(currentModule.getError()).toBeUndefined();
        expect(currentModule.getClientErrors()).toHaveLength(0);
      }

      expect(currentModule.getState()).toBe(graphQLModuleStates.IDLE);
      expect(currentModule.isLoading()).toBeFalsy();
      const eventSignalsAfter = getEmittedEventTypes();
      const errorSignalsAfter = getEmittedErrors();
      const newEvents = eventSignalsAfter.slice(eventSignalsBefore.length);
      const newErrors = errorSignalsAfter.slice(errorSignalsBefore.length);
      if (eventSignals) {
        expect(eventSignals).toEqual(newEvents);
      }
      if (errorSignals) {
        expect(errorSignals).toEqual(newErrors.map((e) => e.type));
      }
      /* eslint-enable jest/no-conditional-expect, no-await-in-loop, no-restricted-syntax */
    }
  });
  it('ApiToken update signal triggers load once', async () => {
    initTests({
      responses: [successfulResponse, successfulResponse],
      moduleOptions: {
        requireApiTokens: true,
      },
      createApiTokenClient: true,
    });
    expect(currentModule.getState()).toBe(graphQLModuleStates.IDLE);
    expect(currentModule.isLoading()).toBeFalsy();
    act(() => {
      emitApiTokensUpdatedStateChange(defaultApiTokens);
    });
    expect(currentModule.isLoading()).toBeTruthy();
    const promise = currentModule.getQueryPromise();
    await advanceUntilPromiseResolved(promise);
    const [, result] = await to(promise);
    expect(currentModule.isLoading()).toBeFalsy();
    expect(result && result.data).toEqual(currentModule.getData());
    expect(currentModule.getData()).toEqual(getResponseDataObj(successfulResponse));
    act(() => {
      emitApiTokensUpdatedStateChange(defaultApiTokens);
    });
    expect(currentModule.isLoading()).toBeFalsy();
    expect(getEmittedEventTypes()).toEqual([
      graphQLModuleEvents.GRAPHQL_MODULE_LOADING,
      graphQLModuleEvents.GRAPHQL_MODULE_LOAD_SUCCESS,
    ]);
    currentModule.clear();
    act(() => {
      emitApiTokensUpdatedStateChange(defaultApiTokens);
    });
    expect(currentModule.isLoading()).toBeFalsy();
    expect(getEmittedEventTypes()).toEqual([
      graphQLModuleEvents.GRAPHQL_MODULE_LOADING,
      graphQLModuleEvents.GRAPHQL_MODULE_LOAD_SUCCESS,
      graphQLModuleEvents.GRAPHQL_MODULE_CLEARED,
    ]);
  });
  it('If apiTokens exists on initialization, query is executed automatically', async () => {
    initTests({
      responses: [successfulResponse, successfulResponse],
      apiTokens: defaultApiTokens,
      moduleOptions: {
        requireApiTokens: true,
      },
    });
    expect(currentModule.getState()).toBe(graphQLModuleStates.LOADING);
    expect(currentModule.isLoading()).toBeTruthy();
    const promise = currentModule.getQueryPromise();
    await advanceUntilPromiseResolved(promise);
    expect(getEmittedEventTypes()).toEqual([
      graphQLModuleEvents.GRAPHQL_MODULE_LOADING,
      graphQLModuleEvents.GRAPHQL_MODULE_LOAD_SUCCESS,
    ]);
  });
  it('When querying twice and options.abortIfLoading is false, second query is not started and on-going promise is returned', async () => {
    initTests({
      responses: [successfulResponse, successfulResponse],
      apiTokens: defaultApiTokens,
      moduleOptions: {
        abortIfLoading: false,
      },
    });
    currentModule.query();
    expect(getEmittedEventTypes()).toEqual([graphQLModuleEvents.GRAPHQL_MODULE_LOADING]);
    const firstQueryPromise = currentModule.getQueryPromise();
    currentModule.query();
    const secondQueryPromise = currentModule.getQueryPromise();
    expect(firstQueryPromise === secondQueryPromise).toBeTruthy();
    await advanceUntilPromiseResolved(secondQueryPromise);
    expect(getEmittedEventTypes()).toEqual([
      graphQLModuleEvents.GRAPHQL_MODULE_LOADING,
      graphQLModuleEvents.GRAPHQL_MODULE_LOAD_SUCCESS,
    ]);
  });
  it('When querying twice and options.abortIfLoading is true (default), first query is aborted and new a one started', async () => {
    initTests({
      responses: [successfulResponse, successfulResponse],
      apiTokens: defaultApiTokens,
      moduleOptions: {
        abortIfLoading: true,
      },
    });

    currentModule.query().catch(promiseCatcher);
    expect(getEmittedEventTypes()).toEqual([graphQLModuleEvents.GRAPHQL_MODULE_LOADING]);
    const firstQueryPromise = currentModule.getQueryPromise();
    currentModule.query().catch(promiseCatcher);

    await waitFor(() => {
      expect(getEmittedEventTypes()).toEqual([
        graphQLModuleEvents.GRAPHQL_MODULE_LOADING,
        graphQLModuleEvents.GRAPHQL_MODULE_LOAD_ABORTED,
        graphQLModuleEvents.GRAPHQL_MODULE_LOADING,
      ]);
    });

    const secondQueryPromise = currentModule.getQueryPromise();
    expect(firstQueryPromise === secondQueryPromise).toBeFalsy();

    await advanceUntilPromiseResolved(secondQueryPromise);
    expect(getEmittedEventTypes()).toEqual([
      graphQLModuleEvents.GRAPHQL_MODULE_LOADING,
      graphQLModuleEvents.GRAPHQL_MODULE_LOAD_ABORTED,
      graphQLModuleEvents.GRAPHQL_MODULE_LOADING,
      graphQLModuleEvents.GRAPHQL_MODULE_LOAD_SUCCESS,
    ]);
  });
  it('If apiTokens are required, but not ready, querying will return a rejected promise', async () => {
    initTests({
      responses: [successfulResponse, successfulResponse],
      createApiTokenClient: true,
      moduleOptions: {
        requireApiTokens: true,
      },
    });
    expect(promiseCatcher).toHaveBeenCalledTimes(0);
    const promise = currentModule.query().catch(promiseCatcher);
    await advanceUntilPromiseResolved(promise);
    expect(promiseCatcher).toHaveBeenCalledTimes(1);
    expect(getEmittedEventTypes()).toHaveLength(0);
    // this will also trigger query
    emitApiTokensUpdatedStateChange(defaultApiTokens);
    expect(currentModule.isLoading()).toBeTruthy();
    await advanceUntilPromiseResolved(currentModule.getQueryPromise());
    const promise2 = currentModule.query().catch(promiseCatcher);
    await advanceUntilPromiseResolved(promise2);
    expect(promiseCatcher).toHaveBeenCalledTimes(1);
    expect(getEmittedEventTypes()).toEqual([
      graphQLModuleEvents.GRAPHQL_MODULE_LOADING,
      graphQLModuleEvents.GRAPHQL_MODULE_LOAD_SUCCESS,
      graphQLModuleEvents.GRAPHQL_MODULE_LOADING,
      graphQLModuleEvents.GRAPHQL_MODULE_LOAD_SUCCESS,
    ]);
    expect(currentModule.isLoading()).toBeFalsy();
  });
  it('If apiTokens are removed/renewed, a query will wait for api tokens to update', async () => {
    initTests({
      responses: [successfulResponse],
      apiTokens: defaultApiTokens,
      moduleOptions: {
        requireApiTokens: true,
        autoFetch: false,
      },
    });
    emitApiTokensRemovedStateChange();
    const promise = currentModule.query().catch(promiseCatcher);
    expect(promiseCatcher).toHaveBeenCalledTimes(0);
    const tokenPromise = currentModule.waitForApiTokens();
    emitApiTokensUpdatedStateChange(defaultApiTokens);
    await advanceUntilPromiseResolved(promise);
    const success = await tokenPromise;
    expect(getEmittedEventTypes()).toEqual([
      graphQLModuleEvents.GRAPHQL_MODULE_LOADING,
      graphQLModuleEvents.GRAPHQL_MODULE_LOAD_SUCCESS,
    ]);
    expect(success === true).toBeTruthy();
  });
  it('If apiTokens are removed/renewed while querying, a query will be cancelled.', async () => {
    initTests({
      responses: [successfulResponse],
      apiTokens: defaultApiTokens,
      moduleOptions: {
        requireApiTokens: true,
        autoFetch: false,
      },
    });
    const promise = currentModule.query().catch(promiseCatcher);
    emitApiTokensRemovedStateChange();
    const tokenPromise = currentModule.waitForApiTokens();
    emitApiTokensUpdatedStateChange(defaultApiTokens);
    await advanceUntilPromiseResolved(promise);
    const success = await tokenPromise;
    expect(getEmittedEventTypes()).toEqual([
      graphQLModuleEvents.GRAPHQL_MODULE_LOADING,
      graphQLModuleEvents.GRAPHQL_MODULE_LOAD_ABORTED,
    ]);
    expect(success === true).toBeTruthy();
    expect(promiseCatcher).toHaveBeenCalledTimes(1);
  });
  it('If apiTokens are awaited, cancel() will fulfill the pending api token promise and reject query() promise.', async () => {
    initTests({
      responses: [successfulResponse],
      apiTokens: defaultApiTokens,
      moduleOptions: {
        requireApiTokens: true,
        autoFetch: false,
      },
    });
    emitApiTokensRemovedStateChange();

    const promise = currentModule.query().catch(promiseCatcher);
    expect(currentModule.isLoading()).toBeFalsy();

    const tokenPromise = currentModule.waitForApiTokens();

    currentModule.cancel();

    const result = await promise;
    const success = await tokenPromise;

    emitApiTokensUpdatedStateChange(defaultApiTokens);

    expect(getEmittedEventTypes()).toEqual([]);
    expect(currentModule.isLoading()).toBeFalsy();
    expect(success === false).toBeTruthy();
    expect(result).toBeUndefined();
    expect(promiseCatcher).toHaveBeenCalledTimes(1);
  });
  it('Pending apiTokens will timeout. The promise will never reject, it returns true/false', async () => {
    initTests({
      responses: [successfulResponse],
      apiTokens: defaultApiTokens,
      moduleOptions: {
        requireApiTokens: true,
        autoFetch: false,
      },
    });
    emitApiTokensRemovedStateChange();
    const tokenPromise = currentModule.waitForApiTokens(10).catch(promiseCatcher);
    expect(promiseCatcher).toHaveBeenCalledTimes(0);
    await advanceUntilPromiseResolved(tokenPromise);
    const success = await tokenPromise;
    expect(getEmittedEventTypes()).toEqual([]);
    expect(currentModule.isLoading()).toBeFalsy();
    expect(success === false).toBeTruthy();
    expect(promiseCatcher).toHaveBeenCalledTimes(0);
  });
  it('If api tokens already exists, waitForApiTokens() resolves immediately', async () => {
    initTests({
      responses: [successfulResponse],
      apiTokens: defaultApiTokens,
      moduleOptions: {
        requireApiTokens: true,
      },
    });
    const success = await currentModule.waitForApiTokens().catch(promiseCatcher);
    expect(success === true).toBeTruthy();
    expect(promiseCatcher).toHaveBeenCalledTimes(0);
  });
  it('If client is not defined, query() is rejected immediately', async () => {
    initTests({
      responses: [successfulResponse],
      apiTokens: defaultApiTokens,
      moduleOptions: {
        requireApiTokens: true,
      },
      noApolloClient: true,
    });
    const result = await currentModule.query().catch(promiseCatcher);
    expect(promiseCatcher).toHaveBeenCalledTimes(1);
    expect(currentModule.isLoading()).toBeFalsy();
    expect(result).toBeUndefined();
  });
  it('If query is not defined, query() is rejected immediately', async () => {
    initTests({
      responses: [successfulResponse],
      apiTokens: defaultApiTokens,
      moduleOptions: {
        requireApiTokens: true,
      },
      noQuery: true,
    });
    const result = await currentModule.query().catch(promiseCatcher);
    expect(promiseCatcher).toHaveBeenCalledTimes(1);
    expect(currentModule.isLoading()).toBeFalsy();
    expect(result).toBeUndefined();
  });
  it('props passed to query() override inital props passed when creating the module', async () => {
    const queryOptions: GraphQLModuleModuleProps['queryOptions'] = {
      fetchPolicy: 'cache-only',
      variables: {
        initial: true,
      },
    };
    initTests({
      responses: [successfulResponse, successfulResponse, successfulResponse],
      moduleOptions: {
        requireApiTokens: false,
      },
      queryOptions,
    });

    // this query has "cache-only", so no fetch is done
    const promise = currentModule.query().catch(promiseCatcher);
    await promise;
    expect(promiseCatcher).toHaveBeenCalledTimes(0);
    expect(getQueryParams()).toMatchObject(queryOptions);

    const overrides: GraphQLModuleModuleProps['queryOptions'] = {
      fetchPolicy: 'network-only',
      variables: {
        initial: false,
        override: true,
      },
    };
    const newPromise = currentModule.query({ queryOptions: overrides }).catch(promiseCatcher);
    currentModule.cancel();
    await advanceUntilPromiseResolved(newPromise);
    expect(getQueryParams()).toMatchObject({ ...queryOptions, ...overrides });

    const abortOverride: GraphQLModuleModuleProps['queryOptions'] = {
      variables: {
        abortOverride: true,
      },
      context: { fetchOptions: { mode: 'no-cors', priority: 'high' } },
    };
    const lastPromise = currentModule
      .query({ queryOptions: abortOverride, query: { fake: true } as unknown as TypedDocumentNode })
      .catch(promiseCatcher);
    currentModule.cancel();
    await advanceUntilPromiseResolved(lastPromise);
    expect(getQueryParams()).toMatchObject({ ...queryOptions, ...abortOverride });
    expect(getQueryParams().context.fetchOptions.signal).toBeDefined();
  });
  it('queryCache() sets queryOptions.fetchPolicy to "cache-only". Function args override module options.', async () => {
    const queryOptions: GraphQLModuleModuleProps['queryOptions'] = {
      fetchPolicy: 'network-only',
      variables: {
        initial: true,
      },
    };
    initTests({
      responses: [],
      moduleOptions: {
        requireApiTokens: false,
      },
      queryOptions,
    });

    const overrides: GraphQLModuleModuleProps['queryOptions'] = {
      fetchPolicy: 'no-cache',
      variables: {
        initial: false,
        override: true,
      },
    };
    // this query has "cache-only", so no fetch is done
    await currentModule.queryCache({ queryOptions: overrides }).catch(promiseCatcher);
    expect(getQueryParams()).toMatchObject({ ...queryOptions, ...overrides, fetchPolicy: 'cache-only' });
  });
  it('queryServer() sets queryOptions.fetchPolicy to "network-only". Function args override module options.', async () => {
    const queryOptions: GraphQLModuleModuleProps['queryOptions'] = {
      fetchPolicy: 'cache-only',
      variables: {
        initial: true,
      },
    };
    initTests({
      responses: [successfulResponse],
      moduleOptions: {
        requireApiTokens: false,
      },
      queryOptions,
    });

    const overrides: GraphQLModuleModuleProps['queryOptions'] = {
      fetchPolicy: 'no-cache',
      variables: {
        initial: false,
        override: true,
      },
    };
    // this query has "cache-only", so no fetch is done
    const promise = currentModule.queryServer({ queryOptions: overrides }).catch(promiseCatcher);
    expect(getQueryParams()).toMatchObject({ ...queryOptions, ...overrides, fetchPolicy: 'network-only' });
    await advanceUntilPromiseResolved(promise);
  });
  it('setClient() sets and stores a client', async () => {
    initTests({
      responses: [successfulResponse],
      apiTokens: defaultApiTokens,
      moduleOptions: {
        requireApiTokens: true,
      },
      noApolloClient: true,
    });
    await currentModule.query().catch(promiseCatcher);
    expect(promiseCatcher).toHaveBeenCalledTimes(1);
    currentModule.setClient(createApolloClientMock());
    await advanceUntilPromiseResolved(currentModule.query().catch(promiseCatcher));
    expect(promiseCatcher).toHaveBeenCalledTimes(1);
  });
});
