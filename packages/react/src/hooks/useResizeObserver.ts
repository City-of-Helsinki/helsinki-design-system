import { useEffect, useCallback, useRef, RefObject, useMemo } from 'react';
import { debounce } from 'lodash';

type RefListener = (element: HTMLElement | null) => RefObject<HTMLElement | null>;
type ResizeCallback = (entry: ResizeObserverEntry) => void;

/**
 * Connects a ResizeObserver to an RefObject an returns the ref with an observer disposer function.
 * The callback is debounced and removed on unmount.
 * The callback must be memoized or the observer is recreated on each render.
 * The observer is automatically re-created if the ref object's element changes.
 * @param callback Callback called when resizing occurs. Receives a ResizeObserverEntry as and argument.
 * @param delay Delay in milliseconds between debounced calls. Default 200ms. Setting delay to 0, will not remove debounce or delay.
 * @returns Tuple with [RefObject,function to dispose the observer manually]
 */
export const useResizeObserver = (callback: ResizeCallback, delay = 200): [RefListener, () => void] => {
  const observerObjectRef = useRef<ResizeObserver | null>(null);
  const observedElementRef = useRef<HTMLElement | null>(null);

  const debounced = useMemo(() => {
    return debounce((entries) => callback(entries[0]), delay);
  }, [callback, delay]);

  const removeContentObserver = useCallback(() => {
    if (observerObjectRef.current) {
      observerObjectRef.current.disconnect();
      observerObjectRef.current = null;
    }
    debounced.cancel();
  }, [observerObjectRef]);

  const addContentObserver = useCallback(
    (observedElement: HTMLElement) => {
      removeContentObserver();
      observerObjectRef.current = new ResizeObserver(debounced);
      observerObjectRef.current.observe(observedElement);
    },
    [removeContentObserver, observerObjectRef, debounced],
  );

  const refListener: RefListener = useCallback(
    (observedElement: HTMLElement | null) => {
      if (observedElementRef.current !== observedElement) {
        if (observedElement) {
          addContentObserver(observedElement);
        } else {
          removeContentObserver();
        }
        // eslint-disable-next-line no-param-reassign
        observedElementRef.current = observedElement;
      }
      return observedElementRef;
    },
    [removeContentObserver, observedElementRef, addContentObserver],
  );

  useEffect(() => {
    return () => {
      removeContentObserver();
    };
  }, [removeContentObserver]);

  return [refListener, removeContentObserver];
};
