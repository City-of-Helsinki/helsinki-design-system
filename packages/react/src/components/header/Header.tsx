import React, { ComponentType, PropsWithChildren } from 'react';

import { HeaderContextProvider, useHeaderContext } from './HeaderContext';
import { HeaderUniversalBar } from './components/headerUniversalBar';
import { HeaderActionBar } from './components/headerActionBar';
import { HeaderNavigationMenu } from './components/headerNavigationMenu';
import { NavigationLink } from './components/navigationLink';
import { HeaderActionBarItemWithDropdown } from './components/headerActionBarItem';
import { NavigationLanguageSelector } from './components/navigationLanguageSelector';
import { NavigationSearch } from './components/navigationSearch';
import { LanguageProvider } from '../../context/languageContext';
import classNames from '../../utils/classNames';
// Styles
import 'hds-core';
import './Header.scss';
import styles from './Header.module.scss';

type HeaderAttributes = JSX.IntrinsicElements['header'];

interface HeaderNodeProps extends HeaderAttributes {
  onDidChangeLanguage?: (string) => void;
}

export type HeaderProps = PropsWithChildren<
  HeaderNodeProps & {
    /**
     * Additional class names to apply to the header.
     */
    className?: string;
    /**
     * ID of the header element.
     */
    id?: string;
  }
>;

const HeaderNode: ComponentType<HeaderNodeProps> = ({ children, className, ...props }) => {
  const { isSmallScreen } = useHeaderContext();
  const headerClassNames = classNames('hds-header', styles.header, className, {
    'hds-header-navigation-bar-menu': !isSmallScreen,
  });
  return (
    <header className={headerClassNames} {...props}>
      <div className={styles.headerBackgroundWrapper}>{children}</div>
    </header>
  );
};

export const Header = ({ onDidChangeLanguage, ...props }: HeaderProps) => {
  return (
    <HeaderContextProvider>
      <LanguageProvider onDidChangeLanguage={onDidChangeLanguage}>
        <HeaderNode {...props} />
      </LanguageProvider>
    </HeaderContextProvider>
  );
};

Header.UniversalBar = HeaderUniversalBar;
Header.ActionBar = HeaderActionBar;
Header.ActionBarItem = HeaderActionBarItemWithDropdown;
Header.NavigationMenu = HeaderNavigationMenu;
Header.NavigationLink = NavigationLink;
Header.NavigationLanguageSelector = NavigationLanguageSelector;
Header.NavigationSearch = NavigationSearch;
