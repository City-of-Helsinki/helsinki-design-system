import { createContext } from 'react';

export type HeaderContextProps = {
  /**
   * Flag for whether the mobile view is active
   */
  isMobile?: boolean;
};

export const HeaderContext = createContext<HeaderContextProps>({});
