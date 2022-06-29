import { useEffect } from 'react';

export function useEscKey(callBack: (e?: KeyboardEvent) => void): void {
  useEffect(() => {
    const handleEscKey = (event: KeyboardEvent) => {
      const key = event.key || event.keyCode;
      if (key === 'Escape' || key === 'Esc' || key === 27) {
        callBack(event);
      }
    };
    document.addEventListener('keyup', handleEscKey);
    return () => {
      document.removeEventListener('keyup', handleEscKey);
    };
  });
}
