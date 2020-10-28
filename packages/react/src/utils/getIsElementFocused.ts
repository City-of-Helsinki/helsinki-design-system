import { FocusEvent } from 'react';

/**
 * Helper that checks if an element or any of its children are focused
 * @param e FocusEvent
 */
export default (e: FocusEvent<HTMLDivElement>): boolean => {
  // When the target element is inside the element with the handler,
  // but the relatedTarget is not, we know that the focus has come to
  // the element from outside of it.
  return (
    e.currentTarget.contains(e.target as Node) &&
    (!e.relatedTarget || !e.currentTarget.contains(e.relatedTarget as Node))
  );
};
