import { FocusEvent } from 'react';

/**
 * Helper that gets the blurred element from focus event
 *
 * @param e FocusEvent
 */
export default (e: FocusEvent<HTMLElement>): HTMLElement | null => {
  // From https://developer.mozilla.org/en-US/docs/Web/API/FocusEvent/relatedTarget
  // relatedTarget: The EventTarget losing focus (if any)
  return e.relatedTarget ? (e.relatedTarget as HTMLElement) : null;
};
