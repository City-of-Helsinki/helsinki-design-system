import { User } from 'oidc-client-ts';

import { Beacon, Disposer, Signal, SignalListener, SignalNamespace } from '../beacon/beacon';
import { eventSignalType, EventSignal, NamespacedBeacon, createNamespacedBeacon } from '../beacon/signals';
import { OidcClient, oidcClientNamespace, OidcClientState } from './index';

export type StateChangeSignalPayload = { state: OidcClientState; previousState?: OidcClientState };
export type StateChangeSignalType = typeof stateChangeSignalType;
export type StateChangeSignal = {
  type: StateChangeSignalType;
  namespace: SignalNamespace;
  payload: StateChangeSignalPayload;
  context: OidcClient;
};
export const stateChangeSignalType = 'stateChange' as const;

export type OidcClientEvent = 'USER_RENEWAL_STARTED' | 'USER_RENEWAL_COMPLETED' | 'USER_RENEWAL_FAILED';
export type OidcClientEventSignal = EventSignal & {
  payload: {
    type: OidcClientEvent;
    data?: User | null;
  };
};

export function createStateChangeTrigger(): Pick<Signal, 'namespace'> & { type: StateChangeSignalType } {
  return {
    type: stateChangeSignalType,
    namespace: oidcClientNamespace,
  };
}

export function getOidcClientStateChangePayload(signal: Signal): StateChangeSignalPayload | null {
  if (signal.type !== stateChangeSignalType || !signal.payload) {
    return null;
  }
  return (signal as StateChangeSignal).payload;
}

export function createOidcClientEventTrigger(): Pick<Signal, 'namespace'> & { type: EventSignal['type'] } {
  return {
    type: eventSignalType,
    namespace: oidcClientNamespace,
  };
}

export function getOidcClientFromSignal(signal: Signal): OidcClient | null {
  if (!signal.context || signal.context.namespace !== oidcClientNamespace) {
    return null;
  }
  return signal.context as OidcClient;
}

export function addStateChangeSignalListener(beacon: Beacon, listener: (signal: StateChangeSignal) => void): Disposer {
  const trigger = createStateChangeTrigger();
  return beacon.addListener(trigger, listener as SignalListener);
}

export function createOidcClientBeacon(): NamespacedBeacon & {
  emitStateChange: (payload: StateChangeSignalPayload) => void;
} {
  const dedicatedBeacon = createNamespacedBeacon(oidcClientNamespace);
  return {
    ...dedicatedBeacon,
    emitStateChange: (payload: StateChangeSignalPayload) => {
      dedicatedBeacon.emit(stateChangeSignalType, payload);
    },
  };
}
