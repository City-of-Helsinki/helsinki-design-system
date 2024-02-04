import { RefObject, useCallback, useEffect, useRef } from 'react';

import useOutsideClick from '../../../hooks/useOutsideClick';
import { Controller } from '../../group/utils';
import { getSelectDataFromController } from '../utils';

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
    controller.triggerChange({ id: 'events', type: 'outside-click' });
  }, []);

  useEffect(() => {
    openStateRef.current = !!getSelectDataFromController(controller).open;
  });
  useOutsideClick({ ref: listElementRef, callback });
  return null;
}
