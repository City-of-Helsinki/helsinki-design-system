import { KeyboardEvent, useCallback, useRef } from 'react';

import { eventIds, eventTypes } from '../events';
import { useSearchDataHandlers } from './useSearchDataHandlers';
import { elementIsSelectable } from '../../../../utils/elementIsSelectable';
import { singleSelectOptionSelector } from '../../modularOptionList/components/listItems/SingleSelectOption';
import { singleSelectGroupLabelSelector } from '../../modularOptionList/components/listItems/SingleSelectGroupLabel';
import optionListStyles from '../../modularOptionList/ModularOptionList.module.scss';

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
  const activeIndexRef = useRef<number>(-1);

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

  const clearVirtualFocus = useCallback(() => {
    const items = getSelectableListItems();
    items.forEach((item) => {
      item.classList.remove(optionListStyles.virtualFocus);
      item.setAttribute('aria-selected', 'false');
    });
    const { refs } = getMetaData();
    refs.searchInput.current?.removeAttribute('aria-activedescendant');
    activeIndexRef.current = -1;
  }, [getSelectableListItems, getMetaData]);

  const setVirtualFocus = useCallback(
    (index: number) => {
      const items = getSelectableListItems();
      if (index < 0 || index >= items.length) return;

      // Clear previous
      items.forEach((item) => {
        item.classList.remove(optionListStyles.virtualFocus);
        item.setAttribute('aria-selected', 'false');
      });

      // Set new
      const targetItem = items[index];
      targetItem.classList.add(optionListStyles.virtualFocus);
      targetItem.setAttribute('aria-selected', 'true');
      targetItem.scrollIntoView({ block: 'nearest' });

      const { refs } = getMetaData();
      const itemId = targetItem.getAttribute('id');
      if (itemId) {
        refs.searchInput.current?.setAttribute('aria-activedescendant', itemId);
      }

      activeIndexRef.current = index;
    },
    [getSelectableListItems, getMetaData],
  );

  const isSearchInputFocused = useCallback(() => {
    const { refs } = getMetaData();
    const searchInput = refs.searchInput.current;
    return searchInput && document.activeElement === searchInput;
  }, [getMetaData]);

  const onKeyDown = useCallback(
    (e: KeyboardEvent<HTMLDivElement>) => {
      const { open } = getData();

      if (isEscKey(e) && open) {
        e.preventDefault();
        e.stopPropagation();
        clearVirtualFocus();
        trigger({ id: eventIds.generic, type: eventTypes.close });
        // Return focus to search input
        const { refs } = getMetaData();
        refs.searchInput.current?.focus();
        return;
      }

      // All keyboard handling below requires search input to have DOM focus
      if (!isSearchInputFocused()) return;

      const items = getSelectableListItems();
      const currentIndex = activeIndexRef.current;
      const hasVirtualFocus = currentIndex >= 0 && currentIndex < items.length;

      // Enter key handling
      if (isEnterKey(e)) {
        e.preventDefault();
        if (hasVirtualFocus) {
          // Select the virtually focused item
          items[currentIndex].click();
          clearVirtualFocus();
        } else {
          // Submit search
          const { refs } = getMetaData();
          if (refs.searchInput.current?.submit) {
            refs.searchInput.current.submit();
          }
        }
        return;
      }

      // Space selects item only when an item has virtual focus
      if (isSpaceKey(e) && hasVirtualFocus) {
        e.preventDefault();
        items[currentIndex].click();
        clearVirtualFocus();
        return;
      }

      // Arrow Down
      if (isArrowDownKey(e)) {
        e.preventDefault();
        if (!open) return;
        if (items.length === 0) return;

        if (!hasVirtualFocus) {
          // Move to first item
          setVirtualFocus(0);
        } else {
          // Move to next item (loop to first)
          const nextIndex = (currentIndex + 1) % items.length;
          setVirtualFocus(nextIndex);
        }
        return;
      }

      // Arrow Up
      if (isArrowUpKey(e)) {
        e.preventDefault();
        if (!open) return;
        if (items.length === 0) return;

        if (!hasVirtualFocus) {
          // Move to last item
          setVirtualFocus(items.length - 1);
        } else {
          // Move to previous item (loop to last)
          const prevIndex = (currentIndex - 1 + items.length) % items.length;
          setVirtualFocus(prevIndex);
        }
      }
    },
    [getData, getMetaData, trigger, isSearchInputFocused, getSelectableListItems, clearVirtualFocus, setVirtualFocus],
  );

  return {
    onKeyDown,
    clearVirtualFocus,
  };
}
