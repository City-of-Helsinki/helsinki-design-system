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

import { eventTypes } from '../events';
import { SelectDataHandlers } from '../types';
import getIsElementFocused from '../../../utils/getIsElementFocused';
import getIsElementBlurred from '../../../utils/getIsElementBlurred';
import { isListItemType, isTagType, useElementDetection } from './useElementDetection';
import { useSelectDataHandlers } from './useSelectDataHandlers';

/**
 * Essential user actions:
 * - any press in selectedOptions
 * - any press in list
 * - any press outside when list is open
 *
 * Ignoreable user actions:
 * - any tag list action
 *
 *
 * Focus shifting:
 * - when list is closed -> focus main button
 * - when clear button is clicked -> focus main button
 * - when main button / open button is clicked -> focus main button or list ?
 *
 * Focus reporting
 * - onFocus has not been reported, since last onBlur
 *
 * Blur reporting
 * - When outside main button and list
 */

type ReturnObject = Pick<
  DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, never>,
  'onBlur' | 'onFocus' | 'onMouseUp' | 'tabIndex'
> & { ref: RefObject<HTMLDivElement> };

export function useFocusHandling(): ReturnObject {
  const { getMetaData, updateMetaData, getData } = useSelectDataHandlers();
  const { refs, focusTarget } = getMetaData();
  const { getEventElementType, getListItemSiblings, getTagSiblings } = useElementDetection();
  /* const isElementHit = (target: RefObject<Element>, eventTarget?: Element) => {
    if (!target.current || !eventTarget) {
      return false;
    }

    return target.current === eventTarget || target.current.contains(eventTarget);
  };

  

  const elementIdEntries = Object.entries(elementIds);
  const getElementId = (element: Element): string | null => {
    return element.getAttribute('id');
  };
  
  const getKnownElementId = (element: Element): string | null => {
    const id = getElementId(element);

    if (!id) {
      return null;
    }
    const index = elementIdEntries.findIndex(([, v]) => {
      return v === id;
    });
    return index > -1 ? elementIdEntries[index][1] : null;
  };
  
  const getHittedElement = (eventSource: Element): SelectMetaData['focusTarget'] => {
    if (refs.listContainer && isElementHit(refs.listContainer, eventSource)) {
      return 'list';
    }
    if (refs.selectionButton && isElementHit(refs.selectionButton, eventSource)) {
      return 'button';
    }
    if (refs.selectContainer && isElementHit(refs.selectContainer, eventSource)) {
      return 'container';
    }
    return undefined;
  };

  const getClosestKnownElementById = (eventSource: Element): string | null => {
    let element: Element | null = eventSource;
    while (element) {
      const knownId = getKnownElementId(element);
      if (knownId) {
        element = null;
        return knownId;
      }
      element = element.parentElement;
    }
    return null;
  };
  */
  // what key presses should do.
  // https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Roles/listbox_role
  const eventTracker = useCallback(
    (
      type: keyof typeof eventTypes,
      e: FocusEvent<HTMLDivElement> | MouseEvent<HTMLDivElement> | KeyboardEvent<HTMLDivElement>,
    ) => {
      // const element = e.target as Element;
      if (type === eventTypes.blur && getIsElementBlurred(e as FocusEvent<HTMLDivElement>)) {
        // console.log('-----BLURRED');
        const { onBlur } = getData();
        if (onBlur) {
          onBlur();
        }
      }
      if (type === eventTypes.focus && getIsElementFocused(e as FocusEvent<HTMLDivElement>)) {
        // console.log('-----FOCUSED');
        const { onFocus } = getData();
        if (onFocus) {
          onFocus();
        }
      }
      /*
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const hittedElement = getHittedElement(element);
      const hittedElementId = getClosestKnownElementById(element);

      if (type === eventTypes.mousedown && hittedElementId === elementIds.clearButton && refs.selectionButton.current) {
        refs.selectionButton.current.focus();
      } */
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
      switch (focusTarget) {
        case 'button':
          setFocus(refs.selectionButton);
          break;
        case 'list':
          setFocus(refs.list);
          break;
        case 'searchOrFilterInput':
          setFocus(refs.searchOrFilterInput);
          break;
        default:
          break;
      }
      updateMetaData({ focusTarget: undefined });
    }
  });

  return {
    onFocus: (e: FocusEvent<HTMLDivElement>) => {
      eventTracker(eventTypes.focus, e);
    },
    onBlur: (e) => {
      eventTracker(eventTypes.blur, e);
    },

    onMouseUp: (e: MouseEvent<HTMLDivElement>) => {
      const { type, element } = getEventElementType(e);
      if (type && element && isListItemType(type)) {
        console.log('list sibs', getListItemSiblings(element));
      }
      if (type && element && isTagType(type)) {
        console.log('tag sibs', getTagSiblings(element));
      }
      console.log('type', type);
    },
    tabIndex: -1,
    ref: refs.selectContainer,
  };
}
