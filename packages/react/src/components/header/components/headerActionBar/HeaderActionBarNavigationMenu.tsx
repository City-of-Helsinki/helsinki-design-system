import React, { cloneElement, isValidElement, useEffect, useState } from 'react';

import { useHeaderContext } from '../../HeaderContext';
import classNames from '../../../../utils/classNames';
import styles from './HeaderActionBarNavigationMenu.module.scss';
import { getChildrenAsArray } from '../../../../utils/getChildren';
import { HeaderLink } from '../headerLink';
import { IconAngleLeft } from '../../../../icons';
import useIsomorphicLayoutEffect from '../../../../hooks/useIsomorphicLayoutEffect';
import getIsElementLoaded from '../../../../utils/getIsElementLoaded';
import { LinkProps } from '../../../../internal/LinkItem';
import HeaderActionBarLogo from './HeaderActionBarLogo';

type NavigationSectionType = {
  universalLinks: React.ReactNode[];
} & React.ComponentPropsWithoutRef<'section'>;

const NavigationSection = ({ children, className, universalLinks, ...rest }: NavigationSectionType) => {
  return (
    <section {...rest} className={classNames(styles.navSection, className)}>
      <nav className={styles.navigation}>
        <ul className={styles.menu}>{children}</ul>
      </nav>
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
    </section>
  );
};

type DropdownLinkProps = {
  // eslint-disable-next-line react/no-unused-prop-types
  id?: string;
  link: React.ReactElement;
  frontPageLabel: string;
  // eslint-disable-next-line react/no-unused-prop-types
  onClick?: (link?: React.ReactElement | string) => void;
  titleHref?: string;
};
const PreviousDropdownLink = ({ link, frontPageLabel, onClick, titleHref }: DropdownLinkProps) => {
  const previousLabel = link ? link.props.label : frontPageLabel;
  return (
    <li className={styles.previousListItem}>
      <button type="button" className={styles.previousLinkWrapper} onClick={() => onClick(link || titleHref)}>
        <span className={styles.previousButton}>
          <IconAngleLeft className={styles.backIcon} />
        </span>
        <span className={styles.previousMobileLink}>{previousLabel}</span>
      </button>
    </li>
  );
};

const ActiveDropdownLink = ({ id, link, frontPageLabel, titleHref }: DropdownLinkProps) => {
  const className = styles.activeMobileLink;
  const activeLink = link ? (
    cloneElement(link, {
      id,
      className,
      dropdownButtonClassName: styles.hideDropdownButton,
      wrapperClassName: styles.mobileLinkWrapper,
    })
  ) : (
    <HeaderLink id={id} label={frontPageLabel} href={titleHref} className={className} />
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
};
const MenuLinks = ({ links, onDropdownButtonClick }: MenuLinksProps) => {
  return (
    <>
      {links.map((child, index) => {
        if (!isValidElement(child)) return null;
        return (
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
              })}
            </span>
          </li>
        );
      })}
    </>
  );
};

/**
 * Find only the active links in the given objects model.
 * @param obj
 * @returns
 */
function findActiveLinks(obj) {
  const activeLinks = [];

  if (obj.props.active) {
    activeLinks.push(obj);
  }

  if (obj.props.dropdownLinks && obj.props.dropdownLinks.length > 0) {
    obj.props.dropdownLinks.forEach((link) => {
      activeLinks.push(...findActiveLinks(link));
    });
  }

  return activeLinks;
}

function getActiveMainLevelLink(links) {
  return getChildrenAsArray(links).find((link) => {
    if (isValidElement(link) && link.props.active) return link;
    return null;
  });
}

// These are used as clasNames as well
type Position = 'left0' | 'left100' | 'left200';
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
};
export const HeaderActionBarNavigationMenu = ({
  frontPageLabel,
  titleHref,
  logo,
  logoProps,
}: HeaderActionBarNavigationMenuProps) => {
  const {
    hasNavigationContent,
    navigationContent,
    isNotLargeScreen,
    mobileMenuOpen,
    hasUniversalContent,
    universalContent,
  } = useHeaderContext();
  // State for which link menu is open but not necessarily active. Needed for browsing the menu.
  const [openMainLinks, setOpenMainLinks] = useState<React.ReactElement[]>([]);
  const [openingLink, setOpeningLink] = useState<React.ReactElement | string>(null);
  const [position, setPosition] = useState<Position>('left0');
  const [isAnimating, setIsAnimating] = useState<boolean>(false);
  const isOpeningLinkFromBefore = (link) => !!openMainLinks[openMainLinks.indexOf(link)];
  const currentActiveLinkId = 'current-active-link';
  const isOpeningFrontPageLinks = typeof openingLink === 'string' && openingLink === titleHref;
  const isUserInDropdownTree = openMainLinks.length > 1;
  const currentlyActiveMainLink = openMainLinks[openMainLinks.length - 1];
  const previousDropdownLink = isUserInDropdownTree
    ? openMainLinks[openMainLinks.indexOf(currentlyActiveMainLink) - 1]
    : null;

  const menuLinks = openMainLinks.length > 0 ? currentlyActiveMainLink.props.dropdownLinks : navigationContent;
  const previousMenuLinks = isUserInDropdownTree
    ? openMainLinks[openMainLinks.indexOf(currentlyActiveMainLink) - 1].props.dropdownLinks
    : navigationContent;
  const universalLinks = hasUniversalContent ? getChildrenAsArray(universalContent) : [];
  const isRenderingDeepestMenu = position === 'left200';

  useIsomorphicLayoutEffect(() => {
    // Set active main links with dropdowns if any
    const mainLevelActiveLink = getActiveMainLevelLink(navigationContent);
    if (mainLevelActiveLink) {
      const mainLinkElement = mainLevelActiveLink as React.ReactElement;
      const activeLinks = findActiveLinks(cloneElement(mainLinkElement));
      const activeMainLinks = activeLinks.filter((link) => link.props.active);
      const correctMenuPosition = {
        0: 'left0',
        1: 'left100',
        2: 'left200',
      };
      setOpenMainLinks(activeMainLinks);
      // In case there are active links set, set the menu position and focus order correctly
      setPosition(correctMenuPosition[activeMainLinks.length]);
    }
  }, [navigationContent]);

  /* When opening link, start animation */
  useEffect(() => {
    if ((openingLink && isOpeningLinkFromBefore(openingLink)) || openingLink === titleHref) {
      // Going backwards in the navigation tree
      if (position === 'left100') setPosition('left0');
      else if (position === 'left200') setPosition('left100');
    } else if (openingLink && !isOpeningLinkFromBefore(openingLink)) {
      // Going forward in the navigation tree
      if (position === 'left0') setPosition('left100');
      else if (position === 'left100') setPosition('left200');
    }
  }, [openingLink]);

  if (!hasNavigationContent || !isNotLargeScreen) return null;

  const goDeeper = (link: React.ReactElement) => {
    setOpeningLink(link);
    setIsAnimating(true);
  };

  const goBack = (link: React.ReactElement | string) => {
    setOpeningLink(link);
    setIsAnimating(true);
  };

  const animationsDone = async (e) => {
    // If user was opening a dropdown, set the active open link
    if (openingLink && !isOpeningFrontPageLinks) {
      let newLinks = [];
      const newlyOpenedLink = openingLink;
      // Going backwards
      if (isOpeningLinkFromBefore(openingLink)) newLinks = openMainLinks.slice(0, -1);
      // Going deeper
      else newLinks = [...openMainLinks, newlyOpenedLink];
      setOpenMainLinks(newLinks);
      setOpeningLink(null);
    } else if (isOpeningFrontPageLinks) {
      // Opening front page links, reset state links
      setOpenMainLinks([]);
      setOpeningLink(null);
    }
    setIsAnimating(false);

    if (e.propertyName === 'transform' && e.target.firstChild.nodeName === 'SECTION') {
      // If the animation was related to moving menus, set the focus to the currently active page link
      const linkElement = await getIsElementLoaded(`#${currentActiveLinkId}`);
      linkElement.focus();
      // Set non-visible sections as hidden so they are not focusable
    }
  };

  return (
    <div className={classNames(styles.headerNavigationMenu, mobileMenuOpen && styles.mobileMenuOpen)}>
      <div className={classNames(styles.navigationWrapper, styles[position])} onTransitionEnd={animationsDone}>
        {/* Previous menu links */}
        {openMainLinks.length >= 1 && (
          <NavigationSection
            universalLinks={universalLinks}
            aria-hidden
            className={isAnimating ? styles.visible : styles.hidden}
          >
            <ActiveDropdownLink link={previousDropdownLink} frontPageLabel={frontPageLabel} titleHref={titleHref} />
            <MenuLinks links={previousMenuLinks} onDropdownButtonClick={goDeeper} />
          </NavigationSection>
        )}
        {/* Currently open links */}
        <NavigationSection universalLinks={universalLinks} aria-hidden={isRenderingDeepestMenu}>
          {openMainLinks.length > 0 && (
            <PreviousDropdownLink
              link={!isRenderingDeepestMenu ? previousDropdownLink : previousDropdownLink}
              frontPageLabel={frontPageLabel}
              titleHref={titleHref}
              onClick={goBack}
            />
          )}
          <ActiveDropdownLink
            id={!isRenderingDeepestMenu ? currentActiveLinkId : undefined}
            link={!isRenderingDeepestMenu ? currentlyActiveMainLink : previousDropdownLink}
            frontPageLabel={frontPageLabel}
            titleHref={titleHref}
          />
          <MenuLinks links={menuLinks} onDropdownButtonClick={goDeeper} />
        </NavigationSection>
        {/* Next links. Rendered at the deepest level. */}
        {!openingLink && (
          <NavigationSection
            universalLinks={universalLinks}
            aria-hidden={!isRenderingDeepestMenu}
            className={isAnimating || isRenderingDeepestMenu ? styles.visible : styles.hidden}
          >
            <PreviousDropdownLink
              link={previousDropdownLink}
              frontPageLabel={frontPageLabel}
              titleHref={titleHref}
              onClick={goBack}
            />
            <ActiveDropdownLink
              id={isRenderingDeepestMenu ? currentActiveLinkId : undefined}
              link={currentlyActiveMainLink}
              frontPageLabel={frontPageLabel}
              titleHref={titleHref}
            />
            <MenuLinks links={menuLinks} onDropdownButtonClick={goDeeper} />
          </NavigationSection>
        )}
        {/* Render the menu animating into view for better UX. */}
        {openingLink && typeof openingLink !== 'string' && (
          <NavigationSection
            universalLinks={universalLinks}
            aria-hidden={!openingLink}
            className={isAnimating ? styles.visible : styles.hidden}
          >
            <PreviousDropdownLink
              link={currentlyActiveMainLink}
              frontPageLabel={frontPageLabel}
              titleHref={titleHref}
              onClick={goBack}
            />
            <ActiveDropdownLink link={openingLink} frontPageLabel={frontPageLabel} titleHref={titleHref} />
            <MenuLinks links={openingLink.props.dropdownLinks} onDropdownButtonClick={goDeeper} />
          </NavigationSection>
        )}
      </div>
      <HeaderActionBarLogo
        logoProps={{
          ...logoProps,
          className: classNames(logoProps.className, styles.logoLink),
        }}
        logo={logo}
      />
    </div>
  );
};
