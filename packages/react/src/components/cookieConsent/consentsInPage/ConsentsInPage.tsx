import React from 'react';

import { Page } from '../page/Page';
import { ContentSource } from '../content.builder';
import { Provider as CookieContextProvider } from '../CookieConsentContext';

export function ConsentsInPage(props: {
  contentSource: ContentSource;
  cookieDomain?: string;
}): React.ReactElement | null {
  const { cookieDomain, contentSource } = props;
  return (
    <CookieContextProvider contentSource={contentSource} cookieDomain={cookieDomain}>
      <Page />
    </CookieContextProvider>
  );
}
