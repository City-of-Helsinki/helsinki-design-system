import { UserManager, UserManagerSettings, SigninRedirectArgs, SignoutRedirectArgs, User } from 'oidc-client-ts';

import { ConnectedModule, SignalNamespace } from '../beacon/beacon';
import { OidcClientError } from './oidcClientError';

export type LoginProps = {
  language?: string;
} & SigninRedirectArgs;

export type LogoutProps = {
  language?: string;
} & SignoutRedirectArgs;

export type OidcClientProps = {
  userManagerSettings: Partial<UserManagerSettings>;
  debug?: boolean;
};

export type UserReturnType = User | null;
export type ErrorReturnType = OidcClientError | null;
export type RenewalResult = [ErrorReturnType, UserReturnType];

export type OidcClientState = 'NO_SESSION' | 'VALID_SESSION' | 'LOGGING_IN' | 'LOGGING_OUT' | 'HANDLING_LOGIN_CALLBACK';

// User['profile']['amr'] has type of "unknown"
export type Amr = string[];

export interface OidcClient extends ConnectedModule {
  /**
   *
   * Returns user's Amr values. Tunnistamo returns the amr as string, which oidc-client-ts rejects, because it violates the OIDC specification
   * Keycloak returns proper value. This client has to support both.
   * If amr is not found from the user.profile, the user.id_token is decrypted and that amr is returned.
   * So cache the retured value instead of calling this function multiple times.
   */
  getAmr: () => Amr | undefined;
  /**
   * Returns current state
   */
  getState: () => OidcClientState;
  /**
   *
   * Returns a token. Function is async, because token renewal might be in progress and current token might be outdated after that.
   * If renewal was in progress, but failed, then old token is returned.
   * Use isRenewing() and exported function getUserToken(user, tokenType) to get token syncronously and safely.
   * The Promise will never reject.
   */
  getToken: (tokenType: 'access' | 'id' | 'refresh') => Promise<string | undefined>;
  /**
   * Returns user object or null
   */
  getUser: () => UserReturnType;
  /**
   * Returns the client's UserManager
   */
  getUserManager: () => UserManager;
  /**
   * Handles the callback path and returns an user object - if user is valid
   */
  handleCallback: () => Promise<User>;
  /**
   *
   * Returns true, if user exists and user object passes isValid() check
   */
  isAuthenticated: () => boolean;
  /**
   *
   * Returns true if user renewal is in progress
   */
  isRenewing: () => boolean;
  /**
   * Calls the authorization_endpoint with given parameters
   * Browser window is redirected, the returned promise never fulfills
   */
  login: (props?: LoginProps) => Promise<void>;
  /**
   * Calls the end_session_endpoint with given parameters
   * Browser window is redirected, the returned promise never fulfills
   */
  logout: (props?: LogoutProps) => Promise<void>;
  /**
   *
   * For manual user renewal.
   * The Promise will never reject.
   */
  renewUser: () => Promise<RenewalResult>;
}

export const oidcClientNamespace: SignalNamespace = 'oidcClient';
