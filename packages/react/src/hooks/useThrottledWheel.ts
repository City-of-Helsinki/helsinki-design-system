import React, { useEffect, useMemo, useRef } from 'react';
import { throttle } from 'lodash';
/*
  A Hook that will throttle the wheel event
  for 200ms or with chosen delay on given html input reference object.
*/
function useThrottledWheel(inputRef: React.MutableRefObject<HTMLInputElement>, delay = 200) {
  const throttledWheel = useRef(false);

  const throttledWheelToggler = useMemo(
    () =>
      throttle(() => {
        throttledWheel.current = false;
      }, delay),
    [delay],
  );

  useEffect(() => {
    const ignoreScroll = (e) => {
      if (throttledWheel.current) {
        e.preventDefault();
      }
      throttledWheel.current = true;
      throttledWheelToggler();
    };
    if (inputRef.current) {
      // passive: false is required so preventDefault can block extra steps in a burst.
      // Browser may suggest a passive listener when the main thread is busy. A passive listener cannot cancel the wheel event.
      inputRef.current.addEventListener('wheel', ignoreScroll, { passive: false });
    }
    return () => {
      if (inputRef.current) {
        inputRef.current.removeEventListener('wheel', ignoreScroll);
      }
    };
  }, [inputRef, throttledWheelToggler]);
}

export default useThrottledWheel;
