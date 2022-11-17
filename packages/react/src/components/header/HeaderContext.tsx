import { createContext } from 'react';

export type HeaderContextProps = {
  /**
   * Flag for whether the viewport is under breakpoint value small.
   */
  isSmallScreen?: boolean;
};

export const HeaderContext = createContext<HeaderContextProps>({});
