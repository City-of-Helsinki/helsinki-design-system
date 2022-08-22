import React from 'react';

import { Page } from '../page/Page';
import { ContentSource } from '../content.builder';
import { Context } from '../contexts/ContextComponent';

export function CookiePage(props: { contentSource: ContentSource; cookieDomain?: string }): React.ReactElement | null {
  const { cookieDomain, contentSource } = props;
  return (
    <Context contentSource={contentSource} cookieDomain={cookieDomain}>
      <Page />
    </Context>
  );
}
