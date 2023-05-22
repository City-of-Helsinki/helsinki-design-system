import React, { MouseEventHandler, cloneElement, useCallback, useContext, useEffect, useRef, useState } from 'react';

// import base styles
import '../../../../styles/base.css';
import { v4 as uuidv4 } from 'uuid';

// import core base styles
import 'hds-core';
import styles from './NavigationLink.module.scss';
import { styleBoundClassNames } from '../../../../utils/classNames';
import { Link } from '../../../link';
import { NavigationLinkDropdown, NavigationLinkInteraction, DropdownMenuPosition } from './navigationLinkDropdown';
import { useHeaderNavigationMenuContext } from '../headerNavigationMenu/HeaderNavigationMenuContext';
import { DropdownDirection } from './types';
import { useHeaderContext } from '../../HeaderContext';

const classNames = styleBoundClassNames(styles);

export type LinkProps = {
  /**
   * Indicator for active link. This is used in HeaderNavigationMenu.
   */
  active?: boolean;
  /**
   * Additional class names to apply.
   */
  className?: string;
  /**
   * Boolean for indicating whether the link has a dropdown menu.
   */
  hasDropdownLinks?: boolean;
  /**
   * Hypertext Reference of the link.
   */
  href: string;
  /**
   * Boolean for indicating whether the link's dropdown menu is open.
   */
  isDropdownOpen?: boolean;
  /**
   * Label for link.
   */
  label: string;
  /**
   * Optional event handler for onMouseEnter.
   */
  onMouseEnter?: MouseEventHandler;
  /**
   * Depth in nested dropdowns.
   * @internal
   */
  depth: number;
};

export type NavigationLinkProps = Omit<
  React.ComponentPropsWithoutRef<'a'>,
  'target' | 'href' | 'onPointerEnterCapture' | 'onPointerLeaveCapture' | 'aria-label'
> & {
  /**
   * Indicator for active link. This is used in HeaderNavigationMenu.
   */
  active?: boolean;
  /**
   * Additional class names to apply for the link element.
   */
  className?: string;
  /**
   * Aria-label for the dropdown button to describe closing the dropdown.
   */
  closeDropdownAriaButtonLabel?: string;
  /**
   * Additional class name for the dropdown wrapper element.
   */
  wrapperClassName?: string;
  /**
   * Additional class name for the dropdown element.
   */
  dropdownClassName?: string;
  /**
   * Additional class name for the dropdown items.
   */
  dropdownLinkClassName?: string;
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
  href?: string;
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
   * Aria-label for the dropdown button to describe opening the dropdown.
   */
  openDropdownAriaButtonLabel?: string;
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
   * Depth in nested dropdowns.
   * @internal
   */
  depth?: number;
};

const getLinkComponent = ({
  href = '#',
  label,
  className: classNameProp,
  depth,
  active,
  hasDropdownLinks,
  isDropdownOpen,
  ...rest
}: LinkProps) => {
  const { isNotLargeScreen } = useHeaderContext();
  const className = classNames(styles.navigationLink, styles[`depth-${depth}`], classNameProp, {
    active,
    isNotLargeScreen,
  });
  const props = {
    className,
    href,
    ...(active && { 'aria-selected': true }),
    ...(hasDropdownLinks && { 'aria-expanded': isDropdownOpen }),
    ...rest,
  };

  return <Link {...props}>{label}</Link>;
};

export const NavigationLink = ({
  active,
  className,
  wrapperClassName,
  dropdownDirection = DropdownDirection.Down,
  dropdownClassName,
  dropdownLinks,
  dropdownLinkClassName,
  href,
  index,
  label,
  openSubNavIndex,
  setOpenSubNavIndex,
  depth = 0,
  openDropdownAriaButtonLabel,
  closeDropdownAriaButtonLabel,
  ...rest
}: NavigationLinkProps) => {
  const { isNotLargeScreen } = useHeaderContext();
  const [isDropdownOpen, setDropdownOpen] = useState<boolean>(false);
  const [dropdownOpenedBy, setDropdownOpenedBy] = useState<null | NavigationLinkInteraction>(null);
  const [dynamicPosition, setDynamicPosition] = useState<null | DropdownMenuPosition>(null);
  const { openMainNavIndex, setOpenMainNavIndex } = useHeaderNavigationMenuContext();
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

  const linkProps: LinkProps = {
    className,
    href,
    label,
    depth,
    hasDropdownLinks: Boolean(dropdownLinks),
    isDropdownOpen,
    ...rest,
  };

  if (active) linkProps.active = true;
  if (dropdownLinks && dropdownOpenedBy !== NavigationLinkInteraction.Click)
    linkProps.onMouseEnter = () => handleDropdownOpen(true, NavigationLinkInteraction.Hover);

  const navigationLinkClassName = classNames(
    { isNotLargeScreen },
    styles.navigationLinkWrapper,
    styles[`depth-${depth}`],
    wrapperClassName,
  );

  return (
    <span
      className={navigationLinkClassName}
      {...(dropdownLinks &&
        dropdownOpenedBy === NavigationLinkInteraction.Hover && {
          onMouseLeave: () => handleDropdownOpen(false),
        })}
      ref={containerRef}
    >
      {getLinkComponent(linkProps)}
      {dropdownLinks && (
        <NavigationLinkDropdown
          open={isDropdownOpen}
          setOpen={handleDropdownOpen}
          index={index}
          depth={depth + 1}
          className={dropdownClassName}
          dynamicPosition={dynamicPosition}
          openDropdownAriaButtonLabel={openDropdownAriaButtonLabel}
          closeDropdownAriaButtonLabel={closeDropdownAriaButtonLabel}
        >
          {dropdownLinks.map((child) => {
            return cloneElement(child as React.ReactElement, {
              key: uuidv4(),
              wrapperClassName,
              dropdownClassName,
              dropdownLinkClassName,
            });
          })}
        </NavigationLinkDropdown>
      )}
    </span>
  );
};
