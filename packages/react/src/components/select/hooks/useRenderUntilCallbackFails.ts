import { useMemo, useCallback, useEffect } from 'react';

import useForceRender from '../../../hooks/useForceRender';

export function useRenderUntilCallbackFails<T = unknown>(callback: (prevState: T | null) => T | null) {
  const render = useForceRender();
  const stateStorage = useMemo(() => {
    return {
      value: callback(null),
    };
  }, [callback]);

  const run = useCallback(() => {
    const newValue = callback(stateStorage.value);
    if (!newValue) {
      return;
    }
    stateStorage.value = newValue;
    window.requestAnimationFrame(() => {
      if (!stateStorage) {
        return;
      }
      render();
    });
  }, [callback]);

  useEffect(() => {
    return () => {
      stateStorage.value = null;
    };
  }, []);

  useEffect(() => {
    run();
  });

  return stateStorage.value;
}
