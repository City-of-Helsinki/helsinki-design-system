/* eslint-disable jest/expect-expect */
/* eslint-disable jest/no-mocks-import */
import HttpStatusCode from 'http-status-typed';
import { disableFetchMocks, enableFetchMocks } from 'jest-fetch-mock';
import { to } from 'await-to-js';
import { ApolloQueryResult, QueryResult, TypedDocumentNode } from '@apollo/client';
import { waitFor } from '@testing-library/react';

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
  GraphQLQueryResult,
} from './index';
import { graphQLModuleError, GraphQLModuleError, GraphQLModuleErrorType } from './graphQLModuleError';
import { createApolloClientMock, mockedGraphQLUri } from './__mocks__/apolloClient.mock';
import { ApiTokenClient, apiTokensClientEvents, apiTokensClientNamespace, TokenData } from '../apiTokensClient';
import { createQueryResponse, createQueryResponseWithErrors } from './__mocks__/mockResponses';
import { USER_QUERY } from './__mocks__/mockData';
import { advanceUntilPromiseResolved } from '../testUtils/timerTestUtil';
import { getLastMockCallArgs } from '../../../utils/testHelpers';

type ResponseType = { returnedStatus: HttpStatusCode; data?: GraphQLQueryResult | null; error?: Error };

type TestQueryStep = {
  response?: ResponseType;
  eventSignals?: GraphQLModuleEvent[];
  errorSignals?: GraphQLModuleErrorType[];
  expectPromiseToFail?: boolean;
  expectedQueryError?: GraphQLModuleErrorType;
  expectedResult?: unknown;
  expectToKeepResults?: boolean;
  expectToKeepError?: boolean;
  willLoad?: boolean;
  willBePending?: boolean;
  willHaveErrorsInResult?: boolean;
  willAutoStart?: boolean;
  execute?: (promiseCatcher: jest.Mock) => Promise<void | ApolloQueryResult<GraphQLQueryResult>>;
  postQueryTest?: (promise: Promise<unknown>) => Promise<unknown>;
};

type TestStepResult = { error: Error | GraphQLModuleError | null; data: GraphQLQueryResult | null };

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

  const getEmittedErrors = () => {
    return getReceivedErrorSignalPayloads<GraphQLModuleError>(listenerModule);
  };

  const getEmittedEventTypes = () => {
    return getReceivedEventSignalPayloads(listenerModule).map((payload) => payload.type);
  };

  /**
   * Tests follow usually the same pattern:
   * - define responses
   * - query
   * - await for query to end
   * - check result / errors
   * - check event / error signals
   *
   * "Steps" are metadata for that test pattern. They tell the runTestSequence() what to expect in each step of a test sequence.
   * Instead of repeating same expect() calls, the runTestSequence() has all necessary tests.
   *
   * If a test does not want to call "module.query()" automatically, a "step" may have an "executor" that is called instead of query.
   *
   */

  const createSuccessfulStep = (id: number = 1): TestQueryStep => {
    const response = createSuccessResponse({ id });
    return {
      response,
      eventSignals: [graphQLModuleEvents.GRAPHQL_MODULE_LOADING, graphQLModuleEvents.GRAPHQL_MODULE_LOAD_SUCCESS],
      expectedResult: (response.data as GraphQLQueryResult).data,
      willBePending: true,
      willLoad: true,
      expectPromiseToFail: false,
      expectedQueryError: undefined,
      errorSignals: [],
    };
  };

  const createErrorStep = (): TestQueryStep => {
    return {
      response: errorResponse,
      errorSignals: [graphQLModuleError.GRAPHQL_LOAD_FAILED],
      expectedQueryError: graphQLModuleError.GRAPHQL_LOAD_FAILED,
    };
  };

  const createClearStep = (): TestQueryStep => {
    return {
      execute: () => {
        currentModule.clear();
        return Promise.resolve();
      },
      expectPromiseToFail: false,
      expectedQueryError: undefined,
      expectedResult: undefined,
      willBePending: false,
      willLoad: false,
      eventSignals: [graphQLModuleEvents.GRAPHQL_MODULE_CLEARED],
    };
  };

  const createCancelStep = (expectToKeepResults = false, expectToKeepError = false): TestQueryStep => {
    return {
      execute: () => {
        currentModule.cancel();
        return Promise.resolve();
      },
      willBePending: false,
      willLoad: false,
      expectToKeepResults,
      expectToKeepError,
      eventSignals: [],
    };
  };

  const createQueryStepWithCancelOrClear = (cancelOrClear: 'cancel' | 'clear'): TestQueryStep => {
    const willClear = cancelOrClear === 'clear';
    return {
      execute: (errorCatcher) => {
        const promise = currentModule.query().catch(errorCatcher);
        if (willClear) {
          // test isPending until clear() unsets promises
          expect(currentModule.isPending()).toBeTruthy();
          currentModule.clear();
        } else {
          currentModule.cancel();
        }
        return promise;
      },
      // clear() will unset promises and isPending() === false
      willBePending: !willClear,
      willLoad: true,
      expectPromiseToFail: true,
      response: createSuccessResponse({ id: 66 }),
      eventSignals: willClear
        ? [
            graphQLModuleEvents.GRAPHQL_MODULE_LOADING,
            graphQLModuleEvents.GRAPHQL_MODULE_CLEARED,
            graphQLModuleEvents.GRAPHQL_MODULE_LOAD_ABORTED,
          ]
        : [graphQLModuleEvents.GRAPHQL_MODULE_LOADING, graphQLModuleEvents.GRAPHQL_MODULE_LOAD_ABORTED],
    };
  };

  const createAutoStartingQueryStepProps = (): Partial<TestQueryStep> => {
    return {
      willAutoStart: true,
      execute: () => {
        return currentModule.getQueryPromise();
      },
      eventSignals: [graphQLModuleEvents.GRAPHQL_MODULE_LOAD_SUCCESS],
    };
  };

  const createEmptyStep = (overrides: Partial<TestQueryStep> = {}): Partial<TestQueryStep> => {
    return {
      willHaveErrorsInResult: false,
      willLoad: false,
      willAutoStart: false,
      willBePending: false,
      errorSignals: undefined,
      expectPromiseToFail: false,
      expectToKeepError: false,
      expectedResult: undefined,
      expectToKeepResults: false,
      expectedQueryError: undefined,
      execute: () => {
        return Promise.resolve();
      },
      eventSignals: undefined,
      ...overrides,
    };
  };
  const createFailingQueryWithoutEmittedSignalsStep = (): Partial<TestQueryStep> => {
    return {
      ...createSuccessfulStep(),
      response: undefined,
      expectPromiseToFail: true,
      eventSignals: [],
      errorSignals: [],
      willLoad: false,
      willBePending: false,
      expectedResult: undefined,
    };
  };

  const emitApiTokenChangeWithNoChangesStep: TestQueryStep = {
    ...createEmptyStep(),
    execute: async () => {
      emitApiTokensUpdatedStateChange(defaultApiTokens);
      return Promise.resolve();
    },
  };

  const emitApiTokensRemovedWithNoChangesStep: TestQueryStep = {
    ...createEmptyStep(),
    execute: async () => {
      emitApiTokensRemovedStateChange();
      return Promise.resolve();
    },
  };

  const emitApiTokenChangeAndReturnQueryPromiseStep: TestQueryStep = {
    ...createSuccessfulStep(),
    execute: async () => {
      emitApiTokensUpdatedStateChange(defaultApiTokens);
      return currentModule.getQueryPromise();
    },
  };

  const createQueryAfterApiTokensUpdatedStep = (): TestQueryStep => {
    let awaitPromise: Promise<unknown>;
    return {
      ...createSuccessfulStep(),
      execute: async (handlePromiseFailure) => {
        const promise = currentModule.query().catch(handlePromiseFailure);
        awaitPromise = currentModule.waitForApiTokens().catch(handlePromiseFailure);
        expect(getEmittedEventTypes().includes(graphQLModuleEvents.GRAPHQL_MODULE_LOADING)).toBeFalsy();
        emitApiTokensUpdatedStateChange(defaultApiTokens);
        return promise;
      },
      postQueryTest: async () => {
        const apiTokenSuccess = await awaitPromise;
        expect(apiTokenSuccess).toBeTruthy();
        return awaitPromise;
      },
      // query fetch will not start immediately
      willLoad: false,
    };
  };
  const createRemoveApiTokensAfterQueryStep = (): TestQueryStep => {
    return {
      ...createSuccessfulStep(),
      execute: async (handlePromiseFailure) => {
        const promise = currentModule.query().catch(handlePromiseFailure);
        emitApiTokensRemovedStateChange();
        return promise;
      },
      postQueryTest: async () => {
        const tokenPromise = currentModule.waitForApiTokens();
        emitApiTokensUpdatedStateChange(defaultApiTokens);
        const apiTokenSuccess = await tokenPromise;
        expect(apiTokenSuccess).toBeTruthy();
        return tokenPromise;
      },
      expectPromiseToFail: true,
      expectedResult: undefined,
      eventSignals: [graphQLModuleEvents.GRAPHQL_MODULE_LOADING, graphQLModuleEvents.GRAPHQL_MODULE_LOAD_ABORTED],
    };
  };
  const waitForApiTokensAndEmitApiTokenChangeWithStep: TestQueryStep = {
    ...createEmptyStep(),
    execute: async (handlePromiseFailure) => {
      const tokenPromise = currentModule.waitForApiTokens().catch(handlePromiseFailure);
      emitApiTokensUpdatedStateChange(defaultApiTokens);
      const apiTokenSuccess = await tokenPromise;
      expect(apiTokenSuccess).toBeTruthy();
      return Promise.resolve();
    },
  };

  const waitForApiTokensPromiseTimeoutStep: TestQueryStep = {
    ...createEmptyStep(),
    execute: async (handlePromiseFailure) => {
      expect(handlePromiseFailure).toHaveBeenCalledTimes(0);
      const tokenPromise = currentModule.waitForApiTokens(1000).catch(handlePromiseFailure);
      const success = await tokenPromise;
      expect(success === false).toBeTruthy();
      // then() has empty function to return undefined or results are compared.
      return tokenPromise.then(() => {});
    },
    expectPromiseToFail: false,
    // when called, apiTokensPromise exists and isPending() is true
    willBePending: true,
  };

  const queryButCancelWithApiTokenAwaitCheckStep: TestQueryStep = {
    ...createSuccessfulStep(),
    postQueryTest: async () => {
      const tokenPromise = currentModule.waitForApiTokens();
      currentModule.cancel();
      const success = await tokenPromise;
      expect(success).toBeFalsy();
      return Promise.resolve();
    },
    expectPromiseToFail: true,
    expectedResult: undefined,
    eventSignals: [graphQLModuleEvents.GRAPHQL_MODULE_LOADING, graphQLModuleEvents.GRAPHQL_MODULE_LOAD_ABORTED],
  };

  const runTestSequence = async (sequence: TestQueryStep[]): Promise<Array<TestStepResult>> => {
    let queryPromise: Promise<QueryResult | void> | undefined;
    /* eslint-disable jest/no-conditional-expect, no-await-in-loop, no-restricted-syntax */
    // cannot use async/await with array.forEach
    const sequenceResults: Array<TestStepResult> = [];
    const handlePromiseFailure = jest.fn();
    for (const step of sequence) {
      console.log('step', step);
      const {
        execute,
        errorSignals,
        eventSignals,
        expectedQueryError,
        expectedResult,
        expectPromiseToFail,
        willBePending,
        willLoad,
        expectToKeepResults,
        expectToKeepError,
        willAutoStart,
        postQueryTest,
      } = step;
      const stepResults: TestStepResult = { error: null, data: null };
      const eventSignalsBefore = getEmittedEventTypes();
      const errorSignalsBefore = getEmittedErrors();
      // wait for previous promise to end
      if (queryPromise) {
        await to(queryPromise);
      }
      handlePromiseFailure.mockReset();

      const willQuery = !!expectedResult || !!expectedQueryError;
      const isPendingResult = willBePending !== undefined ? willBePending : willQuery;
      const isLoadingResult = willLoad !== undefined ? willLoad : willQuery;
      expect(currentModule.isLoading()).toBe(willAutoStart === true);
      expect(currentModule.isPending()).toBe(willAutoStart === true);
      queryPromise = execute ? execute(handlePromiseFailure) : currentModule.query().catch(handlePromiseFailure);
      expect(currentModule.isLoading()).toBe(isLoadingResult);
      expect(currentModule.isPending()).toBe(isPendingResult);
      if (postQueryTest) {
        await postQueryTest(queryPromise);
      }
      await advanceUntilPromiseResolved(queryPromise);
      const error = getLastMockCallArgs(handlePromiseFailure);
      const result = (await queryPromise) as QueryResult;
      console.log('queryPromise done', error, result);

      expect(currentModule.isLoading()).toBe(false);
      expect(currentModule.isPending()).toBe(false);

      if (expectedResult) {
        stepResults.data = currentModule.getData() || null;
        expect(result).toBeDefined();
        expect(result.data).toBeDefined();
        expect(result.loading).toBeDefined();
        expect(result.networkStatus).toBeDefined();
        expect(expectedResult).toEqual(currentModule.getData());
        expect(currentModule.getError()).toBeUndefined();
        expect(currentModule.isLoading()).toBeFalsy();
        expect(currentModule.isPending()).toBeFalsy();
        expect(currentModule.getClientErrors()).toHaveLength(0);
      } else if (expectToKeepResults) {
        expect(currentModule.getData()).toBeDefined();
        expect(currentModule.getResult()).toBeDefined();
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
      } else if (expectToKeepError) {
        expect(currentModule.getClientErrors()).toHaveLength(1);
        expect(currentModule.getError()).toBeDefined();
      } else {
        expect(error).toBeUndefined();
        expect(currentModule.getError()).toBeUndefined();
        expect(currentModule.getClientErrors()).toHaveLength(0);
      }

      stepResults.error = currentModule.getClientErrors()[0] || null;

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
      sequenceResults.push(stepResults);
      /* eslint-enable jest/no-conditional-expect, no-await-in-loop, no-restricted-syntax */
    }
    if (queryPromise) {
      await to(queryPromise);
    }
    return sequenceResults;
  };

  const pickSequeceResponsesToInit = (sequence: TestQueryStep[]) => {
    return sequence.map((s) => s.response).filter((r) => !!r) as ResponseType[];
  };

  let consoleErrorSpy: jest.SpyInstance;

  beforeAll(() => {
    enableFetchMocks();
    // ApolloClient emits errors when cached data is invalid. That does not matter in these tests.
    consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => null);
  });

  beforeEach(() => {
    jest.useFakeTimers();
    setResponders([{ path: mockedGraphQLUri }]);
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
    consoleErrorSpy.mockRestore();
  });

  it('The module is initiated in idle state.', async () => {
    initTests({
      responses: [],
    });
    expect(currentModule.isLoading()).toBeFalsy();
    expect(currentModule.isPending()).toBeFalsy();
    expect(currentModule.getClientErrors()).toHaveLength(0);
    expect(currentModule.getData()).toBeUndefined();
    expect(currentModule.getError()).toBeUndefined();
    expect(currentModule.getResult()).toBeUndefined();
  });

  it('Query() executes a fetch and event signals are emitted. Result is stored', async () => {
    const sequence = [createSuccessfulStep()];
    initTests({
      responses: pickSequeceResponsesToInit(sequence),
    });
    const sequenceResults = await runTestSequence(sequence);
    const stepResult = sequenceResults[0];
    expect(sequenceResults).toHaveLength(1);
    expect(stepResult.error).toBeNull();
    expect(stepResult.data).not.toBeNull();
  });

  it('Failing queries are handled and error signals are emitted', async () => {
    const sequence = [createErrorStep()];
    initTests({
      responses: pickSequeceResponsesToInit(sequence),
    });
    const sequenceResults = await runTestSequence(sequence);
    const stepResult = sequenceResults[0];
    expect(sequenceResults).toHaveLength(1);
    expect(stepResult.error).not.toBeNull();
    expect(stepResult.data).toBeNull();
    const emittedErrors = getEmittedErrors();
    expect(emittedErrors).toHaveLength(1);
    expect(emittedErrors[0].isLoadError).toBeTruthy();
    expect(emittedErrors[0].originalError).toBeDefined();
  });

  it('Clear() cancels a query and removes all stored results and errors', async () => {
    const successfulQueryWithClearStep: TestQueryStep = {
      ...createQueryStepWithCancelOrClear('clear'),
      response: createSuccessResponse({ id: 66 }),
    };
    const errorQueryWithClearStep: TestQueryStep = {
      ...createErrorStep(),
      ...createQueryStepWithCancelOrClear('clear'),
      expectedQueryError: undefined,
      errorSignals: undefined,
    };

    const sequence: TestQueryStep[] = [
      createSuccessfulStep(),
      createClearStep(),
      successfulQueryWithClearStep,
      errorQueryWithClearStep,
    ];
    initTests({
      responses: pickSequeceResponsesToInit(sequence),
    });
    const sequenceResults = await runTestSequence(sequence);
    expect(sequenceResults).toHaveLength(4);
    expect(getEmittedErrors()).toHaveLength(0);
    expect(getEmittedEventTypes()).toHaveLength(9);
  });

  it('Cancel() aborts the query and emits signals', async () => {
    const successfulQueryWithCancelStep: TestQueryStep = {
      ...createQueryStepWithCancelOrClear('cancel'),
      response: createSuccessResponse({ id: 66 }),
    };
    const errorQueryWithCancelStep: TestQueryStep = {
      ...createErrorStep(),
      ...createQueryStepWithCancelOrClear('cancel'),
      expectedQueryError: undefined,
      errorSignals: undefined,
    };

    const sequence: TestQueryStep[] = [
      createSuccessfulStep(),
      createCancelStep(true),
      successfulQueryWithCancelStep,
      createErrorStep(),
      errorQueryWithCancelStep,
    ];
    initTests({
      responses: pickSequeceResponsesToInit(sequence),
    });
    const sequenceResults = await runTestSequence(sequence);
    expect(sequenceResults).toHaveLength(5);
    expect(getEmittedErrors()).toHaveLength(1);
    expect(getEmittedEventTypes()).toHaveLength(7);
  });

  it('Multiple query executions clear previous data and sets new', async () => {
    const sequence: TestQueryStep[] = [
      createSuccessfulStep(1),
      createErrorStep(),
      createCancelStep(false, true),
      createSuccessfulStep(2),
      createQueryStepWithCancelOrClear('cancel'),
      createSuccessfulStep(3),
      createErrorStep(),
      createErrorStep(),
      createClearStep(),
      createClearStep(),
      createCancelStep(),
      createCancelStep(),
      createClearStep(),
      createSuccessfulStep(4),
      createSuccessfulStep(5),
    ];
    initTests({
      responses: pickSequeceResponsesToInit(sequence),
    });

    await runTestSequence(sequence);
  });

  it('If apiTokens exists on initialization, query is executed automatically', async () => {
    const sequence: TestQueryStep[] = [{ ...createSuccessfulStep(), ...createAutoStartingQueryStepProps() }];
    initTests({
      responses: pickSequeceResponsesToInit(sequence),
      apiTokens: defaultApiTokens,
      moduleOptions: {
        requireApiTokens: true,
      },
    });
    await runTestSequence(sequence);
  });
  it('ApiToken update signal triggers load only once', async () => {
    const emitApiTokenChangeStepAndExpectQueryToStart: TestQueryStep = {
      ...createSuccessfulStep(),
      execute: async () => {
        emitApiTokensUpdatedStateChange(defaultApiTokens);
        return currentModule.getQueryPromise();
      },
    };

    const sequence: TestQueryStep[] = [
      createEmptyStep(),
      emitApiTokenChangeStepAndExpectQueryToStart,
      { ...emitApiTokenChangeWithNoChangesStep, expectToKeepResults: true },
      createClearStep(),
      emitApiTokenChangeWithNoChangesStep,
    ];

    initTests({
      responses: pickSequeceResponsesToInit(sequence),
      moduleOptions: {
        requireApiTokens: true,
      },
      createApiTokenClient: true,
    });
    expect(currentModule.isLoading()).toBeFalsy();

    await runTestSequence(sequence);

    expect(getEmittedEventTypes()).toEqual([
      graphQLModuleEvents.GRAPHQL_MODULE_LOADING,
      graphQLModuleEvents.GRAPHQL_MODULE_LOAD_SUCCESS,
      graphQLModuleEvents.GRAPHQL_MODULE_CLEARED,
    ]);
  });
  it('When querying twice and options.abortIfLoading is false, second query is not started and on-going promise is returned', async () => {
    const queryAgainAfterFirstStep: TestQueryStep = {
      ...createSuccessfulStep(),
      postQueryTest: async () => {
        const firstQueryPromise = currentModule.getQueryPromise();
        currentModule.query();
        const secondQueryPromise = currentModule.getQueryPromise();
        expect(firstQueryPromise === secondQueryPromise).toBeTruthy();
        return Promise.resolve();
      },
    };

    const sequence = [queryAgainAfterFirstStep];

    initTests({
      responses: pickSequeceResponsesToInit(sequence),
      apiTokens: defaultApiTokens,
      moduleOptions: {
        abortIfLoading: false,
      },
    });
    await runTestSequence(sequence);
  });
  it('When querying twice and options.abortIfLoading is true (default), first query is aborted and new a one started', async () => {
    const queryAgainAfterFirstStep: TestQueryStep = {
      ...createSuccessfulStep(),
      execute: async (errorCatcher) => {
        // this has intentionally another catcher
        currentModule.query().catch(jest.fn());
        const firstQueryPromise = currentModule.getQueryPromise();
        currentModule.query().catch(errorCatcher);
        await waitFor(() => {
          // first should be aborted
          expect(getEmittedEventTypes().includes(graphQLModuleEvents.GRAPHQL_MODULE_LOAD_ABORTED)).toBeTruthy();
          // wait until second promise has started.
          expect(firstQueryPromise === currentModule.getQueryPromise()).toBeFalsy();
        });

        await firstQueryPromise.catch(jest.fn());
        return currentModule.getQueryPromise();
      },
      eventSignals: [
        graphQLModuleEvents.GRAPHQL_MODULE_LOADING,
        graphQLModuleEvents.GRAPHQL_MODULE_LOAD_ABORTED,
        graphQLModuleEvents.GRAPHQL_MODULE_LOADING,
        graphQLModuleEvents.GRAPHQL_MODULE_LOAD_SUCCESS,
      ],
    };

    const sequence = [{ ...createEmptyStep(), response: createSuccessResponse() }, queryAgainAfterFirstStep];

    initTests({
      responses: pickSequeceResponsesToInit(sequence),
      apiTokens: defaultApiTokens,
      moduleOptions: {
        abortIfLoading: true,
      },
    });
    await runTestSequence(sequence);
  });

  it('If apiTokens are required, but not ready, querying will return a rejected promise', async () => {
    const sequence: TestQueryStep[] = [
      createFailingQueryWithoutEmittedSignalsStep(),
      emitApiTokenChangeAndReturnQueryPromiseStep,
      createSuccessfulStep(),
    ];

    initTests({
      responses: pickSequeceResponsesToInit(sequence),
      createApiTokenClient: true,
      moduleOptions: {
        requireApiTokens: true,
      },
    });
    await runTestSequence(sequence);
    expect(getEmittedEventTypes()).toEqual([
      graphQLModuleEvents.GRAPHQL_MODULE_LOADING,
      graphQLModuleEvents.GRAPHQL_MODULE_LOAD_SUCCESS,
      graphQLModuleEvents.GRAPHQL_MODULE_LOADING,
      graphQLModuleEvents.GRAPHQL_MODULE_LOAD_SUCCESS,
    ]);
  });
  it('If apiTokens are removed/renewed, a query will wait for api tokens to update', async () => {
    const sequence: TestQueryStep[] = [emitApiTokensRemovedWithNoChangesStep, createQueryAfterApiTokensUpdatedStep()];

    initTests({
      responses: pickSequeceResponsesToInit(sequence),
      apiTokens: defaultApiTokens,
      moduleOptions: {
        requireApiTokens: true,
        autoFetch: false,
      },
    });
    await runTestSequence(sequence);
    expect(getEmittedEventTypes()).toEqual([
      graphQLModuleEvents.GRAPHQL_MODULE_LOADING,
      graphQLModuleEvents.GRAPHQL_MODULE_LOAD_SUCCESS,
    ]);
  });

  it('If apiTokens are removed/renewed while querying, a query will be cancelled.', async () => {
    const sequence: TestQueryStep[] = [
      createRemoveApiTokensAfterQueryStep(),
      waitForApiTokensAndEmitApiTokenChangeWithStep,
      createSuccessfulStep(),
    ];

    initTests({
      responses: pickSequeceResponsesToInit(sequence),
      apiTokens: defaultApiTokens,
      moduleOptions: {
        requireApiTokens: true,
        autoFetch: false,
      },
    });
    await runTestSequence(sequence);
    expect(getEmittedEventTypes()).toEqual([
      graphQLModuleEvents.GRAPHQL_MODULE_LOADING,
      graphQLModuleEvents.GRAPHQL_MODULE_LOAD_ABORTED,
      graphQLModuleEvents.GRAPHQL_MODULE_LOADING,
      graphQLModuleEvents.GRAPHQL_MODULE_LOAD_SUCCESS,
    ]);
  });

  it('If apiTokens are awaited, cancel() will fulfill the pending api token promise and reject query() promise.', async () => {
    const sequence: TestQueryStep[] = [
      emitApiTokensRemovedWithNoChangesStep,
      { ...queryButCancelWithApiTokenAwaitCheckStep, willLoad: false, eventSignals: [] },
    ];

    initTests({
      responses: pickSequeceResponsesToInit(sequence),
      apiTokens: defaultApiTokens,
      moduleOptions: {
        requireApiTokens: true,
        autoFetch: false,
      },
    });
    await runTestSequence(sequence);
  });
  it('Pending apiTokens will timeout. The promise will never reject, it returns true/false', async () => {
    const sequence: TestQueryStep[] = [emitApiTokensRemovedWithNoChangesStep, waitForApiTokensPromiseTimeoutStep];

    initTests({
      responses: pickSequeceResponsesToInit(sequence),
      apiTokens: defaultApiTokens,
      moduleOptions: {
        requireApiTokens: true,
        autoFetch: false,
      },
    });
    await runTestSequence(sequence);
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
  it('getClientErrors() returns an array of actual errors or errors in returned data', async () => {
    initTests({
      responses: [{ returnedStatus: HttpStatusCode.OK, data: createQueryResponseWithErrors() }, errorResponse],
      moduleOptions: {
        requireApiTokens: false,
      },
      queryOptions: {
        // without this, error in data causes query to fail
        errorPolicy: 'all',
      },
    });
    const promise = currentModule.query().catch(promiseCatcher);
    await advanceUntilPromiseResolved(promise);
    expect(promiseCatcher).toHaveBeenCalledTimes(0);
    expect(currentModule.getClientErrors()).toHaveLength(1);
    expect(currentModule.getData()).toBeDefined();
    expect(currentModule.getError()).toBeUndefined();

    const promise2 = currentModule.query().catch(promiseCatcher);
    await advanceUntilPromiseResolved(promise2);
    expect(promiseCatcher).toHaveBeenCalledTimes(1);
    expect(currentModule.getClientErrors()).toHaveLength(1);
    expect(currentModule.getData()).toBeUndefined();
    expect(currentModule.getError()).toBeDefined();
  });
  it('isLoading() indicates actual fetch, isPending() indicates a api token / query promise is pending', async () => {
    initTests({
      responses: [successfulResponse, successfulResponse, successfulResponse],
      apiTokens: defaultApiTokens,
      moduleOptions: {
        requireApiTokens: true,
        autoFetch: false,
      },
    });

    const promise1 = currentModule.query().catch(promiseCatcher);
    expect(currentModule.isLoading()).toBeTruthy();
    expect(currentModule.isPending()).toBeTruthy();
    await advanceUntilPromiseResolved(promise1);
    expect(currentModule.isLoading()).toBeFalsy();
    expect(currentModule.isPending()).toBeFalsy();

    emitApiTokensRemovedStateChange();
    const promise2 = currentModule.query().catch(promiseCatcher);
    expect(currentModule.isLoading()).toBeFalsy();
    expect(currentModule.isPending()).toBeTruthy();
    emitApiTokensUpdatedStateChange(defaultApiTokens);
    await waitFor(() => {
      expect(currentModule.isLoading()).toBeTruthy();
      expect(currentModule.isPending()).toBeTruthy();
    });
    await advanceUntilPromiseResolved(promise2);
    expect(currentModule.isLoading()).toBeFalsy();
    expect(currentModule.isPending()).toBeFalsy();
  });
});
