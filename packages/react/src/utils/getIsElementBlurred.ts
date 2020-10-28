import { FocusEvent } from 'react';

/**
 * Helper that checks if an element is blurred
 * @param e FocusEvent
 */
export default (e: FocusEvent<HTMLDivElement>): boolean => {
  // When the original initiator of the event is not inside the
  // element with the handler, we know that focus has left the
  // element.
  return !e.currentTarget.contains(e.relatedTarget as Node);
};
