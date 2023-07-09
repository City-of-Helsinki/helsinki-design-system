export type FocusTrapper = ReturnType<typeof createFocusTrapper>;
export type FocusTrapperProps = {
  /**
   * The first trapper element in the dom
   */
  firstTrapperElement?: HTMLElement;
  /**
   * The last trapper element in the dom
   */
  lastTrapperElement?: HTMLElement;
  /**
   * Callback for focus events
   */
  onFocus?: (focusedPosition: 'first' | 'last', relatedTargetPosition: RelatedTargetPosition) => void;
  /**
   * Should focus be trapped inside the first and last trapper elements. If true, focus is automatically moved from last to first and vice versa.
   */
  trapIn?: boolean;
};
export type Position = 'first' | 'last';
export type RelatedTargetPosition = 'inside' | 'outside' | 'unknown' | Position;

export function createFocusTrapper({
  firstTrapperElement,
  lastTrapperElement,
  onFocus,
  trapIn = false,
}: FocusTrapperProps) {
  const elements = {
    first: firstTrapperElement,
    last: lastTrapperElement,
  };

  const enableElementFocus = (element?: HTMLElement) => {
    if (!element) {
      return;
    }
    element.setAttribute('tabindex', '0');
    element.removeAttribute('disabled');
  };

  const enableElements = () => {
    enableElementFocus(elements.first);
    enableElementFocus(elements.last);
  };

  const disableElementFocus = (element?: HTMLElement) => {
    if (!element) {
      return;
    }
    element.setAttribute('tabindex', '-1');
    element.setAttribute('disabled', 'true');
  };

  const disableElements = () => {
    disableElementFocus(elements.first);
    disableElementFocus(elements.last);
  };

  const getElementPosition = (element?: HTMLElement | Node | EventTarget | null): Position | undefined => {
    if (!element) {
      return undefined;
    }
    if (element === elements.first) {
      return 'first';
    }
    if (element === elements.last) {
      return 'last';
    }
    return undefined;
  };

  const getRelatedTargetPosition = (focusEvent: FocusEvent): RelatedTargetPosition => {
    const { relatedTarget } = focusEvent;
    if (!relatedTarget || !elements.first || !elements.last) {
      return 'unknown';
    }

    if (elements.first === relatedTarget) {
      return 'first';
    }
    if (elements.last === relatedTarget) {
      return 'last';
    }

    const commonParent = elements.first.parentElement;
    if (!commonParent || !commonParent.contains(relatedTarget as Node)) {
      return 'outside';
    }
    const siblings = Array.from(commonParent.children);
    const firstPos = siblings.findIndex((el) => el === elements.first);
    const lastPos = siblings.findIndex((el) => el === elements.last);
    const relatedPos = siblings.findIndex((el) => {
      return el === relatedTarget || el.contains(relatedTarget as Node);
    });

    return relatedPos > firstPos && relatedPos < lastPos ? 'inside' : 'outside';
  };

  const setFocusTo = (position: Position) => {
    const target = elements[position];
    if (target) {
      target.focus();
    }
  };
  let focusingManually = false;
  const listener = (focusEvent: FocusEvent) => {
    if (focusingManually) {
      return;
    }
    const position = getElementPosition(focusEvent.target as HTMLElement);
    if (!position) {
      return;
    }
    const relatedTargetPosition = getRelatedTargetPosition(focusEvent);
    if (trapIn && relatedTargetPosition === 'inside') {
      focusingManually = true;
      const targetPosition = position === 'last' ? 'first' : 'last';
      setFocusTo(targetPosition);
      if (onFocus) {
        onFocus(targetPosition, relatedTargetPosition);
      }
      focusingManually = false;
    } else if (onFocus) {
      onFocus(position, relatedTargetPosition);
    }
  };

  const addFocusListener = (element?: HTMLElement) => {
    if (!element) {
      return;
    }
    element.addEventListener('focus', listener);
  };

  const removeFocusListener = (element?: HTMLElement) => {
    if (!element) {
      return;
    }
    element.removeEventListener('focus', listener);
  };

  addFocusListener(elements.first);
  addFocusListener(elements.last);

  return {
    registerTrappingElement: (type: 'first' | 'last', element: HTMLElement | null) => {
      removeFocusListener(elements[type]);
      if (element) {
        elements[type] = element;
        addFocusListener(elements[type]);
      }
    },
    dispose: () => {
      removeFocusListener(elements.first);
      removeFocusListener(elements.last);
      elements.first = undefined;
      elements.last = undefined;
    },
    disableElements,
    enableElements,
    setFocusTo,
    getElementPosition,
    getRelatedTargetPosition: (element: HTMLElement) => {
      return getRelatedTargetPosition(({ relatedTarget: element } as unknown) as FocusEvent);
    },
  };
}
