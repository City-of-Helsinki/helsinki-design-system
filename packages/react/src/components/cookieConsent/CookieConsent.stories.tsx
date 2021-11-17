import React from 'react';

import { commonConsents } from './cookieConsentController';
import { Provider as CookieContextProvider } from './CookieConsentContext';
import Demo from './__storybook__/Demo';

export default {
  component: Demo,
  title: 'Components/CookieConsent',
  parameters: {
    controls: { expanded: true },
  },
  args: {},
};

export const Example = () => {
  return (
    <CookieContextProvider
      requiredConsents={[commonConsents.tunnistamo, commonConsents.language]}
      optionalConsents={[
        commonConsents.matomo,
        commonConsents.preferences,
        commonConsents.marketing,
        'someOtherConsent',
      ]}
      onAllConsentsGiven={(consents) => {
        if (consents.matomo) {
          //  start tracking
        }
      }}
      onConsentsParsed={(consents) => {
        if (consents.matomo) {
          //  start tracking
        }
      }}
    >
      <Demo />
    </CookieContextProvider>
  );
};
