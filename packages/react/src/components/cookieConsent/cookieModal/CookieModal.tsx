import React from 'react';

import { Modal } from '../modal/Modal';
import { ContentSource } from '../content.builder';
import { Provider as CookieContextProvider } from '../CookieConsentContext';

export function CookieModal(props: { contentSource: ContentSource; cookieDomain?: string }): React.ReactElement | null {
  const { cookieDomain, contentSource } = props;
  return (
    <CookieContextProvider contentSource={contentSource} cookieDomain={cookieDomain}>
      <Modal />
    </CookieContextProvider>
  );
}
