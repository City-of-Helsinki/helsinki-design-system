import { noop, uniqueId } from 'lodash';

import { ApiTokenClient, apiTokensClientEvents, apiTokensClientNamespace, TokenData } from '.';
import { Beacon, Disposer, Signal, SignalListener, SignalTriggerProps } from '../beacon/beacon';
import { errorSignalType, eventSignalType, isInitSignal, waitForSignals } from '../beacon/signals';
import { apiTokensClientError } from './apiTokensClientError';
import {
  isApiTokensUpdatedSignal,
  getApiTokensClientEventPayload,
  isApiTokensRemovedSignal,
  createTriggerPropsForAllApiTokensClientSignals,
  isApiTokensRenewalStartedSignal,
  isApiTokensFetchFailedErrorSignal,
  isInvalidApiTokensErrorSignal,
} from './signals';

type ApiTokenClientTrackerProps = {
  /**
   * How long to wait for apitoken renewal to fulfill. Default 15000ms.
   */
  timeout?: number;
  /**
   * If true, the stored api tokens are not cleared when renewal starts. Default true.
   */
  keepTokensWhileRenewing?: boolean;
  /**
   * If true, the stored api tokens are not cleared when renewal starts. Default false.
   */
  keepTokensAfterRenewalError?: boolean;
  /**
   * Type of the signal that should end the pending api token renewal promise.
   * Usually it is a clear/dispose signal from the module using this util, so the promise is fulfilled when the module is not used anymore.
   */
  rejectionSignalTrigger?: SignalTriggerProps;
  /**
   * Called when api tokens change. Not called when dispose() is called.
   */
  onChange?: (tokens: TokenData, changeTrigger: Signal) => void;
};

export type ApiTokenClientTracker = {
  /**
   * Connect the utility to a beacon
   */
  connect: (connectedBeacon: Beacon) => void;
  /**
   * Get current tokens
   */
  getTokens: () => TokenData;
  /**
   * Dispose listeners, references and data
   */
  dispose: Disposer;
  /**
   * Discards pending promise for api token renewal.
   * Emits signal to abort it. Same signal is used in all instance of this utility, so the signal stops them all.
   */
  stopWaitingForTokens: Disposer;
  /**
   * Returns the pending renewal promise or immediately resolved promise.
   * Never rejects, the returned boolean indicates was the promise successful.
   */
  waitForApiTokens: () => Promise<boolean>;
  /**
   * Returns true, if renewal process is on-going
   */
  isRenewing: () => boolean;
};

type InnerState = {
  tokens: TokenData;
  disposer: Disposer;
  renewalPromise: Promise<boolean> | null;
  beacon: Beacon | null;
  timeoutId: ReturnType<typeof setTimeout> | null;
};

/**
 * Utility for tracking changes in the apiTokenClient module
 * Use it in the connect() function of any ConnectedModule.
 * @param {ApiTokenClientTrackerProps}
 * @returns {ApiTokenClientTracker}
 */

export function createApiTokenClientTracker({
  timeout = 15000,
  keepTokensWhileRenewing = true,
  keepTokensAfterRenewalError = false,
  rejectionSignalTrigger,
  onChange,
}: ApiTokenClientTrackerProps): ApiTokenClientTracker {
  const innerState: InnerState = {
    tokens: {},
    disposer: noop,
    renewalPromise: null,
    beacon: null,
    timeoutId: null,
  };

  const isRenewing = () => !!innerState.renewalPromise;

  // self triggered and self listened signal to stop listening renewals
  // must be unique so other listeners in other instances of this utils are not cancelled.
  const signalTypeToRejectApiTokenAwait = `REJECT_API_TOKEN_AWAIT_${uniqueId()}`;
  const clearPromiseTimeOut = () => {
    if (innerState.timeoutId) {
      clearTimeout(innerState.timeoutId);
      innerState.timeoutId = null;
    }
  };
  const markRenewalCompleted = () => {
    clearPromiseTimeOut();
    innerState.renewalPromise = null;
  };

  const updateTokens = (tokens: TokenData | null = null, changeTrigger: Signal) => {
    innerState.tokens = tokens || {};
    if (onChange) {
      onChange(innerState.tokens, changeTrigger);
    }
  };

  const updateInnerRenewalState = (changeTrigger: Signal, tokens: TokenData | null = null) => {
    const renewalStarted = isApiTokensRenewalStartedSignal(changeTrigger);
    if (renewalStarted) {
      if (!keepTokensWhileRenewing) {
        updateTokens({}, changeTrigger);
      }
    } else {
      markRenewalCompleted();
    }
    if (tokens) {
      updateTokens(tokens, changeTrigger);
    }
  };
  const createRenewalPromise = async (timeoutDelay: number): Promise<boolean> => {
    if (!innerState.beacon) {
      return Promise.reject(new Error('No Beacon found for api token renewal.'));
    }

    const promiseRejectionSignals: Array<Signal> = [
      { type: eventSignalType, payload: { type: signalTypeToRejectApiTokenAwait } },
      { type: errorSignalType, payload: { type: apiTokensClientError.API_TOKEN_FETCH_FAILED } },
      { type: errorSignalType, payload: { type: apiTokensClientError.INVALID_API_TOKENS } },
    ];
    if (rejectionSignalTrigger) {
      promiseRejectionSignals.push(rejectionSignalTrigger as unknown as Signal);
    }
    const signalPromise = waitForSignals(
      innerState.beacon,
      [{ payload: { type: apiTokensClientEvents.API_TOKENS_UPDATED } }],
      {
        rejectOn: promiseRejectionSignals,
      },
    );

    const timeoutPromise = timeoutDelay
      ? new Promise((resolve, reject) => {
          innerState.timeoutId = setTimeout(() => {
            reject(new Error('Timeout for waitForApiTokens() reached'));
            innerState.timeoutId = null;
          }, timeoutDelay);
        })
      : null;

    // The promise never rejects to make handling more simpler
    return (timeoutPromise ? Promise.race([signalPromise, timeoutPromise]) : signalPromise)
      .then(() => {
        return Promise.resolve(true);
      })
      .catch(() => {
        return Promise.resolve(false);
      });
  };

  const startWaitingForRenewal = (trigger: Signal) => {
    updateInnerRenewalState(trigger);
    innerState.renewalPromise = createRenewalPromise(timeout);
    innerState.renewalPromise.then(() => {
      markRenewalCompleted();
    });
  };

  const listener: SignalListener = (signal) => {
    if (isInitSignal(signal)) {
      const apiTokensClient = signal.context as ApiTokenClient;
      // fail safe if signals are mixed.
      if (!apiTokensClient) {
        return;
      }
      if (apiTokensClient.isRenewing()) {
        startWaitingForRenewal(signal);
      }
      updateTokens(apiTokensClient.getTokens() || {}, signal);
      return;
    }
    if (isApiTokensRenewalStartedSignal(signal)) {
      startWaitingForRenewal(signal);
      return;
    }
    if (isApiTokensFetchFailedErrorSignal(signal) || isInvalidApiTokensErrorSignal(signal)) {
      updateInnerRenewalState(signal, keepTokensAfterRenewalError ? null : {});
      return;
    }
    if (isApiTokensUpdatedSignal(signal)) {
      const payload = getApiTokensClientEventPayload(signal);
      const newTokens = (payload && (payload.data as TokenData)) || {};
      updateInnerRenewalState(signal, newTokens);
      return;
    }
    if (!keepTokensWhileRenewing && isApiTokensRemovedSignal(signal)) {
      updateTokens({}, signal);
    }
  };

  const emitApiTokenAwaitRejectionSignal = () => {
    if (!innerState.renewalPromise || !innerState.beacon) {
      return;
    }
    innerState.beacon.emit({
      type: eventSignalType,
      namespace: apiTokensClientNamespace,
      payload: { type: signalTypeToRejectApiTokenAwait },
    });
  };

  const dispose = () => {
    emitApiTokenAwaitRejectionSignal();
    clearPromiseTimeOut();
    innerState.disposer();
    innerState.disposer = noop;
    innerState.beacon = null;
    innerState.renewalPromise = null;
    innerState.tokens = {};
  };

  return {
    connect: (connectedBeacon: Beacon) => {
      dispose();
      innerState.beacon = connectedBeacon;
      innerState.disposer = connectedBeacon.addListener(createTriggerPropsForAllApiTokensClientSignals(), listener);
    },
    getTokens: () => {
      return innerState.tokens;
    },
    stopWaitingForTokens: () => {
      clearPromiseTimeOut();
      emitApiTokenAwaitRejectionSignal();
    },
    isRenewing,
    waitForApiTokens: () => {
      if (isRenewing()) {
        return innerState.renewalPromise as Promise<boolean>;
      }
      return Promise.resolve(true);
    },
    dispose,
  };
}
