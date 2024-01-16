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

  // The shouldShowModal is true, when user has not given consents and consents should be asked for.
  // The isDomReady is true, when the target element for portal exists. It is created, if needed, after initial render
  // getChildNodeCount() is zero when portal has been destroyed or container does not exist.
  if (getChildNodeCount() === 0 && (!shouldShowModal || !isDomReady)) {
    return null;
  }
  // If containerElement has children (getChildNodeCount() > 0), but this instance has never been rendered,
  // the container was used by another Portal instance.
  // So, if portal container has content (child elements) and this component did not render it,
  // this component should not proceed and create a new portal.
  if (getChildNodeCount() > 0 && !wasPortalCreated.current) {
    return null;
  }
  // Prevent re-creating portal, if container element reference is not found.
  // All the checks above are passed, when this instance has created the portal
  // and there is a child (screen reader notification) in the container
  // The container element reference is null, if portal has been removed after consents were given
  if (!containerElementRef.current) {
    return null;
  }
  wasPortalCreated.current = true;
  // eslint-disable-next-line react/jsx-no-useless-fragment
  return createPortal(<>{children}</>, containerElementRef.current as HTMLElement);
}
