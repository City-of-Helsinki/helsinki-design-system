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

/**
 * Hook for checking if a certain viewport breakpoint has been met.
 *
 * @param {() => boolean} breakpointCheck
 * @returns
 */
const useMediaQuery = (breakpointCheck: () => boolean): boolean => {
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
