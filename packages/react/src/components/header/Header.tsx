import React from 'react';

import classNames from '../../utils/classNames';
import { HeaderContextProvider } from './HeaderContext';
import { HeaderUniversalBar } from './components/headerUniversalBar';
import { HeaderActionBar } from './components/headerActionBar';
import { HeaderNavigationMenu } from './components/headerNavigationMenu';
import { NavigationLink } from './components/navigationLink';
import { LanguageProvider } from '../../context/languageContext';
// Styles
import 'hds-core';
import './Header.scss';
import styles from './Header.module.scss';
import { useMediaQueryGreaterThan } from '../../hooks/useMediaQuery';

export type HeaderProps = React.PropsWithChildren<{
  /**
   * Additional class names to apply to the header.
   */
  className?: string;
  /**
   * ID of the header element.
   */
  id?: string;
}>;

export const Header = ({ children, className, id }: HeaderProps) => {
  const navigationBarMenu = useMediaQueryGreaterThan('s');
  const headerClassNames = classNames('hds-header', styles.header, className, {
    'hds-header-navigation-bar-menu': navigationBarMenu,
  });

  return (
    <HeaderContextProvider>
      <LanguageProvider>
        <header id={id} className={headerClassNames}>
          <div className={styles.headerBackgroundWrapper}>{children}</div>
        </header>
      </LanguageProvider>
    </HeaderContextProvider>
  );
};

Header.UniversalBar = HeaderUniversalBar;
Header.ActionBar = HeaderActionBar;
Header.NavigationMenu = HeaderNavigationMenu;
Header.NavigationLink = NavigationLink;
