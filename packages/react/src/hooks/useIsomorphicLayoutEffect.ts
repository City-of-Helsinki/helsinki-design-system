import { useLayoutEffect, useEffect } from 'react';

/**
 * If rendering on client side, use the useLayoutEffect hook. If SSR, use useEffect to avoid a big warning.
 * @internal
 */
export const useIsomorphicLayoutEffect = typeof window !== 'undefined' && window.document ? useLayoutEffect : useEffect;
