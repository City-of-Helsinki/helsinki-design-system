import { useConnectedModule, useSignalTrackingWithReturnValue } from '../hooks';
import { sessionPollerNamespace, SessionPoller } from './sessionPoller';
import { createSessionPollerSignalTrigger } from './signals';

export const useSessionPoller = (): SessionPoller => {
  const sessionPoller = useConnectedModule<SessionPoller>(sessionPollerNamespace);
  if (!sessionPoller) {
    throw new Error('Cannot find sessionPoller from LoginContext.');
  }
  return sessionPoller;
};

export const useSessionPollerTracking = () => {
  return useSignalTrackingWithReturnValue(createSessionPollerSignalTrigger());
};
