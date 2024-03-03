import { KeyboardEvent, useCallback } from 'react';

import { eventIds, eventTypes } from '../events';
import {
  useElementDetection,
  isSearchOrFilterInputType,
  isListItemType,
  isListType,
  isInSelectedOptionsType,
  isAnyListChildType,
} from './useElementDetection';
import { useSelectDataHandlers } from './useSelectDataHandlers';

const alphanumRegExp = /[a-z0-9äöå]/i;

export const isAlphaNumKey = (e: KeyboardEvent<HTMLElement>) => {
  if (e.key.length > 1) {
    return false;
  }
  return alphanumRegExp.test(e.key);
};

export const isArrowDownKey = (e: KeyboardEvent<HTMLElement>) => {
  return e.key === 'ArrowDown';
};
export const isArrowUpKey = (e: KeyboardEvent<HTMLElement>) => {
  return e.key === 'ArrowUp';
};
export const isEscKey = (e: KeyboardEvent<HTMLElement>) => {
  return e.key === 'Escape';
};
export const isBackspaceKey = (e: KeyboardEvent<HTMLElement>) => {
  return e.key === 'Backspace';
};
export const isDeleteKey = (e: KeyboardEvent<HTMLElement>) => {
  return e.key === 'Delete';
};
export const isClickKey = (e: KeyboardEvent<HTMLElement>) => {
  return ['Enter', ' '].includes(e.key);
};

export function useKeyboard() {
  const { getEventElementType, getListItemSiblings } = useElementDetection();
  const { trigger, getData, getMetaData } = useSelectDataHandlers();

  // https://developer.mozilla.org/en-US/docs/Web/API/UI_Events/Keyboard_event_key_values
  const onKeyUp = useCallback(
    (e: KeyboardEvent<HTMLElement>) => {
      const { type, element } = getEventElementType(e);
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

      const wasArrowDownPressed = isArrowDownKey(e);
      const wasArrowUpPressed = !wasArrowDownPressed && isArrowUpKey(e);
      const wasClickKeyPressed = !wasArrowUpPressed && !wasArrowDownPressed && isClickKey(e);
      const hasInput = getData().showSearch || getData().showFiltering;

      if (isEscKey(e) && getData().open) {
        trigger({ id: eventIds.generic, type: eventTypes.close });
      } else if (isInSelectedOptionsType(type) && wasArrowDownPressed) {
        trigger({ id: eventIds.selectedOptions, type: eventTypes.click });
      } else if (isSearchOrFilterInputType(type) && wasArrowDownPressed) {
        moveFocusToFirstListItem();
      } else if (isAnyListChildType(type) && (wasArrowDownPressed || wasArrowUpPressed)) {
        const closestListItems = getListItemSiblings(element as HTMLLIElement);
        if (wasArrowDownPressed && closestListItems.next) {
          closestListItems.next.focus();
        } else if (wasArrowUpPressed && closestListItems.prev) {
          closestListItems.prev.focus();
        }
        scrollToFocusedElement();
      } else if (isListItemType(type) && wasClickKeyPressed && element) {
        element.click();
        scrollToFocusedElement();
      } else if (isListType(type) && wasArrowDownPressed && hasInput) {
        moveFocusToFirstListItem();
      } else if (
        (isListType(type) || isAnyListChildType(type)) &&
        hasInput &&
        (isAlphaNumKey(e) || isBackspaceKey(e))
      ) {
        const inputRef = getMetaData().refs.searchOrFilterInput;
        if (inputRef && inputRef.current) {
          if (!isBackspaceKey(e)) {
            inputRef.current.value = e.key;
          }
          inputRef.current.focus();
        }
      }
    },
    [trigger, getData, getMetaData],
  );

  return {
    onKeyUp,
  };
}
