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
} from '../beacon/signals';
import { oidcClientEvents, oidcClientNamespace, OidcClientEvent } from '../client';
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

async function fetchApiToken(options: FetchApiTokenOptions): Promise<TokenData | ApiTokensClientError> {
  const { url, signal, audience, accessToken, queryProps, maxRetries = 0, retryInterval = 500 } = options;
  const myHeaders = new Headers();
  myHeaders.append('Authorization', `Bearer ${accessToken}`);

  const urlencoded = new URLSearchParams();
  if (audience) {
    urlencoded.append('audience', audience);
  }
  if (queryProps) {
    if (queryProps.grantType) {
      urlencoded.append('grant_type', queryProps.grantType);
    }
    if (queryProps.permission) {
      urlencoded.append('permission', queryProps.permission);
    }
  }

  // RequestInit is not importable so using Parameters here
  const requestOptions: Parameters<typeof fetch>[1] = {
    method: 'POST',
    headers: myHeaders,
    signal,
  };
  const body = urlencoded.toString();
  if (body) {
    requestOptions.body = body;
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
export const getApiTokensFromStorage = (storage: Storage = window.sessionStorage): TokenData | null => {
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
export const removeApiTokensFromStorage = (storage: Storage = window.sessionStorage) => {
  storage.removeItem(API_TOKEN_SESSION_STORAGE_KEY);
};

/**
 * Sets the api tokens to storage
 * @param tokenObj
 * @param storage
 */
export const setApiTokensToStorage = (tokenObj: TokenData, storage: Storage = window.sessionStorage): void => {
  storage.setItem(API_TOKEN_SESSION_STORAGE_KEY, JSON.stringify(tokenObj));
};

/**
 * Gets one api token from storage
 * @param tokenKey
 * @param storage
 * @returns
 */
export const getApiTokenFromStorage = (
  tokenKey: string,
  storage: Storage = window.sessionStorage,
): string | undefined => {
  const tokens = getApiTokensFromStorage(storage);
  return tokens ? tokens[tokenKey] : undefined;
};

/**
 *  Removes the user reference from stored api tokens. Reference is the access token used when fetching api tokens
 * @param storage
 */
export const removeUserReferenceFromStorage = (storage: Storage = window.sessionStorage) => {
  storage.removeItem(API_TOKEN_SESSION_USER_REFERENCE_KEY);
};

/**
 * Stores user reference to stored api tokens. Reference should be the access token used when fetching api tokens
 * @param reference
 * @param storage
 */
export const setUserReferenceToStorage = (reference: string, storage: Storage = window.sessionStorage): void => {
  storage.setItem(API_TOKEN_SESSION_USER_REFERENCE_KEY, reference);
};

/**
 * Returns the user reference to stored api tokens. Reference is the access token used when fetching api tokens
 * @param storage
 * @returns
 */
export const getUserReferenceFromStorage = (storage: Storage = window.sessionStorage): string | null => {
  return storage.getItem(API_TOKEN_SESSION_USER_REFERENCE_KEY);
};

export function createApiTokenClient(props: ApiTokenClientProps): ApiTokenClient {
  const { url, maxRetries, retryInterval, audiences, queryProps } = props;
  const fetchCanceller = createFetchAborter();

  let tokens: TokenData | null = null;
  let renewing = false;
  const dedicatedBeacon = createNamespacedBeacon(apiTokensClientNamespace);

  const removeAllTokens = () => {
    removeApiTokensFromStorage(sessionStorage);
    removeUserReferenceFromStorage(sessionStorage);
    tokens = null;
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
      dedicatedBeacon.emitError(result);
      return Promise.reject(result);
    }

    tokens = { ...result };
    setUserReferenceToStorage(accessToken);
    setStoredTokens(tokens);
    dedicatedBeacon.emitEvent(apiTokensClientEvents.API_TOKENS_UPDATED, tokens);
    return Promise.resolve(tokens);
  };

  const oidcClientInitListener = (signal: Signal): void => {
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
      fetchCanceller.abort();
      removeAllTokens();
      dedicatedBeacon.emitEvent(apiTokensClientEvents.API_TOKENS_REMOVED, null);
      renewing = false;
    }
    if (type === oidcClientEvents.USER_UPDATED) {
      const user = getValidUserFromSignal(signal);
      if (user) {
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
      dedicatedBeacon.emitError(
        new ApiTokensClientError(
          'Oidc client event has no valid user',
          apiTokensClientError.INVALID_USER_FOR_API_TOKENS,
        ),
      );
    }
    if (type === oidcClientEvents.USER_RENEWAL_STARTED) {
      renewing = true;
    }
    return Promise.resolve();
  };

  dedicatedBeacon.addListener(createEventTriggerProps(oidcClientNamespace), oidcClientEventListener);
  dedicatedBeacon.addListener(createInitTriggerProps(oidcClientNamespace), oidcClientInitListener);

  return {
    fetch,
    getTokens: () => tokens,
    clear: () => {
      fetchCanceller.abort();
      dedicatedBeacon.emitEvent(apiTokensClientEvents.API_TOKENS_REMOVED, null);
      removeAllTokens();
    },
    namespace: apiTokensClientNamespace,
    connect: (beacon) => {
      dedicatedBeacon.storeBeacon(beacon);
    },
    isRenewing: () => {
      return renewing;
    },
  };
}
