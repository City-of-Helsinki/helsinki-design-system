import { useEffect, useState } from 'react';

const MOBILE_BREAKPOINT = 768;
const checkIfMobile = (): boolean => window.innerWidth < MOBILE_BREAKPOINT;

export default (): boolean => {
  const [isMobile, setIsMobile] = useState(checkIfMobile());

  useEffect(() => {
    const updateState = () => setIsMobile(checkIfMobile());

    window.addEventListener('resize', updateState);

    return () => window.removeEventListener('resize', updateState);
  }, []);

  return isMobile;
};
