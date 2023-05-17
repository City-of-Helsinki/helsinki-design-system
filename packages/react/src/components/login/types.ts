import { User as OidcClientUser } from 'oidc-client-ts';

import { TokenData, ApiTokenClient as ATC } from './apiTokensClient/index';

export type User = OidcClientUser;
export type Profile = OidcClientUser['profile'];
export type ApiTokens = TokenData;
export type ApiTokenClient = ATC;
