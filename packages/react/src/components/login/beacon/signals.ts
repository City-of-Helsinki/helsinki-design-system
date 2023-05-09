import {
  Beacon,
  Disposer,
  LISTEN_TO_ALL_MARKER,
  Signal,
  SignalListener,
  SignalNamespace,
  SignalPayload,
  SignalType,
  splitTypeAndNamespace,
} from './beacon';

export type NamespacedBeacon = {
  storeBeacon: (target: Beacon) => void;
  emit: (signalType: SignalType, payload?: SignalPayload) => void;
  emitAsync: (signalType: SignalType, payload?: SignalPayload) => Promise<void | null | undefined>;
  addListener: (signalOrJustType: SignalType | Signal, listener: SignalListener, excludeOwn?: boolean) => Disposer;
};

export function createNamespacedBeacon(namespace: SignalNamespace): NamespacedBeacon {
  let beacon: Beacon | undefined;
  const pendingListenerCalls: Array<(actualBeacon: Beacon) => void> = [];
  const addPendingListenerCall = (...args: Parameters<Beacon['addListener']>) => {
    const disposerContainer = [() => undefined];
    pendingListenerCalls.push((actualBeacon) => {
      disposerContainer[0] = actualBeacon.addListener(...args);
    });
    return () => {
      disposerContainer[0]();
    };
  };
  return {
    storeBeacon: (target) => {
      beacon = target;
      pendingListenerCalls.forEach((call) => {
        call(beacon);
      });
      pendingListenerCalls.length = 0;
    },
    emit: (signalType, payload) => {
      return beacon ? beacon.emit({ type: signalType, namespace, payload }) : undefined;
    },
    emitAsync: (signalType, payload) => {
      return beacon ? beacon.emitAsync({ type: signalType, namespace, payload }) : Promise.resolve(null);
    },
    addListener: (signalOrJustType, listener, excludeOwnNamespace = true) => {
      const { type, namespace: namespaceToListen } = splitTypeAndNamespace(signalOrJustType, LISTEN_TO_ALL_MARKER);
      if (namespaceToListen === namespace) {
        return () => undefined;
      }
      const shouldFilterOwnEvents = namespaceToListen === '*' && excludeOwnNamespace;
      const wrappedListener: SignalListener = shouldFilterOwnEvents
        ? (signal) => {
            if (signal.namespace === namespace) {
              return undefined;
            }
            return listener(signal);
          }
        : listener;
      if (!beacon) {
        return addPendingListenerCall({ type, namespace: namespaceToListen }, wrappedListener);
      }
      return beacon.addListener({ type, namespace: namespaceToListen }, wrappedListener);
    },
  };
}
