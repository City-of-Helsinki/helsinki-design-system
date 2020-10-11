import isEqual from 'lodash.isequal';
import { FocusEvent } from 'react';

export const DROPDOWN_MENU_ITEM_HEIGHT = 52;

/**
 * Helper that checks if an item is in the selected options
 * @param selectedOptions Currently selected options
 * @param item            Item we want to check
 */
export function getIsInSelectedOptions<T>(selectedOptions: T[], item: T): boolean {
  return selectedOptions.some((selectedOption: T) => isEqual(selectedOption, item));
}

/**
 * Helper that checks if an element or any of its children are focused
 * @param e FocusEvent
 */
export function getIsElementFocused(e: FocusEvent<HTMLDivElement>): boolean {
  // When the target element is inside the element with the handler,
  // but the relatedTarget is not, we know that the focus has come to
  // the element from outside of it.
  return (
    e.currentTarget.contains(e.target as Node) &&
    (!e.relatedTarget || !e.currentTarget.contains(e.relatedTarget as Node))
  );
}

/**
 * Helper that checks if an element is blurred
 * @param e FocusEvent
 */
export function getIsElementBlurred(e: FocusEvent<HTMLDivElement>): boolean {
  // When the original initiator of the event is not inside the
  // element with the handler, we know that focus has left the
  // element.
  return !e.currentTarget.contains(e.relatedTarget as Node);
}
