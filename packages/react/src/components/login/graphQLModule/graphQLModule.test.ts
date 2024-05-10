/* eslint-disable jest/no-mocks-import */
import HttpStatusCode from 'http-status-typed';
import { disableFetchMocks, enableFetchMocks } from 'jest-fetch-mock';
import { to } from 'await-to-js';
import { ApolloError } from '@apollo/client';
import { act } from '@testing-library/react';

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
  graphQLModuleEvents,
  graphQLModuleNamespace,
  graphQLModuleStates,
  GraphQLQueryResult,
} from './index';
import { createMockTestUtil } from '../testUtils/mockTestUtil';
import { GraphQLModuleError } from './graphQLModuleError';
import { createApolloClientMock, mockedGraphQLUri } from './__mocks__/apolloClient.mock';
import { ApiTokenClient, apiTokensClientEvents, apiTokensClientNamespace, TokenData } from '../apiTokensClient';
import { mockResponse } from './__mocks__/mockResponses';
import { USER_QUERY } from './__mocks__/mockData';
import { advanceUntilPromiseResolved } from '../testUtils/timerTestUtil';
import { isAbortError } from '../utils/abortFetch';

type ResponseType = { returnedStatus: HttpStatusCode; data?: GraphQLQueryResult | null; error?: Error };

const mockMapForAbort = createMockTestUtil();

describe(`graphQLModule`, () => {
  const successfulResponse: ResponseType = { returnedStatus: HttpStatusCode.OK, data: mockResponse };
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
    currentBeacon.clear();
    apiTokenStorage = null;
    await cleanUp();
    if (currentModule) {
      currentModule.clear();
    }
    jest.runOnlyPendingTimers();
    jest.useRealTimers();
    jest.clearAllMocks();
    mockMapForAbort.clear();
  });

  afterAll(() => {
    disableFetchMocks();
  });

  it('blaa blaa ball', async () => {
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
    expect(currentModule.getData()).toEqual(result?.data);

    const errorPromise = currentModule.query();
    await advanceUntilPromiseResolved(errorPromise);
    const [error] = await to(errorPromise);
    expect(error).toBeInstanceOf(Error);
    expect(currentModule.getError()?.originalError).toBe(error);
    expect(currentModule.getError()?.isLoadError).toBeTruthy();
    expect(getEmittedEventTypes()).toEqual([
      graphQLModuleEvents.GRAPHQL_MODULE_LOADING,
      graphQLModuleEvents.GRAPHQL_MODULE_LOAD_SUCCESS,
      graphQLModuleEvents.GRAPHQL_MODULE_LOADING,
    ]);
    const emittedErrors = getEmittedErrors();
    expect(emittedErrors).toHaveLength(1);
    expect(emittedErrors[0].isLoadError).toBeTruthy();
    expect(emittedErrors[0].originalError).toBeDefined();
  });
  it('Abort', async () => {
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

  it('Multiload', async () => {
    initTests({
      responses: [successfulResponse, successfulResponse],
    });
    expect(currentModule.getState()).toBe(graphQLModuleStates.IDLE);
    expect(currentModule.isLoading()).toBeFalsy();

    const abortedLoad = currentModule.query().catch(jest.fn());
    const finishedLoad = currentModule.query().catch(jest.fn());
    await advanceUntilPromiseResolved(abortedLoad);
    await advanceUntilPromiseResolved(finishedLoad);
    const [, result] = await to(finishedLoad);
    const [abortErr] = await to(abortedLoad);
    expect(abortErr && abortErr.message).toBeDefined();
    expect(result && result.data).toEqual(currentModule.getData());
    expect(currentModule.getData()).toEqual(getResponseDataObj(successfulResponse));
    expect(currentModule.isLoading()).toBeFalsy();
    expect(getEmittedEventTypes()).toEqual([
      graphQLModuleEvents.GRAPHQL_MODULE_LOADING,
      graphQLModuleEvents.GRAPHQL_MODULE_LOAD_ABORTED,
      graphQLModuleEvents.GRAPHQL_MODULE_LOADING,
      graphQLModuleEvents.GRAPHQL_MODULE_LOAD_SUCCESS,
    ]);
  });
  it('ApiTokens updated event triggers load once', async () => {
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
  });
  it('If apiTokens exists', async () => {
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
