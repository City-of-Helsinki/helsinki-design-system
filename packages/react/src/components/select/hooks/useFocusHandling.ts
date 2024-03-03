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
import { useElementDetection } from './useElementDetection';

type ReturnObject = Pick<
  DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, never>,
  'onBlur' | 'onFocus' | 'onMouseUp' | 'tabIndex'
> & { ref: RefObject<HTMLDivElement> };

export function useFocusHandling(): ReturnObject {
  const { getMetaData, updateMetaData, getData } = useSelectDataHandlers();
  const { getEventElementType, getListItemSiblings } = useElementDetection();
  const { refs, focusTarget } = getMetaData();
  const eventTracker = useCallback(
    (
      type: keyof typeof eventTypes,
      e: FocusEvent<HTMLDivElement> | MouseEvent<HTMLDivElement> | KeyboardEvent<HTMLDivElement>,
    ) => {
      if (type === eventTypes.blur && getIsElementBlurred(e as FocusEvent<HTMLDivElement>)) {
        const { onBlur } = getData();
        if (onBlur) {
          onBlur();
        }
      }
      if (type === eventTypes.focus && getIsElementFocused(e as FocusEvent<HTMLDivElement>)) {
        const { onFocus } = getData();
        if (onFocus) {
          onFocus();
        }
      }
      if (type === eventTypes.focus) {
        const { type: eventElementType } = getEventElementType(e);
        const moveFocusToFirstListItem = () => {
          const closestListItems = getListItemSiblings(undefined, false);
          if (closestListItems.next) {
            closestListItems.next.focus();
          }
        };
        if (eventElementType === 'list') {
          moveFocusToFirstListItem();
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
