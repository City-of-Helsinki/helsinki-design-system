import { useRef, useCallback, useEffect, ReactNode } from 'react';

import useForceRender from '../../../hooks/useForceRender';

export function useRenderChildrenInChunks(children: ReactNode) {
  const render = useForceRender();
  const length = Array.isArray(children) ? children.length : 0;
  const renderChunkRef = useRef({ max: length, pos: 100, chunkSize: 100 });
  const currentChildren = length ? (children as ReactNode[]).slice(0, renderChunkRef.current.pos) : [children];

  const updateChunks = useCallback(() => {
    const { max, pos, chunkSize } = renderChunkRef.current;
    if (pos === max) {
      return;
    }
    renderChunkRef.current.pos = Math.min(pos + chunkSize, max);
    window.requestAnimationFrame(render);
  }, []);

  useEffect(() => {
    return () => {
      renderChunkRef.current.max = 0;
    };
  }, []);

  useEffect(() => {
    updateChunks();
  });

  return currentChildren;
}
