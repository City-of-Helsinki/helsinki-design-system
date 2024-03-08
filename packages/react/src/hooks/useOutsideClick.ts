import { useEffect, RefObject, useCallback } from 'react';
/*
  Simple hook that calls given callback when click event happens outside given element (in a ref)
*/
function useOutsideClick(props: { ref: RefObject<HTMLElement>; callback: () => void }) {
  const handleClickOutsideWrapper = useCallback(
    (event: MouseEvent) => {
      const { ref, callback } = props;
      if (ref && ref.current && !ref.current.contains(event.target as Node)) {
        callback();
      }
    },
    [props.callback, props.ref],
  );
  useEffect(() => {
    window.addEventListener('click', handleClickOutsideWrapper);
    return () => {
      window.removeEventListener('click', handleClickOutsideWrapper);
    };
  }, [handleClickOutsideWrapper]);
}
export default useOutsideClick;
