import React, { cloneElement, isValidElement, useEffect } from 'react';

import '../../../../styles/base.module.css';
import styles from './HeaderNavigationMenu.module.scss';
import { useHeaderContext, useSetHeaderContext } from '../../HeaderContext';
import classNames from '../../../../utils/classNames';
import { getChildElementsEvenIfContainersInbetween, getChildrenAsArray } from '../../../../utils/getChildren';

export type HeaderNavigationMenuProps = React.PropsWithChildren<{
  /**
   * Aria-label for describing universal bar.
   */
  ariaLabel?: string;
  /**
   * Children are expected to be HeaderLink components or a container with HeaderLink components inside.
   */
  children?: React.ReactNode;
  /**
   * ID of the header element.
   */
  id?: string;
}>;

const renderHeaderNavigationMenuItem = (child, index, isNotLargeScreen) => {
  const linkContentClass = isNotLargeScreen
    ? styles.headerNavigationMenuLinkContentMobile
    : styles.headerNavigationMenuLinkContent;

  const activeLinkClassName = classNames(linkContentClass, styles.headerNavigationMenuLinkContentActive);
  const linkContainerClasses = child.props.active && !isNotLargeScreen ? activeLinkClassName : linkContentClass;

  // Pass several className props downwards
  const mobileNode = cloneElement(child as React.ReactElement, {
    dropdownLinkClassName: styles.headerNavigationMenuDropdownLinkMobile,
    dropdownClassName: styles.headerNavigationMenuDropdownMobile,
    wrapperClassName: styles.headerNavigationMenuLinkWrapperMobile,
    dropdownButtonClassName: styles.headerNavigationMenuDropdownButtonMobile,
    className: classNames(child.props.className, styles.headerNavigationMenuLinkMobile),
    index,
  });

  const desktopNode = cloneElement(child as React.ReactElement, {
    className: classNames(child.props.className, styles.headerNavigationMenuLink),
    index,
  });

  const node = isNotLargeScreen ? mobileNode : desktopNode;

  return (
    // eslint-disable-next-line react/no-array-index-key
    <li key={index}>
      <span className={linkContainerClasses}>{node}</span>
    </li>
  );
};

export const HeaderNavigationMenuContent = () => {
  const { isNotLargeScreen, navigationContent } = useHeaderContext();
  const navigationLinks = getChildrenAsArray(navigationContent);
  return (
    <>
      {navigationLinks.map((child, index) => {
        if (!isValidElement(child)) return null;
        return renderHeaderNavigationMenuItem(child, index, isNotLargeScreen);
      })}
    </>
  );
};

export const HeaderNavigationMenu = ({ ariaLabel, children, id }: HeaderNavigationMenuProps) => {
  const { isNotLargeScreen } = useHeaderContext();
  const { setNavigationContent } = useSetHeaderContext();

  useEffect(() => {
    const navigationContent = getChildElementsEvenIfContainersInbetween(children);
    setNavigationContent(navigationContent);
  }, [children]);

  if (isNotLargeScreen) return null;

  return (
    <div className={styles.headerNavigationMenuContainer}>
      <nav aria-label={ariaLabel} id={id} className={styles.headerNavigationMenu}>
        <ul className={styles.headerNavigationMenuList}>
          <HeaderNavigationMenuContent />
        </ul>
      </nav>
    </div>
  );
};
