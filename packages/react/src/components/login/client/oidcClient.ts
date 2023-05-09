import { UserManager, UserManagerSettings, WebStorageStateStore, User } from 'oidc-client-ts';
import to from 'await-to-js';

import { OidcClientProps, OidcClient, oidcClientNamespace, UserReturnType, OidcClientState } from './index';
import { OidcClientError } from './oidcClientError';
import { createOidcClientBeacon } from './signals';

const getDefaultProps = (baseUrl: string): Partial<OidcClientProps> => ({
  userManagerSettings: {
    automaticSilentRenew: true,
    redirect_uri: `${baseUrl}/callback`,
    silent_redirect_uri: `${baseUrl}/silent_renew.html`,
    response_type: 'code',
    post_logout_redirect_uri: `${baseUrl}/`,
    monitorSession: false,
    includeIdTokenInSilentRenew: true,
    validateSubOnSilentRenew: false,
    loadUserInfo: true,
  } as UserManagerSettings,
});

export const getUserStoreKey = (settings: Partial<UserManagerSettings>): string =>
  // "oidc" is the default prefix in oidc-client-ts
  // "user" is the userStoreKey in oidc-client-ts
  `oidc.user:${settings.authority}:${settings.client_id}`;

export const getUserFromStorage = (
  settings: Pick<UserManagerSettings, 'authority' | 'client_id'>,
  storage: Storage = window.sessionStorage,
): UserReturnType => {
  const data = storage.getItem(getUserStoreKey(settings));
  if (!data) {
    return null;
  }
  try {
    const user = User.fromStorageString(data);
    return user;
  } catch (e) {
    return null;
  }
};

export const isUserExpired = (user?: Partial<User> | null): boolean => {
  if (!user) {
    return true;
  }
  if (user.expired !== undefined) {
    // user.expired is not always set.
    return user.expired;
  }
  const expiresAtInSeconds = user.expires_at;
  if (expiresAtInSeconds) {
    return expiresAtInSeconds - Date.now() / 1000 <= 0;
  }
  return true;
};

export const isValidUser = (user?: User | null): boolean => !!user && !isUserExpired(user) && !!user.access_token;

export default function createOidcClient(props: OidcClientProps): OidcClient {
  const { userManagerSettings: userManagerSettingsFromProps, ...restProps } = props;
  const { userManagerSettings: defaultUserManagerSettings, ...restDefaultProps } = getDefaultProps(
    window.location.origin,
  );
  const store = window.sessionStorage;
  const combinedProps: OidcClientProps = {
    ...restDefaultProps,
    ...restProps,
    userManagerSettings: {
      ...defaultUserManagerSettings,
      ...userManagerSettingsFromProps,
      userStore: new WebStorageStateStore({ store }),
    },
  };
  let state: OidcClientState = 'NO_SESSION';
  const dedicatedBeacon = createOidcClientBeacon();

  const emitStateChange = (newState: OidcClientState) => {
    if (state === newState) {
      return;
    }
    const previousState = state;
    state = newState;
    dedicatedBeacon.emitStateChange({ state, previousState });
  };

  const userManager = new UserManager(combinedProps.userManagerSettings as UserManagerSettings);

  const getUserFromStorageSyncronously = (): UserReturnType => {
    const user = getUserFromStorage(combinedProps.userManagerSettings as UserManagerSettings, store);
    return user || null;
  };

  if (isValidUser(getUserFromStorageSyncronously())) {
    state = 'VALID_SESSION';
  }

  const oidcClient: OidcClient = {
    connect: (beacon) => {
      dedicatedBeacon.storeBeacon(beacon);
    },
    getState: () => {
      return state;
    },
    getUser() {
      return getUserFromStorageSyncronously();
    },
    getUserManager: () => userManager,
    handleCallback: async () => {
      emitStateChange('HANDLING_LOGIN_CALLBACK');
      const [callbackError, user] = await to(userManager.signinRedirectCallback());
      const isReturnedUserValid = isValidUser(user);
      if (callbackError || !isReturnedUserValid) {
        const error = callbackError
          ? new OidcClientError('SigninRedirectCallback returned an error', 'SIGNIN_ERROR', callbackError)
          : new OidcClientError('SigninRedirectCallback returned invalid or expired user', 'INVALID_OR_EXPIRED_USER');
        dedicatedBeacon.emitError(error);
        emitStateChange('NO_SESSION');
        return Promise.reject(error);
      }
      emitStateChange('VALID_SESSION');
      return Promise.resolve(user);
    },
    login: async (loginProps) => {
      const { extraQueryParams = {}, language, ...rest } = loginProps || {};
      if (language) {
        extraQueryParams.ui_locales = language;
      }
      emitStateChange('LOGGING_IN');
      return userManager.signinRedirect({
        extraQueryParams,
        ...rest,
      });
    },
    namespace: oidcClientNamespace,
  };
  return oidcClient;
}
