import { User } from 'oidc-client-ts';

import { ConnectedModule } from '../beacon/beacon';

export type TokenData = Record<string, string>;
export interface ApiTokenClient extends ConnectedModule {
  fetch: (user: User) => Promise<TokenData>;
  getTokens: () => TokenData | null;
  clear: () => void;
  isRenewing: () => boolean;
}

export type ApiTokenClientProps = {
  url: string;
  maxRetries?: number;
  retryInterval?: number;
  queryProps?: { permission: string; grantType: string };
  audiences?: string[];
};

export type FetchApiTokenOptions = Pick<ApiTokenClientProps, 'url' | 'queryProps' | 'retryInterval'> & {
  accessToken: string;
  signal?: AbortSignal;
  maxRetries?: number;
  audience?: string;
};

export type ApiTokensClientEvent = keyof typeof apiTokensClientEvents;

export const API_TOKEN_SESSION_STORAGE_KEY = 'hds_login_api_token_storage_key';
export const API_TOKEN_SESSION_USER_REFERENCE_KEY = 'hds_login_api_token_user_reference';
export const apiTokensClientNamespace = 'apiTokensClient';

export const apiTokensClientEvents = {
  API_TOKENS_UPDATED: 'API_TOKENS_UPDATED',
  API_TOKENS_RENEWAL_STARTED: 'API_TOKENS_RENEWAL_STARTED',
  API_TOKENS_REMOVED: 'API_TOKENS_REMOVED',
} as const;
