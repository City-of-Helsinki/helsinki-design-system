import { KeyboardEvent, useCallback } from 'react';

import { eventIds, eventTypes } from '../events';
import { useSearchDataHandlers } from './useSearchDataHandlers';
import { elementIsSelectable } from '../../../../utils/elementIsSelectable';
import { singleSelectOptionSelector } from '../../modularOptionList/components/listItems/SingleSelectOption';
import { singleSelectGroupLabelSelector } from '../../modularOptionList/components/listItems/SingleSelectGroupLabel';
import { getElementSiblings } from '../../shared/utils/getElementSiblings';

const isEscKey = (e: KeyboardEvent<HTMLElement>) => {
  return e.key === 'Escape';
};

const isArrowDownKey = (e: KeyboardEvent<HTMLElement>) => {
  return e.key === 'ArrowDown';
};

const isArrowUpKey = (e: KeyboardEvent<HTMLElement>) => {
  return e.key === 'ArrowUp';
};

const isEnterKey = (e: KeyboardEvent<HTMLElement>) => {
  return e.key === 'Enter';
};

const isSpaceKey = (e: KeyboardEvent<HTMLElement>) => {
  return e.key === ' ';
};

export function useKeyboard() {
  const { getData, getMetaData, trigger } = useSearchDataHandlers();

  const getSelectableListItems = useCallback(() => {
    const { refs } = getMetaData();
    const list = refs.list.current;
    if (!list) {
      return [];
    }
    const selector = `${singleSelectGroupLabelSelector},${singleSelectOptionSelector}`;
    const items = [...list.querySelectorAll(selector)] as HTMLElement[];
    return items.filter(elementIsSelectable);
  }, [getMetaData]);

  const moveFocusToFirstListItem = useCallback(() => {
    const items = getSelectableListItems();
    if (items[0]) {
      items[0].focus();
      items[0].scrollIntoView({ block: 'center' });
    }
  }, [getSelectableListItems]);

  const moveFocusToLastListItem = useCallback(() => {
    const items = getSelectableListItems();
    if (items.length > 0) {
      const lastItem = items[items.length - 1];
      lastItem.focus();
      lastItem.scrollIntoView({ block: 'center' });
    }
  }, [getSelectableListItems]);

  const isSearchInputFocused = useCallback(() => {
    const { refs } = getMetaData();
    const searchInput = refs.searchInput.current;
    return searchInput && document.activeElement === searchInput;
  }, [getMetaData]);

  const isListItemFocused = useCallback(() => {
    const items = getSelectableListItems();
    return items.some((item) => item === document.activeElement);
  }, [getSelectableListItems]);

  const getSelectableListItemSiblings = useCallback(
    (listItem?: HTMLElement, loop = true) => {
      const items = getSelectableListItems();
      const target = listItem || (document.activeElement as HTMLElement);
      return getElementSiblings(target, loop, items);
    },
    [getSelectableListItems],
  );

  const onKeyDown = useCallback(
    (e: KeyboardEvent<HTMLDivElement>) => {
      const { open } = getData();

      if (isEscKey(e) && open) {
        e.preventDefault();
        trigger({ id: eventIds.generic, type: eventTypes.close });
        return;
      }

      // When search input is focused and dropdown is open
      if (open && isSearchInputFocused()) {
        // Arrow down moves to first item
        if (isArrowDownKey(e)) {
          e.preventDefault();
          moveFocusToFirstListItem();
          return;
        }

        // Arrow up moves to last item
        if (isArrowUpKey(e)) {
          e.preventDefault();
          moveFocusToLastListItem();
          return;
        }
      }

      // When a list item is focused
      if (open && isListItemFocused()) {
        // Arrow down moves to next item (loops to first)
        if (isArrowDownKey(e)) {
          e.preventDefault();
          const siblings = getSelectableListItemSiblings();
          if (siblings.next) {
            siblings.next.focus();
            siblings.next.scrollIntoView({ block: 'center' });
          }
          return;
        }

        // Arrow up moves to previous item (loops to last)
        if (isArrowUpKey(e)) {
          e.preventDefault();
          const siblings = getSelectableListItemSiblings();
          if (siblings.prev) {
            siblings.prev.focus();
            siblings.prev.scrollIntoView({ block: 'center' });
          }
          return;
        }

        // Enter or Space selects the focused item
        if (isEnterKey(e) || isSpaceKey(e)) {
          e.preventDefault();
          const currentItem = document.activeElement as HTMLElement;
          if (currentItem) {
            currentItem.click();
          }
        }
      }
    },
    [
      getData,
      getMetaData,
      trigger,
      isSearchInputFocused,
      isListItemFocused,
      getSelectableListItemSiblings,
      moveFocusToFirstListItem,
      moveFocusToLastListItem,
    ],
  );

  return {
    onKeyDown,
  };
}
