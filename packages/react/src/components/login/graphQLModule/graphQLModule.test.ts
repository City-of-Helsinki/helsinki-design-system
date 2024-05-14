/* eslint-disable jest/no-mocks-import */
import HttpStatusCode from 'http-status-typed';
import { disableFetchMocks, enableFetchMocks } from 'jest-fetch-mock';
import { to } from 'await-to-js';
import { ApolloError, QueryResult } from '@apollo/client';
import { act } from '@testing-library/react';

import { Beacon, ConnectedModule, createBeacon, SignalType } from '../beacon/beacon';
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
  graphQLModuleNamespace,
  graphQLModuleStates,
  GraphQLQueryResult,
} from './index';
// import { createMockTestUtil } from '../testUtils/mockTestUtil';
import { graphQLModuleError, GraphQLModuleError, GraphQLModuleErrorType } from './graphQLModuleError';
import { createApolloClientMock, mockedGraphQLUri } from './__mocks__/apolloClient.mock';
import { ApiTokenClient, apiTokensClientEvents, apiTokensClientNamespace, TokenData } from '../apiTokensClient';
import { mockResponse } from './__mocks__/mockResponses';
import { USER_QUERY } from './__mocks__/mockData';
import { advanceUntilPromiseResolved } from '../testUtils/timerTestUtil';
import { isAbortError } from '../utils/abortFetch';
import { getLastMockCallArgs } from '../../../utils/testHelpers';

type ResponseType = { returnedStatus: HttpStatusCode; data?: GraphQLQueryResult | null; error?: Error };

type Step = {
  response?: ResponseType;
  eventSignals?: GraphQLModuleEvent[];
  errorSignals?: GraphQLModuleErrorType[];
  expectPromiseToFail?: boolean;
  expectedQueryError?: GraphQLModuleErrorType;
  expectedResult?: unknown;
  fn?: () => Promise<void>;
};

// const mockMapForAbort = createMockTestUtil();

describe(`graphQLModule`, () => {
  const createSuccessResponse = (overrides: { id?: number; name?: string; profile?: unknown } = {}): ResponseType => {
    const defaultResponse = mockResponse;
    return { returnedStatus: HttpStatusCode.OK, data: { ...defaultResponse, ...overrides } };
  };
  const successfulResponse: ResponseType = createSuccessResponse();
  const errorResponse: ResponseType = {
    returnedStatus: HttpStatusCode.SERVICE_UNAVAILABLE,
    error: new Error('Failed'),
  };
  const { cleanUp, setResponders, addResponse } = createControlledFetchMockUtil([{ path: mockedGraphQLUri }]);

  let currentModule: GraphQLModule;
  let currentBeacon: Beacon;
  let currentApolloClient: ReturnType<typeof createApolloClientMock>;
  let listenerModule: ReturnType<typeof createConnectedBeaconModule>;
  let apiTokenStorage: TokenData | null = null;
  const defaultApiTokens: TokenData = { token1: 'token1', token2: 'token2' };
  const promiseCatcher = jest.fn();

  const initTests = ({
    responses,
    createApiTokenClient,
    apiTokens,
    requireApiTokens = false,
  }: {
    responses: ResponseType[];
    createApiTokenClient?: boolean;
    apiTokens?: TokenData;
    requireApiTokens?: boolean;
  }) => {
    responses.forEach((response) => {
      addResponse({ status: response.returnedStatus, body: response.data ? JSON.stringify(response.data) : undefined });
    });
    currentApolloClient = createApolloClientMock();
    currentModule = createGraphQLModule({
      graphQLClient: currentApolloClient,
      query: USER_QUERY,
      queryOptions: {
        fetchPolicy: 'no-cache',
      },
      options: {
        requireApiTokens,
      },
    });

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
      const promise = currentModule.getQueryPromise();
      currentModule.clear();
      await advanceUntilPromiseResolved(promise);
    }

    await cleanUp();
    jest.runOnlyPendingTimers();
    jest.useRealTimers();
    jest.clearAllMocks();
    currentBeacon.clear();
    apiTokenStorage = null;
    // mockMapForAbort.clear();
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

  it('Query() calls given url and signals are emitted', async () => {
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

  it('Failing Queries are handled and emit error signals', async () => {
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
    const createSuccessfulStep = (id: number): Step => {
      const response = createSuccessResponse({ id });
      return {
        response,
        eventSignals: [graphQLModuleEvents.GRAPHQL_MODULE_LOADING, graphQLModuleEvents.GRAPHQL_MODULE_LOAD_SUCCESS],
        expectedResult: (response.data as GraphQLQueryResult).data,
      };
    };
    const errorResponseStep: Step = {
      response: errorResponse,
      errorSignals: [graphQLModuleError.GRAPHQL_LOAD_FAILED],
      expectedQueryError: graphQLModuleError.GRAPHQL_LOAD_FAILED,
    };
    const abortStep: Step = {
      fn: () => {
        const promise = currentModule.query().catch(promiseCatcher);
        currentModule.cancel();
        return promise;
      },
      expectPromiseToFail: true,
      response: createSuccessResponse({ id: 66 }),
      eventSignals: [graphQLModuleEvents.GRAPHQL_MODULE_LOADING, graphQLModuleEvents.GRAPHQL_MODULE_LOAD_ABORTED],
    };
    const emptyCancel: Step = {
      fn: () => {
        currentModule.cancel();
        return Promise.resolve();
      },
    };
    const emptyClear: Step = {
      fn: () => {
        currentModule.clear();
        return Promise.resolve();
      },
    };
    const sequence: Step[] = [
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
      const { fn, errorSignals, eventSignals, expectedQueryError, expectedResult, expectPromiseToFail } = step;
      const eventSignalsBefore = getEmittedEventTypes();
      const errorSignalsBefore = getEmittedErrors();
      // wait for previous promise to end
      if (queryPromise) {
        await to(queryPromise);
      }
      promiseCatcher.mockReset();

      queryPromise = fn ? fn() : currentModule.query().catch(promiseCatcher);
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
      } else {
        expect(result).toBeUndefined();
      }
      if (expectPromiseToFail && !expectedQueryError) {
        expect(error).toBeDefined();
      } else if (expectedQueryError) {
        expect(error).toBeDefined();
        expect((currentModule.getError() as GraphQLModuleError).type).toBe(expectedQueryError);
      } else {
        expect(error).toBeUndefined();
        expect(currentModule.getError()).toBeUndefined();
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
      requireApiTokens: true,
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
      requireApiTokens: true,
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
});
