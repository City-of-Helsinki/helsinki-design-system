import { OidcClientError } from '../client/oidcClientError';
import { OidcClientState, oidcClientStates } from '../client';

export function createCallbackStateErrorMessage(state: OidcClientState) {
  return `Current state (${state}) cannot be handled by a callback`;
}

export function isHandlingLoginCallbackError(error: OidcClientError): boolean {
  return (
    error.isSignInError && error.message === createCallbackStateErrorMessage(oidcClientStates.HANDLING_LOGIN_CALLBACK)
  );
}
