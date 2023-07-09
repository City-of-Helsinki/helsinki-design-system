import React from 'react';

import { KeyboardTrackerProps } from '../../hooks/keyboardNavigation/index';
import { useKeyboardNavigation } from '../../hooks/useKeyboardNavigation';

// import base styles
import '../../styles/base.css';

export type KeyboardNavigationProps = React.PropsWithChildren<KeyboardTrackerProps & { className?: string }>;

export const KeyboardNavigation = ({ children, className }: KeyboardNavigationProps) => {
  const { ref } = useKeyboardNavigation();
  return (
    <div className={className} ref={ref}>
      {children}
    </div>
  );
};
