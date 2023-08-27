import { useContext, useCallback, useState, useLayoutEffect, useRef, useMemo } from 'react';

import { LoginContext, LoginContextData } from '../components/LoginContext';
import {
  ConnectedModule,
  Signal,
  SignalListener,
  SignalListenerSource,
  SignalNamespace,
  SignalTrigger,
  SignalTriggerProps,
  compareSignalTriggers,
} from './beacon';
import { createErrorTriggerProps } from './signals';

export const useBeacon = (): Pick<LoginContextData, 'addListener' | 'getModule'> => {
  const { addListener, getModule } = useContext(LoginContext);
  return {
    addListener,
    getModule,
  };
};

export const useConnectedModule = <T extends ConnectedModule>(namespace: SignalNamespace): T | null => {
  const { getModule } = useBeacon();
  return getModule<T>(namespace) || null;
};

export const useSignalListener = (listener: SignalTrigger): [Signal | undefined, () => void] => {
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
  const memoizedReset = useCallback(() => {
    setLastSignal(undefined);
  }, [setLastSignal]);
  // not using useEffect or some signals might be missed,
  // because useEffect is ran after first render
  useLayoutEffect(() => {
    const disposer = addListener('*:*', memoizedListener);
    return disposer;
  }, [memoizedListener, addListener]);
  return [lastSignal, memoizedReset];
};

const useSignalTracking = (signalProps: SignalListenerSource, callback?: SignalListener) => {
  const trigger = useMemo<SignalTrigger>(() => {
    if (typeof signalProps === 'function') {
      return signalProps as SignalTrigger;
    }
    return (signal: Signal) => {
      return compareSignalTriggers(signalProps as SignalTriggerProps, (signal as unknown) as SignalTriggerProps);
    };
  }, []);
  const callbackRef = useRef(callback);
  const hasCallback = !!callback;
  const listener = useCallback((signal: Signal) => {
    if (trigger(signal)) {
      if (!hasCallback) {
        return true;
      }
      if (callbackRef.current) {
        callbackRef.current(signal);
      }
    }
    return false;
  }, []);
  const lastSignalAndReset = useSignalListener(listener);
  return hasCallback ? undefined : lastSignalAndReset;
};

export const useSignalTrackingWithCallback = (signalProps: SignalListenerSource, callback?: SignalListener): void => {
  useSignalTracking(signalProps, callback);
};

export const useSignalTrackingWithReturnValue = (signalProps: SignalListenerSource) => {
  return useSignalTracking(signalProps) as ReturnType<typeof useSignalListener>;
};

export const useErrorTracking = () => {
  return useSignalTrackingWithReturnValue(createErrorTriggerProps());
};
