import { RefObject, useCallback, useEffect, useLayoutEffect, useRef } from 'react';

import { eventTypes } from '..';
import useOutsideClick from '../../../hooks/useOutsideClick';
import { Controller } from '../../group/utils';
import { getMetaDataFromController, getSelectDataFromController } from '../utils';
import { updateShowAllButtonCount } from './TagList';

export function TrackEvents({
  controller,
  listElementRef,
}: {
  controller: Controller;
  listElementRef: RefObject<HTMLElement>;
}) {
  // open state is tracked on each render, because controller data is updated in sync
  // and therefore the menu would/could close again immediately because button click will set the state open
  const openStateRef = useRef<boolean>(!!getSelectDataFromController(controller).open);
  const callback = useCallback(() => {
    if (!openStateRef.current) {
      return;
    }
    controller.triggerChange({ id: 'tracker', type: eventTypes.outSideclick });
  }, []);

  useEffect(() => {
    openStateRef.current = !!getSelectDataFromController(controller).open;
  });
  useLayoutEffect(() => {
    updateShowAllButtonCount(getMetaDataFromController(controller));
  });
  useOutsideClick({ ref: listElementRef, callback });
  return null;
}
