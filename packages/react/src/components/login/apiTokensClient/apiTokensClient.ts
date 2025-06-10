import to from 'await-to-js';
import { User } from 'oidc-client-ts';

import { createFetchAborter, isAbortError } from '../utils/abortFetch';
import retryPollingUntilSuccessful from '../utils/httpPollerWithPromises';
import { ApiTokensClientError, apiTokensClientError } from './apiTokensClientError';
import { Signal } from '../beacon/beacon';
import {
  createEventTriggerProps,
  createNamespacedBeacon,
  createInitTriggerProps,
  getEventSignalPayload,
  createErrorTriggerProps,
} from '../beacon/signals';
import { oidcClientEvents, oidcClientNamespace, OidcClientEvent } from '../client';
import { isRenewalErrorSignal } from '../client/signals';
import { getValidUserFromSignal } from '../client/signalParsers';
import {
  FetchApiTokenOptions,
  TokenData,
  API_TOKEN_SESSION_STORAGE_KEY,
  API_TOKEN_SESSION_USER_REFERENCE_KEY,
  ApiTokenClientProps,
  ApiTokenClient,
  apiTokensClientNamespace,
  apiTokensClientEvents,
} from '.';
import { sequentialAsyncLoop } from '../../../utils/sequentialAsyncLoop';
import { getSessionStorage } from '../utils/getSessionStorage';

async function fetchApiToken(options: FetchApiTokenOptions): Promise<TokenData | ApiTokensClientError> {
  const { url, signal, audience, accessToken, queryProps, maxRetries = 0, retryInterval = 500 } = options;
  const myHeaders = new Headers();
  myHeaders.append('Authorization', `Bearer ${accessToken}`);

  const requestBody = new URLSearchParams();
  if (audience) {
    requestBody.append('audience', audience);
  }
  if (queryProps) {
    if (queryProps.grantType) {
      requestBody.append('grant_type', queryProps.grantType);
    }
    if (queryProps.permission) {
      requestBody.append('permission', queryProps.permission);
    }
  }

  // RequestInit is not importable so using Parameters here
  const requestOptions: Parameters<typeof fetch>[1] = {
    method: 'POST',
    headers: myHeaders,
    signal,
  };
  // add body only if params are set
  if (requestBody.toString()) {
    requestOptions.body = requestBody;
  }

  const pollFunction = () => fetch(url, requestOptions);
  const [fetchError, fetchResponse] = await to(
    retryPollingUntilSuccessful({
      pollFunction,
      pollIntervalInMs: retryInterval,
      maxRetries,
    }),
  );
  if (fetchError || !fetchResponse) {
    if (isAbortError(fetchError as Error)) {
      return {};
    }
    return Promise.resolve(
      new ApiTokensClientError(
        'Network or CORS error occured',
        apiTokensClientError.API_TOKEN_FETCH_FAILED,
        fetchError,
      ),
    );
  }

  if (!fetchResponse.ok) {
    const message = await fetchResponse.text();
    return Promise.resolve(
      new ApiTokensClientError(
        `${message}.${fetchResponse.statusText} Status:${fetchResponse.status}`,
        apiTokensClientError.API_TOKEN_FETCH_FAILED,
        fetchError,
      ),
    );
  }
  const [parseError, json] = await to(fetchResponse.json());
  if (parseError) {
    return Promise.resolve(
      new ApiTokensClientError(parseError.message, apiTokensClientError.INVALID_API_TOKENS, parseError),
    );
  }
  return Promise.resolve(json as TokenData);
}

async function fetchApiTokens(
  options: FetchApiTokenOptions,
  audiences: ApiTokenClientProps['audiences'],
  getAbortSignal: () => AbortSignal,
): Promise<TokenData | ApiTokensClientError> {
  if (!audiences || !audiences.length) {
    return fetchApiToken({ ...options, signal: getAbortSignal() });
  }

  let errorResponse: ApiTokensClientError | TokenData | undefined;
  const requests = audiences.map((audience) => {
    return async (apiTokens: TokenData) => {
      const opt: FetchApiTokenOptions = {
        ...options,
        signal: getAbortSignal(),
        audience,
      };
      if (errorResponse) {
        return Promise.resolve(errorResponse);
      }
      const fetchResult = await fetchApiToken(opt);
      const hasError = fetchResult instanceof Error;
      // only reason for empty object is aborted request.
      const isAborted = Object.keys(fetchResult).length === 0;
      if (hasError || isAborted) {
        errorResponse = hasError ? fetchResult : {};
        return Promise.resolve(errorResponse);
      }
      // refresh tokens are not stored, because user's tokens expire first
      // and api tokens are refreshed then too.
      const accessToken = (fetchResult as TokenData).access_token as string;
      return Promise.resolve({
        ...apiTokens,
        [audience]: accessToken,
      });
    };
  });
  return sequentialAsyncLoop({}, requests);
}

/**
 * Gets the api tokens from storage
 * @param storage
 * @returns
 */
export const getApiTokensFromStorage = (sourceStorage?: Storage): TokenData | null => {
  const storage = sourceStorage || getSessionStorage();
  const tokensString = storage.getItem(API_TOKEN_SESSION_STORAGE_KEY);
  try {
    return tokensString ? JSON.parse(tokensString) : null;
  } catch (e) {
    return null;
  }
};

/**
 * Removes the api tokens from storage
 * @param storage
 */
export const removeApiTokensFromStorage = (sourceStorage?: Storage) => {
  const storage = sourceStorage || getSessionStorage();
  storage.removeItem(API_TOKEN_SESSION_STORAGE_KEY);
};

/**
 * Sets the api tokens to storage
 * @param tokenObj
 * @param storage
 */
export const setApiTokensToStorage = (tokenObj: TokenData, sourceStorage?: Storage): void => {
  const storage = sourceStorage || getSessionStorage();
  storage.setItem(API_TOKEN_SESSION_STORAGE_KEY, JSON.stringify(tokenObj));
};

/**
 * Gets one api token from storage
 * @param tokenKey
 * @param storage
 * @returns
 */
export const getApiTokenFromStorage = (tokenKey: string, sourceStorage?: Storage): string | undefined => {
  const storage = sourceStorage || getSessionStorage();
  const tokens = getApiTokensFromStorage(storage);
  return tokens ? tokens[tokenKey] : undefined;
};

/**
 *  Removes the user reference from stored api tokens. Reference is the access token used when fetching api tokens
 * @param storage
 */
export const removeUserReferenceFromStorage = (sourceStorage?: Storage) => {
  const storage = sourceStorage || getSessionStorage();
  storage.removeItem(API_TOKEN_SESSION_USER_REFERENCE_KEY);
};

/**
 * Stores user reference to stored api tokens. Reference should be the access token used when fetching api tokens
 * @param reference
 * @param storage
 */
export const setUserReferenceToStorage = (reference: string, sourceStorage?: Storage): void => {
  const storage = sourceStorage || getSessionStorage();
  storage.setItem(API_TOKEN_SESSION_USER_REFERENCE_KEY, reference);
};

/**
 * Returns the user reference to stored api tokens. Reference is the access token used when fetching api tokens
 * @param storage
 * @returns
 */
export const getUserReferenceFromStorage = (sourceStorage?: Storage): string | null => {
  const storage = sourceStorage || getSessionStorage();
  return storage.getItem(API_TOKEN_SESSION_USER_REFERENCE_KEY);
};

export function createApiTokenClient(props: ApiTokenClientProps): ApiTokenClient {
  const { url, maxRetries, retryInterval, audiences, queryProps } = props;
  const fetchCanceller = createFetchAborter();

  let tokens: TokenData | null = null;
  let renewing = false;
  let renewalFailed = false;
  const dedicatedBeacon = createNamespacedBeacon(apiTokensClientNamespace);

  const removeAllTokens = () => {
    removeApiTokensFromStorage(sessionStorage);
    removeUserReferenceFromStorage(sessionStorage);
    tokens = null;
  };

  const clear = () => {
    fetchCanceller.abort();
    dedicatedBeacon.emitEvent(apiTokensClientEvents.API_TOKENS_REMOVED, null);
    removeAllTokens();
  };

  const getStoredTokensForUser = (user: User): TokenData | null => {
    const userRef = getUserReferenceFromStorage();
    if (user.access_token === userRef) {
      return getApiTokensFromStorage(sessionStorage);
    }
    removeAllTokens();
    return null;
  };

  const setStoredTokens = (tokenObj: TokenData): void => {
    setApiTokensToStorage(tokenObj);
  };

  const fetch: ApiTokenClient['fetch'] = async (user) => {
    if (!user) {
      renewing = false;
      return Promise.reject(
        new ApiTokensClientError('Invalid user for API tokens', apiTokensClientError.INVALID_USER_FOR_API_TOKENS, null),
      );
    }

    if (renewalFailed) {
      renewing = false;
      return Promise.reject(
        new ApiTokensClientError(
          'Token renewal has previously failed',
          apiTokensClientError.API_TOKEN_FETCH_FAILED,
          null,
        ),
      );
    }

    fetchCanceller.abort();
    const { access_token: accessToken } = user;
    renewing = true;
    dedicatedBeacon.emitEvent(apiTokensClientEvents.API_TOKENS_RENEWAL_STARTED, null);
    const result = await fetchApiTokens(
      {
        url,
        accessToken,
        maxRetries,
        retryInterval,
        queryProps,
      },
      audiences,
      () => fetchCanceller.getSignal(),
    );
    renewing = false;
    removeAllTokens();
    if (result instanceof Error) {
      renewalFailed = true;
      dedicatedBeacon.emitError(result);
      return Promise.reject(result);
    }

    tokens = { ...result };
    renewalFailed = false;
    setUserReferenceToStorage(accessToken);
    setStoredTokens(tokens);
    dedicatedBeacon.emitEvent(apiTokensClientEvents.API_TOKENS_UPDATED, tokens);
    return Promise.resolve(tokens);
  };

  const oidcClientInitListener = (signal: Signal): void => {
    renewalFailed = false;
    const user = getValidUserFromSignal(signal);
    if (user) {
      const storedTokens = getStoredTokensForUser(user as User);
      if (!storedTokens) {
        fetch(user as User).catch(() => undefined);
      } else {
        tokens = storedTokens;
        dedicatedBeacon.emitEvent(apiTokensClientEvents.API_TOKENS_UPDATED, tokens);
      }
    } else if (tokens) {
      removeAllTokens();
    }
  };

  const oidcClientEventListener = async (signal: Signal): Promise<void> => {
    const eventPayload = getEventSignalPayload(signal);
    if (!eventPayload) {
      return Promise.resolve();
    }
    const type = eventPayload.type as OidcClientEvent;
    if (type === oidcClientEvents.USER_REMOVED) {
      clear();
      renewing = false;
      renewalFailed = false;
    }
    if (type === oidcClientEvents.USER_UPDATED) {
      const user = getValidUserFromSignal(signal);

      if (renewalFailed || !user) {
        renewing = false;

        dedicatedBeacon.emitError(
          new ApiTokensClientError(
            'Oidc client event has no valid user',
            apiTokensClientError.INVALID_USER_FOR_API_TOKENS,
          ),
        );

        return Promise.resolve();
      }

      const currentTokens = getStoredTokensForUser(user);
      if (currentTokens) {
        tokens = currentTokens;
        renewing = false;
        return Promise.resolve();
      }
      await fetch(user).catch(() => {
        // error and results are handled in the fetch(),
        // but it may reject and that must be catched.
      });
      return Promise.resolve();
    }
    if (type === oidcClientEvents.USER_RENEWAL_STARTED) {
      clear();
      renewing = true;
      renewalFailed = false;
    }
    return Promise.resolve();
  };

  const oidcClientErrorListener = (signal: Signal): void => {
    if (isRenewalErrorSignal(signal)) {
      clear();
      renewing = false;
      renewalFailed = true;
    }
  };

  dedicatedBeacon.addListener(createEventTriggerProps(oidcClientNamespace), oidcClientEventListener);
  dedicatedBeacon.addListener(createInitTriggerProps(oidcClientNamespace), oidcClientInitListener);
  dedicatedBeacon.addListener(createErrorTriggerProps(oidcClientNamespace), oidcClientErrorListener);

  return {
    fetch,
    clear,
    getTokens: () => tokens,
    namespace: apiTokensClientNamespace,
    connect: (beacon) => {
      dedicatedBeacon.storeBeacon(beacon);
    },
    isRenewing: () => {
      return renewing;
    },
  };
}
