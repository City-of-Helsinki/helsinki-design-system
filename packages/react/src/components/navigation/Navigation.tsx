import React, { useEffect, useReducer, useState } from 'react';

import styles from './Navigation.module.scss';
import classNames from '../../utils/classNames';
import { Logo, LogoLanguage } from '../logo';
import { NavigationContext, NavigationContextProps } from './NavigationContext';
import { NavigationRow } from './navigationRow/NavigationRow';
import { NavigationItem } from './navigationItem/NavigationItem';
import { NavigationActions } from './navigationActions/NavigationActions';
import { NavigationUser } from './navigationUser/NavigationUser';
import { NavigationSearch } from './navigationSearch/NavigationSearch';
import { NavigationLanguageSelector } from './navigationLanguageSelector/NavigationLanguageSelector';
import { NavigationDropdown } from './navigationDropdown/NavigationDropdown';
import { useMobile } from '../../hooks/useMobile';
import { IconCross, IconMenuHamburger } from '../../icons';
import { NavigationReducerAction, NavigationReducerState, NavigationTheme } from './Navigation.interface';
import { getChildrenAsArray, getComponentFromChildren } from '../../utils/getChildren';
import { FCWithName } from '../../common/types';
import { useTheme } from '../../hooks/useTheme';

export type NavigationProps = React.PropsWithChildren<{
  /**
   * Additional class names to apply to the navigation
   */
  className?: string;
  /**
   * If `true`, the navigation will be fixed to the top of the page
   * @default false
   */
  fixed?: boolean;
  /**
   * ID of the header element
   */
  id?: string;
  /**
   * The language of the Helsinki-logo
   * @default 'fi'
   */
  logoLanguage?: LogoLanguage;
  /**
   * Sets whether the mobile menu is open. Used together with the `onMenuToggle` prop to override the internal state handling
   * @default false
   */
  menuOpen?: boolean;
  /**
   * aria-label for the mobile menu toggle button
   */
  menuToggleAriaLabel: string;
  /**
   * Callback fired when the mobile menu is toggled. Can be used together with the `menuOpen` prop to override the internal state handling
   */
  onMenuToggle?: () => void;
  /**
   * Callback fired when the title or logo is clicked
   */
  onTitleClick?: () => void;
  /**
   * ID of the element to jump to when the "skip to content" accessibility shortcut is clicked
   */
  skipTo: string;
  /**
   * aria-label for the "skip to content" accessibility shortcut
   */
  skipToContentAriaLabel?: string;
  /**
   * Text for the "skip to content" accessibility shortcut
   */
  skipToContentLabel: React.ReactNode;
  /**
   * Defines the navigation theme
   * @default 'white'
   */
  theme?: NavigationTheme;
  /**
   * The title of the service shown next to the logo
   */
  title?: React.ReactNode;
  /**
   * The aria-label for the title describing the logo and service to screen reader users
   */
  titleAriaLabel?: React.ReactNode;
  /**
   * URL to navigate to when the logo or title is clicked
   */
  titleUrl?: string;
}>;

/**
 * Rearranges children, so that they are displayed in the correct order in the mobile menu
 * @param {React.ReactElement[]} children
 * @param {boolean} authenticated
 */
const rearrangeChildrenForMobile = (children: React.ReactElement[], authenticated: boolean): React.ReactElement[] => {
  const rearrangedChildren = [...children];

  // moves the component to the start of the array
  const moveComponentToTop = (name: string) => {
    const index = rearrangedChildren.findIndex((item) => (item?.type as FCWithName)?.componentName === name);
    if (index > -1) {
      const component = rearrangedChildren.splice(index, 1)[0];
      rearrangedChildren.splice(0, 0, component);
    }
  };

  // move search to top
  moveComponentToTop('NavigationSearch');
  // move sign in button to top if user isn't authenticated
  if (!authenticated) moveComponentToTop('NavigationUser');

  return rearrangedChildren;
};

/**
 * Navigation reducer
 * @param {ReducerState} state
 * @param {ReducerAction} action
 */
const reducer = (state: NavigationReducerState, action: NavigationReducerAction): NavigationReducerState => {
  if (action.type === 'AUTHENTICATED') {
    return { ...state, authenticated: action.value };
  }
  if (action.type === 'NAVIGATION_ROW') {
    return { ...state, navigationVariant: action.value };
  }

  return state;
};

/**
 * Wrapper component for header content
 * @param children
 * @param logoLanguage
 * @param onTitleClick
 * @param title
 * @param titleAriaLabel
 * @param titleUrl
 * @param mobileMenuOpen
 */
const HeaderWrapper = ({ children, logoLanguage, onTitleClick, title, titleAriaLabel, titleUrl }) => (
  <div className={styles.headerBackgroundWrapper}>
    <div className={styles.headerContainer}>
      <a
        className={styles.title}
        href={titleUrl}
        aria-label={titleAriaLabel}
        onKeyPress={(e) => {
          if (e.key === 'Enter' || e.key === ' ') onTitleClick();
        }}
        onClick={onTitleClick}
        {...(!titleUrl && onTitleClick && { tabIndex: 0 })}
      >
        <Logo className={styles.logo} language={logoLanguage} aria-hidden />
        {title && <span>{title}</span>}
      </a>
      {children}
    </div>
  </div>
);

export const Navigation = ({
  children,
  className,
  fixed = false,
  id,
  logoLanguage = 'fi',
  menuOpen = false,
  menuToggleAriaLabel,
  onMenuToggle,
  onTitleClick,
  skipTo,
  skipToContentAriaLabel,
  skipToContentLabel,
  theme = 'light',
  title,
  titleAriaLabel,
  titleUrl,
}: NavigationProps) => {
  const isMobile = useMobile();
  // custom theme class that is applied to the root element
  const customThemeClass = useTheme<NavigationTheme>(styles.header, theme);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(menuOpen);

  const [{ authenticated, navigationVariant }, dispatch] = useReducer(reducer, {
    authenticated: false,
    navigationVariant: 'default',
  });

  // close menu when changing between mobile and desktop
  useEffect(() => setMobileMenuOpen(false), [isMobile]);
  // set the menu open state when it's controlled by the prop
  useEffect(() => setMobileMenuOpen(menuOpen), [menuOpen]);

  // navigation context
  const context: NavigationContextProps = { dispatch, isMobile };
  // filter out the NavigationRow, so that it can be rendered correctly based on the 'navigationVariant' value
  const [navigation, childrenWithoutNavigation] = getComponentFromChildren(children, 'NavigationRow');

  // children that will be rendered in the mobile menu
  let menuChildren = null;
  let languageSelector = null;
  let actionsWithoutLanguageSelector = null;

  if (isMobile) {
    // navigation actions
    const actions = getChildrenAsArray(children).find(
      (child) => (child.type as FCWithName).componentName === 'NavigationActions',
    )?.props?.children;

    // filter out the NavigationLanguageSelector, so that it can be rendered in the header instead of the mobile menu
    [languageSelector, actionsWithoutLanguageSelector] = getComponentFromChildren(
      actions,
      'NavigationLanguageSelector',
    );

    // items that will be shown in the mobile menu
    const items = getChildrenAsArray([navigation, actionsWithoutLanguageSelector]);

    // rearrange children
    menuChildren = rearrangeChildrenForMobile(items, authenticated);
  }

  // props for the header wrapper component
  const headerWrapperProps = { logoLanguage, onTitleClick, title, titleAriaLabel, titleUrl };

  return (
    <NavigationContext.Provider value={context}>
      <header
        id={id}
        className={classNames(
          styles.header,
          fixed && styles.fixed,
          mobileMenuOpen && styles.menuOpen,
          !title && styles.noTitle,
          styles[`theme-${theme}`],
          customThemeClass,
          className,
        )}
      >
        <a className={styles.skipToContent} href={skipTo} aria-label={skipToContentAriaLabel}>
          {skipToContentLabel}
        </a>
        {isMobile ? (
          <>
            <HeaderWrapper {...headerWrapperProps}>
              {languageSelector}
              <button
                aria-label={menuToggleAriaLabel}
                aria-haspopup="true"
                aria-expanded={mobileMenuOpen}
                {...(mobileMenuOpen && { 'aria-controls': 'hds-mobile-menu' })}
                type="button"
                className={styles.mobileMenuToggle}
                onClick={() =>
                  typeof onMenuToggle === 'function' ? onMenuToggle() : setMobileMenuOpen(!mobileMenuOpen)
                }
              >
                {mobileMenuOpen ? <IconCross aria-hidden /> : <IconMenuHamburger aria-hidden />}
              </button>
            </HeaderWrapper>
            {mobileMenuOpen && (
              <div id="hds-mobile-menu" className={styles.mobileMenu}>
                {menuChildren}
              </div>
            )}
          </>
        ) : (
          <>
            <HeaderWrapper {...headerWrapperProps}>
              {navigationVariant === 'inline' && <div className={styles.headerContent}>{children}</div>}
              {navigationVariant === 'default' && (
                <div className={styles.headerContent}>{childrenWithoutNavigation}</div>
              )}
            </HeaderWrapper>
            {navigationVariant === 'default' && navigation}
          </>
        )}
      </header>
    </NavigationContext.Provider>
  );
};

Navigation.Actions = NavigationActions;
Navigation.Dropdown = NavigationDropdown;
Navigation.Item = NavigationItem;
Navigation.LanguageSelector = NavigationLanguageSelector;
Navigation.Row = NavigationRow;
Navigation.Search = NavigationSearch;
Navigation.User = NavigationUser;
