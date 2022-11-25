import React, { useCallback, useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';

import { useModalRenderChecker } from '../useModalRenderChecker';

export function Portal({ rootId, children }: { rootId: string; children: React.ReactChild | React.ReactChildren }) {
  const shouldShowModal = useModalRenderChecker();

  const containerElementRef = useRef<HTMLElement | null>(null);
  const wasPortalCreated = useRef<boolean>(false);
  const [isDomReady, setIsDomReady] = useState<boolean>(false);

  const getContainerElement = useCallback((): HTMLElement | null => {
    return containerElementRef.current || document.getElementById(rootId);
  }, [rootId, containerElementRef]);

  const getChildNodeCount = useCallback((): number => {
    const container = getContainerElement();
    return container ? container.childNodes.length : 0;
  }, [getContainerElement]);

  const removePortal = useCallback(() => {
    const containerElement = containerElementRef.current || document.getElementById(rootId);
    containerElementRef.current = null;
    if (containerElement && !getChildNodeCount()) {
      containerElement.remove();
    }
  }, [rootId, getChildNodeCount]);

  useEffect(() => {
    if (!shouldShowModal) {
      removePortal();
      return () => undefined;
    }

    let containerElement = document.getElementById(rootId);
    if (!containerElement) {
      containerElement = document.createElement('div');
      containerElement.setAttribute('id', rootId);
      containerElement.setAttribute('data-testid', 'html-cookie-consent-container');
      document.body.insertBefore(containerElement, document.body.firstChild);
    }
    containerElementRef.current = containerElement;

    setIsDomReady(true);

    return () => {
      removePortal();
    };
  }, [rootId, shouldShowModal, setIsDomReady, removePortal]);

  if (typeof document === 'undefined') return null;

  if (getChildNodeCount() === 0 && (!shouldShowModal || !isDomReady)) {
    return null;
  }
  // If containerElement has children, but this instance has never been rendered,
  // the container was used by another Portal instance
  // this is a failsafe to prevent rendering Portal again after screen reader notification is rendered
  if (getChildNodeCount() > 0 && !wasPortalCreated.current) {
    return null;
  }
  // just in case, prevent creating portal, if container element is not found.
  if (!containerElementRef.current) {
    return null;
  }
  wasPortalCreated.current = true;
  return createPortal(<>{children}</>, containerElementRef.current as HTMLElement);
}
