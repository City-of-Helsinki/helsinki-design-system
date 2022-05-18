import React, { useEffect, useState } from 'react';

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
import { NavigationTheme, NavigationVariant } from './Navigation.interface';
import { getChildrenAsArray, getComponentFromChildren } from '../../utils/getChildren';
import { FCWithName } from '../../common/types';
import { useTheme } from '../../hooks/useTheme';
import { Visible } from '../../internal/visible/Visible';

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
  onTitleClick?: (e?: Event) => void;
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

  /**
   * move elements to shelf on mobile
   */
  shelved?: string[];
}>;

/**
 * Rearranges children, so that they are displayed in the correct order in the mobile menu
 * @param {React.ReactElement[]} children
 * @param {boolean} authenticated
 * @param {string[]} shelved
 */
const rearrangeChildrenForMobile = (
  children: React.ReactElement[],
  authenticated: boolean,
  shelved?: string[],
): React.ReactElement[][] => {
  const rearrangedChildren = [...children];
  const shelvedChildren = [];

  // moves the component to the start of the array
  const moveComponentToTop = (name: string) => {
    const index = rearrangedChildren.findIndex((item) => (item?.type as FCWithName)?.componentName === name);
    if (index > -1) {
      const component = rearrangedChildren.splice(index, 1)[0];
      rearrangedChildren.splice(0, 0, component);
    }
  };

  // moves the component to the shelf array
  const moveComponentToShelf = (name: string) => {
    const index = rearrangedChildren.findIndex((item) => item?.key.toString().indexOf(name) !== -1);
    if (index > -1) {
      const component = rearrangedChildren.splice(index, 1)[0];
      shelvedChildren.push(component);
    }
  };

  // move search to top
  moveComponentToTop('NavigationSearch');
  // move sign in button to top if user isn't authenticated
  if (!authenticated) moveComponentToTop('NavigationUser');

  // move elements to shelf
  shelved.forEach((element) => moveComponentToShelf(element));

  return [rearrangedChildren, shelvedChildren];
};

const getNavigationVariantFromChild = (children: React.ReactNode): NavigationVariant => {
  const navigationRow = getChildrenAsArray(children).find(
    (child) => (child.type as FCWithName).componentName === 'NavigationRow',
  );
  return navigationRow?.props?.variant || 'default';
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
          if ((e.key === 'Enter' || e.key === ' ') && onTitleClick) onTitleClick(e);
        }}
        onClick={(event) => onTitleClick && onTitleClick(event)}
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
  shelved = [],
}: NavigationProps) => {
  const isMobile = useMobile();
  // custom theme class that is applied to the root element
  const customThemeClass = useTheme<NavigationTheme>(styles.header, theme);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(menuOpen);

  const [authenticated, setAuthenticated] = useState(false);
  const [navigationVariant, setNavigationVariant] = useState(getNavigationVariantFromChild(children));

  // close menu when changing between mobile and desktop
  useEffect(() => setMobileMenuOpen(false), [isMobile]);
  // set the menu open state when it's controlled by the prop
  useEffect(() => setMobileMenuOpen(menuOpen), [menuOpen]);

  // navigation context
  const context: NavigationContextProps = { setAuthenticated, setNavigationVariant, isMobile };
  // filter out the NavigationRow, so that it can be rendered correctly based on the 'navigationVariant' value
  const [navigation, childrenWithoutNavigation] = getComponentFromChildren(children, 'NavigationRow');

  // Mobile navigation actions
  const mobileActions = getChildrenAsArray(children).find(
    (child) => (child.type as FCWithName).componentName === 'NavigationActions',
  )?.props?.children;

  // filter out the NavigationLanguageSelector, so that it can be rendered in the header instead of the mobile menu
  const [mobileLanguageSelector, mobileActionsWithoutLanguageSelector] = getComponentFromChildren(
    mobileActions,
    'NavigationLanguageSelector',
  );

  // items that will be shown in the mobile menu
  const mobileMenuItems = getChildrenAsArray([navigation, mobileActionsWithoutLanguageSelector]);

  // rearrange children
  const [mobileMenuChildren, mobileShelf] = rearrangeChildrenForMobile(mobileMenuItems, authenticated, shelved);

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
        <Visible below="m">
          <HeaderWrapper {...headerWrapperProps}>
            {mobileLanguageSelector}
            <button
              aria-label={menuToggleAriaLabel}
              aria-haspopup="true"
              aria-expanded={mobileMenuOpen}
              {...(mobileMenuOpen && { 'aria-controls': 'hds-mobile-menu' })}
              type="button"
              className={styles.mobileMenuToggle}
              onClick={() => (typeof onMenuToggle === 'function' ? onMenuToggle() : setMobileMenuOpen(!mobileMenuOpen))}
            >
              {mobileMenuOpen ? <IconCross aria-hidden /> : <IconMenuHamburger aria-hidden />}
            </button>
          </HeaderWrapper>
          {mobileShelf && <div id="hds-mobile-shelf">{mobileShelf}</div>}
          {mobileMenuOpen && (
            <div id="hds-mobile-menu" className={styles.mobileMenu}>
              {mobileMenuChildren}
            </div>
          )}
        </Visible>
        <Visible above="m">
          <HeaderWrapper {...headerWrapperProps}>
            {navigationVariant === 'inline' && <div className={styles.headerContent}>{children}</div>}
            {navigationVariant === 'default' && <div className={styles.headerContent}>{childrenWithoutNavigation}</div>}
          </HeaderWrapper>
          {navigationVariant === 'default' && navigation}
        </Visible>
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
