import {
  FocusEvent,
  MouseEvent,
  KeyboardEvent,
  RefObject,
  useCallback,
  HTMLAttributes,
  DetailedHTMLProps,
  useEffect,
} from 'react';

import { eventIds, eventTypes } from '../events';
import getIsElementFocused from '../../../utils/getIsElementFocused';
import getIsElementBlurred from '../../../utils/getIsElementBlurred';
import { useModularOptionListDataHandlers } from './useModularOptionListDataHandlers';
import { useElementDetection } from './useElementDetection';
import { KnownElementType } from '../types';
import getFocusedElementFromBlurEvent from '../../../utils/getFocusedElementFromBlurEvent';

type ReturnObject = Pick<
  DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, never>,
  'onBlur' | 'onFocus' | 'tabIndex'
> & { ref: RefObject<HTMLDivElement> };

export function useFocusHandling(): ReturnObject {
  const { getMetaData, updateMetaData, getData, trigger } = useModularOptionListDataHandlers();
  const {
    getEventElementType,
    getSelectableListItemSiblings,
    getElementUsingActiveDescendant,
    getElementId,
    getElementType,
  } = useElementDetection();

  const elementsThatCloseMenuOnFocus: KnownElementType[] = ['tag', 'tagList', 'clearAllButton', 'showAllButton'];
  const eventTracker = useCallback(
    (
      type: keyof typeof eventTypes,
      e: FocusEvent<HTMLDivElement> | MouseEvent<HTMLDivElement> | KeyboardEvent<HTMLDivElement>,
    ) => {
      const { onFocus, onBlur, open } = getData();
      const markActiveDescendant = (element: HTMLElement | null) => {
        const id = (element && getElementId(element)) || '';
        updateMetaData({ activeDescendant: id });
        const elementWithActiveDescendant = getElementUsingActiveDescendant();
        // do not set the attribute value unless the element has the attribute
        // it does not need to be set in all scenarios (single/multiselect + input/no input)
        if (
          !elementWithActiveDescendant ||
          elementWithActiveDescendant.getAttribute('aria-activedescendant') === undefined
        ) {
          return;
        }
        elementWithActiveDescendant.setAttribute('aria-activedescendant', id);
      };

      const moveFocusToFirstListItem = () => {
        const closestListItems = getSelectableListItemSiblings(undefined, false);
        if (closestListItems.next) {
          markActiveDescendant(closestListItems.next);
          closestListItems.next.focus();
        }
      };

      if (type === eventTypes.blur && getIsElementBlurred(e as FocusEvent<HTMLDivElement>)) {
        if (onBlur) {
          onBlur();
          trigger({ id: eventIds.generic, type: eventTypes.blur });
        }
        markActiveDescendant(null);
      }
      if (type === eventTypes.focus && getIsElementFocused(e as FocusEvent<HTMLDivElement>)) {
        if (onFocus) {
          onFocus();
        }
      }
      if (type === eventTypes.focus) {
        const { type: eventElementType, element } = getEventElementType(e);
        if (eventElementType === 'list') {
          moveFocusToFirstListItem();
        } else if (eventElementType === 'listItem' || eventElementType === 'listGroupLabel') {
          markActiveDescendant(element);
        } else {
          markActiveDescendant(null);
        }
        if (eventElementType && elementsThatCloseMenuOnFocus.includes(eventElementType) && open) {
          if (eventElementType === 'tag' || eventElementType === 'tagList') {
            // when the list was open and a tag was focused and close event re-renders the component, the focus is lost from the tag.
            // this is caused by the tag element losing its element refs.
            // the focus will be set to the first tag which was the only possible focused element,
            // because menu was open and focus must have been moved with keyboard (they are under the list)
            updateMetaData({ focusTarget: 'tag' });
          }
          trigger({ id: eventIds.generic, type: eventTypes.blur });
        }
      } else if (type === eventTypes.blur && open) {
        const focusedElement = getFocusedElementFromBlurEvent(e as FocusEvent<HTMLDivElement>);
        const focusedElementType = focusedElement ? getElementType(focusedElement) : null;
        if (!focusedElementType) {
          trigger({ id: eventIds.generic, type: eventTypes.focusMovedToNonListElement });
        }
      }
    },
    [getMetaData, updateMetaData, getData, trigger],
  );

  const onRender = useCallback(() => {
    const { refs, focusTarget, activeDescendant } = getMetaData();
    const setFocus = (targetRef?: RefObject<HTMLElement>) => {
      if (targetRef && targetRef.current && targetRef.current.focus) {
        targetRef.current.focus();
      }
    };
    if (focusTarget) {
      setFocus(refs[focusTarget]);
      updateMetaData({ focusTarget: undefined });
    }
    if (activeDescendant) {
      const activeElement = document.getElementById(activeDescendant);
      if (activeElement && activeElement !== document.activeElement) {
        activeElement.focus();
      }
    }
  }, [getMetaData, updateMetaData]);

  useEffect(() => {
    onRender();
  });

  return {
    onFocus: (e: FocusEvent<HTMLDivElement>) => {
      eventTracker(eventTypes.focus, e);
    },
    onBlur: (e) => {
      eventTracker(eventTypes.blur, e);
    },
    tabIndex: -1,
    ref: getMetaData().refs.container,
  };
}
