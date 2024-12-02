/* eslint-disable jest/expect-expect */
/* eslint-disable jest/no-mocks-import */
import { disableFetchMocks, enableFetchMocks } from 'jest-fetch-mock';
import { to } from 'await-to-js';
import { ApolloQueryResult, QueryResult, TypedDocumentNode, QueryOptions } from '@apollo/client';
import { waitFor } from '@testing-library/react';

import HttpStatusCode from '../../../utils/httpStatusCode';
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
import { cloneObject } from '../../../utils/cloneObject';

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

/**
 *
 * NOTE: If test fail for weird "useFakeTimers not defined" error,
 * the problem is actually in unhandled promise rejection
 *
 */
describe(`graphQLModule`, () => {
  const defaultApiTokens: TokenData = { token1: 'token1Value', token2: 'token2Value' };
  const { cleanUp, setResponders, addResponse } = createControlledFetchMockUtil([{ path: mockedGraphQLUri }]);

  let currentModule: GraphQLModule<GraphQLQueryResult>;
  let currentBeacon: Beacon;
  let currentApolloClient: ReturnType<typeof createApolloClientMock>;
  let listenerModule: ReturnType<typeof createConnectedBeaconModule>;
  let apiTokenStorage: TokenData | null = null;
  let apolloClientQuerySpy: jest.SpyInstance | undefined;

  const promiseCatcher = jest.fn();

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
    queryHelper,
  }: {
    responses: ResponseType[];
    createApiTokenClient?: boolean;
    noApolloClient?: boolean;
    noQuery?: boolean;
    apiTokens?: TokenData;
    moduleOptions?: GraphQLModuleModuleProps['options'];
    queryOptions?: GraphQLModuleModuleProps['queryOptions'];
    queryHelper?: GraphQLModuleModuleProps['queryHelper'];
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
      queryHelper,
    });
    // A module for listening and tracking all events in graphQLModule
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
        isRenewing: () => {
          return false;
        },
        connect: () => {},
        namespace: apiTokensClientNamespace,
      };
      currentBeacon.addSignalContext(fakeApiTokensClient);
    }
    // initialize all modules
    emitInitializationSignals(currentBeacon);
  };

  const getEmittedErrors = () => {
    return getReceivedErrorSignalPayloads<GraphQLModuleError>(listenerModule);
  };

  const getEmittedEventTypes = () => {
    return getReceivedEventSignalPayloads(listenerModule).map((payload) => payload.type);
  };

  // helpers for emitting api token signals
  const emitApiTokensClientStateChange = (payload: EventPayload) => {
    currentBeacon.emit({ type: eventSignalType, namespace: apiTokensClientNamespace, payload });
  };

  const emitApiTokensUpdatedStateChange = (tokens: TokenData) => {
    apiTokenStorage = tokens;
    const payload: EventPayload = { type: apiTokensClientEvents.API_TOKENS_UPDATED, data: tokens };
    emitApiTokensClientStateChange(payload);
  };

  const emitApiTokensRemovedStateChange = () => {
    apiTokenStorage = null;
    const payload: EventPayload = { type: apiTokensClientEvents.API_TOKENS_REMOVED };
    emitApiTokensClientStateChange(payload);
  };

  const emitApiTokensRenewStateChange = () => {
    apiTokenStorage = null;
    const payload: EventPayload = { type: apiTokensClientEvents.API_TOKENS_RENEWAL_STARTED };
    emitApiTokensClientStateChange(payload);
  };

  // standard fetch responses
  const createSuccessResponse = (overrides: { id?: number; name?: string; profile?: unknown } = {}): ResponseType => {
    return { returnedStatus: HttpStatusCode.OK, data: createQueryResponse(overrides) };
  };

  const successfulResponse: ResponseType = createSuccessResponse();

  const errorResponse: ResponseType = {
    returnedStatus: HttpStatusCode.SERVICE_UNAVAILABLE,
    error: new Error('Failed'),
  };

  /**
   * Tests follow usually the same pattern:
   * - define responses
   * - query
   * - await for query to end
   * - check result / errors
   * - check emitted event / error signals
   *
   * "TestQueryStep" is metadata for the test pattern described above. Steps tell the runTestSequence() what to expect in each step of a test sequence.
   * Instead of repeating same expect() calls, the runTestSequence() has all necessary tests.
   *
   * Each step calls automatically graphQLModule.query(), unless a test step has an "executor()" that is called instead.
   *
   */

  // step for doing nothing and useful as a base for some other steps
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

  // basic successful query and its expected results.
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

  // basic unsuccessful query and its expected results.
  const createErrorStep = (): TestQueryStep => {
    return {
      response: errorResponse,
      errorSignals: [graphQLModuleError.GRAPHQL_LOAD_FAILED],
      eventSignals: [graphQLModuleEvents.GRAPHQL_MODULE_LOADING],
      expectedQueryError: graphQLModuleError.GRAPHQL_LOAD_FAILED,
    };
  };

  // step for calling just module.clear() and expects no results or rejections or errors
  const createClearModuleStep = (): TestQueryStep => {
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

  // step for calling module.cancel() and expects module to keep previous results/errors and not to emit signals
  const createCancelModuleStep = (expectToKeepResults = false, expectToKeepError = false): TestQueryStep => {
    return {
      execute: () => {
        currentModule.cancel();
        return Promise.resolve();
      },
      willBePending: false,
      willLoad: false,
      expectToKeepResults,
      expectToKeepError,
    };
  };

  // step for calling module.query(), but calls module.clear/cancel() after that
  const createQueryWithCancelOrClearStep = (cancelOrClear: 'cancel' | 'clear'): TestQueryStep => {
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

  // test props for auto-started queries.
  const createAutoStartedQueryStep = (): Partial<TestQueryStep> => {
    return {
      willAutoStart: true,
      execute: () => {
        return currentModule.getQueryPromise();
      },
      eventSignals: [graphQLModuleEvents.GRAPHQL_MODULE_LOAD_SUCCESS],
    };
  };

  // test props for a scenario where module.query() fails before actual apolloClient.query() is called.
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

  // just emit api tokens updated signal
  const createEmitApiTokenChangeWithNoChangesStep = (): TestQueryStep => ({
    ...createEmptyStep(),
    execute: async () => {
      emitApiTokensUpdatedStateChange(defaultApiTokens);
      return Promise.resolve();
    },
  });

  // just emit api tokens renewal start signal
  const createEmitApiTokensRenewalWithNoChangesStep = (): TestQueryStep => ({
    ...createEmptyStep(),
    execute: async () => {
      emitApiTokensRenewStateChange();
      // returning undefined, so result is not compared
      // return currentModule.waitForApiTokens().then(() => undefined);
      return Promise.resolve();
    },
  });

  // emit api tokens updated signal and return pending query promise. If auto-start is set, query is executed in the
  const createEmitApiTokenChangeAndReturnQueryPromiseStep = (): TestQueryStep => ({
    ...createSuccessfulStep(),
    execute: async () => {
      emitApiTokensUpdatedStateChange(defaultApiTokens);
      return currentModule.getQueryPromise();
    },
  });

  // manually run query and wait for api tokens update and also trigger the update.
  // tests that apiTokenPromise is a success
  const createQueryAndThenUpdateApiTokensStep = (): TestQueryStep => {
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
        expect(apiTokenSuccess === true).toBeTruthy();
        return awaitPromise;
      },
      // query fetch will not start immediately
      willLoad: false,
    };
  };
  // manually run query and remove apiTokens after that.
  // update tokens in postQueryTest. Query is not affected, it is already cancelled.
  const createQueryAndRemoveAndUpdateApiTokensStep = (): TestQueryStep => {
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
        expect(apiTokenSuccess === true).toBeTruthy();
        return tokenPromise;
      },
      expectPromiseToFail: true,
      expectedResult: undefined,
      eventSignals: [graphQLModuleEvents.GRAPHQL_MODULE_LOADING, graphQLModuleEvents.GRAPHQL_MODULE_LOAD_ABORTED],
    };
  };
  // wait for api tokens and emit update signal
  const createWaitForApiTokensAndEmitApiTokenChangeWithStep = (): TestQueryStep => ({
    ...createEmptyStep(),
    execute: async (handlePromiseFailure) => {
      const tokenPromise = currentModule.waitForApiTokens().catch(handlePromiseFailure);
      emitApiTokensUpdatedStateChange(defaultApiTokens);
      const apiTokenSuccess = await tokenPromise;
      expect(apiTokenSuccess === true).toBeTruthy();
      return Promise.resolve();
    },
  });

  // wait for api tokens and let them timeout
  const createWaitForApiTokensPromiseTimeoutStep = (): TestQueryStep => ({
    ...createEmptyStep(),
    execute: async (handlePromiseFailure) => {
      expect(handlePromiseFailure).toHaveBeenCalledTimes(0);
      const tokenPromise = currentModule.waitForApiTokens().catch(handlePromiseFailure);
      await advanceUntilPromiseResolved(tokenPromise).catch(promiseCatcher);
      const apiTokenSuccess = await tokenPromise;
      expect(apiTokenSuccess === false).toBeTruthy();
      // then() has empty function to return undefined or results are compared.
      return tokenPromise.then(() => {});
    },
    expectPromiseToFail: false,
  });

  // module.query is executed automatically and in postQueryTest()
  // cancel the query and verify that apiTokenPromise is fulfilled
  // query will fail due cancel() but no errors.
  const createQueryButCancelWithApiTokenAwaitCheckStep = (): TestQueryStep => ({
    ...createSuccessfulStep(),
    postQueryTest: async () => {
      const tokenPromise = currentModule.waitForApiTokens();
      currentModule.cancel();
      await advanceUntilPromiseResolved(tokenPromise);
      const apiTokenSuccess = await tokenPromise;
      expect(apiTokenSuccess === false).toBeTruthy();
      return Promise.resolve();
    },
    expectPromiseToFail: true,
    expectedResult: undefined,
    eventSignals: [graphQLModuleEvents.GRAPHQL_MODULE_LOADING, graphQLModuleEvents.GRAPHQL_MODULE_LOAD_ABORTED],
  });

  const runTestSequence = async (sequence: TestQueryStep[]): Promise<Array<TestStepResult>> => {
    let queryPromise: Promise<QueryResult | void> | undefined;
    /* eslint-disable jest/no-conditional-expect, no-await-in-loop, no-restricted-syntax */
    const sequenceResults: Array<TestStepResult> = [];
    const handlePromiseFailure = jest.fn();
    for (const step of sequence) {
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

      // reset promise.catch() handler to detect errors in just this step
      handlePromiseFailure.mockReset();

      const willQuery = !!expectedResult || !!expectedQueryError;
      const isPendingResult = willBePending !== undefined ? willBePending : willQuery;
      const isLoadingResult = willLoad !== undefined ? willLoad : willQuery;
      const dataNow = expectToKeepResults ? currentModule.getData() : undefined;
      const resultNow = expectToKeepResults ? currentModule.getResult() : undefined;
      const errorNow = expectToKeepError ? currentModule.getError() : undefined;
      const clientErrorsNow = expectToKeepError ? currentModule.getClientErrors() : undefined;
      // auto-started queries should already be running

      expect(currentModule.isLoading()).toBe(willAutoStart === true);
      expect(currentModule.isPending()).toBe(willAutoStart === true);
      // execute() or query(), but do not await yet
      queryPromise = execute ? execute(handlePromiseFailure) : currentModule.query().catch(handlePromiseFailure);
      expect(currentModule.isLoading()).toBe(isLoadingResult);
      expect(currentModule.isPending()).toBe(isPendingResult);
      // make some additional testing
      if (postQueryTest) {
        await postQueryTest(queryPromise);
      }
      await advanceUntilPromiseResolved(queryPromise);
      // if promise failed, handlePromiseFailure catched it.
      const error = getLastMockCallArgs(handlePromiseFailure);
      const result = (await queryPromise) as QueryResult;

      expect(currentModule.isLoading()).toBe(false);
      expect(currentModule.isPending()).toBe(false);

      if (expectedResult) {
        stepResults.data = currentModule.getData() || null;
        // result is an apollo object including more than just data
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
        expect(currentModule.getData()).toBe(dataNow);
        expect(currentModule.getResult()).toBe(resultNow);
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
        expect(currentModule.getClientErrors()).toEqual(clientErrorsNow);
        expect(currentModule.getError()).toBe(errorNow);
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
      } else {
        expect(newEvents).toHaveLength(0);
      }
      if (errorSignals) {
        expect(errorSignals).toEqual(newErrors.map((e) => e.type));
      } else {
        expect(newErrors).toHaveLength(0);
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

  // ApolloClient emits errors when cached data is invalid. That does not matter in these tests.
  let consoleErrorSpy: jest.SpyInstance;

  beforeAll(() => {
    enableFetchMocks();
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
      await advanceUntilPromiseResolved(promise).catch(promiseCatcher);
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

  it('Query() executes a fetch and event signals are emitted. Result is stored to module.', async () => {
    // query() is called in the runTestSequence(step)
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
    const errorQueryWithClearStep: TestQueryStep = {
      ...createErrorStep(),
      ...createQueryWithCancelOrClearStep('clear'),
      expectedQueryError: undefined,
      errorSignals: undefined,
    };

    const sequence: TestQueryStep[] = [
      createSuccessfulStep(),
      createClearModuleStep(),
      createQueryWithCancelOrClearStep('clear'),
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
    const errorQueryWithCancelStep: TestQueryStep = {
      ...createErrorStep(),
      ...createQueryWithCancelOrClearStep('cancel'),
      expectedQueryError: undefined,
      errorSignals: undefined,
    };

    const sequence: TestQueryStep[] = [
      createSuccessfulStep(),
      createCancelModuleStep(true),
      // cancel does not clear results
      { ...createQueryWithCancelOrClearStep('cancel'), expectToKeepResults: true },
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

  it('Multiple query executions clear previous results/errors and stores new', async () => {
    const sequence: TestQueryStep[] = [
      createSuccessfulStep(1),
      createErrorStep(),
      createCancelModuleStep(false, true),
      createSuccessfulStep(2),
      { ...createQueryWithCancelOrClearStep('cancel'), expectToKeepResults: true },
      createSuccessfulStep(3),
      createErrorStep(),
      createErrorStep(),
      createClearModuleStep(),
      createClearModuleStep(),
      createCancelModuleStep(),
      createCancelModuleStep(),
      createClearModuleStep(),
      createSuccessfulStep(4),
      createSuccessfulStep(5),
    ];
    initTests({
      responses: pickSequeceResponsesToInit(sequence),
    });

    await runTestSequence(sequence);
  });

  it('If apiTokens exists on initialization, query is executed automatically', async () => {
    const sequence: TestQueryStep[] = [{ ...createSuccessfulStep(), ...createAutoStartedQueryStep() }];
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
      { ...createEmitApiTokenChangeWithNoChangesStep(), expectToKeepResults: true },
      createClearModuleStep(),
      createEmitApiTokenChangeWithNoChangesStep(),
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
  it('When options.keepOldResultOnError is true, failed request does not clear previous result', async () => {
    const sequence: TestQueryStep[] = [createSuccessfulStep(), { ...createErrorStep(), expectToKeepResults: true }];

    initTests({
      responses: pickSequeceResponsesToInit(sequence),
      apiTokens: defaultApiTokens,
      moduleOptions: {
        keepOldResultOnError: true,
      },
    });
    await runTestSequence(sequence);
  });

  it('If apiTokens are required, but not ready, token fetching will start. Query auto-starts after api tokens update.', async () => {
    const sequence: TestQueryStep[] = [
      {
        ...createFailingQueryWithoutEmittedSignalsStep(),
        errorSignals: [graphQLModuleError.GRAPHQL_NO_API_TOKENS],
        willBePending: true,
      },
      createEmitApiTokenChangeAndReturnQueryPromiseStep(),
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
    ]);
  });

  it('If apiTokens are renewed, a query will wait for api tokens to update', async () => {
    const sequence: TestQueryStep[] = [{ ...createQueryAndThenUpdateApiTokensStep(), willBePending: true }];

    initTests({
      responses: pickSequeceResponsesToInit(sequence),
      apiTokens: defaultApiTokens,
      moduleOptions: {
        requireApiTokens: true,
        autoFetch: false,
      },
    });
    emitApiTokensRenewStateChange();
    await runTestSequence(sequence);
    expect(getEmittedEventTypes()).toEqual([
      graphQLModuleEvents.GRAPHQL_MODULE_LOADING,
      graphQLModuleEvents.GRAPHQL_MODULE_LOAD_SUCCESS,
    ]);
  });

  it('If apiTokens are removed while querying, a query will be cancelled.', async () => {
    const sequence: TestQueryStep[] = [
      createQueryAndRemoveAndUpdateApiTokensStep(),
      createWaitForApiTokensAndEmitApiTokenChangeWithStep(),
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
      createEmitApiTokensRenewalWithNoChangesStep(),
      {
        ...createQueryButCancelWithApiTokenAwaitCheckStep(),
        willLoad: false,
        eventSignals: [],
        errorSignals: [graphQLModuleError.GRAPHQL_NO_API_TOKENS],
      },
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

  it('Pending apiTokens will timeout and module will fail with NO_API_TOKENS', async () => {
    const queryStep: TestQueryStep = {
      ...createSuccessfulStep(),
      execute: async (errorCatcher) => {
        return currentModule.query().catch(errorCatcher);
      },
      willLoad: false,
      expectedResult: undefined,
      expectPromiseToFail: true,
      eventSignals: undefined,
      errorSignals: [graphQLModuleError.GRAPHQL_NO_API_TOKENS],
    };
    const sequence: TestQueryStep[] = [createEmitApiTokensRenewalWithNoChangesStep(), queryStep];

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
  it('Pending apiTokens without queries will silently fail. Queries after it wait for new tokens', async () => {
    const sequence: TestQueryStep[] = [
      createEmitApiTokensRenewalWithNoChangesStep(),
      createWaitForApiTokensPromiseTimeoutStep(),
      createQueryAndThenUpdateApiTokensStep(),
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

  it('If api tokens are not set and a query is executed, it is immediately rejected', async () => {
    initTests({
      responses: [successfulResponse],
      moduleOptions: {
        requireApiTokens: true,
        autoFetch: false,
      },
    });
    await currentModule.query().catch(promiseCatcher);
    expect((getLastMockCallArgs(promiseCatcher)[0] as GraphQLModuleError).isNoApiTokensError).toBeTruthy();
    expect(getEmittedErrors().map((e) => e.type)).toEqual([graphQLModuleError.GRAPHQL_NO_API_TOKENS]);
  });
  it('If api tokens are removed and a query is executed, api tokens are loaded. Timing out rejects the query.', async () => {
    initTests({
      responses: [successfulResponse],
      apiTokens: defaultApiTokens,
      moduleOptions: {
        requireApiTokens: true,
        autoFetch: false,
      },
    });
    emitApiTokensRemovedStateChange();
    await advanceUntilPromiseResolved(currentModule.query().catch(promiseCatcher));
    expect(promiseCatcher).toHaveBeenCalledTimes(1);
    expect((getLastMockCallArgs(promiseCatcher)[0] as GraphQLModuleError).isNoApiTokensError).toBeTruthy();
    expect(getEmittedErrors().map((e) => e.type)).toEqual([graphQLModuleError.GRAPHQL_NO_API_TOKENS]);
  });

  it('If api tokens do not exists and a query is executed and tokens are loaded and timeout will result in error.', async () => {
    const queryStep: TestQueryStep = {
      ...createSuccessfulStep(),
      execute: async (errorCatcher) => {
        return currentModule.query().catch(errorCatcher);
      },
      willLoad: false,
      expectedResult: undefined,
      expectPromiseToFail: true,
      eventSignals: undefined,
      errorSignals: [graphQLModuleError.GRAPHQL_NO_API_TOKENS],
    };

    const sequence: TestQueryStep[] = [createEmitApiTokensRenewalWithNoChangesStep(), queryStep];

    initTests({
      responses: pickSequeceResponsesToInit(sequence),
      apiTokens: undefined,
      moduleOptions: {
        requireApiTokens: true,
        autoFetch: false,
      },
    });
    await runTestSequence(sequence);
  });

  it('If client is not defined, query() is rejected immediately', async () => {
    initTests({
      responses: [successfulResponse],
      apiTokens: defaultApiTokens,
      moduleOptions: {
        requireApiTokens: true,
        autoFetch: false,
      },
      noApolloClient: true,
    });
    const result = await currentModule.query().catch(promiseCatcher);
    expect(promiseCatcher).toHaveBeenCalledTimes(1);
    expect((getLastMockCallArgs(promiseCatcher)[0] as GraphQLModuleError).isNoClientError).toBeTruthy();
    expect(currentModule.isLoading()).toBeFalsy();
    expect(result).toBeUndefined();
    expect(getEmittedErrors().map((e) => e.type)).toEqual([graphQLModuleError.GRAPHQL_NO_CLIENT]);
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

  it('props passed to query() override inital props passed when creating the module. Initial or passed object are not mutated.', async () => {
    const queryOptions: GraphQLModuleModuleProps['queryOptions'] = {
      fetchPolicy: 'cache-only',
      variables: {
        initial: true,
      },
    };
    const clonedQueryOptions = cloneObject(queryOptions);
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
    expect(getQueryParams()).toMatchObject({ ...queryOptions, query: USER_QUERY });

    const overrides: GraphQLModuleModuleProps['queryOptions'] = {
      fetchPolicy: 'network-only',
      variables: {
        initial: false,
        override: true,
      },
    };
    const clonedOverrides = cloneObject(overrides);
    const query: GraphQLModuleModuleProps['query'] = 'queryDocument' as unknown as TypedDocumentNode;
    const newPromise = currentModule.query({ queryOptions: overrides, query }).catch(promiseCatcher);
    currentModule.cancel();
    await advanceUntilPromiseResolved(newPromise);
    expect(getQueryParams()).toMatchObject({ ...queryOptions, ...overrides });

    const abortOverride: GraphQLModuleModuleProps['queryOptions'] = {
      variables: {
        abortOverride: true,
      },
      context: { fetchOptions: { mode: 'no-cors', priority: 'high' } },
    };
    const clonedAbortOverride = cloneObject(abortOverride);
    const lastPromise = currentModule
      .query({ queryOptions: abortOverride, query: { fake: true } as unknown as TypedDocumentNode })
      .catch(promiseCatcher);
    currentModule.cancel();
    await advanceUntilPromiseResolved(lastPromise);
    expect(getQueryParams()).toMatchObject({ ...queryOptions, ...abortOverride });
    expect(getQueryParams().context.fetchOptions.signal).toBeDefined();

    expect(clonedQueryOptions).toMatchObject(queryOptions);
    expect(clonedOverrides).toMatchObject(overrides);
    expect(clonedAbortOverride).toMatchObject(abortOverride);
  });

  it('queryHelper receives current options, api token client and beacon as  arguments. Returned value is passed to client.query()', async () => {
    const queryOptions: GraphQLModuleModuleProps['queryOptions'] = {
      fetchPolicy: 'cache-only',
      errorPolicy: 'all',
      variables: {
        initial: true,
      },
    };
    const queryHelperReturnValue: GraphQLModuleModuleProps['queryOptions'] = {
      fetchPolicy: undefined,
      variables: {
        helper: true,
      },
    };
    const queryHelper = jest.fn().mockImplementation((opt) => {
      return {
        ...opt,
        ...queryHelperReturnValue,
      };
    });
    initTests({
      responses: [successfulResponse, successfulResponse],
      apiTokens: defaultApiTokens,
      moduleOptions: {
        requireApiTokens: false,
      },
      queryHelper,
      queryOptions,
    });

    const promise = currentModule.query().catch(promiseCatcher);
    await advanceUntilPromiseResolved(promise);
    expect(getQueryParams()).toMatchObject({
      ...queryOptions,
      ...queryHelperReturnValue,
    });
    expect(getLastMockCallArgs(queryHelper)).toMatchObject([
      queryOptions,
      currentBeacon.getSignalContext(apiTokensClientNamespace),
      currentBeacon,
    ]);

    const secondQuery: GraphQLModuleModuleProps['queryOptions'] = {
      fetchPolicy: 'network-only',
      variables: {
        initial: false,
        override: true,
      },
    };

    const newPromise = currentModule.query({ queryOptions: secondQuery }).catch(promiseCatcher);
    await advanceUntilPromiseResolved(newPromise);
    expect(getQueryParams()).toMatchObject({
      ...queryOptions,
      ...queryHelperReturnValue,
    });
  });

  it('If apiTokenKey is set, query headers will include the token. QueryHelper receives the token too', async () => {
    const queryOptions: GraphQLModuleModuleProps['queryOptions'] = {
      fetchPolicy: 'cache-only',
      errorPolicy: 'all',
      variables: {
        initial: true,
      },
    };

    const queryHelperReturnValue: GraphQLModuleModuleProps['queryOptions'] = {
      fetchPolicy: undefined,
      variables: {
        helper: true,
      },
    };
    const queryHelper = jest.fn().mockImplementation((opt) => {
      return {
        ...opt,
        ...queryHelperReturnValue,
      };
    });
    const apiTokenKey = 'token2';
    initTests({
      responses: [successfulResponse, successfulResponse],
      apiTokens: defaultApiTokens,
      moduleOptions: {
        requireApiTokens: false,
        apiTokenKey,
      },
      queryHelper,
      queryOptions,
    });

    const expectedHeaders = {
      authorization: `Bearer ${(apiTokenStorage as TokenData)[apiTokenKey]}`,
    };
    const promise = currentModule.query().catch(promiseCatcher);
    await advanceUntilPromiseResolved(promise);
    const queryParams = getQueryParams() as QueryOptions;
    expect(queryParams).toMatchObject({
      ...queryOptions,
      ...queryHelperReturnValue,
    });
    expect(queryParams.context?.headers).toMatchObject(expectedHeaders);
    expect(getLastMockCallArgs(queryHelper)).toMatchObject([
      queryOptions,
      currentBeacon.getSignalContext(apiTokensClientNamespace),
      currentBeacon,
    ]);

    const secondQueryOptions: GraphQLModuleModuleProps['queryOptions'] = {
      fetchPolicy: 'network-only',
      variables: {
        initial: false,
        override: true,
      },
      context: {
        headers: {
          secondAuth: 'token1',
        },
      },
    };

    const newPromise = currentModule.query({ queryOptions: secondQueryOptions }).catch(promiseCatcher);
    await advanceUntilPromiseResolved(newPromise);
    const queryParams2 = getQueryParams() as QueryOptions;
    expect(queryParams2).toMatchObject({
      ...secondQueryOptions,
      ...queryHelperReturnValue,
    });
    expect(queryParams2.context?.headers).toMatchObject({ ...expectedHeaders, ...secondQueryOptions.context?.headers });
    expect(getLastMockCallArgs(queryHelper)).toMatchObject([
      secondQueryOptions,
      currentBeacon.getSignalContext(apiTokensClientNamespace),
      currentBeacon,
    ]);
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
    const query: GraphQLModuleModuleProps['query'] = 'queryCacheQuery' as unknown as TypedDocumentNode;
    // this query has "cache-only", so no fetch is done
    await currentModule.queryCache({ queryOptions: overrides, query }).catch(promiseCatcher);
    expect(getQueryParams()).toMatchObject({ ...queryOptions, ...overrides, fetchPolicy: 'cache-only', query });
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
    const query: GraphQLModuleModuleProps['query'] = 'queryServerQuery' as unknown as TypedDocumentNode;
    // this query has "cache-only", so no fetch is done
    const promise = currentModule.queryServer({ query, queryOptions: overrides }).catch(promiseCatcher);
    expect(getQueryParams()).toMatchObject({ ...queryOptions, ...overrides, fetchPolicy: 'network-only', query });
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
