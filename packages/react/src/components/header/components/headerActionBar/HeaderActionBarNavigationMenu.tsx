import React from 'react';

import { HeaderNavigationMenuContextProvider } from '../headerNavigationMenu/HeaderNavigationMenuContext';
import { useHeaderContext } from '../../HeaderContext';
import classNames from '../../../../utils/classNames';
import styles from './HeaderActionBarNavigationMenu.module.scss';
import { HeaderNavigationMenuContent } from '../headerNavigationMenu';

export const HeaderActionBarNavigationMenu = () => {
  const { hasNavigationContent, isNotLargeScreen, mobileMenuOpen } = useHeaderContext();
  const className = classNames(styles.headerNavigationMenu, mobileMenuOpen && styles.mobileMenuOpen);

  if (!hasNavigationContent || !isNotLargeScreen) return null;

  return (
    <nav className={className}>
      <ul className={styles.headerNavigationMenuList}>
        <HeaderNavigationMenuContextProvider>
          <HeaderNavigationMenuContent />
        </HeaderNavigationMenuContextProvider>
      </ul>
    </nav>
  );
};
