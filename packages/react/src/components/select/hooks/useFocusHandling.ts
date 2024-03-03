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
import getIsElementFocused from '../../../utils/getIsElementFocused';
import getIsElementBlurred from '../../../utils/getIsElementBlurred';
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
    tabIndex: -1,
    ref: refs.selectContainer,
  };
}
