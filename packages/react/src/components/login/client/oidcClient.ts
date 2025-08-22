import { UserManager, UserManagerSettings, WebStorageStateStore, User, Log } from 'oidc-client-ts';
import to from 'await-to-js';
import jwtDecode from 'jwt-decode';

import {
  OidcClientProps,
  OidcClient,
  oidcClientNamespace,
  UserReturnType,
  OidcClientState,
  LoginProps,
  LogoutProps,
  RenewalResult,
  Amr,
  oidcClientStates,
  oidcClientEvents,
  OidcClientEvent,
} from './index';
import { OidcClientError, oidcClientErrors } from './oidcClientError';
import { createRenewalTrackingPromise } from '../utils/userRenewalPromise';
import { createNamespacedBeacon } from '../beacon/signals';
import { getSessionStorage } from '../utils/getSessionStorage';
import { isSsrEnvironment } from '../../../utils/isSsrEnvironment';

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

/**
 * Returns the session storage key for the user data.
 * @param settings
 * @returns string
 */
export const getUserStoreKey = (settings: Partial<UserManagerSettings>): string =>
  // "oidc" is the default prefix in oidc-client-ts
  // "user" is the userStoreKey in oidc-client-ts
  `oidc.user:${settings.authority}:${settings.client_id}`;

/**
 * Gets user data from storage
 * @param settings
 * @param storage
 * @returns
 */
export const getUserFromStorage = (
  settings: Pick<UserManagerSettings, 'authority' | 'client_id'>,
  sourceStorage?: Storage,
): UserReturnType => {
  const storage = sourceStorage || getSessionStorage();
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

/**
 * Checks is the user expired. Reads the expired and expires_at properties of the User object
 * @param user
 * @returns
 */
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

/**
 * Returns true, if user is not expired and has an access token
 * @param user
 * @returns
 */
export const isValidUser = (user?: User | null): boolean => !!user && !isUserExpired(user) && !!user.access_token;

/**
 *
 * @param user
 * @param tokenType
 * @returns
 */
export const pickUserToken = (user: UserReturnType, tokenType: Parameters<OidcClient['getToken']>[0]): string => {
  if (!isValidUser(user)) {
    return undefined;
  }
  return user[`${tokenType}_token`];
};

export function createOidcClient(props: OidcClientProps): OidcClient {
  const { userManagerSettings: userManagerSettingsFromProps, ...restProps } = props;
  const { userManagerSettings: defaultUserManagerSettings, ...restDefaultProps } = getDefaultProps(
    isSsrEnvironment() ? '' : window.location.origin,
  );
  const store = getSessionStorage();
  const combinedProps: OidcClientProps = {
    ...restDefaultProps,
    ...restProps,
    userManagerSettings: {
      ...defaultUserManagerSettings,
      ...userManagerSettingsFromProps,
      userStore: new WebStorageStateStore({ store }),
    },
  };
  let state: OidcClientState = oidcClientStates.NO_SESSION;
  let renewPromise: Promise<RenewalResult> | undefined;
  const isRenewing = () => !!renewPromise;

  if (combinedProps.debug) {
    Log.setLevel(Log.DEBUG);
    Log.setLogger(console);
  }

  const dedicatedBeacon = createNamespacedBeacon(oidcClientNamespace);

  const emitStateChange = (newState: OidcClientState) => {
    if (state === newState) {
      return;
    }
    const previousState = state;
    state = newState;
    dedicatedBeacon.emitStateChange(state, previousState);
  };

  const emitEvent = (event: OidcClientEvent, user?: User) => {
    return dedicatedBeacon.emitEvent(event, user);
  };

  const emitError = (error: OidcClientError) => {
    return dedicatedBeacon.emitError(error);
  };

  const userManager = new UserManager(combinedProps.userManagerSettings as UserManagerSettings);

  const getUserFromStorageSyncronously = (): UserReturnType => {
    const user = getUserFromStorage(combinedProps.userManagerSettings as UserManagerSettings, store);
    return user || null;
  };

  const convertLoginOrLogoutParams = <T extends LoginProps | LogoutProps>(propsToConvert: T): T => {
    const { extraQueryParams = {}, language, ...rest } = propsToConvert || {};
    if (language) {
      extraQueryParams.ui_locales = language;
    }
    return {
      extraQueryParams,
      ...rest,
    } as T;
  };

  const createRenewalPromise = async (): Promise<RenewalResult> => {
    const [err, user] = await to(createRenewalTrackingPromise(userManager));
    return Promise.resolve([
      err ? new OidcClientError('Renew failed', oidcClientErrors.RENEWAL_FAILED, err) : null,
      user as User,
    ]);
  };

  const handleUserRenewal = async ({
    triggerSigninSilent = false,
  }: { triggerSigninSilent?: boolean } = {}): Promise<RenewalResult> => {
    if (isRenewing()) {
      return renewPromise;
    }
    renewPromise = createRenewalPromise();
    emitEvent(oidcClientEvents.USER_RENEWAL_STARTED);
    if (triggerSigninSilent) {
      const [signInError] = await to(userManager.signinSilent());
      if (signInError) {
        // raise error so renewPromise is fulfilled
        // eslint-disable-next-line no-underscore-dangle
        userManager.events._raiseSilentRenewError(signInError);
      }
    }
    const [error, user] = await renewPromise;
    if (error) {
      const storedUser = getUserFromStorageSyncronously();
      if (!storedUser || !isValidUser(storedUser)) {
        emitError(
          new OidcClientError(
            'Invalid user for token renewal',
            oidcClientErrors.INVALID_OR_EXPIRED_USER,
            error.originalError,
          ),
        );
      } else {
        emitError(error);
      }
    }
    emitEvent(oidcClientEvents.USER_UPDATED, user || null);
    renewPromise = undefined;
    return Promise.resolve([error, user]);
  };

  const getAmr = (): Amr | undefined => {
    const user = getUserFromStorageSyncronously();
    if (!user || !user.id_token) {
      return undefined;
    }
    if (user.profile && Array.isArray(user.profile.amr)) {
      return user.profile.amr.length ? user.profile.amr : undefined;
    }

    try {
      const decodedToken = jwtDecode<Record<string, string>>(user.id_token);
      const { amr } = decodedToken;
      if (!amr) {
        return undefined;
      }
      return Array.isArray(amr) ? amr : [amr];
    } catch (e) {
      return undefined;
    }
  };

  userManager.events.addAccessTokenExpiring(() => {
    handleUserRenewal();
  });

  userManager.events.addUserUnloaded(() => {
    emitEvent(oidcClientEvents.USER_REMOVED);
  });

  const storedUser = getUserFromStorageSyncronously();

  if (isValidUser(storedUser)) {
    state = oidcClientStates.VALID_SESSION;
  } else if (storedUser && storedUser.refresh_token) {
    // If user has a refresh token but expired access token, try to renew on initialization
    handleUserRenewal({ triggerSigninSilent: true }).then(([, renewedUser]) => {
      if (renewedUser && isValidUser(renewedUser)) {
        emitStateChange(oidcClientStates.VALID_SESSION);
      }
    });
  }

  const oidcClient: OidcClient = {
    connect: (beacon) => {
      dedicatedBeacon.storeBeacon(beacon);
    },
    getAmr,
    getState: () => {
      return state;
    },
    getToken: async (tokenType) => {
      if (isRenewing()) {
        await renewPromise;
      }
      const user = getUserFromStorageSyncronously();
      return pickUserToken(user, tokenType);
    },
    getUser() {
      return getUserFromStorageSyncronously();
    },
    getUserManager: () => userManager,
    handleCallback: async () => {
      emitStateChange(oidcClientStates.HANDLING_LOGIN_CALLBACK);
      const [callbackError, user] = await to(userManager.signinRedirectCallback());
      const isReturnedUserValid = isValidUser(user);
      if (callbackError || !isReturnedUserValid) {
        const error = callbackError
          ? new OidcClientError(
              'SigninRedirectCallback returned an error',
              oidcClientErrors.SIGNIN_ERROR,
              callbackError,
            )
          : new OidcClientError(
              'SigninRedirectCallback returned invalid or expired user',
              oidcClientErrors.INVALID_OR_EXPIRED_USER,
            );
        emitError(error);
        emitStateChange(oidcClientStates.NO_SESSION);
        return Promise.reject(error);
      }
      emitStateChange(oidcClientStates.VALID_SESSION);
      emitEvent(oidcClientEvents.USER_UPDATED, user);
      return Promise.resolve(user);
    },
    isAuthenticated: () => {
      const target = getUserFromStorage(combinedProps.userManagerSettings as UserManagerSettings, store);
      return (!!target && isValidUser(target)) || (isRenewing() && !!target && !!target.refresh_token);
    },
    isRenewing,
    login: async (loginProps) => {
      emitStateChange(oidcClientStates.LOGGING_IN);
      // this is to check if the login was aborted or successful
      const interval = setInterval(() => {
        if (oidcClient.getState() === oidcClientStates.LOGGING_IN && !oidcClient.isAuthenticated()) {
          clearInterval(interval);
          emitStateChange(oidcClientStates.NO_SESSION);
        } else {
          clearInterval(interval);
        }
      }, 3000);
      const [err] = await to(userManager.signinRedirect(convertLoginOrLogoutParams<LoginProps>(loginProps)));
      if (err) {
        emitError(new OidcClientError('Login redirect failed', oidcClientErrors.SIGNIN_ERROR, err));
        emitStateChange(oidcClientStates.NO_SESSION);
      }
      return Promise.resolve();
    },
    logout: async (logoutProps) => {
      const sessionOnStart = state;
      emitStateChange(oidcClientStates.LOGGING_OUT);
      // The only way logout may fail before redirection, is failure while fetching the metadata.
      // Metadata exists unless logged in user refreshes the browser.
      // The signoutRedirect() fetches the metadata too, but also clears the user data.
      // To avoid rare case of cleared local user and failing to getMetaData and failed to logout,
      // the metadata fetching is attempted first.
      const [error, endPoint] = await to(userManager.metadataService.getEndSessionEndpoint());
      if (error || !endPoint) {
        emitStateChange(sessionOnStart);
        return Promise.reject(new Error('Failed to get logout endpoint'));
      }
      // errors are not handled like in login(), because signoutRedirect() cannot be reverted.
      // The user is locally removed. The logout() should be called again when signoutRedirect() is rejected
      return userManager.signoutRedirect(convertLoginOrLogoutParams<LogoutProps>(logoutProps));
    },
    namespace: oidcClientNamespace,
    renewUser: async () => {
      return handleUserRenewal({ triggerSigninSilent: true });
    },
  };
  return oidcClient;
}
