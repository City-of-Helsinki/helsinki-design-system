import { User as OidcClientUser } from 'oidc-client-ts';

export type User = OidcClientUser;
export type Profile = OidcClientUser['profile'];
