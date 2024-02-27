import { useEffect, RefObject, useCallback, useRef } from 'react';
/*
  Simple hook that calls given callback when click event happens outside given element (in a ref)
*/
function useOutsideClick({
  ref,
  callback,
  usePointerDownEvent,
}: {
  ref: RefObject<HTMLElement>;
  callback: (isRelease: boolean) => boolean;
  usePointerDownEvent?: boolean;
}) {
  const wasPointerDownRelevant = useRef(false);
  const memoizedCallback = useCallback(
    (event: MouseEvent) => {
      const wasHit = !!(ref.current && ref.current.contains(event.target as Node));
      const isUpEvent = event.type !== 'pointerdown';
      if (usePointerDownEvent && !isUpEvent) {
        wasPointerDownRelevant.current = callback(isUpEvent);
        return;
      }
      if (usePointerDownEvent && isUpEvent && !wasPointerDownRelevant.current) {
        return;
      }
      if (isUpEvent && !wasHit) {
        wasPointerDownRelevant.current = false;
        callback(isUpEvent);
      }
    },
    [ref.current, callback],
  );
  useEffect(() => {
    if (usePointerDownEvent) {
      window.addEventListener('pointerdown', memoizedCallback);
      window.addEventListener('pointerup', memoizedCallback);
    } else {
      window.addEventListener('click', memoizedCallback);
    }
    return () => {
      window.removeEventListener('click', memoizedCallback);
      window.removeEventListener('pointerdown', memoizedCallback);
      window.removeEventListener('pointerup', memoizedCallback);
    };
  }, [memoizedCallback]);
}
export default useOutsideClick;
