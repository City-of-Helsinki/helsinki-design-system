import { LoginProviderProps } from './LoginProvider';
import { apiTokensClientNamespace } from './apiTokensClient';
import { ConnectedModule } from './beacon/beacon';
import { createEventSignal, createNamespacedBeacon, createTriggerForAllSignalTypes } from './beacon/signals';
import { OidcClient, oidcClientNamespace, oidcClientStates } from './client';
import { createLoginSystem } from './createLoginSystem';
import { SessionPoller, sessionPollerNamespace } from './sessionPoller/sessionPoller';
import { getDefaultOidcClientTestProps } from './testUtils/oidcClientTestUtil';
import { ApiTokenClient } from './types';

describe('createLoginSystem.ts', () => {
  const listener = jest.fn();
  const helperNamespace = 'helper';
  const createHelperModule = (): ConnectedModule => {
    const moduleBeacon = createNamespacedBeacon('helper');
    const module = {
      namespace: helperNamespace,
      connect: (targetBeacon) => {
        moduleBeacon.storeBeacon(targetBeacon);
        moduleBeacon.addListener(createTriggerForAllSignalTypes(), listener);
      },
    };
    return module;
  };
  const loginProps = getDefaultOidcClientTestProps();
  const init = ({
    createApiTokens,
    createSessionPoller,
    createHelper,
  }: { createApiTokens?: boolean; createSessionPoller?: boolean; createHelper?: boolean } = {}) => {
    const props: LoginProviderProps = { userManagerSettings: loginProps.userManagerSettings, modules: [] };
    if (createApiTokens) {
      props.apiTokensClientSettings = {
        url: 'end-point',
      };
    }
    if (createSessionPoller) {
      props.sessionPollerSettings = {
        pollIntervalInMs: 10000,
      };
    }
    if (createHelper) {
      (props.modules as ConnectedModule[]).push(createHelperModule());
    }
    return createLoginSystem(props);
  };

  afterEach(() => {
    jest.resetAllMocks();
  });
  it('With only oidc client props, only oidcClient is created', async () => {
    const beacon = init();
    const oidcClient = beacon.getAllSignalContextsAsObject()[oidcClientNamespace] as OidcClient;
    expect(oidcClient).toBeDefined();
    expect(oidcClient.namespace).toBe(oidcClientNamespace);
    expect(oidcClient.getState()).toBe(oidcClientStates.NO_SESSION);
    expect(beacon.getAllSignalContextsAsObject()[apiTokensClientNamespace]).not.toBeDefined();
    expect(beacon.getAllSignalContextsAsObject()[sessionPollerNamespace]).not.toBeDefined();
    expect(beacon.getAllSignalContextsAsObject()[helperNamespace]).not.toBeDefined();
  });
  it('With also api tokens client props, both modules are created', async () => {
    const beacon = init({ createApiTokens: true });
    const apiTokensClient = beacon.getAllSignalContextsAsObject()[apiTokensClientNamespace] as ApiTokenClient;
    expect(apiTokensClient).toBeDefined();
    expect(apiTokensClient.namespace).toBe(apiTokensClientNamespace);
    expect(apiTokensClient.getTokens()).toBeNull();
    expect(beacon.getAllSignalContextsAsObject()[oidcClientNamespace]).toBeDefined();
    expect(beacon.getAllSignalContextsAsObject()[sessionPollerNamespace]).not.toBeDefined();
    expect(beacon.getAllSignalContextsAsObject()[helperNamespace]).not.toBeDefined();
  });
  it('With also api tokens client and session poller props, all three modules are created', async () => {
    const beacon = init({ createApiTokens: true, createSessionPoller: true });
    const sessionPoller = beacon.getAllSignalContextsAsObject()[sessionPollerNamespace] as SessionPoller;
    expect(sessionPoller).toBeDefined();
    expect(sessionPoller.namespace).toBe(sessionPollerNamespace);
    expect(sessionPoller.stop).not.toThrow();
    expect(beacon.getAllSignalContextsAsObject()[oidcClientNamespace]).toBeDefined();
    expect(beacon.getAllSignalContextsAsObject()[apiTokensClientNamespace]).toBeDefined();
    expect(beacon.getAllSignalContextsAsObject()[helperNamespace]).not.toBeDefined();
  });
  it('With all props defined and modules array has a module, all four modules are created', async () => {
    const beacon = init({ createApiTokens: true, createSessionPoller: true, createHelper: true });
    const helper = beacon.getAllSignalContextsAsObject()[helperNamespace] as ConnectedModule;
    expect(helper).toBeDefined();
    expect(helper.namespace).toBe(helperNamespace);
    expect(beacon.getAllSignalContextsAsObject()[oidcClientNamespace]).toBeDefined();
    expect(beacon.getAllSignalContextsAsObject()[apiTokensClientNamespace]).toBeDefined();
    expect(beacon.getAllSignalContextsAsObject()[sessionPollerNamespace]).toBeDefined();
    expect(beacon.getAllSignalContextsAsObject()[helperNamespace]).toBeDefined();
  });
  it('Modules emit and listen.', async () => {
    const beacon = init({ createApiTokens: true, createSessionPoller: true, createHelper: true });
    // one init signal should have been emitted for each module.
    // HelperModule does not listen to itself
    expect(listener).toHaveBeenCalledTimes(3);
    beacon.emit(createEventSignal('myNameSpace'));
    expect(listener).toHaveBeenCalledTimes(4);
  });
});
