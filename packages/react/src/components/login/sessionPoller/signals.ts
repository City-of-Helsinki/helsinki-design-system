import { Signal, SignalTriggerProps } from '../beacon/beacon';
import { errorSignalType, getErrorSignalPayload } from '../beacon/signals';
import { sessionPollerNamespace } from './sessionPoller';
import { SessionPollerError, sessionPollerErrors } from './sessionPollerError';

export function isSessionEndedSignal(signal: Signal): boolean {
  const errorPayload = getErrorSignalPayload(signal);
  if (!errorPayload) {
    return false;
  }
  return (errorPayload as SessionPollerError).type === sessionPollerErrors.SESSION_ENDED;
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
