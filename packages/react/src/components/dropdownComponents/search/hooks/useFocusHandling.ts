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
import getIsElementFocused from '../../../../utils/getIsElementFocused';
import getIsElementBlurred from '../../../../utils/getIsElementBlurred';
import { useSearchDataHandlers } from './useSearchDataHandlers';

type ReturnObject = Pick<
  DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, never>,
  'onBlur' | 'onFocus' | 'tabIndex'
> & { ref: RefObject<HTMLDivElement> };

export function useFocusHandling(): ReturnObject {
  const { getMetaData, updateMetaData, getData, trigger } = useSearchDataHandlers();

  const eventTracker = useCallback(
    (
      type: keyof typeof eventTypes,
      e: FocusEvent<HTMLDivElement> | MouseEvent<HTMLDivElement> | KeyboardEvent<HTMLDivElement>,
    ) => {
      const { onFocus, onBlur } = getData();

      if (type === eventTypes.blur && getIsElementBlurred(e as FocusEvent<HTMLDivElement>)) {
        if (onBlur) {
          onBlur();
          trigger({ id: eventIds.generic, type: eventTypes.blur });
        }
      }
      if (type === eventTypes.focus && getIsElementFocused(e as FocusEvent<HTMLDivElement>)) {
        if (onFocus) {
          onFocus();
        }
      }
    },
    [getMetaData, updateMetaData, getData, trigger],
  );

  const onRender = useCallback(() => {
    const { refs, focusTarget } = getMetaData();
    const setFocus = (targetRef?: RefObject<HTMLElement>) => {
      if (targetRef && targetRef.current && targetRef.current.focus) {
        targetRef.current.focus();
      }
    };
    if (focusTarget) {
      setFocus(refs[focusTarget]);
      updateMetaData({ focusTarget: undefined });
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
