import { LISTEN_TO_ALL_MARKER, Signal, SignalTriggerProps } from '../beacon/beacon';
import { EventPayload, errorSignalType, getErrorSignalPayload, isEventSignal } from '../beacon/signals';
import { sessionPollerNamespace } from './sessionPoller';
import { SessionPollerError, sessionPollerErrors } from './sessionPollerError';

export function isSessionEndedSignal(signal: Signal): boolean {
  const errorPayload = getErrorSignalPayload(signal);
  if (!errorPayload) {
    return false;
  }
  return (errorPayload as SessionPollerError).type === sessionPollerErrors.SESSION_ENDED;
}

export function createSessionPollerSignalTrigger(): SignalTriggerProps {
  return {
    type: LISTEN_TO_ALL_MARKER,
    namespace: sessionPollerNamespace,
  };
}
export function getSessionPollerSignalEventPayload(signal: Signal): EventPayload | null {
  if (!isEventSignal(signal) || signal.namespace !== sessionPollerNamespace || !signal.payload) {
    return null;
  }
  return signal.payload as EventPayload;
}

export function createSessionEndedSignalTrigger(): SignalTriggerProps {
  return {
    type: errorSignalType,
    namespace: sessionPollerNamespace,
    payload: {
      type: sessionPollerErrors.SESSION_ENDED,
    },
  };
}
