import React from 'react';

import { Provider as CookieContextProvider } from '../CookieConsentContext';
import { ContentSource } from '../content.builder';

export function ComponentWrapper(props: {
  children: React.ReactNode | React.ReactNode[] | null;
  contentSource: ContentSource;
  cookieDomain?: string;
}): React.ReactElement | null {
  const { cookieDomain, contentSource, children } = props;
  return (
    <CookieContextProvider contentSource={contentSource} cookieDomain={cookieDomain}>
      {children}
    </CookieContextProvider>
  );
}
