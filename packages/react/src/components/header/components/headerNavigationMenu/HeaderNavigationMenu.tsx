import React, { Children, cloneElement, isValidElement, useEffect } from 'react';

// import base styles
import '../../../../styles/base.css';

import { useHeaderContext, useSetHeaderContext } from '../../HeaderContext';
import classNames from '../../../../utils/classNames';
import { getChildElementsEvenIfContainersInbetween } from '../../../../utils/getChildren';
import { HeaderNavigationMenuContextProvider } from './HeaderNavigationMenuContext';
import styles from './HeaderNavigationMenu.module.scss';

export type HeaderNavigationMenuProps = React.PropsWithChildren<{
  /**
   * aria-label for describing universal bar.
   */
  ariaLabel?: string;
  /**
   * Children are expected to be NavigationLink components or a container with NavigationLink components inside.
   */
  children?: React.ReactNode;
  /**
   * ID of the header element.
   */
  id?: string;
}>;

const renderHeaderNavigationMenuItem = (child, index) => {
  const { isNotLargeScreen } = useHeaderContext();
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
  const { navigationContent } = useHeaderContext();
  return (
    <>
      {Children.map(navigationContent, (child, index) => {
        if (!isValidElement(child)) return null;
        return renderHeaderNavigationMenuItem(child, index);
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
      <nav role="navigation" aria-label={ariaLabel} id={id} className={styles.headerNavigationMenu}>
        <ul className={styles.headerNavigationMenuList}>
          <HeaderNavigationMenuContextProvider>
            <HeaderNavigationMenuContent />
          </HeaderNavigationMenuContextProvider>
        </ul>
      </nav>
    </div>
  );
};
