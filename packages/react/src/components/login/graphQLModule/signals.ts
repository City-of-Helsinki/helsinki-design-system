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

export function isGraphQLModuleLoadErrorSignal(signal: Signal): boolean {
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
  data,
}: GraphQLModuleEventSignal['payload']): GraphQLModuleEventSignal {
  return createEventSignal(graphQLModuleNamespace, {
    type,
    data,
  }) as GraphQLModuleEventSignal;
}

export function createGraphQLModuleErrorSignal(error: GraphQLModuleError): ErrorSignal {
  return createErrorSignal(graphQLModuleNamespace, error);
}

export function createTriggerPropsForAllGraphQLModuleSignals(): SignalTriggerProps {
  return createTriggerPropsForAllSignals(graphQLModuleNamespace);
}

/**
 *  trigger creators
 */

export const triggerForAllGraphQLModuleSignals: SignalTrigger = createSignalTrigger(
  createTriggerPropsForAllGraphQLModuleSignals(),
);

function createGraphQLModuleClientErrorTrigger(error: GraphQLModuleErrorType): SignalTrigger {
  return createSignalTrigger(createErrorTriggerProps(graphQLModuleNamespace, error));
}

export const loadFailedErrorTrigger: SignalTrigger = createGraphQLModuleClientErrorTrigger(
  graphQLModuleError.GRAPHQL_LOAD_FAILED,
);

export const noApiTokensErrorTrigger: SignalTrigger = createGraphQLModuleClientErrorTrigger(
  graphQLModuleError.GRAPHQL_NO_API_TOKENS,
);

export const noClientErrorTrigger: SignalTrigger = createGraphQLModuleClientErrorTrigger(
  graphQLModuleError.GRAPHQL_NO_CLIENT,
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
