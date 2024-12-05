import { Signal } from '../beacon/beacon';
import { useConnectedModule, useSignalTrackingWithReturnValue } from '../beacon/hooks';
import { TokenizedFetchModule, tokenizedFetchModuleNamespace } from './index';
import { createTriggerPropsForTokenizedFetchResponseSignals, triggerForAllTokenizedFetchSignals } from './signals';

/**
 * Returns the TokenizedFetch module.
 */
export const useTokenizedFetchModule = (): TokenizedFetchModule => {
  const tokenizedFetchModule = useConnectedModule<TokenizedFetchModule>(tokenizedFetchModuleNamespace);
  if (!tokenizedFetchModule) {
    throw new Error('Cannot find tokenizedFetchModule from LoginContext.');
  }
  return tokenizedFetchModule;
};

/**
 * Returns the tokenizedFetch function.
 */
export const useTokenizedFetch = (): TokenizedFetchModule['tokenizedFetch'] => {
  const tokenizedFetchModule = useTokenizedFetchModule();
  return tokenizedFetchModule.tokenizedFetch;
};

/**
 * Returns the tokenizedFetchWithSignals function.
 */
export const useTokenizedFetchWithSignals = (): TokenizedFetchModule['tokenizedFetchWithSignals'] => {
  const tokenizedFetchModule = useTokenizedFetchModule();
  return tokenizedFetchModule.tokenizedFetchWithSignals;
};

/**
 * Renders the component each time the TokenizedFetchModule emits
 */
export const useTokenizedFetchTracking = (): [Signal | undefined, () => void, TokenizedFetchModule] => {
  const tokenizedFetchModule = useTokenizedFetchModule();
  return [...useSignalTrackingWithReturnValue(triggerForAllTokenizedFetchSignals), tokenizedFetchModule];
};

/**
 * Renders the component each time the TokenizedFetchModule emits given responseIdentifier
 */
export const useTokenizedFetchResponseTracking = (
  responseIdentifier: string,
): [Signal | undefined, () => void, TokenizedFetchModule] => {
  const tokenizedFetchModule = useTokenizedFetchModule();
  return [
    ...useSignalTrackingWithReturnValue(createTriggerPropsForTokenizedFetchResponseSignals(responseIdentifier)),
    tokenizedFetchModule,
  ];
};
