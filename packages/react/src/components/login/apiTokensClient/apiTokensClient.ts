import to from 'await-to-js';
import { User } from 'oidc-client-ts';

import { createFetchAborter, isAbortError } from '../utils/abortFetch';
import retryPollingUntilSuccessful from '../utils/httpPollerWithPromises';
import { ApiTokensClientError } from './apiTokensClientError';
import { Signal } from '../beacon/beacon';
import {
  createEventTrigger,
  createNamespacedBeacon,
  createInitSignalsTrigger,
  getSignalEventPayload,
} from '../beacon/signals';
import { oidcClientNamespace } from '../client';
import { OidcClientEvent } from '../client/signals';
import { getValidUserFromSignal } from '../beacon/signalParsers';
import {
  FetchApiTokenOptions,
  TokenData,
  API_TOKEN_SESSION_STORAGE_KEY,
  API_TOKEN_SESSION_USER_REFERENCE_KEY,
  ApiTokenClientProps,
  ApiTokenClient,
  apiTokensClientNamespace,
} from '.';

async function fetchApiToken(options: FetchApiTokenOptions): Promise<TokenData | ApiTokensClientError> {
  const { url, signal, accessToken, maxRetries = 4, retryInterval = 500 } = options;
  const myHeaders = new Headers();
  myHeaders.append('Authorization', `Bearer ${accessToken}`);

  const requestOptions = {
    method: 'POST',
    headers: myHeaders,
    signal,
  };

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
      new ApiTokensClientError('Network or CORS error occured', 'API_TOKEN_FETCH_FAILED', fetchError),
    );
  }

  if (!fetchResponse.ok) {
    const message = await fetchResponse.text();
    return Promise.resolve(
      new ApiTokensClientError(
        `${message}.${fetchResponse.statusText} Status:${fetchResponse.status}`,
        'API_TOKEN_FETCH_FAILED',
        fetchError,
      ),
    );
  }
  const [parseError, json] = await to(fetchResponse.json());
  if (parseError) {
    return Promise.resolve(new ApiTokensClientError(parseError.message, 'INVALID_API_TOKENS', parseError));
  }
  return Promise.resolve(json as TokenData);
}

export const getApiTokensFromStorage = (storage: Storage = window.sessionStorage): TokenData | null => {
  const tokensString = storage.getItem(API_TOKEN_SESSION_STORAGE_KEY);
  try {
    return tokensString ? JSON.parse(tokensString) : null;
  } catch (e) {
    return null;
  }
};

export const removeApiTokensFromStorage = (storage: Storage = window.sessionStorage) => {
  storage.removeItem(API_TOKEN_SESSION_STORAGE_KEY);
};

export const setApiTokensToStorage = (tokenObj: TokenData, storage: Storage = window.sessionStorage): void => {
  storage.setItem(API_TOKEN_SESSION_STORAGE_KEY, JSON.stringify(tokenObj));
};

export const getApiTokenFromStorage = (
  tokenKey: string,
  storage: Storage = window.sessionStorage,
): string | undefined => {
  const tokens = getApiTokensFromStorage(storage);
  return tokens ? tokens[tokenKey] : undefined;
};

export const removeUserReferenceFromStorage = (storage: Storage = window.sessionStorage) => {
  storage.removeItem(API_TOKEN_SESSION_USER_REFERENCE_KEY);
};

export const setUserReferenceToStorage = (reference: string, storage: Storage = window.sessionStorage): void => {
  storage.setItem(API_TOKEN_SESSION_USER_REFERENCE_KEY, reference);
};

export const getUserReferenceFromStorage = (storage: Storage = window.sessionStorage): string | null => {
  return storage.getItem(API_TOKEN_SESSION_USER_REFERENCE_KEY);
};

export default function createApiTokenClient(props: ApiTokenClientProps): ApiTokenClient {
  const { url, maxRetries, retryInterval } = props;
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
    await dedicatedBeacon.emitEvent('API_TOKENS_RENEWAL_STARTED', null);
    const result = await fetchApiToken({
      url,
      accessToken,
      signal: fetchCanceller.getSignal(),
      maxRetries,
      retryInterval,
    });
    renewing = false;
    removeAllTokens();
    if (result instanceof Error) {
      dedicatedBeacon.emitError(result);
      return Promise.reject(result);
    }

    tokens = { ...result };
    setUserReferenceToStorage(accessToken);
    setStoredTokens(tokens);
    await dedicatedBeacon.emitEvent('API_TOKENS_UPDATED', tokens);
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
        dedicatedBeacon.emitEvent('API_TOKENS_UPDATED', tokens).catch(() => undefined);
      }
    } else if (tokens) {
      removeAllTokens();
    }
  };

  const oidcClientEventListener = async (signal: Signal): Promise<void> => {
    const eventPayload = getSignalEventPayload(signal);
    if (!eventPayload) {
      return Promise.resolve();
    }
    const type = eventPayload.type as OidcClientEvent;
    if (type === 'USER_REMOVED') {
      fetchCanceller.abort();
      removeAllTokens();
      await dedicatedBeacon.emitEvent('API_TOKENS_REMOVED', null);
      renewing = false;
    }
    if (type === 'USER_UPDATED') {
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
        new ApiTokensClientError('Oidc client event has no valid user', 'INVALID_USER_FOR_API_TOKENS'),
      );
    }
    if (type === 'USER_RENEWAL_STARTED') {
      renewing = true;
    }
    return Promise.resolve();
  };

  dedicatedBeacon.addListener(createEventTrigger(oidcClientNamespace), oidcClientEventListener);
  dedicatedBeacon.addListener(createInitSignalsTrigger(oidcClientNamespace), oidcClientInitListener);

  return {
    fetch,
    getTokens: () => tokens,
    clear: () => {
      fetchCanceller.abort();
      dedicatedBeacon.emitEvent('API_TOKENS_REMOVED', null).catch(() => undefined);
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