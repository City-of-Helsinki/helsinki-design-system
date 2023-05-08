/* eslint-disable camelcase */
import { SigninResponse, User } from 'oidc-client-ts';

export type UserCreationProps = {
  invalidUser?: boolean;
  expiredUser?: boolean;
  scope?: SigninResponse['scope'];
};

const tokenExpirationTimeInSeconds = 3600;

export function createSignInResponse({ invalidUser, expiredUser, scope }: UserCreationProps): SigninResponse {
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
    },
    refresh_token: invalidUser !== true ? 'refresh_token' : '',
    scope: resposeScope,
    session_state: String(`${Math.random()}${Math.random()}`),
    state: '',
    token_type: 'Bearer',
    userState: {},
    expires_in,
    isOpenId: true,
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
