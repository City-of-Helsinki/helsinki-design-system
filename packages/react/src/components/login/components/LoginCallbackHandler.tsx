import React from 'react';
import { User } from 'oidc-client-ts';

import { useOidcClient } from '../client/hooks';
import { OidcClientError, oidcClientErrors } from '../client/oidcClientError';
import { oidcClientStates } from '../client';

type LoginCallbackHandlerProps = {
  children: React.ReactNode | React.ReactNode[] | null;
  onSuccess: (user: User) => void;
  onError: (error?: OidcClientError) => void;
};

/**
 * LoginCallbackHandler handles the response when the OIDC server redirects the browser back to the given callback route.
 * @param props LoginCallbackHandlerProps
 */
export function LoginCallbackHandler({
  children,
  onSuccess,
  onError,
}: LoginCallbackHandlerProps): React.ReactElement | null {
  const { handleCallback, getState, getUser } = useOidcClient();
  // if this component is used inside a component that re-renders, for example after state change,
  // then handleCallback would be called twice without state check
  if (getState() === oidcClientStates.NO_SESSION) {
    handleCallback()
      .then((data) => {
        onSuccess(data);
      })
      .catch((err) => {
        onError(err);
      });
  } else if (getState() === oidcClientStates.VALID_SESSION) {
    onSuccess(getUser() as User);
  } else {
    onError(
      new OidcClientError(
        `Current state (${getState()}) cannot be handled by a callback`,
        oidcClientErrors.SIGNIN_ERROR,
      ),
    );
  }
  // eslint-disable-next-line react/jsx-no-useless-fragment
  return <>{children}</>;
}
