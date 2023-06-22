import React, { Children, cloneElement, isValidElement } from 'react';

import { HeaderNavigationMenuContextProvider } from '../headerNavigationMenu/HeaderNavigationMenuContext';
import { useHeaderContext } from '../../HeaderContext';
import { styleBoundClassNames } from '../../../../utils/classNames';
import styles from './HeaderActionBarNavigationMenu.module.scss';

const classNames = styleBoundClassNames(styles);

// FIXME
const dropdownLinkClassName = styles.headerNavigationMenuDropdownLink;
const dropdownClassName = styles.headerNavigationMenuDropdown;
const wrapperClassName = styles.headerNavigationMenuLinkWrapper;
const activeLinkClassName = classNames(
  styles.headerNavigationMenuLinkContent,
  styles.headerNavigationMenuLinkContentActive,
);

const renderHeaderNavigationMenuItem = (child, index) => {
  const linkContainerClasses = child.props.active ? activeLinkClassName : styles.headerNavigationMenuLinkContent;
  const className = classNames(child.props.className, styles.headerNavigationMenuLink);
  const node = cloneElement(child as React.ReactElement, {
    dropdownLinkClassName,
    dropdownClassName,
    wrapperClassName,
    className,
    index,
  });

  return (
    // eslint-disable-next-line react/no-array-index-key
    <li key={index} className={styles.headerNavigationMenuLinkContainer}>
      <span className={linkContainerClasses}>{node}</span>
    </li>
  );
};

const HeaderNavigationMenuContent = () => {
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

export const HeaderActionBarNavigationMenu = () => {
  const { hasNavigationContent, isNotLargeScreen, mobileMenuOpen } = useHeaderContext();
  const className = classNames(styles.headerNavigationMenu, { mobileMenuOpen });

  if (!hasNavigationContent || !isNotLargeScreen) return null;

  return (
    <nav role="navigation" className={className}>
      <ul className={styles.headerNavigationMenuList}>
        <HeaderNavigationMenuContextProvider>
          <HeaderNavigationMenuContent />
        </HeaderNavigationMenuContextProvider>
      </ul>
    </nav>
  );
};
