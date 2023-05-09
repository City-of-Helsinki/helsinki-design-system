import { UserManager, UserManagerSettings, SigninRedirectArgs, User } from 'oidc-client-ts';

import { ConnectedModule, SignalNamespace } from '../beacon/beacon';

export type LoginProps = {
  language?: string;
} & SigninRedirectArgs;

export type OidcClientProps = {
  userManagerSettings: Partial<UserManagerSettings>;
};

export type UserReturnType = User | null;

export type OidcClientState = 'NO_SESSION' | 'VALID_SESSION' | 'LOGGING_IN' | 'LOGGING_OUT' | 'HANDLING_LOGIN_CALLBACK';

export interface OidcClient extends ConnectedModule {
  /**
   * Returns current state
   */
  getState: () => OidcClientState;
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
   * Calls the authorization_endpoint with given parameters
   * Browser window is redirected, the returned promise never fulfills
   */
  login: (props?: LoginProps) => Promise<void>;
}

export const oidcClientNamespace: SignalNamespace = 'oidcClientName';
