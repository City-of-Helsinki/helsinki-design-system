import { createContext } from 'react';

export type HeaderContextProps = {
  /**
   * Flag for whether the viewport is under breakpoint value medium.
   */
  isSmallScreen?: boolean;
  /**
   * Flag for whether the viewport is under breakpoint value large.
   */
  isMediumScreen?: boolean;
};

export const HeaderContext = createContext<HeaderContextProps>({});
