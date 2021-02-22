import { useEffect, useState } from 'react';

import { breakpoints } from '../internal/ssr/Media';

const checkIfMobile = (): boolean => (typeof window !== 'undefined' && window.innerWidth < breakpoints.m) || false;

export const useMobile = (): boolean => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const updateState = () => setIsMobile(checkIfMobile());

    window.addEventListener('resize', updateState);

    return () => window.removeEventListener('resize', updateState);
  }, []);

  return isMobile;
};
