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

import { DataHandlers } from '../../dataProvider/DataContext';
import { eventTypes } from '../events';
import { SelectData, SelectMetaData } from '../types';
import getIsElementFocused from '../../../utils/getIsElementFocused';
import getIsElementBlurred from '../../../utils/getIsElementBlurred';

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
  'onBlur' | 'onFocus' | 'onMouseUp' | 'onKeyUp' | 'tabIndex'
> & { ref: RefObject<HTMLDivElement> };

export function useFocusHandling(dataHandlers: DataHandlers): ReturnObject {
  const { getMetaData, updateMetaData, getData } = dataHandlers;
  const isElementHit = (target: RefObject<Element>, eventTarget?: Element) => {
    if (!target.current || !eventTarget) {
      return false;
    }

    return target.current === eventTarget || target.current.contains(eventTarget);
  };

  const { refs, elementIds, focusTarget } = getMetaData() as SelectMetaData;

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

  const eventTracker = useCallback(
    (
      type: keyof typeof eventTypes,
      e: FocusEvent<HTMLDivElement> | MouseEvent<HTMLDivElement> | KeyboardEvent<HTMLDivElement>,
    ) => {
      const element = e.target as Element;
      if (type === eventTypes.blur && getIsElementBlurred(e as FocusEvent<HTMLDivElement>)) {
        console.log('-----BLURRED');
        const { onBlur } = getData() as SelectData;
        if (onBlur) {
          onBlur();
        }
      }
      if (type === eventTypes.focus && getIsElementFocused(e as FocusEvent<HTMLDivElement>)) {
        console.log('-----FOCUSED');
        const { onFocus } = getData() as SelectData;
        if (onFocus) {
          onFocus();
        }
      }
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const hittedElement = getHittedElement(element);
      const hittedElementId = getClosestKnownElementById(element);

      if (type === eventTypes.mousedown && hittedElementId === elementIds.clearButton && refs.selectionButton.current) {
        refs.selectionButton.current.focus();
      }
      /*
      console.log('hittedElement', hittedElement, type, e.target, document.activeElement);
      const previousEventTarget = getMetaData().lastEventTarget;
      updateMetaData({ lastEventTarget: hittedElement });
      if (type === eventTypes.mousedown || type === eventTypes.keydown) {
        // should determine element
        if (hittedElement === 'list' && refs.selectionButton.current) {
          // refs.selectionButton.current.focus();
        }
        if (
          hittedElement === 'container' &&
          refs.selectionButton.current &&
          refs.selectionButton.current !== document.activeElement
        ) {
          console.log('SHIFT!');
          refs.selectionButton.current.focus();
        }
      } else if (type === eventTypes.blur) {
        const { lastEventTarget } = getMetaData() as SelectMetaData;
        if (!lastEventTarget) {
          //
        }
      }
      if (!previousEventTarget) {
        console.log('-----FOCUS');
      } */
    },
    [getMetaData, updateMetaData],
  );

  useEffect(() => {
    if (focusTarget) {
      if (focusTarget === 'button' && refs.selectionButton.current) {
        refs.selectionButton.current.focus();
      }
      if (focusTarget === 'list' && refs.list.current) {
        refs.list.current.focus();
      }
      if (focusTarget === 'searchOrFilterInput' && refs.filterOrSearchInput.current) {
        refs.filterOrSearchInput.current.focus();
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
      eventTracker(eventTypes.mousedown, e);
    },
    onKeyUp: (e: KeyboardEvent<HTMLDivElement>) => {
      const { key } = e;
      const triggerKeys = ['Enter', 'Tab', ' ', 'Escape'];
      if (!triggerKeys.includes(key)) {
        return;
      }
      // ignore if search / filter has focus....
      // e.target.nodeName === input + type text
      eventTracker(eventTypes.keydown, e);
    },
    tabIndex: -1,
    ref: refs.selectContainer,
  };
}
