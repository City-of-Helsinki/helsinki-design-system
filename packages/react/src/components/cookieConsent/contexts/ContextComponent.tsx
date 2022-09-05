import React from 'react';

import { CookieContentSource } from '../content.builder';
import { Provider as ContentProvider } from './ContentContext';
import { Provider as ConsentProvider } from './ConsentContext';

export function CookieConsentContext(props: {
  contentSource: CookieContentSource;
  cookieDomain?: string;
  children: React.ReactNode | React.ReactNode[] | null;
}): React.ReactElement | null {
  const { cookieDomain, contentSource, children } = props;
  return (
    <ContentProvider contentSource={contentSource}>
      <ConsentProvider cookieDomain={cookieDomain}>{children}</ConsentProvider>
    </ContentProvider>
  );
}
