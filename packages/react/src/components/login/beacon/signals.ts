import {
  Beacon,
  Disposer,
  LISTEN_TO_ALL_MARKER,
  Signal,
  SignalContext,
  SignalListener,
  SignalNamespace,
  SignalPayload,
  SignalTriggerProps,
  SignalType,
  compareSignalTriggers,
  convertToCompareableSignals,
  splitTypeAndNamespace,
} from './beacon';

export type NamespacedBeacon = {
  storeBeacon: (target: Beacon) => void;
  emit: (signalType: SignalType, payload?: SignalPayload) => void;
  addListener: (
    signalOrJustType: SignalType | Signal,
    listener: ScopedSignalListener,
    excludeOwn?: boolean,
  ) => Disposer;
  emitError: (errorPayload?: ErrorPayload) => void;
  emitEvent: (eventType: EventType, data?: EventData) => void;
  emitStateChange: (state: StateChangeType, previousState?: StateChangeType) => void;
  namespace: SignalNamespace;
};
export type ScopedSignalListener = (signal: Signal, module: NamespacedBeacon, beacon: Beacon) => void;
export const errorSignalType = 'error' as const;
export type ErrorPayload = Error;
export type ErrorSignal = Signal & { type: typeof errorSignalType; payload: ErrorPayload };

export const eventSignalType = 'event' as const;
export type EventType = unknown;
export type EventData = unknown;
export type EventPayload = { type: EventType; data?: EventData };
export type EventSignal = Signal<typeof eventSignalType, EventPayload>;
export const initSignalType = 'init' as const;

export const stateChangeSignalType = 'stateChange' as const;
export type StateChangeType = string;
export type StateChangeSignalPayload = { state: StateChangeType; previousState?: StateChangeType };
export type StateChangeSignal = Signal<typeof stateChangeSignalType, StateChangeSignalPayload>;

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
    emitError(payload) {
      return beacon ? beacon.emit({ type: errorSignalType, namespace, payload }) : undefined;
    },
    emitStateChange(state, previousState) {
      const payload: StateChangeSignalPayload = { state, previousState };
      return beacon ? beacon.emit({ type: stateChangeSignalType, namespace, payload }) : undefined;
    },
    emitEvent(type, data) {
      const payload: EventPayload = { type, data };
      return beacon ? beacon.emit({ type: eventSignalType, namespace, payload }) : undefined;
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
              return undefined;
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

// payload and context are conditionally added, so they can be used as triggers
// if triggers have object[key], the value is checked
export function createSignalOrTriggerProps(
  type: SignalType,
  namespace: SignalNamespace,
  payload?: SignalPayload,
  context?: SignalContext,
): Signal {
  return {
    type,
    namespace,
    ...(payload && { payload }),
    ...(context && { context }),
  };
}

export function createErrorSignal(namespace: SignalNamespace, payload?: ErrorPayload): ErrorSignal {
  return createSignalOrTriggerProps(errorSignalType, namespace, payload) as ErrorSignal;
}

export function createEventSignal(namespace: SignalNamespace, payload?: EventPayload): EventSignal {
  return createSignalOrTriggerProps(eventSignalType, namespace, payload) as EventSignal;
}

export function createStateChangeSignal(
  namespace: SignalNamespace,
  payload?: StateChangeSignalPayload,
): StateChangeSignal {
  return createSignalOrTriggerProps(stateChangeSignalType, namespace, payload) as Signal<
    typeof stateChangeSignalType,
    StateChangeSignalPayload
  >;
}

export function createErrorTriggerProps(
  namespace: SignalNamespace = LISTEN_TO_ALL_MARKER,
  type?: string,
): Pick<Signal, 'namespace'> & { type: ErrorSignal['type'] } & { payload?: { type: string } } {
  return {
    type: errorSignalType,
    namespace,
    ...(type && { payload: { type } }),
  };
}

export function createEventTriggerProps(
  namespace: SignalNamespace = LISTEN_TO_ALL_MARKER,
  type?: string,
): Pick<Signal, 'namespace'> & { type: EventSignal['type'] } & { payload?: { type: string } } {
  return {
    type: eventSignalType,
    namespace,
    ...(type && { payload: { type } }),
  };
}

export function createInitTriggerProps(
  namespace: SignalNamespace = LISTEN_TO_ALL_MARKER,
): Pick<Signal, 'type' | 'namespace'> {
  return {
    type: initSignalType,
    namespace,
  };
}

export function createStateChangeTriggerProps(
  namespace: SignalNamespace = LISTEN_TO_ALL_MARKER,
  state?: string,
  previousState?: string,
): Pick<Signal, 'type' | 'namespace'> {
  const payload = state
    ? {
        ...(state && { state }),
        ...(previousState && { previousState }),
      }
    : undefined;
  return {
    type: stateChangeSignalType,
    namespace,
    ...(payload && { payload }),
  };
}

export function createTriggerPropsForAllSignals(
  namespace: SignalNamespace = LISTEN_TO_ALL_MARKER,
): Pick<Signal, 'type' | 'namespace'> {
  return {
    type: LISTEN_TO_ALL_MARKER,
    namespace,
  };
}

export function createTriggerForAllSignalTypes(): Pick<Signal, 'type'> {
  return {
    type: LISTEN_TO_ALL_MARKER,
  };
}

export function createTriggerForAllNamespaces(): Pick<Signal, 'namespace'> {
  return {
    namespace: LISTEN_TO_ALL_MARKER,
  };
}

export function convertSignalToTrigger(signal: Signal): SignalTriggerProps {
  if (!Object.prototype.hasOwnProperty.call(signal, 'context')) {
    return (signal as unknown) as SignalTriggerProps;
  }
  const { type, namespace, payload } = signal;
  return { type, namespace, payload };
}

export function filterSignals(list: Signal[], filterProps: Partial<Signal>): Signal[] {
  const props = Object.keys(filterProps);
  return list.filter((signal) => {
    return !props.find((key) => {
      return filterProps[key] !== signal[key];
    });
  });
}

export function isEventSignal(signal: Signal) {
  return signal.type === eventSignalType;
}

export function isErrorSignal(signal: Signal) {
  return signal.type === errorSignalType;
}

export function isInitSignal(signal: Signal) {
  return signal.type === initSignalType;
}

export function isStateChangeSignal(signal: Signal) {
  return signal.type === stateChangeSignalType;
}

export function isNamespacedSignal(signal: Signal, namespace: SignalNamespace) {
  return signal.namespace === namespace;
}

export function getEventSignalPayload(signal: Signal): EventPayload | null {
  if (!isEventSignal(signal) || !signal.payload || !(signal as EventSignal).payload.type) {
    return null;
  }
  return signal.payload as EventPayload;
}

export function getStateChangeSignalPayload(signal: Signal): StateChangeSignalPayload | null {
  if (!isStateChangeSignal(signal) || !signal.payload || !(signal as StateChangeSignal).payload.state) {
    return null;
  }
  return signal.payload as StateChangeSignalPayload;
}

export function getErrorSignalPayload(signal: Signal): ErrorPayload | null {
  return (isErrorSignal(signal) && (signal.payload as ErrorPayload)) || null;
}

export function checkEventSignalPayload(signal: Signal, checker: (payload: EventPayload) => boolean): boolean {
  const payload = getEventSignalPayload(signal);
  return !!payload && checker(payload);
}

export function checkStateChangeSignalPayload(
  signal: Signal,
  checker: (payload: StateChangeSignalPayload) => boolean,
): boolean {
  const payload = getStateChangeSignalPayload(signal);
  return !!payload && checker(payload);
}

export function checkErrorSignalPayload(signal: Signal, checker: (payload: ErrorPayload) => boolean): boolean {
  const payload = getErrorSignalPayload(signal);
  return !!payload && checker(payload);
}

export function emitInitializationSignals(beacon: Beacon) {
  const contexts = beacon.getAllSignalContextsAsObject();
  Object.keys(contexts).forEach((namespace) => {
    beacon.emit({ type: initSignalType, namespace, context: contexts[namespace] });
  });
}

export function waitForSignals(
  beacon: Beacon,
  triggers: (SignalType | Partial<Signal>)[],
  options: { allowSkipping?: boolean; strictOrder?: boolean; rejectOn?: (SignalType | Partial<Signal>)[] } = {
    allowSkipping: true,
    strictOrder: false,
  },
): Promise<Omit<Signal, 'context'>[]> {
  return new Promise((resolve, reject) => {
    const { strictOrder, rejectOn, allowSkipping } = options;
    const compareableTriggers = triggers.map((trigger) => convertToCompareableSignals(trigger));
    const compareableRejections =
      rejectOn && rejectOn.length ? rejectOn.map((trigger) => convertToCompareableSignals(trigger)) : [];
    const hits = [];
    const disposerStorage = [() => undefined, false];

    const isDisposed = () => disposerStorage[1];

    const dispose = () => {
      if (isDisposed()) {
        return;
      }
      if (typeof disposerStorage[0] === 'function') {
        disposerStorage[0]();
      }
      disposerStorage[0] = undefined;
      disposerStorage[1] = true;
    };

    const causesRejection = (signal: SignalTriggerProps) => {
      if (!rejectOn) {
        return false;
      }
      return !!compareableRejections.find((rejectTrigger) => {
        return compareSignalTriggers(rejectTrigger, signal);
      });
    };

    const listener = (signal: Signal) => {
      if (isDisposed()) {
        return;
      }
      const compareableSignal = convertToCompareableSignals(signal);
      if (causesRejection(compareableSignal)) {
        dispose();
        reject(new Error(`options.rejectOn includes ${compareableSignal.type}:${compareableSignal.namespace}`));
        return;
      }
      const triggerIndex = compareableTriggers.findIndex((trigger) => {
        return compareSignalTriggers(trigger, compareableSignal);
      });

      if (triggerIndex > -1) {
        if (strictOrder && triggerIndex !== 0) {
          dispose();
          reject(
            new Error(
              `Signal ${compareableSignal.type}:${compareableSignal.namespace} emitted in wrong order #${hits.length} while strictOrder = true`,
            ),
          );
          return;
        }
        if (triggerIndex !== 0) {
          if (allowSkipping) {
            compareableTriggers.splice(0, triggerIndex + 1);
          } else {
            compareableTriggers.splice(triggerIndex, 1);
          }
        } else {
          compareableTriggers.shift();
        }
        hits.push(compareableSignal);
        if (compareableTriggers.length === 0) {
          dispose();
          resolve(hits);
        }
      }
    };
    disposerStorage[0] = beacon.addListener(createTriggerPropsForAllSignals(), listener);
  });
}
