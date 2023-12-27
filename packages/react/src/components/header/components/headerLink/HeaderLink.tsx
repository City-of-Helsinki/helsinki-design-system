import React, { cloneElement, useCallback, useEffect, useRef, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

// import base styles
import '../../../../styles/base.css';
import styles from './HeaderLink.module.scss';
import { styleBoundClassNames } from '../../../../utils/classNames';
import { Link } from '../../../link';
import { HeaderLinkDropdown, DropdownMenuPosition } from './headerLinkDropdown';
import { useHeaderContext, useSetHeaderContext } from '../../HeaderContext';
import { MergeElementProps } from '../../../../common/types';
import useIsomorphicLayoutEffect from '../../../../hooks/useIsomorphicLayoutEffect';

const classNames = styleBoundClassNames(styles);

export type NavigationLinkProps<ReactElement> = {
  /**
   * Indicator for active link. This is used in HeaderNavigationMenu.
   */
  active?: boolean;
  /**
   * Element or component to use instead of the default HDS Link.
   * @default Link
   * @example
   * ```ts
   * as={CustomLink}
   * ```
   */
  as?: ReactElement;
  /**
   * Additional class names to apply for the link element.
   */
  className?: string;
  /**
   * Aria-label for the dropdown button to describe closing the dropdown.
   */
  closeDropdownAriaButtonLabel?: string;
  /**
   * Depth in nested dropdowns.
   * @internal
   */
  depth?: number;
  /**
   * Additional class name for the dropdown button.
   */
  dropdownButtonClassName?: string;
  /**
   * Additional class name for the dropdown element.
   */
  dropdownClassName?: string;
  /**
   * Additional class name for the dropdown items.
   */
  dropdownLinkClassName?: string;
  /**
   * Array of HeaderLink components to render in a dropdown. Can be used only inside navigation components.
   */
  dropdownLinks?: Array<React.ReactElement>;
  /**
   * Hypertext Reference of the link.
   * @default #
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
   * Callback fired when the dropdown button is clicked.
   */
  onDropdownButtonClick?: () => void;
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
   * Additional class name for the NavigationLink wrapper element.
   */
  wrapperClassName?: string;
};

export type HeaderNavigationLinkProps<ReactElement extends React.ElementType = 'a'> = MergeElementProps<
  ReactElement,
  NavigationLinkProps<ReactElement>
>;

export const HeaderLink = <T extends React.ElementType = 'a'>({
  active,
  as: LinkComponent,
  className,
  wrapperClassName,
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
  dropdownButtonClassName,
  onDropdownButtonClick,
  ...rest
}: HeaderNavigationLinkProps<T>) => {
  const Item = React.isValidElement(LinkComponent) ? LinkComponent.type : LinkComponent;
  const { isNotLargeScreen } = useHeaderContext();
  const [isDropdownOpen, setDropdownOpen] = useState<boolean>(false);
  const [dynamicPosition, setDynamicPosition] = useState<null | DropdownMenuPosition>(null);
  const { openMainNavIndex } = useHeaderContext();
  const { setOpenMainNavIndex } = useSetHeaderContext();
  const containerRef = useRef<HTMLSpanElement>(null);
  const isSubNavLink = openSubNavIndex !== undefined && setOpenSubNavIndex !== undefined;

  const getDropdownPosition = () => {
    // On SSR just set the menu on the right
    if (window === undefined) {
      return DropdownMenuPosition.Right;
    }
    if (containerRef.current != null) {
      /* Calculate does right side have enough space for dropdown. If not, put it to the left. */
      const { x: leftPosition, width } = containerRef.current.getBoundingClientRect();
      const rightPosition = leftPosition + width;
      return leftPosition > window.innerWidth - rightPosition ? DropdownMenuPosition.Left : DropdownMenuPosition.Right;
    }
    return DropdownMenuPosition.Right;
  };

  useIsomorphicLayoutEffect(() => {
    // Dynamic dropdown position calculation is only needed on first level of nested links
    if (depth === 1) setDynamicPosition(getDropdownPosition());
  }, []);

  // Handle dropdown open state by calling either internal state or context
  const handleDropdownOpen = (val: boolean) => {
    if (!isNotLargeScreen) {
      setDropdownOpen(val);
    }
    if (onDropdownButtonClick) onDropdownButtonClick();
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

  const closeDropdown = () => setDropdownOpen(false);

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

  const navigationWrapperLinkClassName = classNames(
    { isNotLargeScreen },
    styles.navigationLinkWrapper,
    styles[`depth-${depth}`],
    wrapperClassName,
  );
  const navigationLinkClassName = classNames(styles.headerLink, styles[`depth-${depth}`], className, {
    active,
    isNotLargeScreen,
  });

  return (
    <span
      className={navigationWrapperLinkClassName}
      ref={containerRef}
      {...(Boolean(dropdownLinks) && { 'aria-expanded': isDropdownOpen })}
    >
      <Item className={navigationLinkClassName} href={href} {...rest}>
        {label}
      </Item>
      {dropdownLinks && (
        <HeaderLinkDropdown
          open={isDropdownOpen}
          setOpen={handleDropdownOpen}
          index={index}
          depth={depth + 1}
          className={dropdownClassName}
          position={dynamicPosition}
          openDropdownAriaButtonLabel={openDropdownAriaButtonLabel}
          closeDropdownAriaButtonLabel={closeDropdownAriaButtonLabel}
          dropdownButtonClassName={dropdownButtonClassName}
        >
          {dropdownLinks.map((child) => {
            return cloneElement(child as React.ReactElement, {
              key: uuidv4(),
              wrapperClassName,
              dropdownClassName,
              dropdownLinkClassName,
            });
          })}
        </HeaderLinkDropdown>
      )}
    </span>
  );
};

HeaderLink.defaultProps = {
  as: Link,
  href: '#',
};
