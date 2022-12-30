import React, { cloneElement, useCallback, useContext, useEffect, useRef, useState } from 'react';

// import core base styles
import 'hds-core';
import styles from './NavigationLink.module.scss';
import classNames from '../../../../utils/classNames';
import { Link } from '../../../link';
import { NavigationLinkDropdown, NavigationLinkInteraction, DropdownMenuPosition } from './navigationLinkDropdown';
import { HeaderNavigationMenuContext } from '../headerNavigationMenu/HeaderNavigationMenuContext';
import { DropdownDirection } from './types';

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
   * Set the direction where the dropdown should appear. Use DropdownDirection.Dynamic for nested dropdowns as it sets the dropdown menu to the right but if there's no space it'll put it to the left.
   * @default DropdownDirection.Down;
   */
  dropdownDirection?: DropdownDirection;
  /**
   * Array of NavigationLink components to render in a dropdown. Can be used only inside navigation components.
   */
  dropdownLinks?: Array<React.ReactElement>;
  /**
   * Hypertext Reference of the link.
   */
  href: string;
  /**
   * Element index given by parent mapping.
   * @internal
   */
  index?: number;
  /**
   * Label for link.
   */
  label: string;
  /**
   * Which sub navigation index is open.
   * @internal
   */
  openSubNavIndex?: number;
  /**
   * Set which sub navigation index is open.
   * @internal
   */
  setOpenSubNavIndex?: (val: number) => void;
  /**
   * Size of the link.
   */
  size?: 'S' | 'M' | 'L';
};

export const NavigationLink = ({
  active,
  className,
  dropdownDirection = DropdownDirection.Down,
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
  const [dropdownOpenedBy, setDropdownOpenedBy] = useState<null | NavigationLinkInteraction>(null);
  const [dynamicPosition, setDynamicPosition] = useState<null | DropdownMenuPosition>(null);
  const { openMainNavIndex, setOpenMainNavIndex } = useContext(HeaderNavigationMenuContext);
  const containerRef = useRef<HTMLSpanElement>(null);
  const isSubNavLink = openSubNavIndex !== undefined && setOpenSubNavIndex !== undefined;

  const handleDynamicMenuPosition = (val: boolean) => {
    // Null position when false so if user resizes browser, the calculation is done again
    if (!val) setDynamicPosition(null);
    // In case of SSR just set the menu to the right
    else if (val && window === undefined) setDynamicPosition(DropdownMenuPosition.Right);
    else {
      // eslint-disable-next-line no-lonely-if
      if (containerRef.current) {
        // Calculate which side has more space for the menu
        const { x: leftPosition, width } = containerRef.current.getBoundingClientRect();
        const rightPosition = leftPosition + width;
        const position =
          leftPosition > window.innerWidth - rightPosition ? DropdownMenuPosition.Left : DropdownMenuPosition.Right;
        setDynamicPosition(position);
      }
    }
  };

  // Handle dropdown open state by calling either internal state or context
  const handleDropdownOpen = (val: boolean, interaction?: NavigationLinkInteraction) => {
    // Set menu position if needed and how menu was opened
    if (dropdownDirection === DropdownDirection.Dynamic) handleDynamicMenuPosition(val);
    setDropdownOpenedBy(!val ? null : interaction);
    setDropdownOpen(val);
    // If sub navigation props given, call them
    if (isSubNavLink && index !== undefined) {
      setOpenSubNavIndex(val ? index : -1);
    }
    // Otherwise it's safe to assume that this link is from main navigation and we can call context
    else {
      // eslint-disable-next-line no-lonely-if
      if (((val !== isDropdownOpen && openMainNavIndex === index) || val) && setOpenMainNavIndex) {
        // If closing dropdown, call context only if this is the open main nav dropdown. No need for checks if opening though.
        setOpenMainNavIndex(val ? index : -1);
      }
    }
  };

  const closeDropdown = () => {
    setDropdownOpen(false);
    setDropdownOpenedBy(null);
  };

  useEffect(() => {
    // If sub navigation index is not provided, we need to react to main nav context changes.
    if (!isSubNavLink) {
      // Since only one navigation link menu should be open, close this one if it's not the one that's open.
      if (openMainNavIndex !== index && isDropdownOpen) {
        closeDropdown();
      }
    }
  }, [openMainNavIndex]);

  useEffect(() => {
    // If sub nav and it's index differs from this, this link's dropdown should close
    if (isSubNavLink && openSubNavIndex !== index && isDropdownOpen) {
      closeDropdown();
    }
  }, [openSubNavIndex]);

  // Close dropdown menu when clicked outside
  const handleOutsideClick = useCallback(
    (e: MouseEvent) => {
      if (isDropdownOpen && containerRef.current && !containerRef.current.contains(e.target as Node)) {
        closeDropdown();
      }
    },
    [isDropdownOpen],
  );

  /* Set event listener only when dropdown open */
  useEffect(() => {
    if (isDropdownOpen) document.addEventListener('click', handleOutsideClick);
    return () => document.removeEventListener('click', handleOutsideClick);
  }, [isDropdownOpen]);

  return (
    <span
      className={styles.navigationLinkWrapper}
      {...(dropdownLinks &&
        dropdownOpenedBy === NavigationLinkInteraction.Hover && {
          onMouseLeave: () => handleDropdownOpen(false),
        })}
      ref={containerRef}
    >
      <Link
        className={classNames(styles.navigationLink, className, active ? styles.active : undefined)}
        href={href}
        size={size}
        {...rest}
        {...(active && { active: 'true' })}
        {...(dropdownLinks &&
          dropdownOpenedBy !== NavigationLinkInteraction.Click && {
            onMouseEnter: () => handleDropdownOpen(true, NavigationLinkInteraction.Hover),
          })}
      >
        {label}
      </Link>
      {dropdownLinks && (
        <NavigationLinkDropdown
          open={isDropdownOpen}
          setOpen={handleDropdownOpen}
          index={index}
          dynamicPosition={dynamicPosition}
        >
          {React.Children.map(dropdownLinks, (child, childIndex) => {
            return cloneElement(child as React.ReactElement, {
              key: childIndex,
            });
          })}
        </NavigationLinkDropdown>
      )}
    </span>
  );
};
