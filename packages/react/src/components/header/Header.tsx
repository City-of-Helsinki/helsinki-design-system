import React, { ComponentType, FC } from 'react';

import '../../styles/base.module.css';
import styles from './Header.module.scss';
import { HeaderActionBar, TitleStyleType } from './components/headerActionBar';
import { HeaderActionBarItem } from './components/headerActionBarItem';
import { HeaderActionBarButton } from './components/headerActionBar/HeaderActionBarButton';
import { HeaderActionBarSubItem } from './components/headerActionBarSubItem';
import { HeaderActionBarSubItemGroup } from './components/headerActionBarItem/HeaderActionBarSubItemGroup';
import { HeaderContextProvider, useHeaderContext } from './HeaderContext';
import { HeaderError } from './components/headerError/HeaderError';
import { HeaderLanguageSelector, LanguageButton, SimpleLanguageOptions } from './components/headerLanguageSelector';
import { HeaderLink } from './components/headerLink';
import { HeaderLoginButton } from './components/headerUserItems/HeaderLoginButton';
import { HeaderLogoutSubmenuButton } from './components/headerUserItems/HeaderLogoutSubmenuButton';
import { HeaderNavigationMenu } from './components/headerNavigationMenu';
import { HeaderSearch } from './components/headerSearch';
import { HeaderTheme } from './Header.type';
import { HeaderUniversalBar } from './components/headerUniversalBar';
import { HeaderUserMenuButton } from './components/headerUserItems/HeaderUserMenuButton';
import { LanguageProvider, LanguageProviderProps } from './LanguageContext';
import { SkipLink } from '../../internal/skipLink';
import { styleBoundClassNames } from '../../utils/classNames';
import { useTheme } from '../../hooks/useTheme';
import { AllElementPropsWithRef } from '../../utils/elementTypings';

const classNames = styleBoundClassNames(styles);

type HeaderAttributes = AllElementPropsWithRef<'header'>;

export interface HeaderNodeProps extends HeaderAttributes {
  /**
   * Additional class names to apply to the header.
   */
  className?: string;
  /**
   * ID of the header element.
   */
  id?: string;
  /**
   * theme of the header element.
   */
  theme?: HeaderTheme;
}

export interface HeaderProps extends HeaderNodeProps, LanguageProviderProps {}

const HeaderNode: ComponentType<HeaderNodeProps> = ({ children, className, ...props }) => {
  const { isSmallScreen } = useHeaderContext();
  const { theme } = props;

  const customThemeClass = useTheme<HeaderTheme>(styles.header, theme);
  const headerClassNames = classNames(
    'hds-header',
    styles.header,
    theme && styles[`theme-${theme}`],
    className,
    customThemeClass,
    {
      isSmallScreen,
    },
  );
  return (
    <header className={headerClassNames} {...props}>
      <div className={styles.headerBackgroundWrapper}>{children}</div>
      <HeaderError />
    </header>
  );
};

interface HeaderInterface extends FC<HeaderProps> {
  UniversalBar: typeof HeaderUniversalBar;
  ActionBar: typeof HeaderActionBar;
  TitleStyleType: typeof TitleStyleType;
  NavigationMenu: typeof HeaderNavigationMenu;
  ActionBarItem: typeof HeaderActionBarItem;
  ActionBarSubItem: typeof HeaderActionBarSubItem;
  ActionBarSubItemGroup: typeof HeaderActionBarSubItemGroup;
  ActionBarButton: typeof HeaderActionBarButton;
  Link: typeof HeaderLink;
  LanguageSelector: typeof HeaderLanguageSelector;
  Search: typeof HeaderSearch;
  SkipLink: typeof SkipLink;
  LanguageButton: typeof LanguageButton;
  SimpleLanguageOptions: typeof SimpleLanguageOptions;
  LoginButton: typeof HeaderLoginButton;
  LogoutSubmenuButton: typeof HeaderLogoutSubmenuButton;
  UserMenuButton: typeof HeaderUserMenuButton;
}

export const Header: HeaderInterface = ({ onDidChangeLanguage, defaultLanguage, languages, ...props }: HeaderProps) => {
  return (
    <HeaderContextProvider>
      <LanguageProvider
        onDidChangeLanguage={onDidChangeLanguage}
        defaultLanguage={defaultLanguage}
        languages={languages}
      >
        <HeaderNode {...props} />
      </LanguageProvider>
    </HeaderContextProvider>
  );
};

Header.UniversalBar = HeaderUniversalBar;
Header.ActionBar = HeaderActionBar;
Header.TitleStyleType = TitleStyleType;
Header.NavigationMenu = HeaderNavigationMenu;

Header.ActionBarItem = HeaderActionBarItem;
Header.ActionBarSubItem = HeaderActionBarSubItem;
Header.ActionBarSubItemGroup = HeaderActionBarSubItemGroup;
Header.Link = HeaderLink;
Header.ActionBarButton = HeaderActionBarButton;

Header.LanguageSelector = HeaderLanguageSelector;
Header.Search = HeaderSearch;
Header.SkipLink = SkipLink;
Header.LanguageButton = LanguageButton;
Header.SimpleLanguageOptions = SimpleLanguageOptions;

Header.LoginButton = HeaderLoginButton;
Header.LogoutSubmenuButton = HeaderLogoutSubmenuButton;
Header.UserMenuButton = HeaderUserMenuButton;
