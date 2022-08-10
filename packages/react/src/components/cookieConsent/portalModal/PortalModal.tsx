import React from 'react';

import { Portal } from './Portal';
import { Modal } from '../modal/Modal';
import { ContentSource } from '../content.builder';
import { Provider as CookieContextProvider } from '../CookieConsentContext';

export function PortalModal({
  contentSource,
  cookieDomain,
  rootId = 'HdsCookieConsentContainer',
}: {
  contentSource: ContentSource;
  cookieDomain?: string;
  rootId?: string;
}) {
  return (
    <CookieContextProvider contentSource={contentSource} cookieDomain={cookieDomain}>
      <Portal rootId={rootId}>
        <Modal />
      </Portal>
    </CookieContextProvider>
  );
}
