import React, { useEffect } from 'react';
import throttle from 'lodash.throttle';
/*
  A Hook that will throttle the wheel event
  for 200ms on given html input reference object.
*/
function useThrottledWheel(inputRef: React.MutableRefObject<HTMLInputElement>) {
  let throttledWheel = false;

  const throttledWheelToggler = throttle(() => {
    throttledWheel = false;
  }, 200);

  useEffect(() => {
    const ignoreScroll = (e) => {
      if (throttledWheel) {
        e.preventDefault();
      }
      throttledWheel = true;
      throttledWheelToggler();
    };
    if (inputRef.current) {
      inputRef.current.addEventListener('wheel', ignoreScroll, { passive: false });
    }
    return () => {
      if (inputRef.current) {
        inputRef.current.removeEventListener('wheel', ignoreScroll);
      }
    };
  }, [inputRef]);
}

export default useThrottledWheel;
