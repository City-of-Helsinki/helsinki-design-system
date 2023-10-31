import { Signal, SignalTrigger, SignalTriggerProps, createSignalTrigger } from '../beacon/beacon';
import {
  eventSignalType,
  EventSignal,
  EventPayload,
  isNamespacedSignal,
  checkEventSignalPayload,
  createErrorTriggerProps,
  createEventSignal,
  createEventTriggerProps,
  getEventSignalPayload,
  ErrorSignal,
  createErrorSignal,
  getErrorSignalPayload,
  checkErrorSignalPayload,
  createTriggerPropsForAllSignals,
} from '../beacon/signals';
import { ApiTokensClientError, ApiTokensClientErrorType, apiTokensClientError } from './apiTokensClientError';
import { ApiTokensClientEvent, TokenData, apiTokensClientEvents, apiTokensClientNamespace } from './index';

export type ApiTokensEventSignal = EventSignal & {
  payload: {
    type: ApiTokensClientEvent;
    data: TokenData | null;
  };
};

function createApiTokensClientErrorTrigger(error: ApiTokensClientErrorType): SignalTrigger {
  return createSignalTrigger(createErrorTriggerProps(apiTokensClientNamespace, error));
}

function createApiTokensClientEventTrigger(type: ApiTokensClientEvent): SignalTrigger {
  return createSignalTrigger(createEventTriggerProps(apiTokensClientNamespace, type));
}

function isGivenEventSignal(signal: Signal, eventType: ApiTokensClientEvent): boolean {
  // eslint-disable-next-line @typescript-eslint/no-use-before-define
  return isApiTokensClientSignal(signal) && checkEventSignalPayload(signal, (payload) => payload.type === eventType);
}

export function createTriggerPropsForAllApiTokensClientSignals(): SignalTriggerProps {
  return createTriggerPropsForAllSignals(apiTokensClientNamespace);
}

export const triggerForAllApiTokensClientSignals: SignalTrigger = createSignalTrigger(
  createTriggerPropsForAllApiTokensClientSignals(),
);

export function isApiTokensClientSignal(signal: Signal) {
  return isNamespacedSignal(signal, apiTokensClientNamespace);
}

export function createApiTokensClientEventSignal({
  type,
  data = null,
}: {
  type: ApiTokensClientEvent;
  data?: TokenData | null;
}): ApiTokensEventSignal {
  const payload = {
    type,
    ...(data && { data }),
  };
  return createEventSignal(apiTokensClientNamespace, payload) as ApiTokensEventSignal;
}

// Makes no sense to check, if data (tokens) match, because actual values of the tokens are not important in signals.
// So adding "data" to an api tokens trigger is useless, so this function won't add it.
// data === null, can be checked manually if needed
export function createApiTokensClientEventTriggerProps({
  type,
}: {
  type: ApiTokensClientEvent;
}): Pick<ApiTokensEventSignal, 'type' | 'namespace'> & { payload: { type: ApiTokensClientEvent } } {
  return {
    type: eventSignalType,
    namespace: apiTokensClientNamespace,
    payload: {
      type,
    },
  };
}

export const triggerForAllApiTokensClientEvents: SignalTrigger = createSignalTrigger(
  createEventTriggerProps(apiTokensClientNamespace),
);

export function getApiTokensClientEventPayload(signal: Signal): EventPayload | null {
  return isApiTokensClientSignal(signal) ? (getEventSignalPayload(signal) as EventPayload) : null;
}

export function isApiTokensRemovedSignal(signal?: Signal): boolean {
  return !!signal && isGivenEventSignal(signal, apiTokensClientEvents.API_TOKENS_REMOVED);
}

export function isApiTokensRenewalStartedSignal(signal?: Signal): boolean {
  return !!signal && isGivenEventSignal(signal, apiTokensClientEvents.API_TOKENS_RENEWAL_STARTED);
}

export function isApiTokensUpdatedSignal(signal?: Signal): boolean {
  return !!signal && isGivenEventSignal(signal, apiTokensClientEvents.API_TOKENS_UPDATED);
}

export const apiTokensRemovedTrigger: SignalTrigger = createApiTokensClientEventTrigger(
  apiTokensClientEvents.API_TOKENS_REMOVED,
);

export const apiTokensRenewalStartedTrigger: SignalTrigger = createApiTokensClientEventTrigger(
  apiTokensClientEvents.API_TOKENS_RENEWAL_STARTED,
);

export const apiTokensUpdatedTrigger: SignalTrigger = createApiTokensClientEventTrigger(
  apiTokensClientEvents.API_TOKENS_UPDATED,
);

/** error triggers */

export function createApiTokensClientErrorSignal(error: ApiTokensClientError): ErrorSignal {
  return createErrorSignal(apiTokensClientNamespace, error);
}

export const triggerForAllApiTokensClientErrors: SignalTrigger = createSignalTrigger(
  createErrorTriggerProps(apiTokensClientNamespace),
);

export function getApiTokensClientErrorPayload(signal: Signal): ApiTokensClientError | null {
  return isApiTokensClientSignal(signal) ? (getErrorSignalPayload(signal) as ApiTokensClientError) : null;
}

export function isApiTokensFetchFailedErrorSignal(signal: Signal): boolean {
  return (
    isApiTokensClientSignal(signal) &&
    checkErrorSignalPayload(signal, (errorPayload) => (errorPayload as ApiTokensClientError).isFetchError)
  );
}

export function isInvalidApiTokensUserErrorSignal(signal: Signal): boolean {
  return (
    isApiTokensClientSignal(signal) &&
    checkErrorSignalPayload(
      signal,
      (errorPayload) => (errorPayload as ApiTokensClientError).isInvalidApiTokensUserError,
    )
  );
}

export function isInvalidApiTokensErrorSignal(signal: Signal): boolean {
  return (
    isApiTokensClientSignal(signal) &&
    checkErrorSignalPayload(signal, (errorPayload) => (errorPayload as ApiTokensClientError).isInvalidTokensError)
  );
}

export const invalidApiTokensErrorTrigger: SignalTrigger = createApiTokensClientErrorTrigger(
  apiTokensClientError.INVALID_API_TOKENS,
);

export const apiTokensFetchFailedErrorTrigger: SignalTrigger = createApiTokensClientErrorTrigger(
  apiTokensClientError.API_TOKEN_FETCH_FAILED,
);

export const invalidApiTokensUserErrorTrigger: SignalTrigger = createApiTokensClientErrorTrigger(
  apiTokensClientError.INVALID_USER_FOR_API_TOKENS,
);
