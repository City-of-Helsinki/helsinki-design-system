import React from 'react';

import { Login } from './Login';

export default {
  component: Login,
  title: 'Components/Login',
  parameters: {
    controls: { expanded: true },
  },
  args: {},
};

export const Example = (args) => <Login {...args}>Login</Login>;
