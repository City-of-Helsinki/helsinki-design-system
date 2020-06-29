import { useEffect, useState } from 'react';

const MOBILE_BREAKPOINT = 768;
const checkIfMobile = (): boolean => window.innerWidth < MOBILE_BREAKPOINT;

const asd = () => console.log('activeElement', document.activeElement);

export default (): boolean => {
  const [isMobile, setIsMobile] = useState<boolean>(checkIfMobile());

  useEffect(() => {
    const updateState = () => setIsMobile(checkIfMobile());

    window.addEventListener('keydown', asd);
    window.addEventListener('resize', updateState);
    return () => {
      window.removeEventListener('resize', updateState);
      window.removeEventListener('keyup', asd);
    };
  }, []);

  return isMobile;
};
