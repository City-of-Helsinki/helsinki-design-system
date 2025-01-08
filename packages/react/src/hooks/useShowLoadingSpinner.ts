import { useEffect, useRef, useState } from 'react';

/**
 * @internal
 */
export const useShowLoadingSpinner = (isLoading: boolean, timeoutValue: number = 3000) => {
  const [showLoadingSpinner, setShowLoadingSpinner] = useState<boolean>(false);
  const loadingSpinnerTimeout = useRef(null);
  useEffect(() => {
    clearTimeout(loadingSpinnerTimeout.current);
    if (isLoading) {
      loadingSpinnerTimeout.current = setTimeout(() => {
        setShowLoadingSpinner(true);
      }, timeoutValue);
    } else {
      setShowLoadingSpinner(false);
    }
    return () => {
      clearTimeout(loadingSpinnerTimeout.current);
    };
  }, [isLoading, timeoutValue, setShowLoadingSpinner]);
  return showLoadingSpinner;
};
