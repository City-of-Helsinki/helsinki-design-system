import { useEffect, RefObject } from 'react';
/*
  Simple hook that calls given callback when click event happens outside given element (in a ref)
*/
function useOutsideClick(props: { ref: RefObject<HTMLElement>; callback: () => void }) {
  useEffect(() => {
    const handleClickOutsideWrapper = (event: MouseEvent) => {
      const { ref, callback } = props;
      if (ref && ref.current && !ref.current.contains(event.target as Node)) {
        callback();
      }
    };
    window.addEventListener('click', handleClickOutsideWrapper);
    return () => {
      window.removeEventListener('click', handleClickOutsideWrapper);
    };
  }, [props.callback]);
}
export default useOutsideClick;
