/* eslint-disable camelcase */
import { SigninResponse, User, UserManagerSettings, UserManager } from 'oidc-client-ts';

import { getUserStoreKey } from '../client/oidcClient';

export type UserCreationProps = {
  invalidUser?: boolean;
  expiredUser?: boolean;
  scope?: SigninResponse['scope'];
  signInResponseProps?: Partial<Exclude<SigninResponse, 'profile'>>;
  signInResponseProfileProps?: Partial<SigninResponse['profile']>;
};

type PublicUserManagerEvents = {
  _userUnloaded: {
    raise: () => Promise<void>;
  };
  _userSignedOut: {
    raise: () => Promise<void>;
  };
  _expiringTimer: {
    raise: () => Promise<void>;
  };
};

const tokenExpirationTimeInSeconds = 3600;

export function createSignInResponse({
  invalidUser,
  expiredUser,
  scope,
  signInResponseProps,
  signInResponseProfileProps,
}: UserCreationProps): SigninResponse {
  const resposeScope = scope || 'openid profile';
  const nowAsSeconds = Math.round(Date.now() / 1000);
  const expires_in = expiredUser !== true ? tokenExpirationTimeInSeconds : -1;
  const expires_at = nowAsSeconds + expires_in;
  return {
    access_token: invalidUser !== true ? 'access_token' : '',
    code: 'code',
    error: null,
    error_description: null,
    error_uri: null,
    expires_at,
    id_token: invalidUser !== true ? 'id_token' : '',
    profile: {
      sub: 'sub',
      iss: 'issuer',
      aud: 'aud',
      exp: expires_at,
      iat: nowAsSeconds,
      name: 'Test User',
      amr: ['validAmr'],
      ...signInResponseProfileProps,
    },
    refresh_token: invalidUser !== true ? 'refresh_token' : '',
    scope: resposeScope,
    session_state: String(`${Math.random()}${Math.random()}`),
    state: '',
    token_type: 'Bearer',
    userState: {},
    expires_in,
    isOpenId: true,
    ...signInResponseProps,
  };
}

export function createUser(userCreationProps: UserCreationProps = {}): User {
  const response = createSignInResponse(userCreationProps);
  const user = {
    ...response,
    expired: userCreationProps.expiredUser,
  };
  return ({
    ...user,
    toStorageString() {
      return JSON.stringify(this);
    },
  } as unknown) as User;
}

export function createUserAndPlaceUserToStorage(
  userManagerSettings: Partial<UserManagerSettings>,
  userCreationProps: UserCreationProps = {},
) {
  const user = createUser(userCreationProps);
  const { authority, client_id } = userManagerSettings;
  sessionStorage.setItem(getUserStoreKey({ authority, client_id }), user.toStorageString());
  return user;
}

export function raiseUserUserManagerEvent(targetUserManager: UserManager, eventType: keyof PublicUserManagerEvents) {
  const events = (targetUserManager.events as unknown) as PublicUserManagerEvents;
  events[eventType].raise();
}

export function raiseUserUnloadedEvent(targetUserManager: UserManager) {
  return raiseUserUserManagerEvent(targetUserManager, '_userUnloaded');
}

export function raiseUserSignedOutEvent(targetUserManager: UserManager) {
  return raiseUserUserManagerEvent(targetUserManager, '_userSignedOut');
}

export function raiseTokenExpiringEvent(targetUserManager: UserManager) {
  return raiseUserUserManagerEvent(targetUserManager, '_expiringTimer');
}
