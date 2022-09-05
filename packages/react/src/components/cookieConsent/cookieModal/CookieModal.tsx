import React from 'react';

import { Modal } from '../modal/Modal';
import { CookieContentSource } from '../content.builder';
import { Context } from '../contexts/ContextComponent';

export function CookieModal(props: {
  contentSource: CookieContentSource;
  cookieDomain?: string;
}): React.ReactElement | null {
  const { cookieDomain, contentSource } = props;
  return (
    <Context contentSource={contentSource} cookieDomain={cookieDomain}>
      <Modal />
    </Context>
  );
}
