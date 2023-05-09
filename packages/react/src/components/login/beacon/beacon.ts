export type SignalType = string;
export type SignalNamespace = string;
export type SignalPayload = Record<string, unknown> | Error;
export interface ConnectedModule {
  connect: (beacon: Beacon) => void;
  namespace: SignalNamespace;
}
export type SignalContext = ConnectedModule;
export type Signal<T extends SignalPayload = SignalPayload> = {
  type: SignalType;
  namespace?: SignalType;
  payload?: T;
  context?: ConnectedModule;
};
export type SignalListener = (signal: Signal) => void | Promise<void>;
export type SignalTrigger = (signal: Signal) => boolean;
export type StoredListenerData = { listener: SignalListener; trigger: SignalTrigger };

// add cleanup?
export type Disposer = () => void;

export type BeaconContext = Map<string, ConnectedModule>;

export type Beacon = {
  emit: (signal: Signal) => void;
  emitAsync: (signal: Signal) => Promise<void>;
  addListener: (signalOrJustSignalType: SignalType | Signal, listener: SignalListener) => Disposer;
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

export function createSignalTrigger(signalOrJustSignalType: SignalType | Signal): SignalTrigger {
  const { type: listenToType, namespace: listenToNamespace } = splitTypeAndNamespace(
    signalOrJustSignalType,
    LISTEN_TO_ALL_MARKER,
  );
  return (incomingSignal: Signal) => {
    // incoming signal should not determine what to trigger expect explicit type and namespace
    // so type cannot be empty or "*"
    const incomingTypeIsOk = incomingSignal.type && incomingSignal.type !== LISTEN_TO_ALL_MARKER;
    const incomingNamespaceIsOk = incomingSignal.namespace;
    if (!incomingTypeIsOk || !incomingNamespaceIsOk) {
      return false;
    }
    const typeIsOk = listenToType === LISTEN_TO_ALL_MARKER || listenToType === incomingSignal.type;
    const namespaceIsOk = listenToNamespace === LISTEN_TO_ALL_MARKER || listenToNamespace === incomingSignal.namespace;
    return typeIsOk && namespaceIsOk;
  };
}

export function createBeacon(): Beacon {
  let isSignalling = false;
  let isAsyncSignalling = false;
  const listenerData = new Set<StoredListenerData>();
  const signalQueue: Signal[] = [];
  const asyncSignalQueue: Signal[] = [];
  const contextMap: BeaconContext = new Map();

  const addListener: Beacon['addListener'] = (
    signalOrJustSignalType: SignalType | Signal,
    listener: SignalListener,
  ) => {
    const trigger = createSignalTrigger(signalOrJustSignalType);
    const data = { listener, trigger };
    listenerData.add(data);
    return () => {
      listenerData.delete(data);
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

  const asyncAwaitArray = async (array: Array<unknown>, iterator: (argument: unknown) => Promise<unknown>) => {
    // eslint-disable-next-line no-restricted-syntax
    for (const item of array) {
      // eslint-disable-next-line no-await-in-loop
      await iterator(item);
    }
  };

  const triggerAsyncListeners = async (signal: Signal) => {
    const list = Array.from(listenerData);
    const signalToSend = copySignalAndAssignContext(signal);
    await asyncAwaitArray(list, async (data) => {
      const { listener, trigger } = data as StoredListenerData;
      if (trigger(signalToSend)) {
        await listener(signalToSend);
      }
    });
    destroyEmittedSignal(signalToSend);
  };

  const sendAsyncQueued = async () => {
    const list = [...asyncSignalQueue];
    asyncSignalQueue.length = 0;
    await asyncAwaitArray(list, async (signal) => {
      await triggerAsyncListeners(signal as Signal);
    });

    if (asyncSignalQueue.length) {
      await sendAsyncQueued();
    }
  };

  const beacon: Beacon = {
    emit: (signal) => {
      // prevent adding same twice!
      // if listener *:* emits *:any?
      // current signal list
      if (isSignalling) {
        signalQueue.push(signal);
        return;
      }
      isSignalling = true;
      signalQueue.push(signal);
      sendQueued();
      isSignalling = false;
    },
    emitAsync: async (signal) => {
      if (isAsyncSignalling) {
        asyncSignalQueue.push(signal);
        // this resolve handles loops where current listener is awaiting for pending
        // which does not fulfill after current is fulfilled.
        return Promise.resolve();
      }
      isAsyncSignalling = true;
      asyncSignalQueue.push(signal);
      await sendAsyncQueued();
      isAsyncSignalling = false;
      return Promise.resolve();
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

export function createSignal(
  type: SignalType,
  namespace: SignalNamespace,
  payload?: SignalPayload,
  context?: SignalContext,
): Signal {
  return {
    type,
    namespace,
    payload,
    context,
  };
}

export function emitInitializationSignals(beacon: Beacon) {
  const contexts = beacon.getAllSignalContextsAsObject();
  Object.keys(contexts).forEach((namespace) => {
    beacon.emit({ type: 'init', namespace, context: contexts[namespace] });
  });
}
