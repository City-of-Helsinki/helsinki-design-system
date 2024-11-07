import React, { useEffect } from 'react';

import { CookieConsentCore } from './cookieConsentCore';
import { CreateProps } from './types';

export const SettingsPage = (props: CreateProps) => {
  const elementId = 'hds-cookie-consent-full-page';
  const options = {
    ...props.options,
    settingsPageSelector: `#${elementId}`,
  };

  useEffect(() => {
    CookieConsentCore.create(props.siteSettings, options);
  }, []);

  return <div id={elementId} />;
};
