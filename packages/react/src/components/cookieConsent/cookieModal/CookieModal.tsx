import React from 'react';

import { Modal } from '../modal/Modal';
import { CookieContentSource } from '../content.builder';
import { CookieConsentContext } from '../contexts/ContextComponent';

export function CookieModal(props: {
  contentSource: CookieContentSource;
  cookieDomain?: string;
}): React.ReactElement | null {
  const { cookieDomain, contentSource } = props;
  return (
    <CookieConsentContext contentSource={contentSource} cookieDomain={cookieDomain}>
      <Modal />
    </CookieConsentContext>
  );
}
