import React, { useCallback, useContext, useEffect, useRef, useState } from 'react';
import useMeasure from 'react-use-measure';
import mergeRefs from 'react-merge-refs';

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
   * Array of NavigationLink components to render in a dropdown. Can be used only inside navigation components.
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
  dropdownDirection = 'down',
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
  const [ref] = useMeasure({ debounce: 0, scroll: false, polyfill: ResizeObserver });
  const containerRef = useRef<HTMLDivElement>(null);

  // Handle dropdown open state by calling either internal state or context
  const handleDropdownOpen = (val: boolean) => {
    setDropdownOpen(val);
    // If sub navigation props given, call them
    if (openSubNavIndex !== undefined && setOpenSubNavIndex !== undefined) {
      setOpenSubNavIndex(val ? index : null);
    }
    // Otherwise it's safe to assume that this link is from main navigation and we can call context
    else {
      // If closing dropdown, call context only if this is the open main nav dropdown. No need for checks if opening though.
      // eslint-disable-next-line no-lonely-if
      if ((val !== isDropdownOpen && openMainNavIndex === index) || val) {
        setOpenMainNavIndex(val ? index : null);
      }
    }
  };

  const handleDropdownClickedOpen = (val: boolean) => {
    setDropdownOpenedBy(!val ? null : 'click');
    handleDropdownOpen(val);
  };

  const handleDropdownHoveredOpen = (val: boolean) => {
    setDropdownOpenedBy(!val ? null : 'hover');
    handleDropdownOpen(val);
  };

  const closeDropdown = () => {
    setDropdownOpen(false);
    setDropdownOpenedBy(null);
  };

  useEffect(() => {
    // If sub navigation index is provided, we don't need to react to main nav context changes.
    if (openSubNavIndex === undefined) {
      // Since only one navigation link menu should be open, close this one if it's open when another one opens.
      if (openMainNavIndex !== index && isDropdownOpen) {
        closeDropdown();
      }
    }
  }, [openMainNavIndex]);

  useEffect(() => {
    // If nested nav index differs from this, this link's dropdown should close
    if (openSubNavIndex !== index) closeDropdown();
  }, [openSubNavIndex]);

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
      {...(dropdownLinks && dropdownOpenedBy === 'hover' && { onMouseLeave: () => handleDropdownHoveredOpen(false) })}
      ref={mergeRefs<HTMLDivElement>([ref, containerRef])}
    >
      <Link
        className={classNames(styles.navigationLink, className, active ? styles.active : undefined)}
        href={href}
        size={size}
        {...rest}
        {...(active && { active: 'true' })}
        {...(dropdownLinks && dropdownOpenedBy !== 'click' && { onMouseEnter: () => handleDropdownHoveredOpen(true) })}
      >
        {label}
      </Link>
      {dropdownLinks && (
        <NavigationLinkDropdown
          open={isDropdownOpen}
          setOpen={handleDropdownClickedOpen}
          index={index}
          dropdownDirection={dropdownDirection}
        >
          {dropdownLinks}
        </NavigationLinkDropdown>
      )}
    </span>
  );
};
