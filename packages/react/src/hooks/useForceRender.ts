import { useState, useCallback } from 'react';
/*
  Simple hook that re-renders component via useState
*/
function useForceRender() {
  const [, forceUpdate] = useState<number>(0);
  const reRender = useCallback(() => {
    forceUpdate((p) => p + 1);
  }, [forceUpdate]);

  return reRender;
}
export default useForceRender;
