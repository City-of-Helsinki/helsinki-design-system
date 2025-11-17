import { KeyboardEvent, useCallback, useEffect, useMemo, useRef } from 'react';

import { eventIds, eventTypes } from '../events';
import { KnownElementType } from '../types';
import { defaultFilter, filterSelectableOptions, getAllOptions } from '../utils';
import {
  useElementDetection,
  isSearchOrFilterInputType,
  isListType,
  isInSelectedOptionsType,
  isAnyListChildType,
} from './useElementDetection';
import { useSelectDataHandlers } from './useSelectDataHandlers';
import tagStyles from '../../tag/Tag.module.scss';

// what key presses should do.
// developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Roles/listbox_role#keyboard_interactions

// Delay to allow dropdown close animation and DOM updates to complete before moving focus
const FOCUS_TRANSITION_DELAY = 50;

const alphanumRegExp = /[a-z0-9äöå]/i;

export const isAlphaNumKey = (e: KeyboardEvent<HTMLElement>) => {
  if (e.key.length > 1) {
    return false;
  }
  return alphanumRegExp.test(e.key);
};

const isArrowDownKey = (e: KeyboardEvent<HTMLElement>) => {
  return e.key === 'ArrowDown';
};
const isArrowUpKey = (e: KeyboardEvent<HTMLElement>) => {
  return e.key === 'ArrowUp';
};
const isEscKey = (e: KeyboardEvent<HTMLElement>) => {
  return e.key === 'Escape';
};
const isBackspaceKey = (e: KeyboardEvent<HTMLElement>) => {
  return e.key === 'Backspace';
};

const isHomekey = (e: KeyboardEvent<HTMLElement>) => {
  return e.key === 'Home';
};
const isEndKey = (e: KeyboardEvent<HTMLElement>) => {
  return e.key === 'End';
};
const isTabKey = (e: KeyboardEvent<HTMLElement>) => {
  return e.key === 'Tab';
};
export const isClickKey = (e: KeyboardEvent<HTMLElement>) => {
  return ['Enter', ' '].includes(e.key);
};

// Keycache is for storing user input when list is closed and/or there is no input field
// Options should anyway be focused according to user input even if there is no filter / search
// cache resets if user haven't typed anything for expirationTimeInMs
const createKeyCache = () => {
  let value: string = '';
  let lastUpdateTime = 0;
  let isPending = false;
  const expirationTimeInMs = 300;
  const getValue = () => {
    isPending = false;
    return value;
  };

  const isExpired = () => {
    return lastUpdateTime && Date.now() - lastUpdateTime >= expirationTimeInMs;
  };

  const update = (newValue: string) => {
    value = newValue;
    lastUpdateTime = Date.now();
    isPending = false;
  };

  const append = (newValue: string) => {
    update(getValue() + newValue);
  };

  const clear = () => {
    value = '';
    lastUpdateTime = 0;
    isPending = false;
  };

  const shouldUseInput = (type: KnownElementType, wasAlphaNumKeyPressed: boolean) => {
    if (!wasAlphaNumKeyPressed) {
      return false;
    }
    if (!isInSelectedOptionsType(type) && !isListType(type) && !isAnyListChildType(type)) {
      return false;
    }
    return true;
  };

  const clearIfNeeded = (type: KnownElementType, wasAlphaNumKeyPressed: boolean) => {
    if (isExpired()) {
      clear();
    }
    if (!shouldUseInput(type, wasAlphaNumKeyPressed)) {
      clear();
    }
  };

  const markPendingInput = () => {
    isPending = true;
  };

  const hasPendingInput = () => {
    if (isPending) {
      isPending = false;
      return true;
    }
    return false;
  };

  return {
    getValue,
    update,
    append,
    clear,
    clearIfNeeded,
    isExpired,
    shouldUseInput,
    hasPendingInput,
    markPendingInput,
  };
};

export function useKeyboard() {
  const { getEventElementType, getSelectableListItemSiblings, getOptionListItem, getSelectableListItems } =
    useElementDetection();
  const { trigger, getData, getMetaData, updateMetaData } = useSelectDataHandlers();
  // When there is an input and user starts typing and button is focused,
  // the inputted text should be placed to the input after opening the dropdown.
  // this cache stores the input
  const keyCache = useMemo(() => createKeyCache(), []);
  // An enter key keydown triggers a click on a button.
  // That button click opens the dropwdown.
  // The keyup event in the same event sequence triggers a selection because focus was moved.
  // The keydown element type is stored to prevent this.
  // If keydown type is different that keyup, then keydown shifted focus and keyup should be ignored.
  const keyDownElementType = useRef<KnownElementType | null>(null);
  // Store MutationObserver refs for END key element detection so we can clean them up
  const endKeyObserverRef = useRef<MutationObserver | null>(null);
  const endKeyTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Cleanup function for END key MutationObserver and timeout
  const disconnectEndKeyObserver = useCallback(() => {
    if (endKeyObserverRef.current) {
      endKeyObserverRef.current.disconnect();
      endKeyObserverRef.current = null;
    }
    if (endKeyTimeoutRef.current) {
      clearTimeout(endKeyTimeoutRef.current);
      endKeyTimeoutRef.current = null;
    }
  }, []);

  const scrollToFocusedElement = useCallback(() => {
    if (document.activeElement) {
      document.activeElement.scrollIntoView({ block: 'center' });
    }
  }, []);

  const focusToFirstFilteredOption = useCallback(
    (filterValue: string) => {
      const { groups, filterFunction, multiSelect } = getData();
      const hits = filterValue
        ? filterSelectableOptions(groups, filterValue, filterFunction || defaultFilter, multiSelect)
        : [];
      if (hits[0]) {
        const listItem = getOptionListItem(groups, hits[0], multiSelect);
        if (listItem && listItem.focus) {
          listItem.focus();
          scrollToFocusedElement();
        }
      }
    },
    [scrollToFocusedElement, getOptionListItem, defaultFilter, getData, filterSelectableOptions],
  );

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

      const moveFocusToFirstListItem = () => {
        const data = getData();

        // In virtualize mode, get first option from data instead of DOM
        if (data.virtualize) {
          const allOptions = getAllOptions(data.groups).filter((opt) => opt.visible && !opt.disabled);
          const firstOption = allOptions[0];

          if (firstOption) {
            const optionId = getMetaData().getOptionId(firstOption);
            const el = document.getElementById(optionId);

            if (el) {
              el.focus();
              scrollToFocusedElement();
              return;
            }
          }
        }

        // Fallback to DOM query for non-virtualized mode
        const listItems = getSelectableListItems();
        const el = listItems[0];
        if (el) {
          el.focus();
          scrollToFocusedElement();
        }
      };

      const moveFocusToLastListItem = () => {
        const data = getData();

        // In virtualize mode, get last option from data instead of DOM
        if (data.virtualize) {
          const allOptions = getAllOptions(data.groups).filter((opt) => opt.visible && !opt.disabled);
          const lastOption = allOptions[allOptions.length - 1];

          if (lastOption) {
            const optionId = getMetaData().getOptionId(lastOption);
            const el = document.getElementById(optionId);

            if (el) {
              // Element already rendered, just focus it
              el.focus();
              scrollToFocusedElement();
            } else {
              // Element not yet rendered, scroll to bottom to trigger chunk loading
              // Clean up any existing observer first
              disconnectEndKeyObserver();

              const { refs } = getMetaData();
              const listElement = refs.list.current;
              if (listElement) {
                listElement.scrollTop = listElement.scrollHeight;

                // Set up MutationObserver to watch for the element to appear
                // Chunk rendering can take 300-500ms for large datasets
                const checkForElement = () => {
                  const elAfterScroll = document.getElementById(optionId);
                  if (elAfterScroll) {
                    elAfterScroll.focus();
                    scrollToFocusedElement();
                    disconnectEndKeyObserver();
                  }
                };

                // Set up timeout to disconnect observer after 10 seconds
                endKeyTimeoutRef.current = setTimeout(() => {
                  disconnectEndKeyObserver();
                }, 10000);

                // Set up MutationObserver to watch for DOM changes
                const observer = new MutationObserver(() => {
                  checkForElement();
                });

                // Observe the list container for child additions
                const observeTarget = refs.listContainer?.current || listElement;
                if (observeTarget) {
                  observer.observe(observeTarget, {
                    childList: true,
                    subtree: true,
                  });

                  endKeyObserverRef.current = observer;

                  // Check immediately in case element is already rendered
                  checkForElement();
                }
              }
            }
            return;
          }
        }

        // Fallback to DOM query for non-virtualized mode
        const listItems = getSelectableListItems();
        const el = listItems.pop();
        if (el) {
          el.focus();
          scrollToFocusedElement();
        }
      };

      const wasArrowDownPressed = isArrowDownKey(e);
      const wasAlphaNumKeyPressed = isAlphaNumKey(e);
      const wasArrowUpPressed = !wasArrowDownPressed && isArrowUpKey(e);
      const wasClickKeyPressed = !wasArrowUpPressed && !wasArrowDownPressed && isClickKey(e);
      const { listInputType, refs } = getMetaData();
      const hasInput = !!listInputType;
      const isOpen = getData().open;

      keyCache.clearIfNeeded(type, wasAlphaNumKeyPressed);

      // prevent default when in button (space/enter click is handled below) or list (prevent scrolling with space)
      const shouldPreventDefault = () => {
        if (!wasArrowDownPressed && !wasArrowUpPressed) {
          return false;
        }
        if (isInSelectedOptionsType(type) || isListType(type) || isAnyListChildType(type)) {
          return true;
        }
        return false;
      };

      if (shouldPreventDefault()) {
        e.preventDefault();
      }

      // esc should close the list
      if (isEscKey(e) && isOpen) {
        trigger({ id: eventIds.generic, type: eventTypes.close });
        return;
      }
      // home should move to first item
      if (isHomekey(e) && isOpen) {
        moveFocusToFirstListItem();
        return;
      }
      // end should move to last item
      if (isEndKey(e) && isOpen) {
        moveFocusToLastListItem();
        return;
      }

      // move focus from input to first option when wasArrowDownPressed
      if (isSearchOrFilterInputType(type) && wasArrowDownPressed) {
        // if focus in the input, move focus to first item on arrow down
        moveFocusToFirstListItem();
        return;
      }

      // navigate between options. Will loop from first to last and vice versa
      if (isAnyListChildType(type) && (wasArrowDownPressed || wasArrowUpPressed)) {
        const closestListItems = getSelectableListItemSiblings(element as HTMLLIElement);
        if (wasArrowDownPressed && closestListItems.next) {
          closestListItems.next.focus();
        } else if (wasArrowUpPressed && closestListItems.prev) {
          closestListItems.prev.focus();
        }
        scrollToFocusedElement();
        return;
      }

      // select/unselect on space/enter
      if (isAnyListChildType(type) && wasClickKeyPressed && element) {
        element.click();
        scrollToFocusedElement();
        return;
      }

      // if focus is the list element and not in a list item, move focus to first item.
      if (isListType(type) && wasArrowDownPressed && hasInput) {
        moveFocusToFirstListItem();
        return;
      }

      // if focus is somewhere in the list and user starts typing, focus and given input is moved to the input
      if (hasInput && (isListType(type) || isAnyListChildType(type)) && (wasAlphaNumKeyPressed || isBackspaceKey(e))) {
        const inputRef = refs.searchOrFilterInput;
        if (inputRef && inputRef.current) {
          if (!isBackspaceKey(e)) {
            inputRef.current.value = e.key;
          }
          inputRef.current.focus();
        }
        return;
      }

      // if focus is the button or its siblings
      if (isInSelectedOptionsType(type)) {
        // open menu on arrow down press
        if (wasArrowDownPressed && !isOpen) {
          trigger({ id: eventIds.selectedOptions, type: eventTypes.click });
          return;
        }

        // open menu on alphanum key press
        if (wasAlphaNumKeyPressed) {
          if (!isOpen) {
            trigger({ id: eventIds.selectedOptions, type: eventTypes.click });
          }
          if (listInputType) {
            keyCache.append(e.key);
            // store cached input value to "filter" | "search" value
            updateMetaData({ [listInputType]: keyCache.getValue() });
            // stop processing, because an input is present
            return;
          }
        }
      }

      // if focus is somewhere in the list and user starts typing but input does not exist,
      // focus is moved to the element that starts with given input
      if (keyCache.shouldUseInput(type, wasAlphaNumKeyPressed) && !hasInput) {
        keyCache.append(e.key);
        if (!isOpen) {
          // options should be filtered after list is opened!
          keyCache.markPendingInput();
          return;
        }
        focusToFirstFilteredOption(keyCache.getValue());
      }
    },
    [
      trigger,
      getData,
      getMetaData,
      updateMetaData,
      getEventElementType,
      getSelectableListItems,
      getSelectableListItemSiblings,
      scrollToFocusedElement,
      focusToFirstFilteredOption,
      disconnectEndKeyObserver,
      keyCache,
    ],
  );

  const onKeyDown = useCallback(
    (e: KeyboardEvent<HTMLElement>) => {
      const { type } = getEventElementType(e);
      keyDownElementType.current = type;

      const isOpen = getData().open;
      const { refs } = getMetaData();

      // Handle Tab/Shift+Tab when dropdown is open
      if (isTabKey(e) && isOpen) {
        e.preventDefault();
        e.stopPropagation();
        e.nativeEvent.stopImmediatePropagation();

        const wasShiftKey = e.shiftKey;
        const buttonRef = refs.button;

        if (buttonRef && buttonRef.current) {
          // Ensure button has proper focus for consistent keyboard navigation
          // This handles cases where focus was disrupted by mouse interactions
          if (document.activeElement !== buttonRef.current) {
            buttonRef.current.focus();
          }

          // Clear activeDescendant BEFORE closing dropdown to prevent focus restoration issues
          updateMetaData({ activeDescendant: undefined });

          // Get the root document (handle iframes like Storybook)
          const rootDoc = buttonRef.current.ownerDocument;

          // Get all tabbable elements in the correct document
          const selector =
            'a[href], button:not([disabled]), textarea:not([disabled]), input:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])';
          const allElements = Array.from(rootDoc.querySelectorAll(selector)) as HTMLElement[];

          // Filter out elements with tabindex="-1" and truly hidden elements
          const tabbableElements = allElements.filter((el) => {
            const tabIndex = el.getAttribute('tabindex');
            // Skip elements with tabindex="-1"
            if (tabIndex === '-1') return false;

            // Skip Select component's internal elements (filter input, clear buttons, etc.)
            // These should not be part of external tab navigation
            const buttonId = buttonRef.current?.id;

            // Filter by ID for elements that have Select component IDs
            if (buttonId && el.id && el.id !== buttonId && el.id.startsWith(buttonId.split('-main-button')[0])) {
              return false;
            }

            // Filter by CSS class for internal clear buttons that don't have component IDs
            if (el.className && el.className.includes('clearButton')) {
              return false;
            }

            // For elements with explicit tabIndex >= 0, they're focusable even if offsetParent is null
            if (el.tabIndex >= 0) return true;

            // For elements without explicit tabIndex, check if they're visible
            if (el.offsetParent === null) return false;
            return true;
          });

          // Find the button's position
          const currentIndex = tabbableElements.indexOf(buttonRef.current);

          let targetElement: HTMLElement | null = null;
          if (wasShiftKey) {
            // Shift+Tab: go to previous element
            if (currentIndex > 0) {
              targetElement = tabbableElements[currentIndex - 1];
            }
          } else {
            // Tab: go to next element
            const nextIndex = currentIndex + 1;
            if (nextIndex < tabbableElements.length) {
              targetElement = tabbableElements[nextIndex];
            }
          }

          // Close the dropdown
          trigger({ id: eventIds.generic, type: eventTypes.outSideClick });

          if (targetElement) {
            const savedTarget = targetElement;

            // Check what type of element we're targeting
            if (savedTarget.closest(`.${tagStyles.tag}`)) {
              // Target is a tag - use the focus system to focus first tag
              updateMetaData({ focusTarget: 'tag' });
            } else {
              // Target is not a tag - wait for dropdown to close before focusing
              setTimeout(() => {
                updateMetaData({ focusTarget: undefined });
                savedTarget.focus();
              }, FOCUS_TRANSITION_DELAY);
            }
          } else {
            // No target element, focus the button
            buttonRef.current.focus();
            setTimeout(() => {
              updateMetaData({ focusTarget: undefined });
            }, 0);
          }
        }
      }

      if (type && isAnyListChildType(type) && isClickKey(e)) {
        e.preventDefault();
      }
    },
    [getEventElementType, getData, getMetaData, updateMetaData, trigger],
  );

  useEffect(() => {
    if (getData().open && keyCache.hasPendingInput()) {
      focusToFirstFilteredOption(keyCache.getValue());
    }
  });

  // Cleanup MutationObserver when dropdown closes or component unmounts
  const isOpen = getData().open;
  useEffect(() => {
    if (!isOpen) {
      disconnectEndKeyObserver();
    }
    // Cleanup on unmount
    return () => {
      disconnectEndKeyObserver();
    };
  }, [isOpen, disconnectEndKeyObserver]);

  return {
    onKeyUp,
    onKeyDown,
  };
}
