import { useEffect, useState } from 'react';

const MOBILE_BREAKPOINT = 768;
const checkIfMobile = (): boolean => (typeof window !== 'undefined' && window.innerWidth < MOBILE_BREAKPOINT) || false;

export const useMobile = (): boolean => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const updateState = () => setIsMobile(checkIfMobile());

    window.addEventListener('resize', updateState);
    updateState();

    return () => window.removeEventListener('resize', updateState);
  }, []);

  return isMobile;
};
