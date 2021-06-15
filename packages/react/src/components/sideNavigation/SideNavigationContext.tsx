import React from 'react';

export type SideNavigationContextType = {
  /**
   * Don't autocollapse main levels when opening other main levels.
   * @default false
   */
  allowMultipleOpened?: boolean;
  /**
   * Sets whether the mobile menu is open.
   * @default false
   */
  mobileMenuOpen: boolean;
  /**
   * Open main levels for the SideNavigation component.
   */
  openMainLevels: number[];
  /**
   * Updates mobileMenuOpen flag for the SideNavigation component
   */
  setMobileMenuOpen: (isOpen: boolean) => void;
  /**
   * Updates open menu levels for the SideNavigation component
   */
  setOpenMainLevels: (mainLevelIndeces: number[]) => void;
};

const SideNavigationContext = React.createContext<SideNavigationContextType>({
  allowMultipleOpened: false,
  mobileMenuOpen: false,
  openMainLevels: [],
  setMobileMenuOpen: () => undefined,
  setOpenMainLevels: () => undefined,
});

export default SideNavigationContext;
