/* eslint-disable jest/no-mocks-import */
import HttpStatusCode from 'http-status-typed';
import { disableFetchMocks, enableFetchMocks } from 'jest-fetch-mock';
import React, { useRef } from 'react';
import { act, waitFor } from '@testing-library/react';

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
import {
  GraphQLCache,
  GraphQLModule,
  graphQLModuleEvents,
  graphQLModuleNamespace,
  GraphQLModuleState,
  graphQLModuleStates,
  GraphQLQueryResult,
} from './index';
import { createMockTestUtil } from '../testUtils/mockTestUtil';
import { graphQLModuleError, GraphQLModuleError } from './graphQLModuleError';
import { createApolloClientMock, mockedGraphQLUri } from './__mocks__/apolloClient.mock';
import { ApiTokenClient, apiTokensClientEvents, apiTokensClientNamespace, TokenData } from '../apiTokensClient';
import { mockResponse } from './__mocks__/mockResponses';
import { USER_QUERY } from './__mocks__/mockData';
import { useGraphQL, useGraphQLModule, UseGraphQLModuleHookObject, useGraphQLModuleTracking } from './hooks';
import { HookTestUtil, createHookTestEnvironment } from '../testUtils/hooks.testUtil';
import { getGraphQLModuleEventPayload } from './signals';

const elementIds = {
  namespaceElement: 'graphql-namespace-element',
  errorElement: 'graphql-error-element',
  dataElement: 'graphql-data-element',
  isLoadingElement: 'graphql-is-loading-element',
  queryButton: 'graphql-query-button',
  cancelButton: 'graphql-cancel-button',
  refetchButton: 'graphql-refetch-button',
  lastSignal: 'last-signal-element',
  errorSignal: 'error-signal-element',
  stateElement: 'graphql-state-element',
} as const;

type ResponseType = { returnedStatus: HttpStatusCode; data?: GraphQLQueryResult | null; error?: Error };

let testUtil: HookTestUtil;
const mockMapForAbort = createMockTestUtil();

describe(`graphQLModule`, () => {
  const successfulResponse: ResponseType = { returnedStatus: HttpStatusCode.OK, data: mockResponse };
  const errorResponse: ResponseType = {
    returnedStatus: HttpStatusCode.SERVICE_UNAVAILABLE,
    error: new Error('Failed'),
  };
  const { cleanUp, setResponders, addResponse } = createControlledFetchMockUtil([{ path: mockedGraphQLUri }]);

  let currentModule: GraphQLModule;
  let currentApolloClient: ReturnType<typeof createApolloClientMock>;
  let listenerModule: ReturnType<typeof createConnectedBeaconModule>;

  const Output = ({ obj }: { obj: UseGraphQLModuleHookObject<GraphQLCache, GraphQLQueryResult> }) => {
    const { data, loading, error } = obj;
    return (
      <div>
        <span id={elementIds.dataElement}>{data ? JSON.stringify(data) : ''}</span>
        <span id={elementIds.errorElement}>{error ? JSON.stringify(error.type) : ''}</span>
        <span id={elementIds.isLoadingElement}>{String(loading)}</span>
      </div>
    );
  };

  const Actions = ({ query, cancel }: Pick<GraphQLModule<GraphQLCache, GraphQLQueryResult>, 'query' | 'cancel'>) => {
    const onQueryClick = () => {
      query();
    };
    const onCancelClick = () => {
      cancel();
    };
    return (
      <div>
        <button type="button" id={elementIds.queryButton} onClick={onQueryClick}>
          query
        </button>
        <button type="button" id={elementIds.cancelButton} onClick={onCancelClick}>
          cancel
        </button>
      </div>
    );
  };

  const GraphQLModuleCheck = () => {
    try {
      const graphQLModule = useGraphQLModule<GraphQLCache, GraphQLQueryResult>();
      const [query, obj] = useGraphQL();
      return (
        <div>
          <span key="namespace" id={elementIds.namespaceElement}>
            {graphQLModule.namespace}
          </span>
          <span key="state" id={elementIds.stateElement}>
            {graphQLModule.getState()}
          </span>
          <Output key="output" obj={obj} />
          <Actions key="actions" query={query} cancel={graphQLModule.cancel} />
        </div>
      );
    } catch (error) {
      return <span id={elementIds.errorElement}>{error ? error.message : ''}</span>;
    }
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
      const apiTokenStorage: TokenData | null = apiTokens || null;
      const fakeApiTokensClient: ConnectedModule & Partial<ApiTokenClient> = {
        getTokens: () => {
          return apiTokenStorage;
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
    const clickLoadButton = () => {
      return testUtil.clickElement(elementIds.queryButton);
    };
    const clickCancelButton = () => {
      return testUtil.clickElement(elementIds.cancelButton);
    };
    const getIsLoading = () => {
      return testUtil.getInnerHtml(elementIds.isLoadingElement) === 'true';
    };
    const getState = () => {
      return testUtil.getInnerHtml(elementIds.stateElement);
    };
    const waitForReturnValueChange = async (func: () => unknown, advanceTime = 0) => {
      const current = func();
      await waitFor(() => {
        if (advanceTime) {
          jest.advanceTimersByTime(advanceTime);
        }
        if (func() === current) {
          throw new Error('Same value');
        }
      });
    };

    const waitForStateChange = async (advanceTime = 0) => {
      await waitForReturnValueChange(getState, advanceTime);
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
    const waitForState = async (state: GraphQLModuleState, advanceTime = 0) => {
      await waitForValue(getState, advanceTime, state);
    };

    const emitApiTokensClientStateChange = () => {
      const payload: EventPayload = { type: apiTokensClientEvents.API_TOKENS_UPDATED };
      testUtil.emit({ type: eventSignalType, namespace: apiTokensClientNamespace, payload });
    };

    return {
      ...testUtil,
      getData,
      getState,
      getIsLoading,
      clickLoadButton,
      clickCancelButton,
      waitForStateChange,
      waitForDataChange,
      waitForState,
      emitApiTokensClientStateChange,
    };
  };

  const initResponder = () => {
    setResponders([{ path: mockedGraphQLUri }]);
  };

  const getEmittedErrors = () => {
    return getReceivedErrorSignalPayloads<GraphQLModuleError>(listenerModule);
  };
  // const emitApiTokensUpdatedStateChange = () => {};

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
    const { clickLoadButton, getState, getIsLoading, waitForDataChange, getData, waitForState } = initTests({
      responses: [successfulResponse, errorResponse],
    });
    expect(getState()).toBe(graphQLModuleStates.IDLE);
    expect(getIsLoading()).toBeFalsy();
    clickLoadButton();
    await waitForState(graphQLModuleStates.LOADING);

    expect(getIsLoading()).toBeTruthy();

    await waitForDataChange(200);
    expect(getState()).toBe(graphQLModuleStates.IDLE);
    expect(getIsLoading()).toBeFalsy();

    expect(getEmittedEventTypes()).toEqual([
      graphQLModuleEvents.GRAPHQL_MODULE_LOADING,
      graphQLModuleEvents.GRAPHQL_MODULE_LOAD_SUCCESS,
    ]);

    expect(getData()).toEqual(getResponseDataObj(successfulResponse));

    clickLoadButton();
    await waitForState(graphQLModuleStates.LOADING);
    await waitForState(graphQLModuleStates.IDLE);
    expect(getIsLoading()).toBeFalsy();
    expect(getEmittedEventTypes()).toEqual([
      graphQLModuleEvents.GRAPHQL_MODULE_LOADING,
      graphQLModuleEvents.GRAPHQL_MODULE_LOAD_SUCCESS,
      graphQLModuleEvents.GRAPHQL_MODULE_LOADING,
    ]);
    expect(getEmittedErrors()[0].type).toEqual(graphQLModuleError.LOAD_FAILED);
  });
  it('Abort', async () => {
    const { clickLoadButton, clickCancelButton, waitForState } = initTests({
      responses: [successfulResponse, successfulResponse],
    });
    clickLoadButton();
    await waitForState(graphQLModuleStates.LOADING);
    clickCancelButton();
    await waitForState(graphQLModuleStates.IDLE);
    expect(getEmittedErrors().length).toBe(0);
    expect(getEmittedEventTypes()).toEqual([
      graphQLModuleEvents.GRAPHQL_MODULE_LOADING,
      graphQLModuleEvents.GRAPHQL_MODULE_LOAD_ABORTED,
    ]);
  });

  it('Multiload', async () => {
    const { clickLoadButton, getState, getIsLoading, waitForDataChange, getData, waitForState } = initTests({
      responses: [successfulResponse, successfulResponse],
    });
    clickLoadButton();
    await waitForState(graphQLModuleStates.LOADING);

    expect(getIsLoading()).toBeTruthy();

    await waitForDataChange(200);
    expect(getState()).toBe(graphQLModuleStates.IDLE);
    expect(getIsLoading()).toBeFalsy();

    expect(getEmittedEventTypes()).toEqual([
      graphQLModuleEvents.GRAPHQL_MODULE_LOADING,
      graphQLModuleEvents.GRAPHQL_MODULE_LOAD_SUCCESS,
    ]);

    expect(getData()).toEqual(getResponseDataObj(successfulResponse));

    clickLoadButton();
    await waitForState(graphQLModuleStates.LOADING);
    await waitForState(graphQLModuleStates.IDLE);
    expect(getIsLoading()).toBeFalsy();
    expect(getEmittedEventTypes()).toEqual([
      graphQLModuleEvents.GRAPHQL_MODULE_LOADING,
      graphQLModuleEvents.GRAPHQL_MODULE_LOAD_SUCCESS,
      graphQLModuleEvents.GRAPHQL_MODULE_LOADING,
      graphQLModuleEvents.GRAPHQL_MODULE_LOAD_SUCCESS,
    ]);
  });
  it('APiTOkens updated event triggers load', async () => {
    const { waitForDataChange, waitForState, emitApiTokensClientStateChange } = initTests({
      responses: [successfulResponse, successfulResponse],
      requireApiTokens: true,
    });
    await waitForState(graphQLModuleStates.IDLE);
    emitApiTokensClientStateChange();
    await waitForState(graphQLModuleStates.LOADING);
    await waitForDataChange(200);
    await waitForState(graphQLModuleStates.IDLE);
    expect(getEmittedEventTypes()).toEqual([
      graphQLModuleEvents.GRAPHQL_MODULE_LOADING,
      graphQLModuleEvents.GRAPHQL_MODULE_LOAD_SUCCESS,
    ]);
  });
  it('If apiTokens exists', async () => {
    // An error with "....inside a test was not wrapped in act" is shown with or without act.
    // Keeping it here to show it has been attempted.
    // Signals will auto render component, which causes this
    await act(async () => {
      const { waitForDataChange, waitForState } = initTests({
        responses: [successfulResponse, successfulResponse],
        apiTokens: { token: '1244' },
        requireApiTokens: true,
      });
      await waitForState(graphQLModuleStates.LOADING);
      await waitForDataChange(200);
      await waitForState(graphQLModuleStates.IDLE);
      expect(getEmittedEventTypes()).toEqual([
        graphQLModuleEvents.GRAPHQL_MODULE_LOADING,
        graphQLModuleEvents.GRAPHQL_MODULE_LOAD_SUCCESS,
      ]);
    });
  });
});
