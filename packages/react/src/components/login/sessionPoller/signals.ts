import { Signal, SignalTrigger, SignalTriggerProps, createSignalTrigger } from '../beacon/beacon';
import {
  ErrorPayload,
  ErrorSignal,
  EventPayload,
  EventSignal,
  checkErrorSignalPayload,
  createErrorSignal,
  createErrorTriggerProps,
  createEventSignal,
  createEventTriggerProps,
  createSignalOrTriggerProps,
  createTriggerPropsForAllSignals,
  errorSignalType,
  eventSignalType,
  getErrorSignalPayload,
  getEventSignalPayload,
  isNamespacedSignal,
} from '../beacon/signals';
import { SessionPollerEvent, sessionPollerEvents, sessionPollerNamespace } from './sessionPoller';
import { SessionPollerError, SessionPollerErrorType, sessionPollerErrors } from './sessionPollerError';

export type SessionPollerEventSignal = EventSignal & {
  payload: {
    type: SessionPollerEvent;
  };
};

function createSessionPollerErrorTrigger(error: SessionPollerErrorType): SignalTrigger {
  return createSignalTrigger(createSignalOrTriggerProps(errorSignalType, sessionPollerNamespace, { type: error }));
}

function createSessionPollerEventTrigger(type: SessionPollerEvent): SignalTrigger {
  return createSignalTrigger(createSignalOrTriggerProps(eventSignalType, sessionPollerNamespace, { type }));
}

function isGivenEventSignal(signal: Signal, eventType: SessionPollerEvent): boolean {
  // eslint-disable-next-line @typescript-eslint/no-use-before-define
  const payload = signal ? getSessionPollerEventPayload(signal) : null;
  return !!payload && payload.type === eventType;
}

export function isSessionPollerSignal(signal: Signal) {
  return isNamespacedSignal(signal, sessionPollerNamespace);
}

export function createTriggerPropsForAllSessionPollerSignals(): SignalTriggerProps {
  return createTriggerPropsForAllSignals(sessionPollerNamespace);
}
// pre-defined triggers and triggerProps

export const triggerForAllSessionPollerSignals: SignalTrigger = createSignalTrigger(
  createTriggerPropsForAllSessionPollerSignals(),
);

/* event signals */

export function getSessionPollerEventPayload(signal: Signal): EventPayload | null {
  return isSessionPollerSignal(signal) ? (getEventSignalPayload(signal) as EventPayload) : null;
}

export function createSessionPollerEventSignal(payload: EventPayload): SessionPollerEventSignal {
  return createEventSignal(sessionPollerNamespace, payload) as SessionPollerEventSignal;
}

export function isSessionPollerStartedSignal(signal?: Signal): boolean {
  return !!signal && isGivenEventSignal(signal, sessionPollerEvents.SESSION_POLLING_STARTED);
}

export function isSessionPollerStoppedSignal(signal?: Signal): boolean {
  return !!signal && isGivenEventSignal(signal, sessionPollerEvents.SESSION_POLLING_STOPPED);
}

// pre-defined triggers and triggerProps

export function createTriggerPropsForAllSessionPollerEvents(): SignalTriggerProps {
  return createEventTriggerProps(sessionPollerNamespace);
}

export const triggerForAllSessionPollerEvents: SignalTrigger = createSignalTrigger(
  createTriggerPropsForAllSessionPollerEvents(),
);

export const sessionPollingStoppedTrigger: SignalTrigger = createSessionPollerEventTrigger(
  sessionPollerEvents.SESSION_POLLING_STOPPED,
);

export const sessionPollingStartedTrigger: SignalTrigger = createSessionPollerEventTrigger(
  sessionPollerEvents.SESSION_POLLING_STARTED,
);

/* error signals */

export function createTriggerPropsForAllSessionPollerErrors(): SignalTriggerProps {
  return createErrorTriggerProps(sessionPollerNamespace);
}

export function createSessionPollerErrorSignal(error: SessionPollerError): ErrorSignal {
  return createErrorSignal(sessionPollerNamespace, error);
}

export function getSessionPollerErrorPayload(signal: Signal): ErrorPayload | null {
  return isSessionPollerSignal(signal) ? (getErrorSignalPayload(signal) as ErrorPayload) : null;
}

export function isSessionEndedSignal(signal: Signal): boolean {
  return (
    isSessionPollerSignal(signal) &&
    checkErrorSignalPayload(signal, (errorPayload) => (errorPayload as SessionPollerError).isSessionEnded)
  );
}

export function isSessionPollingFailureSignal(signal: Signal): boolean {
  return (
    isSessionPollerSignal(signal) &&
    checkErrorSignalPayload(signal, (errorPayload) => (errorPayload as SessionPollerError).isSessionPollingFailure)
  );
}

// pre-defined triggers

export const triggerForAllSessionPollerErrors: SignalTrigger = createSignalTrigger(
  createTriggerPropsForAllSessionPollerErrors(),
);

export const sessionEndedTrigger: SignalTrigger = createSessionPollerErrorTrigger(sessionPollerErrors.SESSION_ENDED);

export const sessionPollingFailedTrigger: SignalTrigger = createSessionPollerErrorTrigger(
  sessionPollerErrors.SESSION_POLLING_FAILED,
);
