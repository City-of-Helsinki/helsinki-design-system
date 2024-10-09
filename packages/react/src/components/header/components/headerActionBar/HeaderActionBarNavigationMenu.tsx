import React, {
  cloneElement,
  HTMLAttributes,
  isValidElement,
  MouseEventHandler,
  TransitionEvent,
  useEffect,
  useRef,
  useState,
} from 'react';
import { v4 as uuidv4 } from 'uuid';

import styles from './HeaderActionBarNavigationMenu.module.scss';
import { useHeaderContext, useSetHeaderContext } from '../../HeaderContext';
import classNames from '../../../../utils/classNames';
import { getChildrenAsArray } from '../../../../utils/getChildren';
import { HeaderLink } from '../headerLink';
import { IconAngleLeft } from '../../../../icons';
import { LinkProps } from '../../../../internal/LinkItem';
import HeaderActionBarLogo from './HeaderActionBarLogo';
import { HeaderActionBarItemProps } from '../headerActionBarItem';
import useForceRender from '../../../../hooks/useForceRender';

/**
 * This HeaderActionBarNavigationMenu is used only internally in <HeaderActionBar />
 * The component is not export to hds-react, so it does not need to have typings from AllElementPropsWithoutRef
 */

type NavigationSectionType = HTMLAttributes<HTMLElement> & {
  logo: React.ReactNode;
  universalLinks: React.ReactNode[];
};

const NavigationSection = ({ children, className, logo, universalLinks, ...rest }: NavigationSectionType) => {
  return (
    <section {...rest} className={classNames(styles.navSection, className)}>
      <nav className={styles.navigation}>
        <ul className={styles.menu}>{children}</ul>
      </nav>
      <div className={styles.mobileMenuBottom}>
        {universalLinks && (
          <ul className={styles.universalList}>
            {universalLinks.map((child, index) => {
              if (!isValidElement(child)) return null;
              return (
                // eslint-disable-next-line react/no-array-index-key
                <li key={index}>
                  {cloneElement(child as React.ReactElement, {
                    className: styles.universalLink,
                  })}
                </li>
              );
            })}
          </ul>
        )}
        {logo}
      </div>
    </section>
  );
};

type PreviousDropdownLinkProps = {
  link: React.ReactElement;
  frontPageLabel: string;
  titleHref?: string;
  openFrontPageLinksAriaLabel?: string;
  onClick?: (link?: React.ReactElement | string) => void;
};
const PreviousDropdownLink = ({
  link,
  frontPageLabel,
  onClick,
  titleHref,
  openFrontPageLinksAriaLabel,
}: PreviousDropdownLinkProps) => {
  // When the link is not an object with props, this should point to front page.
  const previousLabel = link?.props.label || frontPageLabel;
  const previousAriaLabel = link?.props.openDropdownAriaButtonLabel || openFrontPageLinksAriaLabel;
  return (
    <li className={styles.previousListItem}>
      <button
        type="button"
        className={styles.previousLinkWrapper}
        onClick={() => onClick(link || titleHref)}
        aria-label={previousAriaLabel}
      >
        <span className={styles.previousButton}>
          <IconAngleLeft className={styles.backIcon} />
        </span>
        <span className={styles.previousMobileLink}>{previousLabel}</span>
      </button>
    </li>
  );
};

type ActiveDropdownLinkProps = {
  link: React.ReactElement;
  frontPageLabel: string;
  titleHref?: string;
  onLinkClick?: MouseEventHandler<HTMLAnchorElement>;
};
const ActiveDropdownLink = ({ link, frontPageLabel, titleHref, onLinkClick }: ActiveDropdownLinkProps) => {
  const className = styles.activeMobileLink;
  const activeLink = link ? (
    cloneElement(link, {
      className,
      dropdownButtonClassName: styles.hideDropdownButton,
      wrapperClassName: styles.mobileLinkWrapper,
      onClick: (event) => {
        if (link.props.onClick) link.props.onClick(event);
        onLinkClick(event);
      },
    })
  ) : (
    <HeaderLink label={frontPageLabel} href={titleHref} className={className} onClick={onLinkClick} />
  );
  return (
    <li className={styles.activeListItem}>
      <span className={styles.activeLinkWrapper}>{activeLink}</span>
    </li>
  );
};

type MenuLinksProps = {
  links: React.ReactNode[];
  onDropdownButtonClick: (link) => void;
  onLinkClick: (link) => void;
};
const MenuLinks = ({ links, onDropdownButtonClick, onLinkClick }: MenuLinksProps) => {
  return (
    <>
      {links
        .filter((child) => isValidElement(child))
        .map((child: React.ReactElement, index) => (
          // eslint-disable-next-line react/no-array-index-key
          <li key={index}>
            <span className={styles.mobileNavigationLink}>
              {cloneElement(child as React.ReactElement, {
                dropdownLinkClassName: styles.mobileDropdownLink,
                dropdownClassName: styles.mobileLinkDropdown,
                wrapperClassName: styles.mobileLinkWrapper,
                dropdownButtonClassName: styles.mobileLinkDropdownButton,
                className: classNames(child.props.className, styles.mobileLink),
                index,
                onDropdownButtonClick: () => onDropdownButtonClick(child),
                onClick: (event) => {
                  if (child.props.onClick) child.props.onClick(event);
                  onLinkClick(child);
                },
              })}
            </span>
          </li>
        ))}
    </>
  );
};

const Logo = ({ logo, logoProps }) => (
  <HeaderActionBarLogo
    logoProps={{
      ...logoProps,
      className: classNames(logoProps.className, styles.logoLink),
    }}
    logo={logo}
  />
);

// These are used as clasNames as well
type Position = 'left0' | 'left100' | 'left200';
type MenuInfo = {
  active: boolean;
  index: number;
  key: string;
  root: boolean;
};
type State = {
  isOpen: boolean;
  menus: MenuInfo[];
  isChangingLevel: boolean;
  isClosingOrOpening: boolean;
  shouldSetFocusToActiveLink: boolean;
};
type HeaderActionBarNavigationMenuProps = {
  frontPageLabel: string;
  titleHref: string;
  /**
   * Logo to use
   */
  logo: JSX.Element;
  /**
   * Logo properties
   */
  logoProps: LinkProps;
  openFrontPageLinksAriaLabel?: string;
  actionBarItems: HeaderActionBarItemProps[];
};
export const HeaderActionBarNavigationMenu = ({
  frontPageLabel,
  titleHref,
  logo,
  logoProps,
  openFrontPageLinksAriaLabel,
  actionBarItems,
}: HeaderActionBarNavigationMenuProps) => {
  const { navigationContent, mobileMenuOpen, hasUniversalContent, universalContent } = useHeaderContext();
  const universalLinks = hasUniversalContent ? getChildrenAsArray(universalContent) : [];
  const { setMobileMenuOpen } = useSetHeaderContext();
  // State for which link menu is open but not necessarily active. Needed for browsing the menu.
  const navContainerRef = useRef<HTMLDivElement>();
  const reRender = useForceRender();

  const state = useRef<State>({
    isOpen: mobileMenuOpen,
    menus: [{ root: true, index: -1, active: false, key: 'root' }],
    isChangingLevel: false,
    isClosingOrOpening: false,
    shouldSetFocusToActiveLink: false,
  });

  const getState = () => state.current;

  const updateState = (newStateProps: Partial<State>) => {
    state.current = { ...getState(), ...newStateProps };
  };

  const getMenuLevels = (): State['menus'] => {
    return getState().menus;
  };

  const updateMenuLevelsAndRender = (newLevels: State['menus'], animationOver = false) => {
    updateState({ menus: newLevels, isChangingLevel: !animationOver });
    reRender();
  };

  const modifyMenuLevels = ({
    setActiveIndex,
    newMenuIndex,
    removeLastIfInActive,
    deactivateLast,
    activateLast,
  }: {
    setActiveIndex?: number;
    newMenuIndex?: number;
    removeLastIfInActive?: boolean;
    activateLast?: boolean;
    deactivateLast?: boolean;
  }) => {
    const currentMenus = [...getMenuLevels()];
    const getNewActiveIndex = (): number | null => {
      if (typeof setActiveIndex === 'number') {
        return setActiveIndex;
      }
      if (activateLast) {
        return currentMenus.length - 1;
      }
      if (deactivateLast) {
        return currentMenus.length - 2;
      }
      return null;
    };
    const activeIndex = getNewActiveIndex();
    if (activeIndex !== null) {
      currentMenus.forEach((menu, index) => {
        // eslint-disable-next-line no-param-reassign
        menu.active = index === activeIndex;
      });
    }
    if (typeof newMenuIndex !== 'undefined') {
      const parent = currentMenus[currentMenus.length - 1];
      parent.active = false;
      currentMenus.push({ index: newMenuIndex, active: true, root: false, key: `${parent.key}_${newMenuIndex}` });
    }
    if (removeLastIfInActive) {
      const lastMenu = currentMenus[currentMenus.length - 1];
      if (!lastMenu.root && !lastMenu.active) {
        currentMenus.pop();
      }
    }
    return currentMenus;
  };

  if (getState().isOpen !== mobileMenuOpen) {
    updateState({ isClosingOrOpening: true, isOpen: mobileMenuOpen, isChangingLevel: false });
    // when closed, all menus are inactive.
    // when menu is opened the last menu item is set active.
    // when menus was closed, there can be 1-3 menus still stored
    // and this way the previous state is restored.
    if (mobileMenuOpen) {
      modifyMenuLevels({ activateLast: true });
    }
  }

  const getActiveMenuIndex = () => {
    return getMenuLevels().findIndex((level) => level.active);
  };

  const getMenuPositionStyle = () => {
    const menuPositions: Record<number, Position> = {
      0: 'left0',
      1: 'left100',
      2: 'left200',
    };
    const { isClosingOrOpening, isOpen } = getState();
    // when opening / closing the menu should be positioned to the last
    const activeMenuIndex = isClosingOrOpening || !isOpen ? getMenuLevels().length - 1 : getActiveMenuIndex();
    return styles[menuPositions[activeMenuIndex]];
  };

  const isMenuActive = (index: number) => {
    const menuItem = getMenuLevels()[index];
    return !!(menuItem && menuItem.active);
  };

  // Menu is current when it is the last active one
  const isMenuCurrent = (index: number) => {
    return isMenuActive(index) && getActiveMenuIndex() === index;
  };

  const isAnimating = () => {
    return getState().isChangingLevel;
  };

  const addSelectedMenuLevel = (selectedIndex: number) => {
    if (selectedIndex === -1) {
      return;
    }
    updateMenuLevelsAndRender(modifyMenuLevels({ newMenuIndex: selectedIndex }));
  };

  const goToPreviousMenuLevel = () => {
    updateMenuLevelsAndRender(modifyMenuLevels({ deactivateLast: true }));
  };

  const resetMenusAfterAnimation = () => {
    updateMenuLevelsAndRender(modifyMenuLevels({ removeLastIfInActive: true }), true);
  };

  const getLinksOrChildren = (parent: React.ReactElement) => {
    return parent.props && parent.props.dropdownLinks
      ? parent.props.dropdownLinks
      : getChildrenAsArray((parent as unknown as React.PropsWithChildren<unknown>).children);
  };

  // Picks given child by MenuInfo.index
  const findParentElement = (levels: MenuInfo[]): React.ReactElement | undefined => {
    return levels.reduce((parent: React.ReactElement, current: MenuInfo) => {
      const { index, root } = current;
      if (root) {
        // Root element contains top level navigation elements - navigationContent which is an array
        // Root element is never selected, only one of its children
        return { children: navigationContent };
      }
      if (!parent) {
        return undefined;
      }
      const source = getLinksOrChildren(parent);
      return source ? source[index] : undefined;
    }, undefined);
  };

  const findLinkIndex = (link: React.ReactElement) => {
    const linkParent = findParentElement(getMenuLevels());
    return linkParent ? getLinksOrChildren(linkParent).indexOf(link) : -1;
  };

  const getLinks = (level: number) => {
    const parent = findParentElement(getMenuLevels().slice(0, level + 1));
    return parent ? getLinksOrChildren(parent) : [];
  };

  const getActiveLink = (level: number) => {
    if (level === 0) {
      return undefined;
    }
    return findParentElement(getMenuLevels().slice(0, level + 1));
  };

  const getPreviousLink = (level: number) => {
    if (level === 0) {
      return undefined;
    }
    // PreviousDropdownLink defaults to titleHref, if link is undefined.
    // If level === 1, link should be titleHref, so return undefined here
    if (level === 1) {
      return undefined;
    }
    return findParentElement(getMenuLevels().slice(0, level));
  };

  const getMenuContents = (level: number) => {
    return {
      links: getLinks(level),
      previousLink: getPreviousLink(level),
      activeLink: getActiveLink(level),
      key: getMenuLevels()[level].key,
    };
  };

  const getActiveLinkElement = (): HTMLAnchorElement | null => {
    const container = navContainerRef.current;
    const activeMenuIndex = getActiveMenuIndex();
    const activeMenuElement = container ? (container.childNodes[activeMenuIndex] as HTMLElement) : null;
    return activeMenuElement ? activeMenuElement.querySelector(`a.${styles.activeMobileLink}`) : null;
  };

  useEffect(() => {
    // Set the focus to the currently active page link
    if (getState().shouldSetFocusToActiveLink) {
      updateState({ shouldSetFocusToActiveLink: false });
      const linkElement = getActiveLinkElement();
      if (linkElement) {
        linkElement.focus();
      }
    }
  });

  const goDeeper = (link: React.ReactElement) => {
    if (isAnimating()) {
      return;
    }
    addSelectedMenuLevel(findLinkIndex(link));
  };

  const goBack = () => {
    if (isAnimating()) {
      return;
    }
    goToPreviousMenuLevel();
  };

  const handleLinkClick = () => {
    setMobileMenuOpen(false);
  };

  const animationDone = async (e: TransitionEvent) => {
    if (e.propertyName !== 'transform') {
      return;
    }
    const targetElement = e.target as HTMLElement;
    const isNavContainer = targetElement === navContainerRef.current;
    const isMenuElement = targetElement === navContainerRef.current.parentElement;
    const { isChangingLevel, isClosingOrOpening } = getState();
    if (isNavContainer && isChangingLevel) {
      updateState({ shouldSetFocusToActiveLink: true });
      resetMenusAfterAnimation();
    } else if (isMenuElement && isClosingOrOpening) {
      updateState({ isClosingOrOpening: false });
      if (!getState().isOpen) {
        updateMenuLevelsAndRender(modifyMenuLevels({ setActiveIndex: -1 }), true);
      }
    }
  };

  const RenderNavigationSection = ({
    links,
    activeLink,
    ariaHidden,
    previousLink,
    showPreviousLink,
    className,
  }: {
    links: React.ReactNode[];
    activeLink: React.ReactElement;
    previousLink?: React.ReactElement;
    showPreviousLink?: boolean;
    // eslint-disable-next-line @typescript-eslint/naming-convention
    ariaHidden: boolean;
    className: string;
  }) => {
    return (
      <NavigationSection
        universalLinks={universalLinks}
        aria-hidden={ariaHidden}
        className={className}
        logo={<Logo logo={logo} logoProps={{ ...logoProps }} />}
      >
        {showPreviousLink && (
          <PreviousDropdownLink
            link={previousLink}
            frontPageLabel={frontPageLabel}
            titleHref={titleHref}
            onClick={goBack}
            openFrontPageLinksAriaLabel={openFrontPageLinksAriaLabel}
          />
        )}
        <ActiveDropdownLink
          link={activeLink}
          frontPageLabel={frontPageLabel}
          titleHref={titleHref}
          onLinkClick={handleLinkClick}
        />
        <MenuLinks links={links} onDropdownButtonClick={goDeeper} onLinkClick={handleLinkClick} />
      </NavigationSection>
    );
  };

  const [keyMap] = useState(new Map<unknown, string>());

  const getKey = (item: HeaderActionBarItemProps) => {
    const currentKey = keyMap.get(item);
    if (currentKey) {
      return currentKey;
    }
    const key = uuidv4();
    keyMap.set(item, key);
    return key;
  };

  const { isClosingOrOpening } = getState();
  const canMenuBeHidden = !mobileMenuOpen && !isClosingOrOpening;
  return (
    <div
      className={classNames(
        styles.headerNavigationMenu,
        mobileMenuOpen && styles.mobileMenuOpen,
        canMenuBeHidden ? styles.hidden : styles.visible,
      )}
      id="hds-mobile-menu"
      onTransitionEnd={animationDone}
    >
      {actionBarItems?.map?.((item: HeaderActionBarItemProps) => {
        if (typeof item === 'object') {
          return React.cloneElement(item as unknown as React.ReactElement, { fullWidth: true, key: getKey(item) });
        }
        return null;
      })}
      <div className={classNames(styles.navigationWrapper, getMenuPositionStyle())} ref={navContainerRef}>
        {getMenuLevels().map((data, i) => {
          const { links, previousLink, activeLink, key } = getMenuContents(i);
          const isCurrentMenu = isMenuCurrent(i);
          const isCurrentlyAnimating = isAnimating();
          const distanceToLast = getMenuLevels().length - 1 - i;
          // Maximum of 2 menus can be seen at the same time and only when animating.
          // Otherwise only one. If there are 3 menus, then root should not be shown.
          const shouldBeVisible = (isCurrentlyAnimating && distanceToLast < 2) || isCurrentMenu;
          return (
            <RenderNavigationSection
              activeLink={activeLink}
              // eslint-disable-next-line react/forbid-component-props
              ariaHidden={!mobileMenuOpen || !isCurrentMenu}
              className={isClosingOrOpening || shouldBeVisible ? styles.visible : styles.hidden}
              key={key}
              links={links}
              previousLink={previousLink}
              showPreviousLink={i > 0}
            />
          );
        })}
      </div>
    </div>
  );
};
