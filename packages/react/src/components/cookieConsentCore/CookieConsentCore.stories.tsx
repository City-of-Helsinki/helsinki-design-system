import React from 'react';

import { ReactTest } from './ReactTest';
import { ReactTestFullPage } from './ReactTestFullPage';

export default {
  component: ReactTest,
  title: 'Components/CookieConsentCore',
  parameters: {
    controls: { expanded: true },
    docs: { disable: true },
  },
  args: {},
};

export const ExtClass = () => {
  return <ReactTest />;
};

export const ExtClassFullPage = () => {
  return <ReactTestFullPage />;
};
