import { Signal } from '../beacon/beacon';
import { useConnectedModule, useSignalTrackingWithReturnValue } from '../beacon/hooks';
import { sessionPollerNamespace, SessionPoller } from './sessionPoller';
import { triggerForAllSessionPollerSignals } from './signals';

export const useSessionPoller = (): SessionPoller => {
  const sessionPoller = useConnectedModule<SessionPoller>(sessionPollerNamespace);
  if (!sessionPoller) {
    throw new Error('Cannot find sessionPoller from LoginContext.');
  }
  return sessionPoller;
};

export const useSessionPollerTracking = (): [Signal | undefined, () => void, SessionPoller] => {
  const poller = useSessionPoller();
  return [...useSignalTrackingWithReturnValue(triggerForAllSessionPollerSignals), poller];
};
