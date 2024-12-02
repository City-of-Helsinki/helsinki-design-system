/* eslint-disable jest/no-mocks-import */
import React from 'react';

import { ConnectedModule } from '../beacon/beacon';
import { useApolloClient, useApolloClientModule } from './hooks';
import { HookTestUtil, createHookTestEnvironment } from '../testUtils/hooks.testUtil';
import { createApolloClientModule } from './apolloClientModule';
import { ApolloClientModule, apolloClientModuleNamespace } from '.';

const elementIds = {
  namespaceElement: 'apolloclientmodule-namespace-element',
  clientExistsElement: 'apolloclient-exists-element',
} as const;

let testUtil: HookTestUtil;

describe(`ApolloClientModule`, () => {
  let currentModule: ApolloClientModule;

  const App = () => {
    const apolloClientModule = useApolloClientModule();
    const apolloClient = useApolloClient();
    return (
      <div>
        <span key="namespace" id={elementIds.namespaceElement}>
          {apolloClientModule.namespace}
        </span>
        <span key="client" id={elementIds.clientExistsElement}>
          {typeof apolloClient.query === 'function' ? 1 : 0}
        </span>
      </div>
    );
  };

  const initTests = () => {
    currentModule = createApolloClientModule({ clientOptions: { uri: 'does-not-matter' } });

    const modules: ConnectedModule[] = [currentModule];

    testUtil = createHookTestEnvironment(
      {
        waitForRenderToggle: false,
        children: [<App key="app" />],
        noOidcClient: true,
      },
      {},
      modules,
    );

    return {
      ...testUtil,
    };
  };

  it('Hooks return module and client', async () => {
    const { getElementById } = initTests();

    expect(getElementById(elementIds.namespaceElement).innerHTML).toEqual(apolloClientModuleNamespace);
    expect(getElementById(elementIds.clientExistsElement).innerHTML).toEqual('1');
  });
});
