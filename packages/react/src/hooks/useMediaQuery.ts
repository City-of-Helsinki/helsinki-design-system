import { useEffect, useRef, useState, MutableRefObject } from 'react';

const breakpointValues = {
  xs: 320,
  s: 576,
  m: 768,
  l: 992,
  xl: 1248,
};

const getWindowInnerWidth: () => undefined | number = () =>
  typeof window !== 'undefined' && window.innerWidth ? window.innerWidth : undefined;
const isEqualOrGreaterThan = (a: number, b: number | undefined) => (typeof b !== 'undefined' && b >= a) || false;
const isLesserThan = (a: number, b: number | undefined) => (typeof b !== 'undefined' && b < a) || false;

/**
 * Hook for checking if a certain viewport breakpoint has been met.
 *
 * @param {() => boolean} breakpointCheck
 * @returns
 */
const useMediaQuery = (breakpointCheck: () => boolean): boolean => {
  const [matches, setMatches] = useState<boolean>(false);
  /* Use state ref to access current value inside event listener function. */
  const matchesRef: MutableRefObject<boolean> = useRef<boolean>(matches);

  const refreshIfMatches = (val: boolean) => {
    if (matchesRef.current !== val) {
      matchesRef.current = val;
      setMatches(val);
    }
  };

  useEffect(() => {
    const updateState = () => {
      refreshIfMatches(breakpointCheck());
    };

    window.addEventListener('resize', updateState);
    updateState();
    return () => window.removeEventListener('resize', updateState);
  }, []);
  return matches;
};

export type Breakpoint = 'xs' | 's' | 'm' | 'l' | 'xl';

/**
 * Hook for listening to when the viewport is less than given breakpoint.
 * @param {Breakpoint} breakpoint
 * @returns
 */
export const useMediaQueryLessThan = (breakpoint: Breakpoint) =>
  useMediaQuery(() => isLesserThan(breakpointValues[breakpoint], getWindowInnerWidth()));

/**
 * Hook for listening to when the viewport is greater than or equal to given breakpoint.
 * @param {Breakpoint} breakpoint
 * @returns
 */
export const useMediaQueryGreaterThan = (breakpoint: Breakpoint) =>
  useMediaQuery(() => isEqualOrGreaterThan(breakpointValues[breakpoint], getWindowInnerWidth()));

export const getCurrentMediaBreakpoint = () => {
  let key;
  let val;
  const width = getWindowInnerWidth();
  const entries = Object.entries(breakpointValues);
  // eslint-disable-next-line no-cond-assign
  while (([key, val] = entries.pop())) {
    if (val < width) return key;
  }
  return null;
};
