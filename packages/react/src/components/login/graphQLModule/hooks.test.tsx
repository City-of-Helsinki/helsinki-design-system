/* eslint-disable jest/no-mocks-import */
import { disableFetchMocks, enableFetchMocks } from 'jest-fetch-mock';
import React, { useRef } from 'react';
import { isObject } from 'lodash';
import { act, waitFor } from '@testing-library/react';

import HttpStatusCode from '../../../utils/httpStatusCode';
import { ConnectedModule } from '../beacon/beacon';
import { EventPayload, eventSignalType, isErrorSignal } from '../beacon/signals';
import {
  createConnectedBeaconModule,
  createTestListenerModule,
  getReceivedErrorSignalPayloads,
  getReceivedEventSignalPayloads,
} from '../testUtils/beaconTestUtil';
import { createControlledFetchMockUtil } from '../testUtils/fetchMockTestUtil';
import { createGraphQLModule } from './graphQLModule';
import { GraphQLCache, GraphQLModule, graphQLModuleEvents, graphQLModuleNamespace, GraphQLQueryResult } from './index';
import { createMockTestUtil } from '../testUtils/mockTestUtil';
import { graphQLModuleError, GraphQLModuleError } from './graphQLModuleError';
import { createApolloClientMock, mockedGraphQLUri } from './__mocks__/apolloClient.mock';
import { ApiTokenClient, apiTokensClientEvents, apiTokensClientNamespace, TokenData } from '../apiTokensClient';
import { createQueryResponse } from './__mocks__/mockResponses';
import { USER_QUERY } from './__mocks__/mockData';
import { useGraphQL, useGraphQLModule, useGraphQLModuleTracking } from './hooks';
import { HookTestUtil, createHookTestEnvironment } from '../testUtils/hooks.testUtil';
import { getGraphQLModuleEventPayload } from './signals';

const elementIds = {
  namespaceElement: 'graphql-namespace-element',
  errorElement: 'graphql-error-element',
  dataElement: 'graphql-data-element',
  queryButton: 'graphql-query-button',
  cancelButton: 'graphql-cancel-button',
  clearButton: 'graphql-clear-button',
  refetchButton: 'graphql-refetch-button',
  lastSignal: 'last-signal-element',
  errorSignal: 'error-signal-element',
  isLoading: 'graphql-is-loading-element',
  isLoadingInHook: 'graphql-is-loading-in-hook-element',
  isPending: 'graphql-is-pending-element',
  notUpdatingRenderTime: 'graphql-not-updating-render-time-element',
} as const;

type ResponseType = { returnedStatus: HttpStatusCode; data?: GraphQLQueryResult | null; error?: Error };

let testUtil: HookTestUtil;
const mockMapForAbort = createMockTestUtil();

describe(`graphQLModule`, () => {
  const createSuccessResponse = (overrides: { id?: number; name?: string; profile?: unknown } = {}): ResponseType => {
    return { returnedStatus: HttpStatusCode.OK, data: createQueryResponse(overrides) };
  };

  const successfulResponse: ResponseType = createSuccessResponse();

  const errorResponse: ResponseType = {
    returnedStatus: HttpStatusCode.SERVICE_UNAVAILABLE,
    error: new Error('Failed'),
  };
  const { cleanUp, setResponders, addResponse } = createControlledFetchMockUtil([{ path: mockedGraphQLUri }]);

  let currentModule: GraphQLModule;
  let currentApolloClient: ReturnType<typeof createApolloClientMock>;
  let listenerModule: ReturnType<typeof createConnectedBeaconModule>;
  let apiTokenStorage: TokenData | null = null;
  const defaultApiTokens: TokenData = { token1: 'token1', token2: 'token2' };

  const GraphQLHookOutput = () => {
    const [, { data, loading, error }] = useGraphQL();
    return (
      <div>
        <span id={elementIds.dataElement}>{data ? JSON.stringify(data) : ''}</span>
        <span id={elementIds.errorElement}>{error ? error.type : ''}</span>
        <span id={elementIds.isLoadingInHook}>{String(loading)}</span>
      </div>
    );
  };

  const ActionButtons = () => {
    const graphQLModule = useGraphQLModule();
    const [query, { refetch }] = useGraphQL();
    const onQueryClick = () => {
      query();
    };
    const onRefetchClick = () => {
      refetch();
    };
    const onCancelClick = () => {
      graphQLModule.cancel();
    };
    const onClearClick = () => {
      graphQLModule.clear();
    };
    return (
      <div>
        <button type="button" id={elementIds.queryButton} onClick={onQueryClick}>
          Query
        </button>
        <button type="button" id={elementIds.cancelButton} onClick={onCancelClick}>
          Cancel
        </button>
        <button type="button" id={elementIds.clearButton} onClick={onClearClick}>
          Clear
        </button>
        <button type="button" id={elementIds.refetchButton} onClick={onRefetchClick}>
          Refetch
        </button>
      </div>
    );
  };

  const NotListeningComponent = () => {
    const graphQLModule = useGraphQLModule<GraphQLCache, GraphQLQueryResult>();
    return (
      <div>
        <span key="namespace" id={elementIds.namespaceElement}>
          {graphQLModule.namespace}
        </span>
        <span key="notUpdatingRenderTime" id={elementIds.notUpdatingRenderTime}>
          {Date.now()}
        </span>
      </div>
    );
  };

  const ListeningComponent = () => {
    useGraphQLModuleTracking();
    const graphQLModule = useGraphQLModule<GraphQLCache, GraphQLQueryResult>();
    return (
      <div>
        <span key="isLoading" id={elementIds.isLoading}>
          {String(graphQLModule.isLoading())}
        </span>
        <span key="isPending" id={elementIds.isPending}>
          {String(graphQLModule.isPending())}
        </span>
      </div>
    );
  };

  const GraphQLModuleCheck = () => {
    return (
      <div>
        <ListeningComponent />
        <NotListeningComponent />
        <GraphQLHookOutput />
        <ActionButtons />
      </div>
    );
  };

  const SignalCheck = () => {
    const [signal] = useGraphQLModuleTracking();
    const error = signal && isErrorSignal(signal) ? (signal?.payload as GraphQLModuleError) : null;
    const eventPayload = signal ? getGraphQLModuleEventPayload(signal) : null;
    // useRef to store last error and payload
    const errorRef = useRef<GraphQLModuleError | undefined>(undefined);
    const payloadRef = useRef<EventPayload | undefined>(undefined);
    if (error) {
      errorRef.current = error;
    }
    if (eventPayload) {
      payloadRef.current = eventPayload;
    }
    return (
      <div>
        <span key="lastSignal" id={elementIds.lastSignal}>
          {payloadRef.current ? (payloadRef.current.type as React.ReactNode) : ''}
        </span>
        <span key="error" id={elementIds.errorSignal}>
          {errorRef.current ? errorRef.current.type : ''}
        </span>
      </div>
    );
  };

  const App = ({ renderSignalCheck }: { renderSignalCheck?: boolean } = {}) => {
    return (
      <>
        <GraphQLModuleCheck key="mod" />
        {renderSignalCheck && <SignalCheck key="signal" />}
      </>
    );
  };

  const initTests = ({
    responses,
    createApiTokenClient,
    apiTokens,
    renderSignalCheck,
    requireApiTokens = false,
  }: {
    responses: ResponseType[];
    createApiTokenClient?: boolean;
    apiTokens?: TokenData;
    renderSignalCheck?: boolean;
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

    const modules: ConnectedModule[] = [currentModule, listenerModule];

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
      modules.push(fakeApiTokensClient);
    }

    testUtil = createHookTestEnvironment(
      {
        waitForRenderToggle: false,
        children: [<App key="app" renderSignalCheck={renderSignalCheck} />],
        noOidcClient: true,
      },
      {},
      modules,
    );
    const getData = () => {
      return testUtil.getElementJSON(elementIds.dataElement);
    };
    const getErrorType = () => {
      return testUtil.getInnerHtml(elementIds.errorElement);
    };
    const clickLoadButton = () => {
      return testUtil.clickElement(elementIds.queryButton);
    };
    const clickRefetchButton = () => {
      return testUtil.clickElement(elementIds.refetchButton);
    };
    const clickCancelButton = () => {
      return testUtil.clickElement(elementIds.cancelButton);
    };
    const clickClearButton = () => {
      return testUtil.clickElement(elementIds.clearButton);
    };
    const getIsLoading = () => {
      if (testUtil.getInnerHtml(elementIds.isLoading) !== testUtil.getInnerHtml(elementIds.isLoadingInHook)) {
        throw new Error('isLoading hook mismatch');
      }
      return testUtil.getInnerHtml(elementIds.isLoading) === 'true';
    };
    const getIsPending = () => {
      return testUtil.getInnerHtml(elementIds.isPending) === 'true';
    };
    const getNotListeningComponentRenderTime = () => {
      return parseInt(testUtil.getInnerHtml(elementIds.notUpdatingRenderTime), 10);
    };
    const waitForReturnValueChange = async (func: () => unknown, advanceTime = 0) => {
      const current = func();
      const compareObjects = isObject(current);
      await waitFor(() => {
        if (advanceTime) {
          jest.advanceTimersByTime(advanceTime);
        }
        const newValue = func();
        if (compareObjects && isObject(newValue)) {
          expect(newValue).not.toMatchObject(current as object);
        } else if (newValue === current) {
          throw new Error('Same value');
        }
      });
    };

    const waitForIsLoadingChange = async (advanceTime = 0) => {
      await waitForReturnValueChange(getIsLoading, advanceTime);
    };
    const waitForDataChange = async (advanceTime = 0) => {
      await waitForReturnValueChange(getData, advanceTime);
    };
    const waitForValue = async (func: () => unknown, advanceTime = 0, expectedValue: unknown) => {
      await waitFor(() => {
        if (advanceTime) {
          jest.advanceTimersByTime(advanceTime);
        }
        const value = func();
        if (value !== expectedValue) {
          throw new Error(`Not correct value. Expected ${expectedValue}, but got ${value}`);
        }
      });
    };
    const waitForIsLoadingToMatch = async (isLoading: boolean, advanceTime = 0) => {
      await waitForValue(getIsLoading, advanceTime, isLoading);
    };

    const emitApiTokensUpdatedStateChange = (tokens: TokenData) => {
      apiTokenStorage = tokens;
      const payload: EventPayload = { type: apiTokensClientEvents.API_TOKENS_UPDATED, data: tokens };
      testUtil.emit({ type: eventSignalType, namespace: apiTokensClientNamespace, payload });
    };

    return {
      ...testUtil,
      getData,
      getErrorType,
      getIsPending,
      getIsLoading,
      clickLoadButton,
      clickCancelButton,
      clickClearButton,
      clickRefetchButton,
      waitForIsLoadingChange,
      waitForDataChange,
      waitForIsLoadingToMatch,
      getNotListeningComponentRenderTime,
      emitApiTokensUpdatedStateChange,
    };
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

  // ApolloClient emits errors when cached data is invalid. That does not matter in these tests.
  let consoleErrorSpy: jest.SpyInstance;

  beforeAll(() => {
    enableFetchMocks();
    consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => null);
  });

  beforeEach(() => {
    jest.useFakeTimers();
    initResponder();
  });

  afterEach(async () => {
    await cleanUp();
    apiTokenStorage = null;
    if (currentModule) {
      act(() => {
        currentModule.clear();
      });
    }
    jest.runOnlyPendingTimers();
    jest.useRealTimers();
    jest.clearAllMocks();
    mockMapForAbort.clear();
  });

  afterAll(() => {
    disableFetchMocks();
    consoleErrorSpy.mockRestore();
  });

  it('Components can use hooks and make queries and components update when module updates.', async () => {
    const {
      clickLoadButton,
      getIsPending,
      getIsLoading,
      waitForDataChange,
      getData,
      getErrorType,
      waitForIsLoadingToMatch,
      getNotListeningComponentRenderTime,
    } = initTests({
      responses: [successfulResponse, errorResponse],
    });
    // track re-render time of the component using just the useGraphQLModule
    const initialRenderTime = getNotListeningComponentRenderTime();
    expect(getIsLoading()).toBeFalsy();
    expect(getIsPending()).toBeFalsy();
    clickLoadButton();
    await waitForIsLoadingToMatch(true);

    expect(getIsLoading()).toBeTruthy();
    expect(getIsPending()).toBeTruthy();

    await waitForDataChange(200);
    await waitForIsLoadingToMatch(false);
    expect(getIsLoading()).toBeFalsy();
    expect(getIsPending()).toBeFalsy();

    expect(getEmittedEventTypes()).toEqual([
      graphQLModuleEvents.GRAPHQL_MODULE_LOADING,
      graphQLModuleEvents.GRAPHQL_MODULE_LOAD_SUCCESS,
    ]);

    expect(getData()).toEqual(getResponseDataObj(successfulResponse));
    expect(getErrorType()).toEqual('');

    clickLoadButton();
    await waitForIsLoadingToMatch(true);
    await waitForIsLoadingToMatch(false);
    expect(getIsLoading()).toBeFalsy();
    expect(getIsPending()).toBeFalsy();
    expect(getEmittedEventTypes()).toEqual([
      graphQLModuleEvents.GRAPHQL_MODULE_LOADING,
      graphQLModuleEvents.GRAPHQL_MODULE_LOAD_SUCCESS,
      graphQLModuleEvents.GRAPHQL_MODULE_LOADING,
    ]);
    expect(getEmittedErrors()[0].type).toEqual(graphQLModuleError.GRAPHQL_LOAD_FAILED);
    expect(getErrorType()).toEqual(graphQLModuleError.GRAPHQL_LOAD_FAILED);
    expect(getData()).toEqual(null);
    // make sure the component using just the useGraphQLModule hook is not auto-rerendered
    expect(getNotListeningComponentRenderTime()).toBe(initialRenderTime);
  });
  it('Cancel() works', async () => {
    const { clickLoadButton, clickCancelButton, waitForIsLoadingToMatch, getErrorType, getData } = initTests({
      responses: [successfulResponse, successfulResponse],
    });
    clickLoadButton();
    await waitForIsLoadingToMatch(true);
    clickCancelButton();
    await waitForIsLoadingToMatch(false);
    expect(getEmittedErrors().length).toBe(0);
    expect(getEmittedEventTypes()).toEqual([
      graphQLModuleEvents.GRAPHQL_MODULE_LOADING,
      graphQLModuleEvents.GRAPHQL_MODULE_LOAD_ABORTED,
    ]);
    expect(getErrorType()).toEqual('');
    expect(getData()).toEqual(null);
  });
  it('clear() works', async () => {
    const { clickLoadButton, clickClearButton, waitForDataChange, getData, getErrorType, waitForIsLoadingToMatch } =
      initTests({
        responses: [successfulResponse, successfulResponse],
      });

    clickLoadButton();
    await waitForIsLoadingToMatch(true);
    await waitForDataChange(200);
    clickLoadButton();
    await waitForIsLoadingToMatch(true);

    clickClearButton();
    await waitForIsLoadingToMatch(false);

    expect(getEmittedEventTypes()).toEqual([
      graphQLModuleEvents.GRAPHQL_MODULE_LOADING,
      graphQLModuleEvents.GRAPHQL_MODULE_LOAD_SUCCESS,
      graphQLModuleEvents.GRAPHQL_MODULE_LOADING,
      graphQLModuleEvents.GRAPHQL_MODULE_CLEARED,
      graphQLModuleEvents.GRAPHQL_MODULE_LOAD_ABORTED,
    ]);
    expect(getData()).toEqual(null);
    expect(getErrorType()).toEqual('');
  });
  it('refetchButton() queries from server', async () => {
    const responses = [createSuccessResponse({ id: 1 }), createSuccessResponse({ id: 2 })];
    const { clickLoadButton, clickRefetchButton, waitForDataChange, getData, waitForIsLoadingToMatch } = initTests({
      responses,
    });

    clickLoadButton();
    await waitForIsLoadingToMatch(true);
    await waitForDataChange(200);
    expect(getData()).toEqual(getResponseDataObj(responses[0]));
    await waitForIsLoadingToMatch(false);
    clickRefetchButton();
    await waitForIsLoadingToMatch(true);
    await waitForDataChange(200);
    expect(getData()).toEqual(getResponseDataObj(responses[1]));
  });

  it('Calling query multiple times is handled', async () => {
    const responses = [
      createSuccessResponse({ id: 1 }),
      createSuccessResponse({ id: 2 }),
      errorResponse,
      createSuccessResponse({ id: 3 }),
      createSuccessResponse({ id: 4 }),
    ];
    const { clickLoadButton, getErrorType, waitForDataChange, getData, waitForIsLoadingToMatch } = initTests({
      responses,
    });
    clickLoadButton();
    await waitForDataChange(200);
    await waitForIsLoadingToMatch(false);

    expect(getEmittedEventTypes()).toEqual([
      graphQLModuleEvents.GRAPHQL_MODULE_LOADING,
      graphQLModuleEvents.GRAPHQL_MODULE_LOAD_SUCCESS,
    ]);

    expect(getData()).toEqual(getResponseDataObj(responses[0]));
    expect(getErrorType()).toEqual('');

    clickLoadButton();
    await waitForDataChange(200);
    await waitForIsLoadingToMatch(false);
    expect(getData()).toEqual(getResponseDataObj(responses[1]));
    expect(getErrorType()).toEqual('');

    clickLoadButton();
    await waitForDataChange(200);
    await waitForIsLoadingToMatch(false);
    expect(getData()).toEqual(null);
    expect(getErrorType()).toEqual(graphQLModuleError.GRAPHQL_LOAD_FAILED);

    clickLoadButton();
    await waitForIsLoadingToMatch(true);
    // second load aborts previous signal
    clickLoadButton();
    await waitForIsLoadingToMatch(false);
    expect(getData()).toEqual(getResponseDataObj(responses[4]));
    expect(getErrorType()).toEqual('');

    expect(getEmittedEventTypes()).toEqual([
      graphQLModuleEvents.GRAPHQL_MODULE_LOADING,
      graphQLModuleEvents.GRAPHQL_MODULE_LOAD_SUCCESS,
      graphQLModuleEvents.GRAPHQL_MODULE_LOADING,
      graphQLModuleEvents.GRAPHQL_MODULE_LOAD_SUCCESS,
      graphQLModuleEvents.GRAPHQL_MODULE_LOADING,
      graphQLModuleEvents.GRAPHQL_MODULE_LOADING,
      graphQLModuleEvents.GRAPHQL_MODULE_LOAD_ABORTED,
      graphQLModuleEvents.GRAPHQL_MODULE_LOADING,
      graphQLModuleEvents.GRAPHQL_MODULE_LOAD_SUCCESS,
    ]);
  });
  it('ApiTokens updated event triggers load', async () => {
    const { waitForDataChange, waitForIsLoadingToMatch, emitApiTokensUpdatedStateChange } = initTests({
      responses: [successfulResponse, successfulResponse],
      requireApiTokens: true,
      createApiTokenClient: true,
    });
    await waitForIsLoadingToMatch(false);
    act(() => {
      emitApiTokensUpdatedStateChange(defaultApiTokens);
    });

    await waitForIsLoadingToMatch(true);
    await waitForDataChange(200);
    await waitForIsLoadingToMatch(false);
    expect(getEmittedEventTypes()).toEqual([
      graphQLModuleEvents.GRAPHQL_MODULE_LOADING,
      graphQLModuleEvents.GRAPHQL_MODULE_LOAD_SUCCESS,
    ]);
  });
  it('If apiTokens exists, query is triggered automatically.', async () => {
    await act(async () => {
      const { waitForDataChange, waitForIsLoadingToMatch } = initTests({
        responses: [successfulResponse, successfulResponse],
        apiTokens: defaultApiTokens,
        requireApiTokens: true,
      });
      await waitForIsLoadingToMatch(true);
      await waitForDataChange(200);
      await waitForIsLoadingToMatch(false);
      expect(getEmittedEventTypes()).toEqual([
        graphQLModuleEvents.GRAPHQL_MODULE_LOADING,
        graphQLModuleEvents.GRAPHQL_MODULE_LOAD_SUCCESS,
      ]);
    });
  });
});
