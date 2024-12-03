import {
  TokenizedFetchModule,
  tokenizedFetchModuleEvents,
  tokenizedFetchModuleNamespace,
  TokenizedFetchModuleProps,
  defaultOptions,
  HeaderContent,
} from '.';
import { createNamespacedBeacon } from '../beacon/signals';
import { createApiTokenClientTracker } from '../apiTokensClient/createApiTokenClientTracker';
import { appendAbortSignal, isAbortError } from '../utils/abortFetch';
import { createAbortSignalData, createStartSignalData } from './signals';
import { TokenizedFetchError } from './tokenizedFetchError';

export const mergeHeaders = (
  target: HeaderContent | undefined | null,
  source: HeaderContent | undefined | null,
): HeaderContent => {
  if (!target || !source) {
    return target || source || {};
  }
  const isHeadersObject = target instanceof Headers;
  if (typeof source === 'object') {
    Object.entries(source).forEach(([key, value]) => {
      if (isHeadersObject) {
        target.append(key, value);
      } else {
        // eslint-disable-next-line no-param-reassign
        target[key] = value;
      }
    });
  }

  return target;
};

export function createTokenizedFetchModule(props: TokenizedFetchModuleProps): TokenizedFetchModule {
  // custom beacon for sending signals in tokenizedFetchModuleNamespace
  const dedicatedBeacon = createNamespacedBeacon(tokenizedFetchModuleNamespace);

  const mergedProps: TokenizedFetchModuleProps = {
    ...defaultOptions,
    ...props,
  };

  const { keepTokensWhileRenewing, tokenSetter, apiTokensWaitTime, preventQueriesWhileRenewing } = mergedProps;

  const apiTokenTracker = createApiTokenClientTracker({ keepTokensWhileRenewing, timeout: apiTokensWaitTime });

  const emitResponse: TokenizedFetchModule['emitResponse'] = (
    promise: Promise<Response>,
    responseIdentifier: string,
  ) => {
    promise
      .then(async (response) => {
        dedicatedBeacon.emitEvent(responseIdentifier, response);
      })
      .catch((e) => {
        if (isAbortError(e)) {
          dedicatedBeacon.emitEvent(responseIdentifier, createAbortSignalData());
        } else {
          dedicatedBeacon.emitError(new TokenizedFetchError(responseIdentifier, e));
        }
      });
    return promise;
  };

  const emitFetchStart: TokenizedFetchModule['emitFetchStart'] = (responseIdentifier: string) => {
    dedicatedBeacon.emitEvent(responseIdentifier, createStartSignalData());
  };

  const tokenizedFetch: TokenizedFetchModule['tokenizedFetch'] = async (...args) => {
    const [input, init = {}] = args;

    if (preventQueriesWhileRenewing) {
      await apiTokenTracker.waitForApiTokens();
    }
    if (tokenSetter) {
      let headers = (init.headers || {}) as HeaderContent;
      const newHeaders = tokenSetter(headers as Headers, apiTokenTracker.getTokens());
      headers = mergeHeaders(headers, newHeaders);
      init.headers = headers;
    }

    const promise = fetch(input, init);

    return promise;
  };

  return {
    namespace: tokenizedFetchModuleNamespace,
    connect: (beacon) => {
      dedicatedBeacon.storeBeacon(beacon);
      apiTokenTracker.connect(beacon);
    },
    addAbortSignal: (initProps: Parameters<typeof fetch>[1]): (() => void) => {
      return appendAbortSignal(initProps);
    },
    tokenizedFetch,
    tokenizedFetchWithSignals: (autoEmitResponseIdentifier, ...rest) => {
      emitFetchStart(autoEmitResponseIdentifier);
      const promise = tokenizedFetch(...rest);
      emitResponse(
        promise.then((r) => r.json()),
        autoEmitResponseIdentifier,
      );
      return promise;
    },
    emitResponse,
    emitFetchStart,
    getTracker: () => {
      return apiTokenTracker;
    },
    reset: async () => {
      dedicatedBeacon.emitEvent(tokenizedFetchModuleEvents.TOKENIZED_FETCH_MODULE_RESET);
      apiTokenTracker.dispose();
    },
    isAbortError,
  };
}
