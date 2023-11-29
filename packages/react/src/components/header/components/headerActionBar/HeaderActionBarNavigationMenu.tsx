import React, { cloneElement, isValidElement, MouseEventHandler, TransitionEvent, useRef, useState } from 'react';

import { useHeaderContext, useSetHeaderContext } from '../../HeaderContext';
import classNames from '../../../../utils/classNames';
import styles from './HeaderActionBarNavigationMenu.module.scss';
import { getChildrenAsArray } from '../../../../utils/getChildren';
import { HeaderLink } from '../headerLink';
import { IconAngleLeft } from '../../../../icons';
import getIsElementLoaded from '../../../../utils/getIsElementLoaded';
import { LinkProps } from '../../../../internal/LinkItem';
import HeaderActionBarLogo from './HeaderActionBarLogo';

type NavigationSectionType = {
  logo: React.ReactNode;
  universalLinks: React.ReactNode[];
} & React.ComponentPropsWithoutRef<'section'>;

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
  id?: string;
  onLinkClick?: MouseEventHandler<HTMLAnchorElement>;
};
const ActiveDropdownLink = ({ id, link, frontPageLabel, titleHref, onLinkClick }: ActiveDropdownLinkProps) => {
  const className = styles.activeMobileLink;
  const activeLink = link ? (
    cloneElement(link, {
      id,
      className,
      dropdownButtonClassName: styles.hideDropdownButton,
      wrapperClassName: styles.mobileLinkWrapper,
      onClick: (event) => {
        if (link.props.onClick) link.props.onClick(event);
        onLinkClick(event);
      },
    })
  ) : (
    <HeaderLink id={id} label={frontPageLabel} href={titleHref} className={className} onClick={onLinkClick} />
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
  animating: boolean;
  index: number;
  key: string;
  root: boolean;
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
};
export const HeaderActionBarNavigationMenu = ({
  frontPageLabel,
  titleHref,
  logo,
  logoProps,
  openFrontPageLinksAriaLabel,
}: HeaderActionBarNavigationMenuProps) => {
  const { navigationContent, mobileMenuOpen, hasUniversalContent, universalContent } = useHeaderContext();
  const { setMobileMenuOpen } = useSetHeaderContext();
  // State for which link menu is open but not necessarily active. Needed for browsing the menu.
  const navContainerRef = useRef<HTMLDivElement>();
  const currentActiveLinkId = 'current-active-link';

  const universalLinks = hasUniversalContent ? getChildrenAsArray(universalContent) : [];

  const [selectedMenuLevels, setSelectedMenuLevels] = useState<MenuInfo[]>([
    // first menu is always the same - the root menu.
    { root: true, index: -1, active: true, animating: false, key: 'root' },
  ]);

  const menuPositions: Record<number, Position> = {
    0: 'left0',
    1: 'left100',
    2: 'left200',
  };

  const getActiveMenus = () => selectedMenuLevels.filter((level) => level.active);

  const getMenuPositionStyle = () => {
    const activeMenuIndex = getActiveMenus().length - 1;
    return styles[menuPositions[activeMenuIndex]];
  };

  const isMenuActive = (index: number) => {
    const menuItem = selectedMenuLevels[index];
    return !!(menuItem && menuItem.active);
  };

  // Menu is current when it is the last active one
  const isMenuCurrent = (index: number) => {
    return isMenuActive(index) && getActiveMenus().length - 1 === index;
  };

  const isAnimating = () => {
    return selectedMenuLevels.some((level) => level.animating);
  };

  const addSelectedMenuLevel = (selectedIndex: number) => {
    if (selectedIndex === -1) {
      return;
    }
    const parent = selectedMenuLevels[selectedMenuLevels.length - 1];
    setSelectedMenuLevels([
      ...selectedMenuLevels,
      { index: selectedIndex, animating: true, active: true, root: false, key: `${parent.key}_${selectedIndex}` },
    ]);
  };

  const goToPreviousMenuLevel = () => {
    const last = selectedMenuLevels.pop();

    // Last item is removed after animation is done.
    // It is marked as inactive here and removed in resetMenusAfterAnimation()
    setSelectedMenuLevels([
      ...selectedMenuLevels.map((item) => {
        return { ...item, animating: true };
      }),
      { ...last, active: false, animating: true },
    ]);
  };

  const resetMenusAfterAnimation = () => {
    const newArray = getActiveMenus();
    setSelectedMenuLevels(
      newArray.map((i) => {
        return { ...i, animating: false };
      }),
    );
    return newArray.length;
  };

  const getLinksOrChildren = (parent: React.ReactElement) => {
    return parent.props && parent.props.dropdownLinks
      ? parent.props.dropdownLinks
      : getChildrenAsArray(((parent as unknown) as React.PropsWithChildren<unknown>).children);
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
    const linkParent = findParentElement(selectedMenuLevels);
    return linkParent ? getLinksOrChildren(linkParent).indexOf(link) : -1;
  };

  const getLinks = (level: number) => {
    const parent = findParentElement(selectedMenuLevels.slice(0, level + 1));
    return parent ? getLinksOrChildren(parent) : [];
  };

  const getActiveLink = (level: number) => {
    if (level === 0) {
      return undefined;
    }
    return findParentElement(selectedMenuLevels.slice(0, level + 1));
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

    return findParentElement(selectedMenuLevels.slice(0, level));
  };

  const getMenuContents = (level: number) => {
    return {
      links: getLinks(level),
      previousLink: getPreviousLink(level),
      activeLink: getActiveLink(level),
      key: selectedMenuLevels[level].key,
    };
  };

  if (!mobileMenuOpen) return null;

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

  const menuSectionsAnimationDone = async (e: TransitionEvent) => {
    const targetElement = e.target as HTMLElement;
    if (e.propertyName === 'transform' && targetElement.firstChild.nodeName === 'SECTION') {
      // Set the height of the menu container
      const renderedChildIndex = resetMenusAfterAnimation() - 1;
      const currentMenuSection = targetElement.children[renderedChildIndex];
      navContainerRef.current.style.height = `${currentMenuSection.clientHeight}px`;

      // If the animation was related to moving menus, set the focus to the currently active page link
      // Set the focus to the currently active page link
      const linkElement = await getIsElementLoaded(`#${currentActiveLinkId}`);
      linkElement.focus();
    }
  };

  const RenderNavigationSection = ({
    links,
    activeLink,
    activeLinkId,
    ariaHidden,
    previousLink,
    showPreviousLink,
    className,
  }: {
    links: React.ReactNode[];
    activeLink: React.ReactElement;
    activeLinkId?: string;
    previousLink?: React.ReactElement;
    showPreviousLink?: boolean;
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
          id={activeLinkId}
          link={activeLink}
          frontPageLabel={frontPageLabel}
          titleHref={titleHref}
          onLinkClick={handleLinkClick}
        />
        <MenuLinks links={links} onDropdownButtonClick={goDeeper} onLinkClick={handleLinkClick} />
      </NavigationSection>
    );
  };

  return (
    <div className={classNames(styles.headerNavigationMenu, mobileMenuOpen && styles.mobileMenuOpen)}>
      <div
        className={classNames(styles.navigationWrapper, getMenuPositionStyle())}
        onTransitionEnd={menuSectionsAnimationDone}
        ref={navContainerRef}
      >
        {selectedMenuLevels.map((data, i) => {
          const { links, previousLink, activeLink, key } = getMenuContents(i);
          const isCurrentMenu = isMenuCurrent(i);
          const isCurrentlyAnimating = isAnimating();
          return (
            <RenderNavigationSection
              activeLink={activeLink}
              activeLinkId={isCurrentMenu ? currentActiveLinkId : undefined}
              ariaHidden={!isCurrentMenu}
              className={isCurrentMenu || isCurrentlyAnimating ? styles.visible : styles.hidden}
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
