import React, { useState } from 'react';
import { User } from 'oidc-client-ts';

import { Button } from '../button/Button';
import { LoginContextProvider, useAuthenticatedUser, useOidcClient } from './index';
import { Notification } from '../notification/Notification';
import { OidcClientProps } from './client/index';
import { LoginCallbackHandler } from './LoginCallbackHandler';
import { OidcClientError } from './client/oidcClientError';
import createSessionPoller from './sessionPoller/sessionPoller';

export default {
  component: LoginContextProvider,
  title: 'Components/Login',
  parameters: {
    controls: { expanded: true },
  },
  args: {},
};

const loginProps: OidcClientProps = {
  userManagerSettings: {
    authority: 'https://tunnistamo.dev.hel.ninja/',
    client_id: 'https://api.hel.fi/auth/helsinkiprofile-ui-dev',
    response_type: 'code',
    scope: 'openid profile email https://api.hel.fi/auth/helsinkiprofiledev',
  },
};

const sessionPoller = createSessionPoller();

const IFrameWarning = () => {
  const openWindowInTop = () => {
    if (window.top) {
      window.top.location.href = `/iframe.html${window.location.search}`;
    }
  };
  if (window.top !== window.self) {
    return (
      <Notification type="error">
        <p>Login components should not be used in an iframe</p>
        <Button onClick={openWindowInTop}>Open this story without an iframe</Button>
      </Notification>
    );
  }
  return null;
};

const LoginComponent = () => {
  const oidcClient = useOidcClient();
  const onButtonClick = () => {
    oidcClient.login();
  };
  return (
    <div>
      <p>You are not logged in!</p>
      <Button onClick={onButtonClick}>Login</Button>
    </div>
  );
};

const LogoutComponent = () => {
  const oidcClient = useOidcClient();
  const onButtonClick = () => {
    oidcClient.logout();
  };
  return (
    <div>
      <p>You are logged in!</p>
      <Button onClick={onButtonClick}>Logout</Button>
    </div>
  );
};

const LoginOrLogout = () => {
  const user = useAuthenticatedUser();
  return (
    <div>
      <IFrameWarning />
      {user ? <LogoutComponent /> : <LoginComponent />}
    </div>
  );
};

export const Example = () => {
  return (
    <LoginContextProvider loginProps={loginProps} modules={[sessionPoller]}>
      <LoginOrLogout />
    </LoginContextProvider>
  );
};

export const Callback = () => {
  const [userOrError, setUserOrError] = useState<User | OidcClientError | undefined>(undefined);
  const onSuccess = (user: User) => {
    setUserOrError(user);
  };
  const onError = (error?: OidcClientError) => {
    setUserOrError(error);
  };
  if (userOrError instanceof Error) {
    return <p>Login failed!</p>;
  }
  if (userOrError) {
    return (
      <div>
        <p>Welcome user, {(userOrError as User).profile.given_name}</p>
        <LogoutComponent />
      </div>
    );
  }

  return (
    <LoginContextProvider loginProps={loginProps}>
      <LoginCallbackHandler onSuccess={onSuccess} onError={onError}>
        <div>Logging in...</div>
      </LoginCallbackHandler>
    </LoginContextProvider>
  );
};
