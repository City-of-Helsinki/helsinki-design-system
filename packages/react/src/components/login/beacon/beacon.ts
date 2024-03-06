import { partiallyCompareObjects } from '../../../utils/partiallyCompareObjects';

export type SignalType = string;
export type SignalNamespace = string;
export type SignalPayload = Record<string, unknown> | Error;
export interface ConnectedModule {
  connect: (beacon: Beacon) => void;
  namespace: SignalNamespace;
}
export type SignalContext = ConnectedModule;
export type Signal<P = SignalType, T extends SignalPayload = SignalPayload> = {
  type?: P;
  namespace?: SignalType;
  payload?: T;
  context?: ConnectedModule;
};
export type SignalListener = (signal: Signal) => void;
export type SignalTriggerProps = Omit<Signal, 'context'> & { context?: Record<string, string> };
export type SignalTrigger = (signal: Signal) => boolean;

export type StoredListenerData = { listener: SignalListener; trigger: SignalTrigger };
export type SignalListenerSource = SignalType | Signal | SignalTrigger | SignalTriggerProps;

export type Disposer = () => void;

export type BeaconContext = Map<string, ConnectedModule>;

export type Beacon = {
  emit: (signal: Signal) => void;
  addListener: (triggerOrSignalProps: SignalListenerSource, listener: SignalListener) => Disposer;
  addSignalContext: (context: ConnectedModule) => Disposer;
  getSignalContext: (namespace: SignalNamespace) => ConnectedModule | undefined;
  getAllSignalContextsAsObject: () => Record<string, ConnectedModule>;
  clear: () => void;
};

export const LISTEN_TO_ALL_MARKER = '*';
const NAMESPACE_SEPARATOR = ':';

export function splitTypeAndNamespace(signalOrJustSignalType: SignalType | Signal, defaultNamespace = ''): Signal {
  if ((signalOrJustSignalType as Signal).namespace !== undefined) {
    return signalOrJustSignalType as Signal;
  }
  const signalType =
    typeof signalOrJustSignalType === 'string' ? signalOrJustSignalType : (signalOrJustSignalType.type as string);

  const splitted = (signalType as SignalType).split(NAMESPACE_SEPARATOR);
  return {
    type: splitted[0] || '',
    namespace: splitted[1] || defaultNamespace,
  };
}

export function joinTypeAndNamespace(signal: Partial<Signal>, defaultNamespace = '', defaultType = ''): string {
  return `${signal.type || defaultType}${NAMESPACE_SEPARATOR}${signal.namespace || defaultNamespace}`;
}

export function convertToComparableSignals(
  signalOrJustType: SignalType | Partial<Signal> | SignalTriggerProps,
): SignalTriggerProps {
  const source =
    typeof signalOrJustType === 'string'
      ? splitTypeAndNamespace(signalOrJustType)
      : ({ ...signalOrJustType } as Signal);
  // If source has context, it is a deep object with unnecessary key/values to compare.
  // Only important prop is the namespace, so just pick that
  if (!source.context) {
    return source as unknown as SignalTriggerProps;
  }
  return { ...source, context: source.context ? { namespace: source.context.namespace } : undefined };
}

export function compareSignalTriggers(source: SignalTriggerProps, target: SignalTriggerProps) {
  const copy = { ...source };
  if (!source.type || source.type === LISTEN_TO_ALL_MARKER) {
    copy.type = target.type;
  }

  if (!source.namespace || source.namespace === LISTEN_TO_ALL_MARKER) {
    copy.namespace = target.namespace;
  }
  return partiallyCompareObjects(copy, target);
}

export function compareSignals(signalOrJustType: SignalType | Partial<Signal>, signalToCheckFrom: Signal) {
  const source = convertToComparableSignals(signalOrJustType);
  // If source has no context, it is not compared to the target, so no need to convert it.
  const target = source.context
    ? convertToComparableSignals(signalToCheckFrom)
    : (signalToCheckFrom as unknown as SignalTriggerProps);
  return compareSignalTriggers(source, target);
}

export function createSignalTrigger(signalOrJustSignalType: SignalType | Signal | SignalTriggerProps): SignalTrigger {
  const source = convertToComparableSignals(signalOrJustSignalType);
  return (incomingSignal: Signal) => {
    // Incoming signal should not be generic, it must have type and namespace
    // so type cannot be empty or "*"
    const incomingTypeIsOk = incomingSignal.type && incomingSignal.type !== LISTEN_TO_ALL_MARKER;
    const incomingNamespaceIsOk = incomingSignal.namespace;
    if (!incomingTypeIsOk || !incomingNamespaceIsOk) {
      return false;
    }
    const target = source.context
      ? convertToComparableSignals(incomingSignal)
      : (incomingSignal as unknown as SignalTriggerProps);
    return compareSignalTriggers(source, target);
  };
}

export function createBeacon(): Beacon {
  let isSignalling = false;
  const listenerData = new Set<StoredListenerData>();
  const signalQueue: Signal[] = [];
  const listenerQueue = new Set<StoredListenerData>();
  const contextMap: BeaconContext = new Map();

  const addListener: Beacon['addListener'] = (triggerOrSignalProps, listener) => {
    const trigger =
      typeof triggerOrSignalProps === 'function'
        ? (triggerOrSignalProps as SignalTrigger)
        : createSignalTrigger(triggerOrSignalProps);
    const data = { listener, trigger };
    // If a listener is added while signalling and it is triggered by the
    // currently emitted signal, a loop could be created.
    // This can occur when using hooks and not memoizing listeners.
    // Prevention system is almost impossible to create, because cannot prevent all signals during emitting
    // and very hard to build logic for preventing signals that may trigger listeners already triggered.
    // For now, just document the problem.
    if (!isSignalling) {
      listenerData.add(data);
    } else {
      listenerQueue.add(data);
    }
    return () => {
      listenerData.delete(data);
      listenerQueue.delete(data);
    };
  };

  const destroyEmittedSignal = (signal: Partial<Signal>) => {
    /* eslint-disable no-param-reassign */
    signal.context = undefined;
    signal.type = undefined;
    signal.namespace = undefined;
    signal.payload = undefined;
    /* eslint-enable no-param-reassign */
  };

  const handleListenerQueue = () => {
    if (listenerQueue.size) {
      listenerQueue.forEach((data) => {
        listenerData.add(data);
      });
      return;
    }
    listenerQueue.clear();
  };

  const copySignalAndAssignContext = (signalBody: Signal) => {
    const signalTypeAndNamespace = splitTypeAndNamespace(signalBody, LISTEN_TO_ALL_MARKER);
    const context = signalBody.context || contextMap.get(signalTypeAndNamespace.namespace) || undefined;
    return {
      ...signalBody,
      ...signalTypeAndNamespace,
      context,
    };
  };

  const triggerListeners = (signal: Signal) => {
    const signalToSend = copySignalAndAssignContext(signal);
    listenerData.forEach((data) => {
      const { listener, trigger } = data;
      if (trigger(signalToSend)) {
        listener(signalToSend);
      }
    });
    destroyEmittedSignal(signalToSend);
  };

  const sendQueued = () => {
    const list = [...signalQueue];
    signalQueue.length = 0;
    list.forEach((signal) => {
      triggerListeners(signal);
    });
    if (signalQueue.length) {
      sendQueued();
    }
  };

  const beacon: Beacon = {
    emit: (signal) => {
      if (isSignalling) {
        signalQueue.push(signal);
        return;
      }
      isSignalling = true;
      signalQueue.push(signal);
      sendQueued();
      handleListenerQueue();
      isSignalling = false;
    },
    addListener,
    clear: () => {
      listenerData.clear();
      contextMap.clear();
      signalQueue.length = 0;
    },
    addSignalContext: (context: ConnectedModule) => {
      const { namespace } = context;
      if (!namespace) {
        throw new Error(`SignalContext ${namespace} has no namespace`);
      }
      if (contextMap.has(namespace)) {
        throw new Error(`SignalContext ${namespace} already exists`);
      }
      contextMap.set(namespace, context);
      context.connect(beacon);
      return () => {
        contextMap.delete(namespace);
      };
    },
    getSignalContext: (namespace: SignalNamespace) => {
      return contextMap.get(namespace);
    },
    getAllSignalContextsAsObject: () => {
      const obj = {};
      contextMap.forEach((context, namespace) => {
        obj[namespace] = context;
      });
      return obj;
    },
  };
  return beacon;
}
