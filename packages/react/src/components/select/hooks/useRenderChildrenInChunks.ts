import { useMemo, useCallback, useEffect, ReactNode } from 'react';

import useForceRender from '../../../hooks/useForceRender';

export function useRenderChildrenInChunks(children: ReactNode) {
  const render = useForceRender();
  const length = Array.isArray(children) ? children.length : 0;
  const chunkLog = useMemo(() => ({ max: length, pos: 100, chunkSize: 100 }), [length]);
  const currentChildren = length ? (children as ReactNode[]).slice(0, chunkLog.pos) : [];

  const updateChunks = useCallback(() => {
    const { max, pos, chunkSize } = chunkLog;
    if (pos >= max) {
      return;
    }
    chunkLog.pos = Math.min(pos + chunkSize, max);
    window.requestAnimationFrame(render);
  }, [chunkLog]);

  useEffect(() => {
    return () => {
      chunkLog.max = 0;
    };
  }, []);

  useEffect(() => {
    updateChunks();
  });

  return currentChildren;
}
