import React from 'react';

import { Button } from '../button/Button';
import { LoginContextProvider, useOidcClient } from './index';
import { OidcClientProps } from './client/oidcClient';

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

const LoginComponent = () => {
  const oidcClient = useOidcClient();
  const onButtonClick = () => {
    oidcClient.login();
  };

  return <Button onClick={onButtonClick}>Login</Button>;
};

export const Example = () => {
  return (
    <LoginContextProvider loginProps={loginProps}>
      <LoginComponent />
    </LoginContextProvider>
  );
};
