import { useCallback, useEffect, DependencyList } from 'react';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type EffectFunction = (...args: any[]) => any;

/**
 * @internal
 */
export const useDebouncedEffect = (effect: EffectFunction, delay: number, deps: DependencyList) => {
  const callback = useCallback(effect, deps);
  useEffect(() => {
    const timeout = setTimeout(() => {
      callback();
    }, delay);
    return () => {
      clearTimeout(timeout);
    };
  }, [callback, delay]);
};
