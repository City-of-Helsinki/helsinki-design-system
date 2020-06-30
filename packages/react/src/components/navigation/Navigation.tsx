import React, { Children, FC, PropsWithChildren, ReactElement, ReactNode, useReducer, useState } from 'react';
import { animated, useTransition, UseTransitionProps } from 'react-spring';

import styles from './Navigation.module.css';
import classNames from '../../utils/classNames';
import Logo from '../logo/Logo';
import NavigationContext, { NavigationContextProps } from './NavigationContext';
import NavigationRow from './navigation-row/NavigationRow';
import NavigationItem from './navigation-item/NavigationItem';
import NavigationActions from './navigation-actions/NavigationActions';
import NavigationUser from './navigation-user/NavigationUser';
import NavigationSearch from './navigation-search/NavigationSearch';
import NavigationLanguageSelector from './navigation-language-selector/NavigationLanguageSelector';
import NavigationDropdown from './navigation-dropdown/NavigationDropdown';
import useMobile from '../../hooks/useMobile';
import IconCross from '../../icons/ui/IconCross';
import IconMenuHamburger from '../../icons/ui/IconMenuHamburger';
import { NavigationReducerAction, NavigationReducerState } from './Navigation.interface';

// TODO: PROP FOR CONTROLLING MENU
// TODO: PROP FOR CONTROLLING MENU

const MOBILE_MENU_TRANSITION: UseTransitionProps = {
  from: { transform: 'translate3d(0, -10%, 0)', opacity: 0.75 },
  enter: { transform: 'translate3d(0, 0%, 0)', opacity: 1 },
  config: {
    friction: 30,
    tension: 300,
  },
};

export type NavigationProps = PropsWithChildren<
  {
    /**
     * If `true`, the mobile menu will be animated when opened
     */
    animateOpen?: boolean;
    /**
     * Additional class names to apply to the navigation
     */
    className?: string;
    /**
     * ID of the header element
     */
    id?: string;
    /**
     * The language of the Helsinki-logo
     */
    logoLanguage?: 'fi' | 'sv';
    /**
     * aria-label for the mobile menu toggle when the menu is open
     */
    menuCloseAriaLabel: string;
    /**
     * aria-label for the mobile menu toggle when the menu is closed
     */
    menuOpenAriaLabel: string;
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
    skipToContentText: string;
    /**
     * todo
     */
    title: string | ReactNode;
  } & Omit<NavigationContextProps, 'isMobile'>
>;

/**
 * Rearranges children, so that they are displayed in the correct order in the mobile menu
 * @param {ReactElement[]} children
 * @param {boolean} authenticated
 */
const rearrangeChildrenForMobile = (children: ReactElement[], authenticated: boolean): ReactElement[] => {
  const rearrangedChildren = [...children];

  // moves the component to the start of the array
  const moveComponentToTop = (name: string) => {
    const index = rearrangedChildren.findIndex((item) => (item?.type as FC)?.displayName === name);
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
    return { ...state, navigationRowDisplay: action.value };
  }

  return state;
};

/**
 * Wrapper component for navigation content
 * @param children
 */
const Wrapper = ({ children }) => (
  <div className={styles.headerBackgroundWrapper}>
    <div className={styles.headerContainer}>{children}</div>
  </div>
);

const Navigation = ({
  animateOpen = true,
  children,
  className,
  id,
  logoLanguage = 'fi',
  menuCloseAriaLabel,
  menuOpenAriaLabel,
  skipTo,
  skipToContentAriaLabel,
  skipToContentText,
  theme = 'white',
  title,
}: NavigationProps) => {
  const isMobile = useMobile();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const [{ authenticated, navigationRowDisplay }, dispatch] = useReducer(reducer, {
    authenticated: false,
    navigationRowDisplay: 'fullWidth',
  });

  // navigation context
  const context = { dispatch, isMobile, theme };
  // ensure that children is an array
  const childrenAsArray = Children.toArray(children) as ReactElement[];
  // children without the navigation row
  const childrenWithoutNavigation = childrenAsArray.filter(
    (child) => (child.type as FC)?.displayName !== 'NavigationRow',
  );
  // filter out the NavigationRow, so that it can be rendered correctly based on the 'navigationRowDisplay' value
  const navigation = childrenAsArray.filter((child) => (child.type as FC)?.displayName === 'NavigationRow');

  // children that will be rendered in the mobile menu
  let menuChildren = null;

  if (isMobile) {
    // navigation actions
    const actions = childrenAsArray.find((child) => (child.type as FC)?.displayName === 'NavigationActions')?.props
      ?.children;
    const items = Children.toArray([navigation, actions]) as ReactElement[];
    // rearrange children
    menuChildren = rearrangeChildrenForMobile(items, authenticated);
  }

  // title that is displayed in the header. wrap a string title in a <span>, so that it can be styled properly
  const headerTitle: ReactNode = (
    <div className={styles.title}>{typeof title === 'string' ? <span>{title}</span> : title}</div>
  );

  // mobile menu transition
  const transitionProps = animateOpen ? MOBILE_MENU_TRANSITION : {};
  const mobileMenuTransition = useTransition<boolean, UseTransitionProps>(mobileMenuOpen, transitionProps);

  return (
    <NavigationContext.Provider value={context}>
      <header id={id} className={classNames(styles.header, `${styles[`theme-${theme}`]} theme-${theme}`, className)}>
        <a className={styles.skipToContent} href={skipTo} aria-label={skipToContentAriaLabel}>
          {skipToContentText}
        </a>
        {isMobile ? (
          <>
            <Wrapper>
              <Logo language={logoLanguage} className={styles.logo} />
              {headerTitle}
              <button
                type="button"
                className={styles.mobileMenuToggle}
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              >
                {mobileMenuOpen ? (
                  <IconCross aria-label={menuCloseAriaLabel} />
                ) : (
                  <IconMenuHamburger aria-label={menuOpenAriaLabel} />
                )}
              </button>
            </Wrapper>
            {mobileMenuTransition(
              (values, open) =>
                open && (
                  <animated.div className={styles.mobileMenu} style={values}>
                    {menuChildren}
                  </animated.div>
                ),
            )}
          </>
        ) : (
          <>
            <Wrapper>
              <Logo language={logoLanguage} className={styles.logo} />
              {headerTitle}
              {navigationRowDisplay === 'inline' && <div className={styles.headerContent}>{children}</div>}
              {navigationRowDisplay === 'fullWidth' && (
                <div className={styles.headerContent}>{childrenWithoutNavigation}</div>
              )}
            </Wrapper>
            {navigationRowDisplay === 'fullWidth' && navigation}
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

export default Navigation;
