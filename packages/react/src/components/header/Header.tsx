import React, { ComponentType, FC } from 'react';

import { styleBoundClassNames } from '../../utils/classNames';
import { HeaderContextProvider, useHeaderContext } from './HeaderContext';
import { HeaderUniversalBar } from './components/headerUniversalBar';
import { HeaderActionBar } from './components/headerActionBar';
import { HeaderNavigationMenu } from './components/headerNavigationMenu';
import { NavigationLink } from './components/navigationLink';
import { HeaderActionBarItemWithDropdown } from './components/headerActionBarItem';
import { NavigationLanguageSelector } from './components/navigationLanguageSelector';
import { NavigationSearch } from './components/navigationSearch';
import { LanguageProvider, LanguageProviderProps } from '../../context/languageContext';
// Styles
import 'hds-core';
import styles from './Header.module.scss';

const classNames = styleBoundClassNames(styles);

type HeaderAttributes = JSX.IntrinsicElements['header'];

export interface HeaderNodeProps extends HeaderAttributes {
  /**
   * Additional class names to apply to the header.
   */
  className?: string;
  /**
   * ID of the header element.
   */
  id?: string;
}

export interface HeaderProps extends HeaderNodeProps {
  onDidChangeLanguage?: (string) => void;
}

const HeaderNode: ComponentType<HeaderNodeProps> = ({ children, className, ...props }) => {
  const { isNotLargeScreen } = useHeaderContext();
  const headerClassNames = classNames('hds-header', styles.header, className, { isNotLargeScreen });
  return (
    <header className={headerClassNames} {...props}>
      <div className={styles.headerBackgroundWrapper}>{children}</div>
    </header>
  );
};

interface HeaderInterface extends FC<HeaderProps> {
  UniversalBar: typeof HeaderUniversalBar;
  ActionBar: typeof HeaderActionBar;
  NavigationMenu: typeof HeaderNavigationMenu;
  ActionBarItem: typeof HeaderActionBarItemWithDropdown;
  NavigationLink: typeof NavigationLink;
  NavigationLanguageSelector: typeof NavigationLanguageSelector;
  NavigationSearch: typeof NavigationSearch;
}

export const Header: HeaderInterface = ({
  onDidChangeLanguage,
  defaultLanguage,
  ...props
}: HeaderProps & LanguageProviderProps) => {
  return (
    <HeaderContextProvider>
      <LanguageProvider onDidChangeLanguage={onDidChangeLanguage} defaultLanguage={defaultLanguage}>
        <HeaderNode {...props} />
      </LanguageProvider>
    </HeaderContextProvider>
  );
};

Header.UniversalBar = HeaderUniversalBar;
Header.ActionBar = HeaderActionBar;
Header.NavigationMenu = HeaderNavigationMenu;

Header.ActionBarItem = HeaderActionBarItemWithDropdown;
Header.NavigationLink = NavigationLink;

Header.NavigationLanguageSelector = NavigationLanguageSelector;
Header.NavigationSearch = NavigationSearch;
