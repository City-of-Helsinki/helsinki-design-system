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
import getFocusedElementFromBlurEvent from '../../../utils/getFocusedElementFromBlurEvent';

type ReturnObject = Pick<
  DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, never>,
  'onBlur' | 'onFocus' | 'tabIndex'
> & { ref: RefObject<HTMLDivElement> };

export function useFocusHandling(): ReturnObject {
  const { getMetaData, updateMetaData, getData, trigger } = useSelectDataHandlers();
  const { getEventElementType, getListItemSiblings, getElementUsingActiveDescendant, getElementId } =
    useElementDetection();

  const elementsThatCloseMenuOnFocus: KnownElementType[] = ['tag', 'tagList', 'clearAllButton', 'showAllButton'];
  const eventTracker = useCallback(
    (
      type: keyof typeof eventTypes,
      e: FocusEvent<HTMLDivElement> | MouseEvent<HTMLDivElement> | KeyboardEvent<HTMLDivElement>,
    ) => {
      const { refs } = getMetaData();
      const { onFocus, onBlur, open } = getData();
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
        if (eventElementType && elementsThatCloseMenuOnFocus.includes(eventElementType)) {
          trigger({ id: eventIds.generic, type: eventTypes.blur });
        }
      } else if (type === eventTypes.blur) {
        if (open) {
          const { selectionsAndListContainer } = refs;
          const focusedElement = getFocusedElementFromBlurEvent(e as FocusEvent<HTMLDivElement>);
          const focusIsInSelectionsAndListContainer =
            !!selectionsAndListContainer.current && selectionsAndListContainer.current.contains(focusedElement);
          if (!focusedElement || !focusIsInSelectionsAndListContainer) {
            trigger({ id: eventIds.generic, type: eventTypes.focusMovedToNonListElement });
          }
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
