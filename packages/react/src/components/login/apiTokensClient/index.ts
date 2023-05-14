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
};

export type FetchApiTokenOptions = {
  url: string;
  accessToken: string;
  signal?: AbortSignal;
  maxRetries?: number;
  retryInterval?: number;
};

export const API_TOKEN_SESSION_STORAGE_KEY = 'hds_login_api_token_storage_key';
export const API_TOKEN_SESSION_USER_REFERENCE_KEY = 'hds_login_api_token_user_reference';
export const apiTokensClientNamespace = 'apiTokensClient';
