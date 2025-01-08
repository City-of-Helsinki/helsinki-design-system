import { useState, useCallback } from 'react';
/**
 * @internal
 * Simple hook that re-renders component via useState
 */
export default function useForceRender() {
  const [, forceUpdate] = useState<number>(0);
  const reRender = useCallback(() => {
    forceUpdate((p) => p + 1);
  }, [forceUpdate]);

  return reRender;
}
