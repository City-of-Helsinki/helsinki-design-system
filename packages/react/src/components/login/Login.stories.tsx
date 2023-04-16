import React from 'react';

import { Button } from '../button/Button';
import { LoginContextProvider, useOidcClient } from './index';
import { OidcClientProps } from './client/oidcClient';
import { Notification } from '../notification/Notification';

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
