export type SignalType = string;
export type SignalNamespace = string;
export type SignalPayload = Record<string, unknown>;
export interface ConnectedModule {
  connect: (beacon: Beacon) => string;
  name: string;
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
  addSignalContext: (namespace: SignalNamespace, context: ConnectedModule) => Disposer;
  getSignalContext: (namespace: SignalNamespace) => ConnectedModule | undefined;
  clear: () => void;
};

export const LISTEN_TO_ALL_MARKER = '*';
const NAMESPACE_SEPARATOR = ':';

export function splitTypeAndNamespace(signalOrJustSignalType: SignalType | Signal): Signal {
  if ((signalOrJustSignalType as Signal).namespace !== undefined) {
    return signalOrJustSignalType as Signal;
  }
  const signalType =
    typeof signalOrJustSignalType === 'string' ? signalOrJustSignalType : (signalOrJustSignalType.type as string);

  const splitted = (signalType as SignalType).split(NAMESPACE_SEPARATOR);
  return {
    type: splitted[0] || '',
    namespace: splitted[1] || '',
  };
}

export function createSignalTrigger(signalOrJustSignalType: SignalType | Signal): SignalTrigger {
  const { type: listenToType, namespace: listenToNamespace } = splitTypeAndNamespace(signalOrJustSignalType);
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

  const copySignalAndAssignContext = (signalBody: Signal, namespace: SignalNamespace = LISTEN_TO_ALL_MARKER) => {
    const singalTypeAndNamespace = splitTypeAndNamespace(signalBody);
    const context = signalBody.context || contextMap.get(namespace) || undefined;
    return {
      ...signalBody,
      ...singalTypeAndNamespace,
      context,
    };
  };

  const triggerListeners = (signal: Signal) => {
    const signalToSend = copySignalAndAssignContext(signal, signal.namespace);
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
    const signalToSend = copySignalAndAssignContext(signal, signal.namespace);
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

  return {
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
      // console.log('---emit async', signal);
      if (isAsyncSignalling) {
        // console.log('---pending...', signal);
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
    addSignalContext: (namespace: SignalNamespace, context: ConnectedModule) => {
      if (contextMap.has(namespace)) {
        throw new Error(`SignalContext ${namespace} already exists`);
      }
      contextMap.set(namespace, context);
      return () => {
        contextMap.delete(namespace);
      };
    },
    getSignalContext: (namespace: SignalNamespace) => {
      return contextMap.get(namespace);
    },
  };
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
