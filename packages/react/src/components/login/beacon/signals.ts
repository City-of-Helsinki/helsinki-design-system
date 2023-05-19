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
  addListener: (
    signalOrJustType: SignalType | Signal,
    listener: ScopedSignalListener,
    excludeOwn?: boolean,
  ) => Disposer;
  emitError: (errorPayload?: ErrorPayload) => void;
  emitEvent: (eventType: EventType, data?: EventData) => Promise<void>;
  namespace: SignalNamespace;
};
export type ScopedSignalListener = (signal: Signal, module: NamespacedBeacon, beacon: Beacon) => void | Promise<void>;
export const errorSignalType = 'error' as const;
export type ErrorPayload = Error;
export type ErrorSignal = Signal & { type: typeof errorSignalType; payload: ErrorPayload };

export const eventSignalType = 'event' as const;
export type EventType = unknown;
export type EventData = unknown;
export type EventPayload = { type: EventType; data?: EventData };
export type EventSignal = Signal<typeof eventSignalType, EventPayload>;
export const initSignalType = 'init' as const;

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
    storeBeacon(target) {
      beacon = target;
      pendingListenerCalls.forEach((call) => {
        call(beacon);
      });
      pendingListenerCalls.length = 0;
    },
    emit(signalType, payload) {
      return beacon ? beacon.emit({ type: signalType, namespace, payload }) : undefined;
    },
    emitAsync(signalType, payload) {
      return beacon ? beacon.emitAsync({ type: signalType, namespace, payload }) : Promise.resolve(null);
    },
    emitError(payload) {
      return beacon ? beacon.emit({ type: errorSignalType, namespace, payload }) : undefined;
    },
    async emitEvent(type, data) {
      const payload: EventPayload = { type, data };
      return beacon ? beacon.emitAsync({ type: eventSignalType, namespace, payload }) : Promise.resolve(null);
    },
    addListener(signalOrJustType, listener, excludeOwnNamespace = true) {
      const { type, namespace: namespaceToListen } = splitTypeAndNamespace(signalOrJustType, LISTEN_TO_ALL_MARKER);
      if (namespaceToListen === namespace) {
        return () => undefined;
      }
      const shouldFilterOwnEvents = namespaceToListen === '*' && excludeOwnNamespace;
      const wrappedListener: SignalListener = shouldFilterOwnEvents
        ? (signal) => {
            if (signal.namespace === namespace) {
              return Promise.resolve();
            }
            return listener(signal, this, beacon);
          }
        : (signal) => {
            return listener(signal, this, beacon);
          };
      if (!beacon) {
        return addPendingListenerCall({ type, namespace: namespaceToListen }, wrappedListener);
      }
      return beacon.addListener({ type, namespace: namespaceToListen }, wrappedListener);
    },
    namespace,
  };
}

export function createErrorTrigger(
  namespace: SignalNamespace = LISTEN_TO_ALL_MARKER,
): Pick<Signal, 'namespace'> & { type: ErrorSignal['type'] } {
  return {
    type: errorSignalType,
    namespace,
  };
}

export function createEventTrigger(
  namespace: SignalNamespace = LISTEN_TO_ALL_MARKER,
): Pick<Signal, 'namespace'> & { type: EventSignal['type'] } {
  return {
    type: eventSignalType,
    namespace,
  };
}

export function createInitSignalsTrigger(
  namespace: SignalNamespace = LISTEN_TO_ALL_MARKER,
): Pick<Signal, 'type' | 'namespace'> {
  return {
    type: initSignalType,
    namespace,
  };
}

export function createTriggerForAllSignals(
  namespace: SignalNamespace = LISTEN_TO_ALL_MARKER,
): Pick<Signal, 'type' | 'namespace'> {
  return {
    type: LISTEN_TO_ALL_MARKER,
    namespace,
  };
}

export function filterSignals(list: Signal[], filterProps: Partial<Signal>): Signal[] {
  const props = Object.keys(filterProps);
  return list.filter((signal) => {
    return !props.find((key) => {
      return filterProps[key] !== signal[key];
    });
  });
}

export function getSignalEventPayload(signal: Signal): EventPayload | null {
  if (signal.type !== eventSignalType || !signal.payload || !(signal as EventSignal).payload.type) {
    return null;
  }
  return signal.payload as EventPayload;
}

export function emitInitializationSignals(beacon: Beacon) {
  const contexts = beacon.getAllSignalContextsAsObject();
  Object.keys(contexts).forEach((namespace) => {
    beacon.emit({ type: initSignalType, namespace, context: contexts[namespace] });
  });
}

export function isEventSignal(signal: Signal) {
  return signal.type === eventSignalType;
}

export function getEventSignalPayload(signal: Signal): EventPayload | null {
  return (isEventSignal(signal) && (signal.payload as EventPayload)) || null;
}

export function isErrorSignal(signal: Signal) {
  return signal.type === errorSignalType;
}

export function getErrorSignalPayload(signal: Signal): ErrorPayload | null {
  return (isErrorSignal(signal) && (signal.payload as ErrorPayload)) || null;
}

export function isInitSignal(signal: Signal) {
  return signal.type === initSignalType;
}
