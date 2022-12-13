import React, { useContext, useEffect, useState } from 'react';

// import core base styles
import 'hds-core';
import styles from './NavigationLink.module.scss';
import classNames from '../../utils/classNames';
import { Link } from '../link';
import { HeaderNavigationMenuContext } from '../headerNavigationMenu/HeaderNavigationMenuContext';
import { NavigationLinkDropdown } from '../navigationLinkDropdown';

export type NavigationLinkProps = Omit<
  React.ComponentPropsWithoutRef<'a'>,
  'target' | 'href' | 'onPointerEnterCapture' | 'onPointerLeaveCapture' | 'aria-label'
> & {
  /**
   * Indicator for active link. This is used in HeaderNavigationMenu.
   */
  active?: boolean;
  /**
   * Additional class names to apply.
   */
  className?: string;
  /**
   * Set the direction for where the dropdown should appear.
   * @default 'down'
   */
  dropdownDirection?: 'down' | 'right';
  /**
   * Array of NavigationLink components to render in a dropdown.
   */
  dropdownLinks?: Array<React.ReactElement>;
  /**
   * Hypertext Reference of the link.
   */
  href?: string;
  /**
   * Element index given by parent mapping.
   * @internal
   */
  index?: string;
  /**
   * Label for link.
   */
  label: string;
  /**
   * Which sub navigation index is open.
   * @internal
   */
  openSubNavIndex?: string;
  /**
   * Set which sub navigation index is open.
   * @internal
   */
  setOpenSubNavIndex?: (val: string) => void;
  /**
   * Size of the link.
   */
  size?: 'S' | 'M' | 'L';
};

export const NavigationLink = ({
  active,
  className,
  dropdownLinks,
  href,
  index,
  label,
  openSubNavIndex,
  setOpenSubNavIndex,
  size,
  ...rest
}: NavigationLinkProps) => {
  const [isDropdownOpen, setDropdownOpen] = useState<boolean>(false);
  const [dropdownOpenedBy, setDropdownOpenedBy] = useState<null | ('hover' | 'click')>(null);
  const { openMainNavIndex, setOpenMainNavIndex } = useContext(HeaderNavigationMenuContext);

  const handleDropdownOpen = (val: boolean) => {
    // console.log('link open toggle', val);
    setDropdownOpen(val);
    // If sub navigation props given, call them
    if (openSubNavIndex !== undefined && setOpenSubNavIndex !== undefined) setOpenSubNavIndex(val ? index : null);
    // Otherwise it's safe to assume that this link is from main navigation and we can call context
    else {
      setOpenMainNavIndex(val ? index : null);
    }
  };

  const handleDropdownClickedOpen = (val: boolean) => {
    setDropdownOpenedBy(val === false ? null : 'click');
    handleDropdownOpen(val);
  };

  const handleDropdownHoveredOpen = (val: boolean) => {
    setDropdownOpenedBy(val === false ? null : 'hover');
    handleDropdownOpen(val);
  };

  useEffect(() => {
    // If sub navigation index is provided, we don't need to react to main nav context changes.
    if (openSubNavIndex === undefined) {
      // Since only one navigation link menu should be open, close this one if it's open when another one opens.
      if (openMainNavIndex !== index && isDropdownOpen) {
        setDropdownOpenedBy(null);
        setDropdownOpen(false);
      }
    }
  }, [openMainNavIndex]);

  const renderDropdown = () => {
    if (dropdownLinks === undefined) return null;
    return (
      <NavigationLinkDropdown open={isDropdownOpen} setOpen={handleDropdownClickedOpen} index={index}>
        {dropdownLinks}
      </NavigationLinkDropdown>
    );
  };
  // console.log(`${index}, ${dropdownOpenedBy}`);
  return (
    <span
      className={styles.navigationLinkWrapper}
      {...(dropdownLinks && dropdownOpenedBy === 'hover' && { onMouseLeave: () => handleDropdownHoveredOpen(false) })}
    >
      <Link
        className={classNames(styles.navigationLink, className)}
        href={href}
        size={size}
        {...rest}
        {...(active && { active: 'true' })}
        {...(dropdownLinks && dropdownOpenedBy !== 'click' && { onMouseEnter: () => handleDropdownHoveredOpen(true) })}
      >
        {label}
      </Link>
      {renderDropdown()}
    </span>
  );
};
