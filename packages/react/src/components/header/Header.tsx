import React, { ComponentType, FC } from 'react';

import '../../styles/base.module.css';
import styles from './Header.module.scss';
import { styleBoundClassNames } from '../../utils/classNames';
import { HeaderContextProvider, useHeaderContext } from './HeaderContext';
import { HeaderUniversalBar } from './components/headerUniversalBar';
import { HeaderActionBar, TitleStyleType } from './components/headerActionBar';
import { HeaderNavigationMenu } from './components/headerNavigationMenu';
import { HeaderLink } from './components/headerLink';
import { HeaderActionBarItemWithDropdown } from './components/headerActionBarItem';
import { HeaderLanguageSelector, LanguageButton, SimpleLanguageOptions } from './components/headerLanguageSelector';
import { HeaderSearch } from './components/headerSearch';
import { SkipLink } from '../../internal/skipLink';
import { LanguageProvider, LanguageProviderProps } from './LanguageContext';
import { HeaderTheme } from './Header.type';
import { useTheme } from '../../hooks/useTheme';

const classNames = styleBoundClassNames(styles);

type HeaderAttributes = JSX.IntrinsicElements['header'];

export interface HeaderNodeProps extends HeaderAttributes {
  /**
   * Aria-label for describing Header.
   */
  ariaLabel?: string;
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

const HeaderNode: ComponentType<HeaderNodeProps> = ({ ariaLabel, children, className, ...props }) => {
  const { isNotLargeScreen } = useHeaderContext();
  const { theme } = props;

  const customThemeClass = useTheme<HeaderTheme>(styles.header, theme);
  const headerClassNames = classNames(
    'hds-header',
    styles.header,
    theme && styles[`theme-${theme}`],
    className,
    customThemeClass,
    {
      isNotLargeScreen,
    },
  );
  return (
    <header className={headerClassNames} {...props} aria-label={ariaLabel}>
      <div className={styles.headerBackgroundWrapper}>{children}</div>
    </header>
  );
};

interface HeaderInterface extends FC<HeaderProps> {
  UniversalBar: typeof HeaderUniversalBar;
  ActionBar: typeof HeaderActionBar;
  TitleStyleType: typeof TitleStyleType;
  NavigationMenu: typeof HeaderNavigationMenu;
  ActionBarItem: typeof HeaderActionBarItemWithDropdown;
  Link: typeof HeaderLink;
  LanguageSelector: typeof HeaderLanguageSelector;
  Search: typeof HeaderSearch;
  SkipLink: typeof SkipLink;
  LanguageButton: typeof LanguageButton;
  SimpleLanguageOptions: typeof SimpleLanguageOptions;
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

Header.ActionBarItem = HeaderActionBarItemWithDropdown;
Header.Link = HeaderLink;

Header.LanguageSelector = HeaderLanguageSelector;
Header.Search = HeaderSearch;
Header.SkipLink = SkipLink;
Header.LanguageButton = LanguageButton;
Header.SimpleLanguageOptions = SimpleLanguageOptions;
