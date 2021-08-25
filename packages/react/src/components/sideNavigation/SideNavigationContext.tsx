import React from 'react';

export type SideNavigationContextType = {
  /**
   * Sets whether the mobile menu is open.
   * @default false
   */
  mobileMenuOpen: boolean;
  /**
   * Initially open main levels for the SideNavigation component
   */
  defaultOpenMainLevels: number[];
  /**
   * Index of main level with active sublevel.
   */
  activeParentLevel: number;
  /**
   * Updates mobileMenuOpen flag for the SideNavigation component
   */
  setMobileMenuOpen: (isOpen: boolean) => void;
  /**
   * Updates main level index with active sublevel
   */
  setActiveParentLevel: (mainLevelIndex?: number) => void;
};

const SideNavigationContext = React.createContext<SideNavigationContextType>({
  mobileMenuOpen: false,
  defaultOpenMainLevels: undefined,
  activeParentLevel: undefined,
  setMobileMenuOpen: () => undefined,
  setActiveParentLevel: () => undefined,
});

export default SideNavigationContext;
