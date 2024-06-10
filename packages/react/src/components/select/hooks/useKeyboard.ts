import { KeyboardEvent, useCallback, useRef } from 'react';

import { eventIds, eventTypes } from '../events';
import { KnownElementType } from '../types';
import { defaultFilter, filterSelectableOptions } from '../utils';
import {
  useElementDetection,
  isSearchOrFilterInputType,
  isListItemType,
  isListType,
  isInSelectedOptionsType,
  isAnyListChildType,
} from './useElementDetection';
import { useSelectDataHandlers } from './useSelectDataHandlers';

// what key presses should do.
// https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Roles/listbox_role
// https://developer.mozilla.org/en-US/docs/Web/API/UI_Events/Keyboard_event_key_values

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
  const { getEventElementType, getListItemSiblings, getOptionListItem } = useElementDetection();
  const { trigger, getData, getMetaData, updateMetaData } = useSelectDataHandlers();
  // When there is an input and user starts typing and button is focused,
  // the inputted text should be placed to the input after opening the dropdown.
  // this cache stores the input
  const keyCacheRef = useRef<string | null>(null);
  // An enter key keydown triggers a click on a button.
  // That button click opens the dropwdown.
  // The keyup event in the same event sequence triggers a selection because focus was moved.
  // The keydown element type is stored to prevent this.
  // If keydown type is different that keyup, then keydown shifted focus and keyup should be ignored.
  const keyDownElementType = useRef<KnownElementType | null>(null);

  const onKeyUp = useCallback(
    (e: KeyboardEvent<HTMLElement>) => {
      const { type, element } = getEventElementType(e);
      if (!type) {
        return;
      }
      // If element types of down and up events differ, focused element was changed after down and before up
      // Ignore the up event as down already triggered events
      if (keyDownElementType.current && type !== keyDownElementType.current) {
        e.preventDefault();
        keyDownElementType.current = null;
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
      const wasAlphaNumKeyPressed = isAlphaNumKey(e);
      const wasArrowUpPressed = !wasArrowDownPressed && isArrowUpKey(e);
      const wasClickKeyPressed = !wasArrowUpPressed && !wasArrowDownPressed && isClickKey(e);
      const { listInputType, refs } = getMetaData();
      const hasInput = !!listInputType;

      const shouldKeepKeyCache = () => {
        if (!keyCacheRef.current) {
          return true;
        }
        if (!wasAlphaNumKeyPressed) {
          return false;
        }
        if (isInSelectedOptionsType(type) || isListType(type) || isListItemType(type)) {
          return true;
        }
        return false;
      };

      if (!shouldKeepKeyCache()) {
        keyCacheRef.current = null;
      }

      const shouldPreventDefault = () => {
        if (!wasArrowDownPressed && !wasArrowUpPressed) {
          return false;
        }
        if (isInSelectedOptionsType(type) || isListType(type) || isListItemType(type)) {
          return true;
        }
        return false;
      };

      if (shouldPreventDefault()) {
        e.preventDefault();
      }

      if (isEscKey(e) && getData().open) {
        // esc closes the menu
        trigger({ id: eventIds.generic, type: eventTypes.close });
      } else if (isInSelectedOptionsType(type)) {
        // if focus in the button or its siblings...
        if (wasArrowDownPressed) {
          // open menu on arrow down press
          trigger({ id: eventIds.selectedOptions, type: eventTypes.click });
        } else if (wasAlphaNumKeyPressed) {
          // open menu on alphanum key press and store the input
          keyCacheRef.current = (keyCacheRef.current || '') + e.key;
          trigger({ id: eventIds.selectedOptions, type: eventTypes.click });
          if (listInputType) {
            // store cached input value to "filter" | "search" value
            updateMetaData({ [listInputType]: keyCacheRef.current });
          } else {
            // if focus is in list use filter to find element
          }
        }
      } else if (isSearchOrFilterInputType(type) && wasArrowDownPressed) {
        // if focus in the input, move focus to first item on arrow down
        moveFocusToFirstListItem();
      } else if (isAnyListChildType(type) && (wasArrowDownPressed || wasArrowUpPressed)) {
        // navigate on arrow presses
        const closestListItems = getListItemSiblings(element as HTMLLIElement);
        if (wasArrowDownPressed && closestListItems.next) {
          closestListItems.next.focus();
        } else if (wasArrowUpPressed && closestListItems.prev) {
          closestListItems.prev.focus();
        }
        scrollToFocusedElement();
      } else if (isListItemType(type) && wasClickKeyPressed && element) {
        // select item on space or enter
        element.click();
        scrollToFocusedElement();
      } else if (isListItemType(type) && wasAlphaNumKeyPressed && !hasInput) {
        // if focus is somewhere in the list and user starts typing but input does not exist,
        // focus is move to the element that starts with given input
        keyCacheRef.current = (keyCacheRef.current || '') + e.key;
        const { groups, filterFunction, multiSelect } = getData();
        const hits = keyCacheRef.current
          ? filterSelectableOptions(groups, keyCacheRef.current, filterFunction || defaultFilter, multiSelect).filter(
              (opt) => opt.label.toLowerCase().indexOf(keyCacheRef.current as string) === 0,
            )
          : [];
        if (hits[0]) {
          const listItem = getOptionListItem(groups, hits[0], multiSelect);
          if (listItem && listItem.focus) {
            listItem.focus();
            scrollToFocusedElement();
          }
        }
      } else if (isListType(type) && wasArrowDownPressed && hasInput) {
        // if focus in the list element and not in a list item, move focus to first item.
        moveFocusToFirstListItem();
      } else if (
        (isListType(type) || isAnyListChildType(type)) &&
        hasInput &&
        (wasAlphaNumKeyPressed || isBackspaceKey(e))
      ) {
        // if focus is somewhere in the list and user starts typing, focus and given input is moved to the input
        const inputRef = refs.searchOrFilterInput;
        if (inputRef && inputRef.current) {
          if (!isBackspaceKey(e)) {
            inputRef.current.value = e.key;
          }
          inputRef.current.focus();
        }
      }
    },
    [trigger, getData, getMetaData, updateMetaData],
  );

  const onKeyDown = useCallback((e: KeyboardEvent<HTMLElement>) => {
    const { type } = getEventElementType(e);
    keyDownElementType.current = type;
    if (type && isAnyListChildType(type) && isClickKey(e)) {
      e.preventDefault();
    }
  }, []);

  return {
    onKeyUp,
    onKeyDown,
  };
}
