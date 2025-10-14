import { KeyboardEvent, useCallback } from 'react';

import { eventIds, eventTypes } from '../events';
import { useSearchDataHandlers } from './useSearchDataHandlers';

const isEscKey = (e: KeyboardEvent<HTMLElement>) => {
  return e.key === 'Escape';
};

export function useKeyboard() {
  const { getData, trigger } = useSearchDataHandlers();

  const onKeyDown = useCallback(
    (e: KeyboardEvent<HTMLDivElement>) => {
      const { open } = getData();

      if (isEscKey(e) && open) {
        e.preventDefault();
        trigger({ id: eventIds.generic, type: eventTypes.close });
      }
    },
    [getData, trigger],
  );

  return {
    onKeyDown,
  };
}
