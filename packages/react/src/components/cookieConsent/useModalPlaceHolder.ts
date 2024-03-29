import React, { useCallback, useEffect, useRef } from 'react';

type RefListener = (element: HTMLElement) => React.MutableRefObject<HTMLElement | null>;

export function useModalPlaceHolder(): RefListener {
  const placeHolderId = 'HdsCookieConsentModalPlaceholder';
  const observedElementRef = useRef<HTMLElement | null>(null);
  const placeHolderRef = useRef<HTMLElement | null>(null);
  const contentObserver = useRef<ResizeObserver | null>(null);

  const createPlaceholderElement = useCallback((): HTMLElement => {
    const placeHolderElement = document.createElement('div');
    placeHolderElement.setAttribute('data-testid', 'html-cookie-consent-placeholder');
    placeHolderElement.setAttribute('aria-hidden', 'true');
    placeHolderElement.setAttribute('id', placeHolderId);
    (document.body.lastChild as HTMLElement).after(placeHolderElement);
    return placeHolderElement;
  }, []);

  const updatePlaceHolder = useCallback(
    (placeHolderElement: HTMLElement | null, contentElement: HTMLElement | null) => {
      if (!placeHolderElement) {
        return;
      }
      const newHeight = contentElement ? contentElement.getBoundingClientRect().height : 0;
      // eslint-disable-next-line no-param-reassign
      placeHolderElement.style.height = `${newHeight}px`;
    },
    [],
  );

  const setPlaceHolderTransitionDelay = useCallback((placeHolderElement: HTMLElement | null) => {
    if (!placeHolderElement) {
      return;
    }
    // eslint-disable-next-line no-param-reassign
    placeHolderElement.style.transition = 'height 0.1s ease 0.2s';
  }, []);

  const onObservedElementChange = useCallback(() => {
    updatePlaceHolder(placeHolderRef.current, observedElementRef.current);
  }, [updatePlaceHolder, placeHolderRef, observedElementRef]);

  const getPlaceHolderElement = useCallback(() => {
    return document.getElementById(placeHolderId);
  }, [placeHolderId]);

  const removeContentObserver = useCallback(() => {
    if (contentObserver.current) {
      contentObserver.current.disconnect();
      contentObserver.current = null;
    }
  }, [contentObserver]);

  const addContentObserver = useCallback(
    (observedElement: HTMLElement) => {
      removeContentObserver();
      contentObserver.current = new ResizeObserver(onObservedElementChange);
      contentObserver.current.observe(observedElement);
    },
    [removeContentObserver, contentObserver, onObservedElementChange],
  );

  const removePlaceHolder = useCallback(() => {
    if (placeHolderRef.current) {
      placeHolderRef.current.remove();
      placeHolderRef.current = null;
    }
  }, [placeHolderRef]);

  const createAndStorePlaceHolderElement = useCallback(() => {
    if (!placeHolderRef.current) {
      placeHolderRef.current = getPlaceHolderElement() || createPlaceholderElement();
      setPlaceHolderTransitionDelay(placeHolderRef.current);
    }
  }, [placeHolderRef, getPlaceHolderElement, createPlaceholderElement, setPlaceHolderTransitionDelay]);

  const cleanUp = useCallback(() => {
    removeContentObserver();
    removePlaceHolder();
  }, [removeContentObserver, removePlaceHolder]);

  const refListener = useCallback(
    (observedElement: HTMLElement | null) => {
      if (observedElement && !placeHolderRef.current) {
        createAndStorePlaceHolderElement();
      }
      if (observedElementRef.current !== observedElement) {
        if (observedElement) {
          addContentObserver(observedElement);
        } else {
          cleanUp();
        }
        observedElementRef.current = observedElement;
      }
      return observedElementRef;
    },
    [placeHolderRef, cleanUp, observedElementRef, addContentObserver, createAndStorePlaceHolderElement],
  );

  useEffect(() => {
    return () => {
      cleanUp();
    };
  }, [cleanUp]);

  return refListener;
}
