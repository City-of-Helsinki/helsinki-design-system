import React, { useEffect } from 'react';
import { throttle } from 'lodash';
/*
  A Hook that will throttle the wheel event
  for 200ms or with chosen delay on given html input reference object.
*/
function useThrottledWheel(inputRef: React.MutableRefObject<HTMLInputElement>, delay = 200) {
  let throttledWheel = false;

  const throttledWheelToggler = throttle(() => {
    throttledWheel = false;
  }, delay);

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
