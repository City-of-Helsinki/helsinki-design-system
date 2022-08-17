import React, { useCallback, useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';

import { useModalRenderChecker } from '../useModalRenderChecker';

export function Portal({ rootId, children }: { rootId: string; children: React.ReactChild | React.ReactChildren }) {
  const shouldShowModal = useModalRenderChecker();

  const containerElementRef = useRef<HTMLElement | null>(null);
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
  if (getChildNodeCount() === 0 && (!shouldShowModal || !isDomReady)) {
    return null;
  }
  return createPortal(children, containerElementRef.current as HTMLElement);
}
