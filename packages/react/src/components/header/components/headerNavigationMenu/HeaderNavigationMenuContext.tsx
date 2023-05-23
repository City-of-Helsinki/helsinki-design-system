import { createContext } from 'react';

export type HeaderNavigationMenuContextProps = {
  /**
   * Which navigation item is open.
   */
  openMainNavIndex?: number;
  /**
   * Set index for which navigation item is open.
   */
  setOpenMainNavIndex?: (arg: number) => void;
};

export const HeaderNavigationMenuContext = createContext<HeaderNavigationMenuContextProps>({});
