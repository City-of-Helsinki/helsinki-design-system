import React from 'react';

import { ContentSource } from '../content.builder';
import { Provider as ContentProvider } from './ContentContext';
import { Provider as ConsentProvider } from './ConsentContext';

export function Context(props: {
  contentSource: ContentSource;
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
