import { UserManager } from 'oidc-client-ts';
import HttpStatusCode from 'http-status-typed';

import createHttpPoller from '../utils/httpPoller';
import { createFetchAborter } from '../utils/abortFetch';
import { Signal, ConnectedModule } from '../beacon/beacon';
import { createNamespacedBeacon, createTriggerPropsForAllSignals, getEventSignalPayload } from '../beacon/signals';
import { getOidcClientFromSignal } from '../beacon/signalParsers';
import { SessionPollerError, sessionPollerErrors } from './sessionPollerError';
import { OidcClientState, oidcClientEvents, oidcClientNamespace, oidcClientStates } from '../client/index';
import { getOidcClientStateChangePayload } from '../client/signals';

export interface SessionPoller extends ConnectedModule {
  start: () => void;
  stop: () => void;
}

export type SessionPollerOptions = {
  pollIntervalInMs: number;
};

export type SessionPollerEvent = keyof typeof sessionPollerEvents;

export const sessionPollerNamespace = 'sessionPoller';
export const sessionPollerEvents = {
  SESSION_POLLING_STARTED: 'SESSION_POLLING_STARTED',
  SESSION_POLLING_STOPPED: 'SESSION_POLLING_STOPPED',
} as const;

export default function createSessionPoller(
  options: SessionPollerOptions = { pollIntervalInMs: 60000 },
): SessionPoller {
  const { pollIntervalInMs } = options;
  const fetchCanceller = createFetchAborter();
  let userManager: UserManager | undefined;
  let currentState: OidcClientState | undefined;
  const dedicatedBeacon = createNamespacedBeacon(sessionPollerNamespace);

  const storeUserManagerFromSignal = (signal: Signal): void => {
    if (userManager) {
      return;
    }
    const oidcClient = getOidcClientFromSignal(signal);
    if (oidcClient) {
      userManager = oidcClient.getUserManager();
    }
  };
  const storeStateChangeFromSignal = (signal: Signal): boolean => {
    const previousState = currentState;
    const payload = getOidcClientStateChangePayload(signal);
    if (payload) {
      currentState = payload.state as OidcClientState;
    } else if (!currentState) {
      const oidcClient = getOidcClientFromSignal(signal);
      if (oidcClient) {
        currentState = oidcClient.getState();
      }
    }
    return currentState !== previousState;
  };
  const userInfoFetchFunction = async (): Promise<Response | undefined> => {
    if (!userManager) {
      return Promise.resolve(undefined);
    }
    const uri = await userManager.metadataService.getUserInfoEndpoint();
    const user = await userManager.getUser();
    const accessToken = user && user.access_token;
    if (!accessToken) {
      return Promise.reject(new Error('Access token not set'));
    }
    const headers = new Headers();
    headers.append('authorization', `Bearer ${accessToken}`);
    const fetchPromise = fetch(uri, {
      method: 'GET',
      headers,
      signal: fetchCanceller.getSignal(),
    });
    dedicatedBeacon.emitEvent(sessionPollerEvents.SESSION_POLLING_STARTED);
    return fetchPromise;
  };

  const shouldPoll = () => currentState === oidcClientStates.VALID_SESSION;

  const poller = createHttpPoller({
    pollIntervalInMs,
    pollFunction: userInfoFetchFunction,
    shouldPoll,
    onError: (returnedHttpStatus) => {
      if (fetchCanceller.isAborted()) {
        return { keepPolling: false };
      }
      if (
        returnedHttpStatus &&
        (returnedHttpStatus === HttpStatusCode.FORBIDDEN || returnedHttpStatus === HttpStatusCode.UNAUTHORIZED)
      ) {
        dedicatedBeacon.emitError(
          new SessionPollerError(
            'User session poller returned FORBIDDEN or UNAUTHORIZED',
            sessionPollerErrors.SESSION_ENDED,
          ),
        );
        dedicatedBeacon.emitEvent(sessionPollerEvents.SESSION_POLLING_STOPPED);
        return { keepPolling: false };
      }
      dedicatedBeacon.emitError(
        new SessionPollerError('User session poller failed', sessionPollerErrors.SESSION_POLLING_FAILED),
      );
      const shouldKeepPolling = shouldPoll();
      if (!shouldKeepPolling) {
        dedicatedBeacon.emitEvent(sessionPollerEvents.SESSION_POLLING_STOPPED);
      }
      return { keepPolling: shouldKeepPolling };
    },
  });
  let isStarted = false;
  const start = () => {
    poller.start();
    isStarted = true;
  };
  const stop = () => {
    fetchCanceller.abort();
    poller.stop();
    if (isStarted) {
      dedicatedBeacon.emitEvent(sessionPollerEvents.SESSION_POLLING_STOPPED);
    }
    isStarted = false;
  };

  const oidcClientListener = (signal: Signal) => {
    storeUserManagerFromSignal(signal);
    const stateChanged = storeStateChangeFromSignal(signal);
    const eventPayload = getEventSignalPayload(signal);
    if (eventPayload) {
      if (eventPayload.type === oidcClientEvents.USER_RENEWAL_STARTED) {
        stop();
      }
      if (
        eventPayload.type === oidcClientEvents.USER_UPDATED &&
        eventPayload.data &&
        currentState === oidcClientStates.VALID_SESSION
      ) {
        start();
      }
    }
    if (eventPayload && eventPayload.type === oidcClientEvents.USER_UPDATED) {
      stop();
      return;
    }
    if (stateChanged && currentState === oidcClientStates.VALID_SESSION) {
      start();
    } else if (currentState !== oidcClientStates.VALID_SESSION) {
      stop();
    }
  };

  dedicatedBeacon.addListener(createTriggerPropsForAllSignals(oidcClientNamespace), oidcClientListener);

  const sessionPoller: SessionPoller = {
    namespace: sessionPollerNamespace,
    start,
    stop,
    connect: (beacon) => {
      dedicatedBeacon.storeBeacon(beacon);
    },
  };
  return sessionPoller;
}
