import { getAllMockCallArgs, getLastMockCallArgs } from '../../../utils/testHelpers';
import {
  SignalNamespace,
  ConnectedModule,
  Disposer,
  SignalListener,
  SignalType,
  Signal,
  Beacon,
} from '../beacon/beacon';
import {
  ErrorPayload,
  EventPayload,
  NamespacedBeacon,
  createEventTrigger,
  createNamespacedBeacon,
  errorSignalType,
  eventSignalType,
  filterSignals,
} from '../beacon/signals';

export type ConnectedBeaconModule = NamespacedBeacon &
  ConnectedModule & { listenTo: (signalOrJustType: SignalType | Signal) => Disposer; getListener: () => jest.Mock };

export function createConnectedBeaconModule(namespace: SignalNamespace, callStamper = Date.now): ConnectedBeaconModule {
  const dedicatedBeacon = createNamespacedBeacon(namespace);
  const listener = jest.fn();
  return {
    ...dedicatedBeacon,
    listenTo: (signalOrJustType) => {
      const wrappedListener: SignalListener = (signal) => {
        listener({ ...signal }, namespace, callStamper());
      };
      return dedicatedBeacon.addListener(signalOrJustType, wrappedListener);
    },
    namespace,
    connect: (targetBeacon) => {
      dedicatedBeacon.storeBeacon(targetBeacon);
    },
    getListener: () => listener,
  };
}

export function addPreConnectionCall(
  beaconModule: ConnectedBeaconModule,
  call: (beaconModule: ConnectedBeaconModule) => void,
): void {
  const original = beaconModule.connect;
  // eslint-disable-next-line no-param-reassign
  beaconModule.connect = (beacon) => {
    original(beacon);
    call(beaconModule);
  };
}

export function getListenerSignals(listener: jest.Mock | SignalListener): Signal[] {
  return getAllMockCallArgs(listener as jest.Mock).map((args: unknown[]) => {
    return args[0] as Signal;
  });
}

export function getListenerSignalTypes(listener: jest.Mock | SignalListener) {
  return getListenerSignals(listener as jest.Mock).map((signal) => {
    return `${signal.type}:${signal.namespace}`;
  });
}

export function getContextFromArguments(args: unknown[]) {
  const contextArgs = args.filter((arg) => {
    return !!(arg && (arg as Signal).context);
  }) as Signal[];
  return contextArgs[0] && contextArgs[0].context;
}

export function getErrorSignals(signals: Signal[]) {
  return signals.filter((signal) => {
    return signal.type === errorSignalType;
  });
}

export function getAllErrorSignals(listener: jest.Mock | SignalListener) {
  return getErrorSignals(getListenerSignals(listener as jest.Mock));
}

export function getLastContext(listener: jest.Mock) {
  return getContextFromArguments(getLastMockCallArgs(listener));
}

export function getAllContexts(listener: jest.Mock) {
  return getAllMockCallArgs(listener).map(getContextFromArguments);
}

export function createTestListenerModule(
  targetNamespace: SignalNamespace,
  moduleNamepace: SignalNamespace = 'listenerModule',
  callStamper = Date.now,
) {
  const listenerModule = createConnectedBeaconModule(moduleNamepace, callStamper);
  listenerModule.listenTo(`*:${targetNamespace}`);
  return listenerModule;
}

export function getReceivedErrorSignalPayloads<T = ErrorPayload>(listenerModule: ConnectedBeaconModule): T[] {
  const errorSignals = filterSignals(getListenerSignals(listenerModule.getListener()), { type: errorSignalType });
  return errorSignals.map((signal) => {
    return signal.payload as T;
  });
}

export function getReceivedEventSignalPayloads<T = EventPayload>(listenerModule: ConnectedBeaconModule): T[] {
  const eventSignals = filterSignals(getListenerSignals(listenerModule.getListener()), { type: eventSignalType });
  return eventSignals.map((signal) => {
    return signal.payload as T;
  });
}

export function emitEvent(beacon: Beacon, namespace: Signal['namespace'], eventPayload: EventPayload): void {
  beacon.emit({ ...createEventTrigger(namespace), payload: eventPayload });
}
