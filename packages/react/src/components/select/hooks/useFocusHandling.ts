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
import { useSelectDataHandlers } from './useSelectDataHandlers';
import { useElementDetection } from './useElementDetection';
import { KnownElementType } from '../types';

type ReturnObject = Pick<
  DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, never>,
  'onBlur' | 'onFocus' | 'tabIndex'
> & { ref: RefObject<HTMLDivElement> };

export function useFocusHandling(): ReturnObject {
  const { getMetaData, updateMetaData, getData, trigger } = useSelectDataHandlers();
  const { getEventElementType, getListItemSiblings, getElementUsingActiveDescendant, getElementId } =
    useElementDetection();
  const { refs, focusTarget, activeDescendant } = getMetaData();
  const elementsThatCloseMenuOnFocus: KnownElementType[] = ['tag', 'tagList', 'clearAllButton', 'showAllButton'];
  const eventTracker = useCallback(
    (
      type: keyof typeof eventTypes,
      e: FocusEvent<HTMLDivElement> | MouseEvent<HTMLDivElement> | KeyboardEvent<HTMLDivElement>,
    ) => {
      const markActiveDescendant = (element: HTMLElement | null) => {
        const id = (element && getElementId(element)) || '';
        updateMetaData({ activeDescendant: id });
        const elementWithActiveDescendant = getElementUsingActiveDescendant();
        // do not set the attribute value unless the element has the attribute
        if (
          !elementWithActiveDescendant ||
          elementWithActiveDescendant.getAttribute('aria-activedescendant') === undefined
        ) {
          return;
        }
        elementWithActiveDescendant.setAttribute('aria-activedescendant', id);
      };

      const moveFocusToFirstListItem = () => {
        const closestListItems = getListItemSiblings(undefined, false);
        if (closestListItems.next) {
          closestListItems.next.focus();
        }
      };

      if (type === eventTypes.blur && getIsElementBlurred(e as FocusEvent<HTMLDivElement>)) {
        const { onBlur } = getData();
        if (onBlur) {
          onBlur();
          trigger({ id: eventIds.generic, type: eventTypes.blur });
        }
        markActiveDescendant(null);
      }
      if (type === eventTypes.focus && getIsElementFocused(e as FocusEvent<HTMLDivElement>)) {
        const { onFocus } = getData();
        if (onFocus) {
          onFocus();
        }
      }
      if (type === eventTypes.focus) {
        const { type: eventElementType, element } = getEventElementType(e);
        if (eventElementType === 'list') {
          moveFocusToFirstListItem();
        }
        if (eventElementType === 'listItem' || eventElementType === 'listGroupLabel') {
          markActiveDescendant(element);
        } else {
          markActiveDescendant(null);
        }
        if (eventElementType && elementsThatCloseMenuOnFocus.includes(eventElementType)) {
          trigger({ id: eventIds.generic, type: eventTypes.blur });
        }
      }
    },
    [getMetaData, updateMetaData],
  );

  const setFocus = (targetRef?: RefObject<HTMLElement>) => {
    if (targetRef && targetRef.current && targetRef.current.focus) {
      targetRef.current.focus();
    }
  };

  useEffect(() => {
    if (focusTarget) {
      if (focusTarget === 'tag') {
        const current = refs.tagList.current && (refs.tagList.current.querySelectorAll('* > div')[0] as HTMLElement);
        setFocus({ current });
      } else {
        setFocus(refs[focusTarget]);
      }
      updateMetaData({ focusTarget: undefined });
    }
    if (activeDescendant) {
      const activeElement = document.getElementById(activeDescendant);
      if (activeElement && activeElement !== document.activeElement) {
        activeElement.focus();
      }
    }
  });

  return {
    onFocus: (e: FocusEvent<HTMLDivElement>) => {
      eventTracker(eventTypes.focus, e);
    },
    onBlur: (e) => {
      eventTracker(eventTypes.blur, e);
    },
    tabIndex: -1,
    ref: refs.container,
  };
}
