import React from 'react';

import { Modal } from '../modal/Modal';
import { ContentSource } from '../content.builder';
import { ComponentWrapper } from '../componentWrapper/ComponentWrapper';

export function ConsentsInModal(props: {
  contentSource: ContentSource;
  cookieDomain?: string;
}): React.ReactElement | null {
  const { cookieDomain, contentSource } = props;
  return (
    <ComponentWrapper contentSource={contentSource} cookieDomain={cookieDomain}>
      <Modal />
    </ComponentWrapper>
  );
}
