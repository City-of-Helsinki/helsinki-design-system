import { useContext, useCallback, useState, useLayoutEffect, useRef } from 'react';

import { Amr, OidcClient, UserReturnType } from './client/index';
import { isValidUser } from './client/oidcClient';
import { LoginContext, LoginContextData } from './LoginContext';
import { Signal, SignalListener } from './beacon/beacon';
import { compareSignals } from './beacon/signals';

export type SignalListenerWithResponse = (signal: Signal) => boolean;

export const useOidcClient = (): OidcClient => {
  const { getOidcClient } = useContext(LoginContext);
  return getOidcClient();
};

export const useAuthenticatedUser = (): UserReturnType => {
  const client = useOidcClient();
  const user = client.getUser();
  if (!isValidUser(user)) {
    return null;
  }
  return user;
};

export const useBeacon = (): Pick<LoginContextData, 'addListener' | 'emit' | 'emitAsync' | 'getModule'> => {
  const { addListener, emit, emitAsync, getModule } = useContext(LoginContext);
  return {
    addListener,
    emit,
    emitAsync,
    getModule,
  };
};

export const useSignalListener = (listener: SignalListenerWithResponse): [Signal | undefined] => {
  const { addListener } = useContext(LoginContext);
  const [lastSignal, setLastSignal] = useState<Signal | undefined>();
  const memoizedListener = useCallback<SignalListener>(
    (signal) => {
      if (listener) {
        const response = listener(signal);
        if (response === false) {
          return;
        }
      }
      setLastSignal({ ...signal });
    },
    [listener, setLastSignal],
  );
  // not using useEffect or some signals might be missed,
  // because useEffect is ran after first render
  useLayoutEffect(() => {
    const disposer = addListener('*:*', memoizedListener);
    return disposer;
  }, [memoizedListener, addListener]);
  return [lastSignal];
};

export const useCachedAmr = (): Amr | undefined => {
  const client = useOidcClient();
  const [cachedAmr] = useState<Amr | undefined>(() => client.getAmr());
  return cachedAmr;
};

const useSignalTracking = (signalProps: Partial<Signal>, callback?: SignalListener) => {
  const signalPropsRef = useRef(signalProps);
  const callbackRef = useRef(callback);
  const hasCallback = !!callback;
  const listener = useCallback((signal: Signal) => {
    if (compareSignals(signalPropsRef.current, signal)) {
      if (!hasCallback) {
        return true;
      }
      callbackRef.current(signal);
    }
    return false;
  }, []);
  const lastSignal = useSignalListener(listener);
  return hasCallback ? undefined : lastSignal;
};

export const useSignalTrackingWithCallback = (signalProps: Partial<Signal>, callback?: SignalListener) => {
  return useSignalTracking(signalProps, callback);
};

export const useSignalTrackingWithReturnValue = (signalProps: Partial<Signal>) => {
  return useSignalTracking(signalProps) as [Signal | undefined];
};
