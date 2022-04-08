import React from 'react';

import { CookieConsent } from './CookieConsent';
import { Content, Provider as CookieContextProvider } from './CookieConsentContext';

export function CookieConsentModal(props: { content: Content; cookieDomain?: string }): React.ReactElement | null {
  const { cookieDomain, content } = props;
  return (
    <CookieContextProvider content={content} cookieDomain={cookieDomain}>
      <CookieConsent />
    </CookieContextProvider>
  );
}
