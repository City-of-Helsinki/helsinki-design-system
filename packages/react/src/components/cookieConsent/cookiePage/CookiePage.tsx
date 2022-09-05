import React from 'react';

import { Page } from '../page/Page';
import { CookieContentSource } from '../content.builder';
import { CookieConsentContext } from '../contexts/ContextComponent';

export function CookiePage(props: {
  contentSource: CookieContentSource;
  cookieDomain?: string;
}): React.ReactElement | null {
  const { cookieDomain, contentSource } = props;
  return (
    <CookieConsentContext contentSource={contentSource} cookieDomain={cookieDomain}>
      <Page />
    </CookieConsentContext>
  );
}
