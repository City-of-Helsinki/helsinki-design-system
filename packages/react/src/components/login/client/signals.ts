import { User } from 'oidc-client-ts';

import { Signal, SignalTrigger, SignalTriggerProps, createSignalTrigger } from '../beacon/beacon';
import {
  EventSignal,
  StateChangeSignal,
  StateChangeSignalPayload,
  isNamespacedSignal,
  EventPayload,
  getStateChangeSignalPayload,
  createStateChangeSignal,
  createEventSignal,
  getEventSignalPayload,
  checkStateChangeSignalPayload,
  checkEventSignalPayload,
  checkErrorSignalPayload,
  createErrorSignal,
  ErrorSignal,
  createEventTriggerProps,
  createStateChangeTriggerProps,
  createErrorTriggerProps,
  ErrorPayload,
  getErrorSignalPayload,
  createTriggerPropsForAllSignals,
} from '../beacon/signals';
import { oidcClientNamespace, OidcClientEvent, oidcClientStates, OidcClientState, oidcClientEvents } from './index';
import { OidcClientError, OidcClientErrorType, oidcClientErrors } from './oidcClientError';

export type OidcClientEventSignal = EventSignal & {
  payload: {
    type: OidcClientEvent;
    data?: User | null;
  };
};

function createOidcClientErrorTrigger(error: OidcClientErrorType): SignalTrigger {
  return createSignalTrigger(createErrorTriggerProps(oidcClientNamespace, error));
}

function createOidcClientEventTrigger(type: OidcClientEvent): SignalTrigger {
  return createSignalTrigger(createEventTriggerProps(oidcClientNamespace, type));
}

function createOidcClientStateChangeTrigger(state: OidcClientState, previousState?: OidcClientState): SignalTrigger {
  return createSignalTrigger(createStateChangeTriggerProps(oidcClientNamespace, state, previousState));
}

function isGivenStateSignal(signal: Signal, state: OidcClientState): boolean {
  // eslint-disable-next-line @typescript-eslint/no-use-before-define
  return isOidcClientSignal(signal) && checkStateChangeSignalPayload(signal, (payload) => payload.state === state);
}

function isGivenEventSignal(signal: Signal, eventType: OidcClientEvent): boolean {
  // eslint-disable-next-line @typescript-eslint/no-use-before-define
  return isOidcClientSignal(signal) && checkEventSignalPayload(signal, (payload) => payload.type === eventType);
}

export function createTriggerPropsForAllOidcClientSignals(): SignalTriggerProps {
  return createTriggerPropsForAllSignals(oidcClientNamespace);
}
// pre-defined triggers and triggerProps

export const triggerForAllOidcClientSignals: SignalTrigger = createSignalTrigger(
  createTriggerPropsForAllOidcClientSignals(),
);

export function isOidcClientSignal(signal: Signal) {
  return isNamespacedSignal(signal, oidcClientNamespace);
}

/** State changes */

export function createOidcClientStateChangeSignal(payload: StateChangeSignalPayload): StateChangeSignal {
  return createStateChangeSignal(oidcClientNamespace, payload);
}

export function getOidcClientStateChangePayload(signal: Signal): StateChangeSignalPayload | null {
  return isOidcClientSignal(signal) ? getStateChangeSignalPayload(signal) : null;
}

export function isLoggingOutSignal(signal?: Signal): boolean {
  return !!signal && isGivenStateSignal(signal, oidcClientStates.LOGGING_OUT);
}

export function isLoggingInSignal(signal?: Signal): boolean {
  return !!signal && isGivenStateSignal(signal, oidcClientStates.LOGGING_IN);
}

export function isHandlingLoginCallbackSignal(signal?: Signal): boolean {
  return !!signal && isGivenStateSignal(signal, oidcClientStates.HANDLING_LOGIN_CALLBACK);
}

export function isNoSessionSignal(signal?: Signal): boolean {
  return !!signal && isGivenStateSignal(signal, oidcClientStates.NO_SESSION);
}

export function isValidSessionSignal(signal?: Signal): boolean {
  return !!signal && isGivenStateSignal(signal, oidcClientStates.VALID_SESSION);
}

export function createTriggerPropsForAllOidcClientStateChanges(): SignalTriggerProps {
  return createStateChangeTriggerProps(oidcClientNamespace);
}

export const triggerForAllOidcClientStateChanges: SignalTrigger = createSignalTrigger(
  createTriggerPropsForAllOidcClientStateChanges(),
);

export const loggingOutTrigger: SignalTrigger = createOidcClientStateChangeTrigger(oidcClientStates.LOGGING_OUT);

export const loggingInTrigger: SignalTrigger = createOidcClientStateChangeTrigger(oidcClientStates.LOGGING_IN);

export const handlingLoginCallbackTrigger: SignalTrigger = createOidcClientStateChangeTrigger(
  oidcClientStates.HANDLING_LOGIN_CALLBACK,
);

export const validSessionTrigger: SignalTrigger = createOidcClientStateChangeTrigger(oidcClientStates.VALID_SESSION);

export const noSessionTrigger: SignalTrigger = createOidcClientStateChangeTrigger(oidcClientStates.NO_SESSION);

/** Event signals */

export function createOidcClientEventSignal(payload?: EventPayload): OidcClientEventSignal {
  return createEventSignal(oidcClientNamespace, payload) as OidcClientEventSignal;
}

export function createTriggerPropsForAllOidcClientEvents(): SignalTriggerProps {
  return createEventTriggerProps(oidcClientNamespace);
}

export const triggerForAllOidcClientEvents: SignalTrigger = createSignalTrigger(
  createTriggerPropsForAllOidcClientEvents(),
);

export function getOidcClientEventPayload(signal: Signal): EventPayload | null {
  return isOidcClientSignal(signal) ? (getEventSignalPayload(signal) as EventPayload) : null;
}

export function isUserRemovedSignal(signal?: Signal): boolean {
  return !!signal && isGivenEventSignal(signal, oidcClientEvents.USER_REMOVED);
}

export function isUserRenewalStartedSignal(signal?: Signal): boolean {
  return !!signal && isGivenEventSignal(signal, oidcClientEvents.USER_RENEWAL_STARTED);
}

export function isUserUpdatedSignal(signal?: Signal): boolean {
  return !!signal && isGivenEventSignal(signal, oidcClientEvents.USER_UPDATED);
}

export const userRemovedTrigger: SignalTrigger = createOidcClientEventTrigger(oidcClientEvents.USER_REMOVED);

export const userRenewalStartedTrigger: SignalTrigger = createOidcClientEventTrigger(
  oidcClientEvents.USER_RENEWAL_STARTED,
);

export const userUpdatedTrigger: SignalTrigger = createOidcClientEventTrigger(oidcClientEvents.USER_UPDATED);

/** Error signals */

export function createOidcClientErrorSignal(error: OidcClientError): ErrorSignal {
  return createErrorSignal(oidcClientNamespace, error);
}

export function createTriggerPropsForAllOidcClientErrors(): SignalTriggerProps {
  return createErrorTriggerProps(oidcClientNamespace);
}

export const triggerForAllOidcClientErrors: SignalTrigger = createSignalTrigger(
  createTriggerPropsForAllOidcClientErrors(),
);

export function getOidcClientErrorPayload(signal: Signal): ErrorPayload | null {
  return isOidcClientSignal(signal) ? (getErrorSignalPayload(signal) as ErrorPayload) : null;
}

export function isInvalidUserErrorSignal(signal: Signal): boolean {
  return (
    isOidcClientSignal(signal) &&
    checkErrorSignalPayload(signal, (errorPayload) => (errorPayload as OidcClientError).isInvalidUserError)
  );
}

export function isRenewalErrorSignal(signal: Signal): boolean {
  return (
    isOidcClientSignal(signal) &&
    checkErrorSignalPayload(signal, (errorPayload) => (errorPayload as OidcClientError).isRenewalError)
  );
}

export function isSigninErroSignal(signal: Signal): boolean {
  return (
    isOidcClientSignal(signal) &&
    checkErrorSignalPayload(signal, (errorPayload) => (errorPayload as OidcClientError).isSignInError)
  );
}

export const renewalErrorTrigger: SignalTrigger = createOidcClientErrorTrigger(oidcClientErrors.RENEWAL_FAILED);

export const invalidUserErrorTrigger: SignalTrigger = createOidcClientErrorTrigger(
  oidcClientErrors.INVALID_OR_EXPIRED_USER,
);

export const signInErrorTrigger: SignalTrigger = createOidcClientErrorTrigger(oidcClientErrors.SIGNIN_ERROR);
