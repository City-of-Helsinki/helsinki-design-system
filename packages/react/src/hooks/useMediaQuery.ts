import { useEffect, useRef, useState } from 'react';

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

export type Breakpoint = 'xs' | 's' | 'm' | 'l' | 'xl';
export const breakpoints = {
  up(breakpoint: Breakpoint): boolean {
    return isEqualOrGreaterThan(breakpointValues[breakpoint], getWindowInnerWidth());
  },
  down(breakpoint: Breakpoint): boolean {
    return isLesserThan(breakpointValues[breakpoint], getWindowInnerWidth());
  },
};

/**
 * Hook for checking if a certain viewport breakpoint has been met.
 *
 * For example, to check if screen width is equal to or greater than the breakpoint xl design token value, the code would be:
 * const isXlViewport = useMediaQuery(() => breakpoints.up('xl'));
 * @param breakpointCheck
 * @returns
 */
export const useMediaQuery = (breakpointCheck: () => boolean): boolean => {
  const [matches, _setIfMatches] = useState<boolean>(false);
  /* Use state ref to access current value inside event listener function. */
  const matchesRef = useRef(matches);

  const setIfMatches = (val: boolean) => {
    if (matchesRef.current !== val) {
      matchesRef.current = val;
      _setIfMatches(val);
    }
  };

  useEffect(() => {
    const updateState = () => {
      setIfMatches(breakpointCheck());
    };

    window.addEventListener('resize', updateState);
    updateState();
    return () => window.removeEventListener('resize', updateState);
  }, []);
  return matches;
};
