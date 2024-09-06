import React, { cloneElement, isValidElement, useEffect } from 'react';

import '../../../../styles/base.module.css';
import styles from './HeaderNavigationMenu.module.scss';
import { useHeaderContext, useSetHeaderContext } from '../../HeaderContext';
import classNames from '../../../../utils/classNames';
import { getChildElementsEvenIfContainersInbetween, getChildrenAsArray } from '../../../../utils/getChildren';
import { AllElementPropsWithoutRef } from '../../../../utils/elementTypings';

export type HeaderNavigationMenuProps = React.PropsWithChildren<
  AllElementPropsWithoutRef<'nav'> & {
    /**
     * Children are expected to be HeaderLink components or a container with HeaderLink components inside.
     */
    children?: React.ReactNode;
    /**
     * ID of the header element.
     */
    id?: string;
  }
>;

const renderHeaderNavigationMenuItem = (child, index, isSmallScreen) => {
  const linkContentClass = isSmallScreen
    ? styles.headerNavigationMenuLinkContentMobile
    : styles.headerNavigationMenuLinkContent;

  const activeLinkClassName = classNames(linkContentClass, styles.headerNavigationMenuLinkContentActive);
  const linkContainerClasses = child.props.active && !isSmallScreen ? activeLinkClassName : linkContentClass;

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

  const node = isSmallScreen ? mobileNode : desktopNode;

  return (
    // eslint-disable-next-line react/no-array-index-key
    <li key={index}>
      <span className={linkContainerClasses}>{node}</span>
    </li>
  );
};

export const HeaderNavigationMenuContent = () => {
  const { isSmallScreen, navigationContent } = useHeaderContext();
  const navigationLinks = getChildrenAsArray(navigationContent);
  return (
    <>
      {navigationLinks.map((child, index) => {
        if (!isValidElement(child)) return null;
        return renderHeaderNavigationMenuItem(child, index, isSmallScreen);
      })}
    </>
  );
};

export const HeaderNavigationMenu = ({ children, className, ...rest }: HeaderNavigationMenuProps) => {
  const { isSmallScreen } = useHeaderContext();
  const { setNavigationContent } = useSetHeaderContext();

  useEffect(() => {
    const navigationContent = getChildElementsEvenIfContainersInbetween(children);
    setNavigationContent(navigationContent);
  }, [children]);

  if (isSmallScreen) return null;

  return (
    <div className={styles.headerNavigationMenuContainer}>
      <nav {...rest} className={classNames(styles.headerNavigationMenu, className)}>
        <ul className={styles.headerNavigationMenuList}>
          <HeaderNavigationMenuContent />
        </ul>
      </nav>
    </div>
  );
};
