import React, { useCallback, useEffect, useRef } from 'react';

import {
  FocusTrapper,
  createFocusTrapper,
  FocusTrapperProps,
  Position,
  RelatedTargetPosition,
} from './focusTrapper/createFocusTrapper';

type RefListener = (element: HTMLElement | null) => React.MutableRefObject<HTMLElement | null>;

/**
 * Hook for tracking and optionally trapping focus between two elements.
 * @param {FocusTrapperProps} props
 * @returns
 */

export function useFocusTrapper(props: FocusTrapperProps = {}) {
  const firstTrapperRef = useRef<HTMLElement | null>(null);
  const lastTrapperRef = useRef<HTMLElement | null>(null);
  const tracker = useRef<FocusTrapper | undefined>(undefined);

  const assignElement = (position: Position, element: HTMLElement | null) => {
    if (!tracker.current) {
      tracker.current = createFocusTrapper(props);
    }
    tracker.current.registerTrappingElement(position, element);
  };

  const firstTrapperRefListener: RefListener = useCallback(
    (observedElement: HTMLElement | null) => {
      firstTrapperRef.current = observedElement;
      assignElement('first', observedElement);
      return firstTrapperRef;
    },
    [tracker],
  );

  const lastTrapperRefListener: RefListener = useCallback(
    (observedElement: HTMLElement | null) => {
      lastTrapperRef.current = observedElement;
      assignElement('last', observedElement);
      return lastTrapperRef;
    },
    [tracker],
  );

  const cleanUp = useCallback(() => {
    if (tracker.current) {
      tracker.current.dispose();
      firstTrapperRef.current = null;
      lastTrapperRef.current = null;
      tracker.current = undefined;
    }
  }, []);

  useEffect(() => {
    return () => {
      cleanUp();
    };
  }, [cleanUp]);

  return {
    refForFirstTrapper: firstTrapperRefListener,
    refForLastTrapper: lastTrapperRefListener,
    disableElements: () => {
      if (tracker.current) {
        tracker.current.disableElements();
      }
    },
    enableElements: () => {
      if (tracker.current) {
        tracker.current.enableElements();
      }
    },
    getElementPosition: (element?: HTMLElement | Node | EventTarget | null): Position | undefined => {
      if (tracker.current) {
        return tracker.current.getElementPosition(element);
      }
      return undefined;
    },
    getRelatedTargetPosition: (element: HTMLElement | Node | EventTarget): RelatedTargetPosition => {
      if (tracker.current) {
        return tracker.current.getRelatedTargetPosition(element as HTMLElement);
      }
      return 'unknown';
    },
    setFocus: (position: Position): void => {
      if (tracker.current) {
        tracker.current.setFocusTo(position);
      }
    },
  };
}
