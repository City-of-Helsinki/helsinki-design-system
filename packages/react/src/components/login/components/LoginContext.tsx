import React, { createContext, useMemo } from 'react';

import { OidcClientProps } from '../client/index';
import { createOidcClient } from '../client/oidcClient';
import { createBeacon, Beacon, ConnectedModule, SignalNamespace } from '../beacon/beacon';
import { emitInitializationSignals } from '../beacon/signals';

type ContextProps = {
  children: React.ReactNode | React.ReactNode[] | null;
  loginProps: OidcClientProps;
  modules?: ConnectedModule[];
};

export type LoginContextData = {
  addListener: Beacon['addListener'];
  getModule: <T extends ConnectedModule>(namespace: SignalNamespace) => T | null;
};

export const LoginContext = createContext<LoginContextData>({
  addListener: () => {
    throw new Error('LoginContext.addListener is not initialized');
  },
  getModule: () => {
    throw new Error('LoginContext.getModule is not initialized');
  },
});

export const LoginContextProvider = (props: ContextProps): React.ReactElement => {
  const { children, loginProps, modules } = props;
  const memoizedBeacon = useMemo(() => {
    const beacon = createBeacon();
    const oidcClient = createOidcClient({
      ...loginProps,
    });

    if (modules) {
      modules.forEach((module) => {
        beacon.addSignalContext(module);
      });
    }
    beacon.addSignalContext(oidcClient);
    emitInitializationSignals(beacon);
    return beacon;
  }, []);

  const contextData: LoginContextData = {
    addListener: (signalOrJustSignalType, listener) => {
      return memoizedBeacon.addListener(signalOrJustSignalType, listener);
    },
    getModule: <T extends ConnectedModule>(namespace: SignalNamespace) => {
      return memoizedBeacon.getSignalContext(namespace) as T;
    },
  };

  return <LoginContext.Provider value={contextData}>{children}</LoginContext.Provider>;
};

export const { Consumer } = LoginContext;
