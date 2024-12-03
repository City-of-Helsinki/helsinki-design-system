/* eslint-disable jest/no-mocks-import */
import React, { useMemo } from 'react';
import { HttpLink, useLazyQuery } from '@apollo/client';
import { fireEvent, waitFor } from '@testing-library/react';
import { enableFetchMocks, disableFetchMocks } from 'jest-fetch-mock';

import { useApolloClient, useApolloClientModule } from '../apolloClient/hooks';
import { HookTestUtil, createHookTestEnvironment } from '../testUtils/hooks.testUtil';
import { LoginProviderWithApolloContext, LoginProviderWithApolloContextProps } from './LoginProviderWithApolloContext';
import { apolloClientModuleNamespace } from '../apolloClient/index';
import { USER_QUERY } from '../graphQLModule/__mocks__/mockData';
import { createControlledFetchMockUtil } from '../testUtils/fetchMockTestUtil';
import { mockedGraphQLUri } from '../graphQLModule/__mocks__/apolloClient.mock';
import { createQueryResponse } from '../graphQLModule/__mocks__/mockResponses';
import { ConnectedModule, Beacon, createTriggerPropsForAllSignals } from '../index.vanilla-js';

const elementIds = {
  namespaceElement: 'namespace-element',
  clientExistsElement: 'client-exists-element',
  loading: 'loading-element',
  data: 'data-element',
  error: 'error-element',
  queryButton: 'query-button',
} as const;

let testUtil: HookTestUtil;

describe(`LoginProviderWithApolloContext`, () => {
  const { cleanUp, setResponders, addResponse } = createControlledFetchMockUtil([{ path: mockedGraphQLUri }]);
  const tokenSetter = jest.fn();
  const eventLog: string[] = [];
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
    await cleanUp();
    jest.runOnlyPendingTimers();
    jest.useRealTimers();
    jest.clearAllMocks();
    tokenSetter.mockClear();
    eventLog.length = 0;
  });

  afterAll(() => {
    disableFetchMocks();
    consoleErrorSpy.mockRestore();
  });
  const ApolloClientUser = () => {
    const apolloClientModule = useApolloClientModule();
    const apolloClient = useApolloClient();

    const [query, { data, loading, error }] = useLazyQuery(USER_QUERY);
    return (
      <div>
        <span key="namespace" id={elementIds.namespaceElement}>
          {apolloClientModule.namespace}
        </span>
        <span key="client" id={elementIds.clientExistsElement}>
          {typeof apolloClient.query === 'function' ? 1 : 0}
        </span>
        <button
          type="button"
          id={elementIds.queryButton}
          onClick={() => {
            query();
          }}
        >
          Query
        </button>
        {loading && (
          <span key="loading" id={elementIds.loading}>
            loading
          </span>
        )}
        {data && (
          <span key="data" id={elementIds.data}>
            {JSON.stringify(data)}
          </span>
        )}
        {error && (
          <span key="error" id={elementIds.error}>
            {error.message}
          </span>
        )}
      </div>
    );
  };

  const App = () => {
    const props = useMemo((): LoginProviderWithApolloContextProps => {
      const createListenerModule = (): ConnectedModule => {
        let beacon: Beacon | undefined;
        return {
          namespace: 'listenerModule',
          connect: (connectedBeacon) => {
            beacon = connectedBeacon;
            beacon.addListener(createTriggerPropsForAllSignals(), ({ type, namespace }) => {
              eventLog.push(`${namespace}:${type}`);
            });
          },
        };
      };
      const listener = createListenerModule();
      return {
        apolloClientSettings: {
          clientOptions: {
            link: new HttpLink({
              uri: mockedGraphQLUri,
            }),
          },
          tokenSetter,
          preventQueriesWhileRenewing: true,
        },
        modules: [listener],
        userManagerSettings: {},
        apiTokensClientSettings: { url: mockedGraphQLUri },
      };
    }, []);
    return (
      <LoginProviderWithApolloContext {...props}>
        <ApolloClientUser />
      </LoginProviderWithApolloContext>
    );
  };

  const initTests = () => {
    testUtil = createHookTestEnvironment(
      {
        waitForRenderToggle: false,
        children: [<App key="app" />],
        noOidcClient: true,
      },
      {},
    );

    const executeQuery = async () => {
      addResponse({ status: 200, body: JSON.stringify(createQueryResponse({ id: 100 })) });
      const button = testUtil.getElementById(elementIds.queryButton);
      const getData = () => {
        const dataEl = testUtil.getElementById(elementIds.data);
        if (!dataEl) {
          return null;
        }
        return dataEl.innerHTML;
      };
      fireEvent.click(button);
      await waitFor(() => {
        if (!getData()) {
          jest.advanceTimersByTime(1000);
          throw new Error('No data');
        }
      });
      return getData();
    };

    return {
      ...testUtil,
      executeQuery,
    };
  };

  it('ApolloClient is created and queries can be executed with api token', async () => {
    const { getElementById, executeQuery } = initTests();

    expect(getElementById(elementIds.namespaceElement).innerHTML).toEqual(apolloClientModuleNamespace);
    expect(getElementById(elementIds.clientExistsElement).innerHTML).toEqual('1');
    const data = await executeQuery();
    expect(data).toBeDefined();
    expect(tokenSetter).toHaveBeenCalledTimes(1);
    expect(eventLog).toEqual(['listenerModule:init', 'apolloClient:init', 'apiTokensClient:init', 'oidcClient:init']);
  });
});
