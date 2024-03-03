import { KeyboardEvent, useCallback } from 'react';

import { eventIds, eventTypes } from '../events';
import {
  useElementDetection,
  isSearchOrFilterInputType,
  isListItemType,
  isListType,
  isInSelectedOptionsType,
} from './useElementDetection';
import { useSelectDataHandlers } from './useSelectDataHandlers';

export const isArrowDownKey = (e: KeyboardEvent<HTMLElement>) => {
  return e.key === 'ArrowDown';
};
export const isArrowUpKey = (e: KeyboardEvent<HTMLElement>) => {
  return e.key === 'ArrowUp';
};
export const isEscKey = (e: KeyboardEvent<HTMLElement>) => {
  return e.key === 'Escape';
};
export const isClickKey = (e: KeyboardEvent<HTMLElement>) => {
  return ['Enter', ' '].includes(e.key);
};

export function useKeyboard() {
  const { getEventElementType, getListItemSiblings } = useElementDetection();
  const { trigger, getData } = useSelectDataHandlers();

  // https://developer.mozilla.org/en-US/docs/Web/API/UI_Events/Keyboard_event_key_values
  const onKeyUp = useCallback(
    (e: KeyboardEvent<HTMLElement>) => {
      const { type, element } = getEventElementType(e);
      const wasArrowDownPressed = isArrowDownKey(e);
      const wasArrowUpPressed = !wasArrowDownPressed && isArrowUpKey(e);
      const wasClickKeyPressed = !wasArrowUpPressed && !wasArrowDownPressed && isClickKey(e);
      if (!type) {
        return;
      }
      const scrollToFocusedElement = () => {
        if (document.activeElement) {
          document.activeElement.scrollIntoView({ block: 'center' });
        }
      };
      const moveFocusToFirstListItem = () => {
        const closestListItems = getListItemSiblings(undefined, false);
        if (closestListItems.next) {
          closestListItems.next.focus();
          scrollToFocusedElement();
        }
      };

      if (isEscKey(e) && getData().open) {
        trigger({ id: eventIds.generic, type: eventTypes.close });
      }
      if (isInSelectedOptionsType(type) && wasArrowDownPressed) {
        trigger({ id: eventIds.selectedOptions, type: eventTypes.click });
      }
      if (isSearchOrFilterInputType(type) && wasArrowDownPressed) {
        moveFocusToFirstListItem();
      }
      if (isListItemType(type) && (wasArrowDownPressed || wasArrowUpPressed)) {
        const closestListItems = getListItemSiblings(element as HTMLLIElement);
        if (wasArrowDownPressed && closestListItems.next) {
          closestListItems.next.focus();
        } else if (wasArrowUpPressed && closestListItems.prev) {
          closestListItems.prev.focus();
        }
        scrollToFocusedElement();
      }
      if (isListItemType(type) && wasClickKeyPressed && element) {
        element.click();
        scrollToFocusedElement();
      }
      if (isListType(type) && wasArrowDownPressed && !getData().showSearch && !getData().showFiltering) {
        moveFocusToFirstListItem();
      }
    },
    [trigger, getData],
  );

  return {
    onKeyUp,
  };
}
