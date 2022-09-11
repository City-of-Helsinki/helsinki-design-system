import React from 'react';

import { Portal } from './Portal';
import { Modal } from '../modal/Modal';
import { CookieConsentContext } from '../contexts/ContextComponent';
import { CookieContentSource } from '../content.builder';

export function PortalModal({
  contentSource,
  cookieDomain,
  rootId = 'HdsCookieConsentContainer',
}: {
  contentSource: CookieContentSource;
  cookieDomain?: string;
  rootId?: string;
}) {
  return (
    <CookieConsentContext contentSource={contentSource} cookieDomain={cookieDomain}>
      <Portal rootId={rootId}>
        <Modal />
      </Portal>
    </CookieConsentContext>
  );
}
