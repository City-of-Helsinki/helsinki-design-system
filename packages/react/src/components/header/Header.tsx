import React, { PropsWithChildren } from 'react';

import { HeaderContextProvider } from './HeaderContext';
import { HeaderUniversalBar } from './components/headerUniversalBar';
import { HeaderActionBar } from './components/headerActionBar';
import { HeaderNavigationMenu } from './components/headerNavigationMenu';
import { NavigationLink } from './components/navigationLink';
import { WithDropdown } from './components/withDropdown';
import { NavigationLanguageSelector } from './components/navigationLanguageSelector';
import { NavigationSearch } from './components/navigationSearch';
import { LanguageProvider } from '../../context/languageContext';
import { useMediaQueryGreaterThan } from '../../hooks/useMediaQuery';
import classNames from '../../utils/classNames';

// Styles
import 'hds-core';
import './Header.scss';
import styles from './Header.module.scss';

export type HeaderProps = PropsWithChildren<{
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
Header.ActionButtonWithDropdown = WithDropdown;
Header.NavigationLanguageSelector = NavigationLanguageSelector;
Header.NavigationSearch = NavigationSearch;
