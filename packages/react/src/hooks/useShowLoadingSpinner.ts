import { useEffect, useRef, useState } from 'react';

export const LOADING_SPINNER_TIMEOUT = 3000;

export const useShowLoadingSpinner = (isLoading: boolean, timeoutValue = LOADING_SPINNER_TIMEOUT) => {
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
