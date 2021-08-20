import React from 'react';

export type SideNavigationContextType = {
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
  mobileMenuOpen: false,
  openMainLevels: [],
  setMobileMenuOpen: () => undefined,
  setOpenMainLevels: () => undefined,
});

export default SideNavigationContext;
