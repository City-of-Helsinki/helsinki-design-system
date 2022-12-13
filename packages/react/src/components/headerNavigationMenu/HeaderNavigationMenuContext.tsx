import { createContext } from 'react';

export type HeaderNavigationMenuContextProps = {
  /**
   * Which navigation item is open.
   */
  openMainNavIndex?: string;
  /**
   * Set index for which navigation item is open.
   */
  setOpenMainNavIndex?: (arg: string | null) => void;
};

export const HeaderNavigationMenuContext = createContext<HeaderNavigationMenuContextProps>({});
