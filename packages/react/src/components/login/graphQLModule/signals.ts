import { GraphQLModuleEvent, graphQLModuleEvents, graphQLModuleNamespace, GraphQLQueryResult } from '.';
import { Signal, SignalTrigger, SignalTriggerProps, createSignalTrigger } from '../beacon/beacon';
import {
  EventSignal,
  isNamespacedSignal,
  createTriggerPropsForAllSignals,
  createEventSignal,
  ErrorSignal,
  createErrorSignal,
  EventPayload,
  getEventSignalPayload,
  checkErrorSignalPayload,
  createErrorTriggerProps,
  checkEventSignalPayload,
  createEventTriggerProps,
  getErrorSignalPayload,
} from '../beacon/signals';
import { graphQLModuleError, GraphQLModuleError, GraphQLModuleErrorType } from './graphQLModuleError';

export type GraphQLModuleEventSignal = EventSignal & {
  payload: {
    type: GraphQLModuleEvent;
    data: GraphQLQueryResult | null;
  };
};

export function isGraphQLModuleSignal(signal: Signal) {
  return isNamespacedSignal(signal, graphQLModuleNamespace);
}

export function getGraphQLModuleEventPayload(signal: Signal): EventPayload | null {
  return isGraphQLModuleSignal(signal) ? (getEventSignalPayload(signal) as EventPayload) : null;
}

export function getGraphQLModuleErrorPayload(signal: Signal): GraphQLModuleError | null {
  return isGraphQLModuleSignal(signal) ? (getErrorSignalPayload(signal) as GraphQLModuleError) : null;
}

/**
 *  is...ErrorSignal checkers
 */
export function isGraphQLModuleNoApiTokensErrorSignal(signal: Signal): boolean {
  return (
    isGraphQLModuleSignal(signal) &&
    checkErrorSignalPayload(signal, (errorPayload) => (errorPayload as GraphQLModuleError).isNoApiTokensError)
  );
}

export function isGraphQLModuleNoClientErrorSignal(signal: Signal): boolean {
  return (
    isGraphQLModuleSignal(signal) &&
    checkErrorSignalPayload(signal, (errorPayload) => (errorPayload as GraphQLModuleError).isNoClientError)
  );
}

export function isGraphQLModuleLoadFailedSignal(signal: Signal): boolean {
  return (
    isGraphQLModuleSignal(signal) &&
    checkErrorSignalPayload(signal, (errorPayload) => (errorPayload as GraphQLModuleError).isLoadError)
  );
}

/**
 * Signal creators
 */

export function createGraphQLModuleEventSignal({
  type,
  data = null,
}: Partial<GraphQLModuleEventSignal['payload']>): GraphQLModuleEventSignal {
  return createEventSignal(graphQLModuleNamespace, {
    type,
    data,
  }) as GraphQLModuleEventSignal;
}

export function createGraphQLModuleErrorSignal(error: GraphQLModuleError): ErrorSignal {
  return createErrorSignal(graphQLModuleNamespace, error);
}

/**
 *  trigger creators
 */

export function createTriggerPropsForAllGraphQLModuleSignals(): SignalTriggerProps {
  return createTriggerPropsForAllSignals(graphQLModuleNamespace);
}

function createGraphQLModuleErrorTrigger(error: GraphQLModuleErrorType): SignalTrigger {
  return createSignalTrigger(createErrorTriggerProps(graphQLModuleNamespace, error));
}

function createGraphQLModuleEventTrigger(type: GraphQLModuleEvent): SignalTrigger {
  return createSignalTrigger(createEventTriggerProps(graphQLModuleNamespace, type));
}

/**
 * Triggers
 */

export const triggerForAllGraphQLModuleSignals: SignalTrigger = createSignalTrigger(
  createTriggerPropsForAllGraphQLModuleSignals(),
);

export const triggerForAllGraphQLModuleEvents: SignalTrigger = createSignalTrigger(
  createEventTriggerProps(graphQLModuleNamespace),
);

export const triggerForAllGraphQLModuleErrors: SignalTrigger = createSignalTrigger(
  createErrorTriggerProps(graphQLModuleNamespace),
);

export const loadFailedErrorTrigger: SignalTrigger = createGraphQLModuleErrorTrigger(
  graphQLModuleError.GRAPHQL_LOAD_FAILED,
);

export const noApiTokensErrorTrigger: SignalTrigger = createGraphQLModuleErrorTrigger(
  graphQLModuleError.GRAPHQL_NO_API_TOKENS,
);

export const noClientErrorTrigger: SignalTrigger = createGraphQLModuleErrorTrigger(
  graphQLModuleError.GRAPHQL_NO_CLIENT,
);

export const graphQLModuleClearedTrigger: SignalTrigger = createGraphQLModuleEventTrigger(
  graphQLModuleEvents.GRAPHQL_MODULE_CLEARED,
);

export const graphQLModuleLoadingTrigger: SignalTrigger = createGraphQLModuleEventTrigger(
  graphQLModuleEvents.GRAPHQL_MODULE_LOADING,
);

export const graphQLModuleLoadAbortedTrigger: SignalTrigger = createGraphQLModuleEventTrigger(
  graphQLModuleEvents.GRAPHQL_MODULE_LOAD_ABORTED,
);

export const graphQLModuleLoadSuccessTrigger: SignalTrigger = createGraphQLModuleEventTrigger(
  graphQLModuleEvents.GRAPHQL_MODULE_LOAD_SUCCESS,
);

/**
 *  is...EventSignal checkers
 */
function isGivenEventSignal(signal: Signal, eventType: GraphQLModuleEvent): boolean {
  // eslint-disable-next-line @typescript-eslint/no-use-before-define
  return isGraphQLModuleSignal(signal) && checkEventSignalPayload(signal, (payload) => payload.type === eventType);
}

export function isGraphQLModuleClearedSignal(signal?: Signal): boolean {
  return !!signal && isGivenEventSignal(signal, graphQLModuleEvents.GRAPHQL_MODULE_CLEARED);
}

export function isGraphQLModuleLoadingSignal(signal?: Signal): boolean {
  return !!signal && isGivenEventSignal(signal, graphQLModuleEvents.GRAPHQL_MODULE_LOADING);
}

export function isGraphQLModuleLoadAbortedSignal(signal?: Signal): boolean {
  return !!signal && isGivenEventSignal(signal, graphQLModuleEvents.GRAPHQL_MODULE_LOAD_ABORTED);
}

export function isGraphQLModuleLoadSuccessSignal(signal?: Signal): boolean {
  return !!signal && isGivenEventSignal(signal, graphQLModuleEvents.GRAPHQL_MODULE_LOAD_SUCCESS);
}
