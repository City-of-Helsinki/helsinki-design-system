import React from 'react';

import { Page } from '../page/Page';
import { ContentSource } from '../content.builder';
import ComponentWrapper from '../componentWrapper/ComponentWrapper';

export function ConsentsInPage(props: {
  contentSource: ContentSource;
  cookieDomain?: string;
}): React.ReactElement | null {
  const { cookieDomain, contentSource } = props;
  return (
    <ComponentWrapper contentSource={contentSource} cookieDomain={cookieDomain}>
      <Page />
    </ComponentWrapper>
  );
}
