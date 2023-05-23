import { getAllMockCallArgs } from '../../../utils/testHelpers';
import {
  Beacon,
  ConnectedModule,
  Disposer,
  LISTEN_TO_ALL_MARKER,
  Signal,
  SignalListener,
  SignalNamespace,
  SignalType,
  createBeacon,
  createSignalTrigger,
} from './beacon';
import { emitInitializationSignals } from './signals';
import {
  getListenerSignalTypes,
  getAllContexts,
  getLastContext,
  createConnectedBeaconModule,
} from '../testUtils/beaconTestUtil';

type CallDataWithTimestampAndId = {
  signalTypeAndNamespace: SignalType;
  id: string;
  timestamp: number;
};

describe(`beacon`, () => {
  let beacon: Beacon;
  let order = 0;
  // The order number is used for checking which order listeners were called.
  // Date.now produces too many same timestamps on fast computers
  const getOrderNumber = () => {
    order += 1;
    return order;
  };

  // convert signals to comparable/human readable form so it is easier to compare
  const convertSignalToString = (signal: Signal) => `${signal.type}:${signal.namespace}`;

  const addListenerWithEmitter = (signalToListen: SignalType, signalToEmit: SignalType) => {
    const listener = jest.fn();
    const disposer = beacon.addListener(signalToListen, (signal) => {
      listener(signal);
      beacon.emit({ type: signalToEmit });
    });
    return [listener, disposer];
  };

  // wraps the mock listener and calls it with signal, and also with metadata: id and ordernum
  // the metadata is used for checking triggering order of listeners
  const wrapListenerWithIdAndOrderNum = (listenedSignal: Signal, id: string, listener: jest.Mock) => {
    const wrapper: SignalListener = (signal) => {
      listener({ ...signal }, id, getOrderNumber());
    };
    beacon.addListener(listenedSignal, wrapper);
  };

  // returns the received signals in the order the listeners were triggered.
  // signals are converted into strings with type:namespace for easier comparison.
  const getListenerDataInCallOrder = (listeners: jest.Mock[]): CallDataWithTimestampAndId[] => {
    const calls: CallDataWithTimestampAndId[] = [];
    listeners.forEach((listener) => {
      getAllMockCallArgs(listener).forEach((args: [Signal, string, number]): void => {
        calls.push({
          signalTypeAndNamespace: `${args[0].type}:${args[0].namespace}`,
          id: args[1],
          timestamp: args[2],
        });
      });
    });
    calls.sort((a, b) => {
      if (a.timestamp === b.timestamp) {
        return a.id < b.id ? -1 : 1;
      }
      return a.timestamp < b.timestamp ? -1 : 1;
    });
    return calls;
  };

  const changeSignalType = 'change';
  const otherSignalType = 'other';
  const echoSignalType = 'echo';
  const omegaSignalType = 'omega';
  const namespaceA = 'namespaceA';
  const notNamespaceA = 'notNamespaceA';
  const allNamespaceOrType = LISTEN_TO_ALL_MARKER;

  const listenerForChangeSignalsNamespaceA = jest.fn();
  const signalForListeningChangeSignalsNamespaceA: Signal = { type: changeSignalType, namespace: namespaceA };
  const triggersForChangeSignalNamespaceAListener = [signalForListeningChangeSignalsNamespaceA];
  const changeSignalWithNamespaceAString = convertSignalToString(signalForListeningChangeSignalsNamespaceA);

  const listenerForEverythingInNamespaceA = jest.fn();
  const signalForListeningNamespaceA = { type: allNamespaceOrType, namespace: namespaceA };
  const triggersForNamespaceAListener = [{ type: otherSignalType, namespace: namespaceA }];

  const listenerForEverything = jest.fn();
  const signalForListeningEverything = { type: allNamespaceOrType, namespace: allNamespaceOrType };
  const triggersForEverythingListener = [
    { type: changeSignalType, namespace: notNamespaceA },
    { type: otherSignalType, namespace: notNamespaceA },
  ];

  const listenerForEchoSignalsNamespaceA = jest.fn();
  const signalForListeningEchoSignalsNamespaceA: Signal = { type: echoSignalType, namespace: namespaceA };
  const echoSignalWithNamespaceAString = convertSignalToString(signalForListeningEchoSignalsNamespaceA);

  const signalForListeningOmegaSignalsNamespaceA: Signal = { type: omegaSignalType, namespace: namespaceA };
  const omegaSignalWithNamespaceAString = convertSignalToString(signalForListeningOmegaSignalsNamespaceA);

  const createDummyContext = (namespace: SignalNamespace): ConnectedModule => {
    return {
      namespace,
      connect: () => {
        //
      },
    };
  };

  const createTestBeaconModule = (namespace: SignalNamespace) => {
    return createConnectedBeaconModule(namespace, getOrderNumber);
  };

  beforeEach(() => {
    jest.useFakeTimers();
    beacon = createBeacon();
  });

  afterEach(() => {
    jest.runAllTimers();
    jest.useRealTimers();
    beacon.clear();
    jest.clearAllMocks();
  });

  describe(`createSignalTrigger creates a function which returns boolean indicating is the trigger listening the passed signal.`, () => {
    it(`Triggers with type "*" and namespace "*" listen to all signal types in any namespace. Except illegal values: empty or * type or empty namespace`, async () => {
      const trigger = createSignalTrigger('*:*');
      expect(trigger({ type: 'signalType', namespace: 'signalNamespace' })).toBeTruthy();
      expect(trigger({ type: 'signalType', namespace: 'any' })).toBeTruthy();
      expect(trigger({ type: 'any', namespace: 'any' })).toBeTruthy();
      expect(trigger({ type: 'any', namespace: '*' })).toBeTruthy();
      expect(trigger({ type: 'signalType', namespace: '*' })).toBeTruthy();

      expect(trigger({ type: 'signalType', namespace: '' })).toBeFalsy();
      expect(trigger({ type: '', namespace: 'any' })).toBeFalsy();
      expect(trigger({ type: '*', namespace: 'any' })).toBeFalsy();
      expect(trigger({ type: '', namespace: '' })).toBeFalsy();
      expect(trigger({ type: '*', namespace: '*' })).toBeFalsy();
    });
    it(`Trigger with given signal type and namespace listen only that type in that namespace`, async () => {
      const trigger = createSignalTrigger('signalType:signalNamespace');
      expect(trigger({ type: 'signalType', namespace: 'signalNamespace' })).toBeTruthy();
      expect(trigger({ type: 'any', namespace: 'signalNamespace' })).toBeFalsy();
      expect(trigger({ type: 'signalType', namespace: 'any' })).toBeFalsy();
      expect(trigger({ type: 'signalType', namespace: '*' })).toBeFalsy();
    });
    it(`Trigger with a certain signal type and namespace "*" listens to all signals of that type in any namespace. Except illegal values: empty or * type or empty namespace`, async () => {
      const trigger = createSignalTrigger('signalType:*');
      expect(trigger({ type: 'signalType', namespace: 'signalNamespace' })).toBeTruthy();
      expect(trigger({ type: 'signalType', namespace: 'any' })).toBeTruthy();
      expect(trigger({ type: 'signalType', namespace: '*' })).toBeTruthy();

      expect(trigger({ type: 'signalType', namespace: '' })).toBeFalsy();
      expect(trigger({ type: 'any', namespace: 'any' })).toBeFalsy();
      expect(trigger({ type: '', namespace: 'any' })).toBeFalsy();
      expect(trigger({ type: '*', namespace: 'any' })).toBeFalsy();
      expect(trigger({ type: '*', namespace: '*' })).toBeFalsy();
      expect(trigger({ type: '', namespace: '' })).toBeFalsy();
    });
    it(`Trigger with  signal type "*" and given namespace listens to all signals in that namespace `, async () => {
      const trigger = createSignalTrigger('*:signalNamespace');
      expect(trigger({ type: 'signalType', namespace: 'signalNamespace' })).toBeTruthy();
      expect(trigger({ type: 'any', namespace: 'signalNamespace' })).toBeTruthy();
      expect(trigger({ type: '*', namespace: 'signalNamespace' })).toBeFalsy();
      expect(trigger({ type: '', namespace: 'signalNamespace' })).toBeFalsy();
      expect(trigger({ type: 'signalType', namespace: '*' })).toBeFalsy();
      expect(trigger({ type: 'signalType', namespace: 'any' })).toBeFalsy();
    });
  });
  describe(`addListener`, () => {
    it(`Adds a listener and returns a disposer function which removes the listener.`, async () => {
      const disposeListenChangesInNamespaceA = beacon.addListener(
        signalForListeningChangeSignalsNamespaceA,
        listenerForChangeSignalsNamespaceA,
      );
      const disposelistenerForEverythingInNamespaceA = beacon.addListener(
        signalForListeningNamespaceA,
        listenerForEverythingInNamespaceA,
      );
      const disposeListenerForEverything = beacon.addListener(signalForListeningEverything, listenerForEverything);

      beacon.emit(triggersForEverythingListener[0]);
      beacon.emit(triggersForEverythingListener[1]);
      expect(listenerForEverything).toHaveBeenCalledTimes(2);
      expect(listenerForEverythingInNamespaceA).toHaveBeenCalledTimes(0);
      expect(listenerForChangeSignalsNamespaceA).toHaveBeenCalledTimes(0);

      beacon.emit(triggersForNamespaceAListener[0]);
      expect(listenerForEverything).toHaveBeenCalledTimes(3);
      expect(listenerForEverythingInNamespaceA).toHaveBeenCalledTimes(1);
      expect(listenerForChangeSignalsNamespaceA).toHaveBeenCalledTimes(0);

      beacon.emit(triggersForChangeSignalNamespaceAListener[0]);
      expect(listenerForEverything).toHaveBeenCalledTimes(4);
      expect(listenerForEverythingInNamespaceA).toHaveBeenCalledTimes(2);
      expect(listenerForChangeSignalsNamespaceA).toHaveBeenCalledTimes(1);

      disposeListenerForEverything();
      beacon.emit(triggersForChangeSignalNamespaceAListener[0]);
      expect(listenerForEverything).toHaveBeenCalledTimes(4);
      expect(listenerForEverythingInNamespaceA).toHaveBeenCalledTimes(3);
      expect(listenerForChangeSignalsNamespaceA).toHaveBeenCalledTimes(2);

      disposelistenerForEverythingInNamespaceA();
      beacon.emit(triggersForChangeSignalNamespaceAListener[0]);
      expect(listenerForEverything).toHaveBeenCalledTimes(4);
      expect(listenerForEverythingInNamespaceA).toHaveBeenCalledTimes(3);
      expect(listenerForChangeSignalsNamespaceA).toHaveBeenCalledTimes(3);

      disposeListenChangesInNamespaceA();
      beacon.emit(triggersForChangeSignalNamespaceAListener[0]);
      expect(listenerForEverything).toHaveBeenCalledTimes(4);
      expect(listenerForEverythingInNamespaceA).toHaveBeenCalledTimes(3);
      expect(listenerForChangeSignalsNamespaceA).toHaveBeenCalledTimes(3);
    });
    it(`Adding a listener while emitting adds it to a queue and the is added after emitting is over.`, () => {
      const listenToAddSignals = jest.fn();
      const listenersAddedWhileEmitting: jest.Mock[] = [];
      const disposers: Disposer[] = [];
      const addWhileEmitting: SignalListener = (signal) => {
        const newListener = jest.fn();
        const disposer = beacon.addListener('*:emitter', newListener);
        listenToAddSignals({ ...signal });
        listenersAddedWhileEmitting.push(newListener);
        disposers.push(disposer);
        // emit another signal at the same time
        // to make sure listener is not active
        beacon.emit({ type: 'added:emitter' });
      };

      beacon.addListener('add:emitter', addWhileEmitting);

      beacon.emit({ type: 'add:emitter' });
      expect(listenToAddSignals).toHaveBeenCalledTimes(1);
      expect(listenersAddedWhileEmitting).toHaveLength(1);
      expect(listenersAddedWhileEmitting[0]).toHaveBeenCalledTimes(0);

      beacon.emit({ type: 'add:emitter' });
      expect(listenToAddSignals).toHaveBeenCalledTimes(2);
      expect(listenersAddedWhileEmitting).toHaveLength(2);
      // two signals: add:emitter + added:emitter
      expect(listenersAddedWhileEmitting[0]).toHaveBeenCalledTimes(2);
      expect(listenersAddedWhileEmitting[1]).toHaveBeenCalledTimes(0);

      beacon.emit({ type: 'dontadd:emitter' });
      expect(listenToAddSignals).toHaveBeenCalledTimes(2);
      expect(listenersAddedWhileEmitting).toHaveLength(2);
      expect(listenersAddedWhileEmitting[0]).toHaveBeenCalledTimes(3);
      expect(listenersAddedWhileEmitting[1]).toHaveBeenCalledTimes(1);

      disposers[0]();
      disposers[1]();

      beacon.emit({ type: 'dontadd:emitter' });
      expect(listenersAddedWhileEmitting[0]).toHaveBeenCalledTimes(3);
      expect(listenersAddedWhileEmitting[1]).toHaveBeenCalledTimes(1);

      beacon.emit({ type: 'add:emitter' });
      expect(listenToAddSignals).toHaveBeenCalledTimes(3);
      expect(listenersAddedWhileEmitting).toHaveLength(3);
      expect(listenersAddedWhileEmitting[0]).toHaveBeenCalledTimes(3);
      expect(listenersAddedWhileEmitting[1]).toHaveBeenCalledTimes(1);
      expect(listenersAddedWhileEmitting[2]).toHaveBeenCalledTimes(0);
    });
    it(`The disposer of the listener that was added to the queue removes it. It wont be added after emit.`, () => {
      const disposers: Disposer[] = [];
      const listenAll = jest.fn();
      const firstListener = jest.fn();
      const secondListener = jest.fn();
      const addFirstListener: SignalListener = (signal) => {
        disposers[0] = beacon.addListener('*:emitter', firstListener);
        beacon.emit({ type: 'addSecond:emitter' });
        beacon.emit({ type: 'disposeFirst:emitter' });
        listenAll(signal);
      };
      const addSecondListener: SignalListener = (signal) => {
        disposers[1] = beacon.addListener('*:emitter', secondListener);
        listenAll(signal);
      };
      const disposeFirstListener: SignalListener = (signal) => {
        disposers[0]();
        listenAll(signal);
      };

      beacon.addListener('addFirst:emitter', addFirstListener);
      beacon.addListener('addSecond:emitter', addSecondListener);
      beacon.addListener('disposeFirst:emitter', disposeFirstListener);

      expect(listenAll).toHaveBeenCalledTimes(0);
      expect(firstListener).toHaveBeenCalledTimes(0);
      expect(secondListener).toHaveBeenCalledTimes(0);

      beacon.emit({ type: 'addFirst:emitter' });
      // listenAll catches addFirst, addSecond, disposeFirst
      expect(listenAll).toHaveBeenCalledTimes(3);
      expect(firstListener).toHaveBeenCalledTimes(0);
      // even if second listener listens to all, it is not added until all signals are emitted.
      expect(secondListener).toHaveBeenCalledTimes(0);
      beacon.emit({ type: 'any:emitter' });
      // secondListener catches only last
      expect(secondListener).toHaveBeenCalledTimes(1);
      disposers[1]();

      beacon.emit({ type: 'last:emitter' });
      expect(listenAll).toHaveBeenCalledTimes(3);
      expect(firstListener).toHaveBeenCalledTimes(0);
      expect(secondListener).toHaveBeenCalledTimes(1);
    });
  });
  describe(`emit() sends the signal and triggers listeners in the order listeners were added.`, () => {
    it(`emits during an emit are emitted after current signal is emitted to all listeners`, () => {
      wrapListenerWithIdAndOrderNum(
        signalForListeningChangeSignalsNamespaceA,
        'firstAddedListenerChangeA',
        listenerForChangeSignalsNamespaceA,
      );
      wrapListenerWithIdAndOrderNum(
        signalForListeningNamespaceA,
        'secondAddedListenerForAllA',
        listenerForEverythingInNamespaceA,
      );
      wrapListenerWithIdAndOrderNum(
        signalForListeningEchoSignalsNamespaceA,
        'thirdAddedListenerEchoA',
        listenerForEchoSignalsNamespaceA,
      );

      beacon.emit(triggersForChangeSignalNamespaceAListener[0]);
      expect(getListenerSignalTypes(listenerForChangeSignalsNamespaceA)).toEqual([changeSignalWithNamespaceAString]);
      expect(getListenerSignalTypes(listenerForEverythingInNamespaceA)).toEqual([changeSignalWithNamespaceAString]);

      addListenerWithEmitter(changeSignalWithNamespaceAString, echoSignalWithNamespaceAString);
      addListenerWithEmitter(echoSignalWithNamespaceAString, omegaSignalWithNamespaceAString);

      wrapListenerWithIdAndOrderNum(signalForListeningEverything, 'fourthAddedListenerAll', listenerForEverything);

      beacon.emit(triggersForChangeSignalNamespaceAListener[0]);
      expect(getListenerSignalTypes(listenerForChangeSignalsNamespaceA)).toEqual([
        changeSignalWithNamespaceAString,
        changeSignalWithNamespaceAString,
      ]);
      expect(getListenerSignalTypes(listenerForEverythingInNamespaceA)).toEqual([
        changeSignalWithNamespaceAString,
        changeSignalWithNamespaceAString,
        echoSignalWithNamespaceAString,
        omegaSignalWithNamespaceAString,
      ]);
      expect(getListenerSignalTypes(listenerForEchoSignalsNamespaceA)).toEqual([echoSignalWithNamespaceAString]);
      expect(getListenerSignalTypes(listenerForEverything)).toEqual([
        changeSignalWithNamespaceAString,
        echoSignalWithNamespaceAString,
        omegaSignalWithNamespaceAString,
      ]);

      const callsInOrder = getListenerDataInCallOrder([
        listenerForChangeSignalsNamespaceA,
        listenerForEverythingInNamespaceA,
        listenerForEchoSignalsNamespaceA,
        listenerForEverything,
      ]);

      expect(callsInOrder.map((data) => `${data.id}_${data.signalTypeAndNamespace}`)).toEqual([
        // when first signal is emitted, only first, second and third listeners exist
        // third listens to echo
        'firstAddedListenerChangeA_change:namespaceA',
        'secondAddedListenerForAllA_change:namespaceA',
        //
        'firstAddedListenerChangeA_change:namespaceA',
        'secondAddedListenerForAllA_change:namespaceA',
        'fourthAddedListenerAll_change:namespaceA',
        // a trigger for echo signal was added after first emit. Triggered by "change"
        'secondAddedListenerForAllA_echo:namespaceA',
        'thirdAddedListenerEchoA_echo:namespaceA',
        'fourthAddedListenerAll_echo:namespaceA',
        // a trigger for omega signal was added after first emit. Triggered by "echo"
        'secondAddedListenerForAllA_omega:namespaceA',
        'fourthAddedListenerAll_omega:namespaceA',
      ]);
    });
  });

  describe(`Context and connectedModules`, () => {
    it(`addSignalContext() adds the module to the context map of the beacon and calls module.connect`, () => {
      const connectedModule1 = createTestBeaconModule('module1');
      const connectedModule2 = createTestBeaconModule('module2');
      const connectedModule1Spy = jest.spyOn(connectedModule1, 'connect');
      const connectedModule2Spy = jest.spyOn(connectedModule2, 'connect');
      expect(beacon.getAllSignalContextsAsObject()).toMatchObject({});
      beacon.addSignalContext(connectedModule1);
      expect(beacon.getAllSignalContextsAsObject()).toMatchObject({ module1: connectedModule1 });
      expect(beacon.getSignalContext(connectedModule1.namespace)).toBe(connectedModule1);
      expect(beacon.getSignalContext(connectedModule2.namespace)).toBe(undefined);
      expect(connectedModule1Spy).toHaveBeenCalledTimes(1);
      expect(connectedModule1Spy).toHaveBeenLastCalledWith(beacon);
      expect(connectedModule2Spy).toHaveBeenCalledTimes(0);

      beacon.addSignalContext(connectedModule2);
      expect(beacon.getAllSignalContextsAsObject()).toMatchObject({
        module1: connectedModule1,
        module2: connectedModule2,
      });
      expect(connectedModule2Spy).toHaveBeenLastCalledWith(beacon);
      expect(connectedModule1Spy).toHaveBeenCalledTimes(1);
      expect(connectedModule2Spy).toHaveBeenCalledTimes(1);
      expect(beacon.getSignalContext(connectedModule1.namespace)).toBe(connectedModule1);
      expect(beacon.getSignalContext(connectedModule2.namespace)).toBe(connectedModule2);
    });
    it(`addSignalContext() throws, if adding same namespace again`, async () => {
      const connectedModule1 = createTestBeaconModule('module1');
      beacon.addSignalContext(connectedModule1);
      expect(() => beacon.addSignalContext(connectedModule1)).toThrow();
    });
    it(`a signal is emitted to all connected modules when emitInitializationSignals() is called`, async () => {
      const connectedModule1 = createTestBeaconModule('module1');
      const connectedModule2 = createTestBeaconModule('module2');
      const connectedModule3 = createTestBeaconModule('module3');
      const nonModuleListener = jest.fn();
      wrapListenerWithIdAndOrderNum(signalForListeningEverything, 'nonModuleListener', nonModuleListener);
      beacon.addSignalContext(connectedModule1);
      beacon.addSignalContext(connectedModule2);
      beacon.addSignalContext(connectedModule3);

      connectedModule1.listenTo('init');
      connectedModule2.listenTo('init');
      connectedModule3.listenTo('init');
      emitInitializationSignals(beacon);
      expect(connectedModule1.getListener()).toHaveBeenCalledTimes(2);
      expect(connectedModule2.getListener()).toHaveBeenCalledTimes(2);
      expect(connectedModule3.getListener()).toHaveBeenCalledTimes(2);
      expect(nonModuleListener).toHaveBeenCalledTimes(3);
      const signalContextsFromListenerCalls = getAllContexts(nonModuleListener);
      expect(signalContextsFromListenerCalls.includes(connectedModule1)).toBeTruthy();
      expect(signalContextsFromListenerCalls.includes(connectedModule2)).toBeTruthy();
      expect(signalContextsFromListenerCalls.includes(connectedModule3)).toBeTruthy();
    });
  });

  describe(`When emitting signals, the signal.context is `, () => {
    const syncListener = jest.fn();
    const syncListener2 = jest.fn();
    const syncSignalType = 'sync';
    const syncSignalType2 = 'sync2';
    const signalForListeningAllSyncSignals = { ...signalForListeningEverything, type: syncSignalType };
    const signalForListeningAllAsyncSignals = { ...signalForListeningEverything, type: syncSignalType2 };
    it(`the given context, if any`, async () => {
      wrapListenerWithIdAndOrderNum(signalForListeningAllSyncSignals, 'syncListener', syncListener);
      wrapListenerWithIdAndOrderNum(signalForListeningAllAsyncSignals, 'asyncListener', syncListener2);
      const context1 = createDummyContext('c1');
      const context2 = createDummyContext('c2');

      beacon.emit({ type: 'sync', context: context1 });
      expect(syncListener).toHaveBeenCalledTimes(1);
      expect(getLastContext(syncListener)).toBe(context1);

      beacon.emit({ type: 'sync', context: context2 });
      expect(syncListener).toHaveBeenCalledTimes(2);
      expect(getLastContext(syncListener)).toBe(context2);

      beacon.emit({ type: 'sync', context: undefined });
      expect(syncListener).toHaveBeenCalledTimes(3);
      expect(syncListener2).toHaveBeenCalledTimes(0);
      expect(getLastContext(syncListener)).toBeUndefined();

      beacon.emit({ type: syncSignalType2, context: context1 });
      expect(syncListener2).toHaveBeenCalledTimes(1);
      expect(getLastContext(syncListener2)).toBe(context1);

      beacon.emit({ type: syncSignalType2, context: context2 });
      expect(syncListener2).toHaveBeenCalledTimes(2);
      expect(getLastContext(syncListener2)).toBe(context2);

      beacon.emit({ type: syncSignalType2, context: undefined });
      expect(syncListener).toHaveBeenCalledTimes(3);
      expect(syncListener2).toHaveBeenCalledTimes(3);
      expect(getLastContext(syncListener2)).toBeUndefined();
    });
    it(`the connected context, if it can be found with given namespace`, () => {
      const context1 = createDummyContext('c1');
      const connectedModule1 = createTestBeaconModule('module1');
      const connectedModule2 = createTestBeaconModule('module2');
      const connectedModule1Listener = connectedModule1.getListener();
      const connectedModule2Listener = connectedModule2.getListener();
      beacon.addSignalContext(connectedModule1);
      beacon.addSignalContext(connectedModule2);
      connectedModule1.listenTo(syncSignalType);
      connectedModule2.listenTo(syncSignalType);
      wrapListenerWithIdAndOrderNum(signalForListeningAllSyncSignals, 'syncListener', syncListener);

      beacon.emit({ type: syncSignalType, context: context1 });
      expect(syncListener).toHaveBeenCalledTimes(1);
      expect(connectedModule1Listener).toHaveBeenCalledTimes(1);
      expect(connectedModule2Listener).toHaveBeenCalledTimes(1);
      expect(getLastContext(connectedModule1Listener)).toBe(context1);
      expect(getLastContext(connectedModule2Listener)).toBe(context1);
      expect(getLastContext(syncListener)).toBe(context1);

      beacon.emit({ type: syncSignalType, namespace: connectedModule1.namespace });
      expect(syncListener).toHaveBeenCalledTimes(2);
      expect(connectedModule1Listener).toHaveBeenCalledTimes(1);
      expect(connectedModule2Listener).toHaveBeenCalledTimes(2);
      expect(getLastContext(connectedModule1Listener)).toBe(context1);
      expect(getLastContext(connectedModule2Listener)).toBe(connectedModule1);
      expect(getLastContext(syncListener)).toBe(connectedModule1);

      beacon.emit({ type: syncSignalType, namespace: connectedModule2.namespace });
      expect(syncListener).toHaveBeenCalledTimes(3);
      expect(connectedModule1Listener).toHaveBeenCalledTimes(2);
      expect(connectedModule2Listener).toHaveBeenCalledTimes(2);
      expect(getLastContext(connectedModule1Listener)).toBe(connectedModule2);
      expect(getLastContext(connectedModule2Listener)).toBe(connectedModule1);
      expect(getLastContext(syncListener)).toBe(connectedModule2);
    });
  });
});
