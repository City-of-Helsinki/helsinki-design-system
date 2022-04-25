import React from 'react';

import { Modal } from '../modal/Modal';
import { Content, Provider as CookieContextProvider } from '../CookieConsentContext';

export function ConsentsInModal(props: { content: Content; cookieDomain?: string }): React.ReactElement | null {
  const { cookieDomain, content } = props;
  return (
    <CookieContextProvider content={content} cookieDomain={cookieDomain}>
      <Modal />
    </CookieContextProvider>
  );
}
