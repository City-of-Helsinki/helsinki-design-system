import { KeyboardEvent, useCallback, useRef } from 'react';

import { eventIds, eventTypes } from '../events';
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
  const keyCacheRef = useRef<string | null>(null);

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
        trigger({ id: eventIds.generic, type: eventTypes.close });
      } else if (isInSelectedOptionsType(type)) {
        if (wasArrowDownPressed) {
          trigger({ id: eventIds.selectedOptions, type: eventTypes.click });
        } else if (wasAlphaNumKeyPressed) {
          keyCacheRef.current = (keyCacheRef.current || '') + e.key;
          trigger({ id: eventIds.selectedOptions, type: eventTypes.click });
          if (listInputType) {
            updateMetaData({ [listInputType]: keyCacheRef.current });
          } else {
            // if focus is in list use filter to find element
          }
        }
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
      } else if (isListItemType(type) && wasAlphaNumKeyPressed && !hasInput) {
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
        moveFocusToFirstListItem();
      } else if (
        (isListType(type) || isAnyListChildType(type)) &&
        hasInput &&
        (wasAlphaNumKeyPressed || isBackspaceKey(e))
      ) {
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

  return {
    onKeyUp,
  };
}
