import React, { useCallback, useEffect, useRef } from 'react';

import { createKeyboardTracker } from './keyboardNavigation/createKeyboardTracker';
import { KeyboardTracker, KeyboardTrackerProps } from './keyboardNavigation';

type RefListener = (element: HTMLElement | null) => React.MutableRefObject<HTMLElement | null>;

/**
 * Hook for enabling keyboard navigation inside an element
 * @param {KeyboardTrackerProps} trackerProps
 * @returns
 */

export function useKeyboardNavigation(trackerProps: KeyboardTrackerProps = {}) {
  const observedElementRef = useRef<HTMLElement | null>(null);
  const tracker = useRef<KeyboardTracker | null>(null);
  const refListener: RefListener = useCallback(
    (observedElement: HTMLElement | null) => {
      observedElementRef.current = observedElement;
      if (!observedElement || observedElement !== observedElementRef.current) {
        if (tracker.current) {
          tracker.current.dispose();
          tracker.current = null;
        }
        observedElementRef.current = null;
      }
      if (observedElement) {
        tracker.current = createKeyboardTracker(observedElement, trackerProps);
      }
      return observedElementRef;
    },
    [observedElementRef],
  );

  const cleanUp = useCallback(() => {
    if (tracker.current) {
      tracker.current.dispose();
      tracker.current = null;
    }
  }, []);

  useEffect(() => {
    return () => {
      cleanUp();
    };
  }, [cleanUp]);

  return {
    getElement: () => {
      return observedElementRef.current;
    },
    getTracker: () => {
      return tracker.current;
    },
    ref: refListener,
    refresh: () => {
      return tracker.current ? tracker.current.refresh() : undefined;
    },
  };
}
