import { tokenizedFetchModuleNamespace } from '.';
import { Signal, SignalTrigger, SignalTriggerProps, createSignalTrigger } from '../beacon/beacon';
import {
  isNamespacedSignal,
  createTriggerPropsForAllSignals,
  EventPayload,
  getEventSignalPayload,
  createErrorTriggerProps,
  createEventTriggerProps,
  getErrorSignalPayload,
  EventSignal,
  isErrorSignal,
} from '../beacon/signals';
import { TokenizedFetchError } from './tokenizedFetchError';

export function isTokenizedFetchModuleSignal(signal: Signal) {
  return isNamespacedSignal(signal, tokenizedFetchModuleNamespace);
}

export function getTokenizedFetchModuleEventPayload(signal: Signal): EventPayload | null {
  return isTokenizedFetchModuleSignal(signal) ? (getEventSignalPayload(signal) as EventPayload) : null;
}

export function getTokenizedFetchModuleErrorPayload(signal: Signal): Error | null {
  return isTokenizedFetchModuleSignal(signal) ? (getErrorSignalPayload(signal) as Error) : null;
}

/**
 *  Start / abort signal handling
 */

export function createStartSignalData(): { wasFetchStarted: boolean } {
  return { wasFetchStarted: true };
}

export function createAbortSignalData(): { wasFetchAborted: boolean } {
  return { wasFetchAborted: true };
}

export function getTokenizedFetchPayloadData<T = unknown>(signal: Signal): T | null {
  if (!isTokenizedFetchModuleSignal(signal)) {
    return null;
  }
  const { payload } = signal as EventSignal;
  const data = payload && payload.data;
  return (data as T) || null;
}

export function isTokenizedFetchStartedSignal(signal: Signal): boolean {
  const data = getTokenizedFetchPayloadData<ReturnType<typeof createStartSignalData>>(signal);
  return !!(data && data.wasFetchStarted);
}

export function isTokenizedFetchAbortedSignal(signal: Signal): boolean {
  const data = getTokenizedFetchPayloadData<ReturnType<typeof createAbortSignalData>>(signal);
  return !!(data && data.wasFetchAborted);
}

/**
 *  trigger creators
 */

export function createTriggerPropsForAllTokenizedFetchSignals(): SignalTriggerProps {
  return createTriggerPropsForAllSignals(tokenizedFetchModuleNamespace);
}

export function createTriggerPropsForTokenizedFetchResponseSignals(responseType: string): SignalTrigger {
  return (signal) => {
    if (!isTokenizedFetchModuleSignal(signal)) {
      return false;
    }
    if (isErrorSignal(signal)) {
      const payload = getErrorSignalPayload(signal) as TokenizedFetchError;
      return !!(payload && payload.hasTypeMatch && payload.hasTypeMatch(responseType));
    }
    const payload = getEventSignalPayload(signal);
    return !!(payload && payload.type === responseType);
  };
}

/**
 * Triggers
 */

export const triggerForAllTokenizedFetchSignals: SignalTrigger = createSignalTrigger(
  createTriggerPropsForAllTokenizedFetchSignals(),
);

export const triggerForAllTokenizedFetchEvents: SignalTrigger = createSignalTrigger(
  createEventTriggerProps(tokenizedFetchModuleNamespace),
);

export const triggerForAllTokenizedFetchErrors: SignalTrigger = createSignalTrigger(
  createErrorTriggerProps(tokenizedFetchModuleNamespace),
);
