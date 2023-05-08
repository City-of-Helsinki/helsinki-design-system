import React, { useState } from 'react';
import { User } from 'oidc-client-ts';

import { Button } from '../button/Button';
import { LoginContextProvider, useOidcClient } from './index';
import { Notification } from '../notification/Notification';
import { OidcClientProps } from './client/oidcClient';
import { LoginCallbackHandler } from './LoginCallbackHandler';
import { OidcClientError } from './client/oidcClientError';

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
        <Button onClick={openWindowInTop}>Open this story without and iframe</Button>
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
      <IFrameWarning />
      <Button onClick={onButtonClick}>Login</Button>
    </div>
  );
};

export const Example = () => {
  return (
    <LoginContextProvider loginProps={loginProps}>
      <LoginComponent />
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
    return <p>Welcome user, {(userOrError as User).profile.given_name}</p>;
  }

  return (
    <LoginContextProvider loginProps={loginProps}>
      <LoginCallbackHandler onSuccess={onSuccess} onError={onError}>
        <div>Logging in...</div>
      </LoginCallbackHandler>
    </LoginContextProvider>
  );
};
