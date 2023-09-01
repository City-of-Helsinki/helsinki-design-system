import React, { cloneElement, isValidElement, useRef, useState } from 'react';

// import base styles
import '../../../../../styles/base.css';
import styles from './NavigationLinkDropdown.module.scss';
import { IconAngleDown } from '../../../../../icons';
import { useHeaderContext } from '../../../HeaderContext';
import classNames from '../../../../../utils/classNames';
import { getChildElementsEvenIfContainersInbetween } from '../../../../../utils/getChildren';

export enum NavigationLinkInteraction {
  Hover = 'hover',
  Click = 'click',
}
export enum DropdownMenuPosition {
  Left = 'left',
  Right = 'right',
}
export type NavigationLinkDropdownProps = React.PropsWithChildren<{
  /**
   * Additional class names.
   */
  className?: string;
  /**
   * Aria-label for the dropdown button to describe closing the dropdown.
   */
  closeDropdownAriaButtonLabel?: string;
  /**
   * Additional class names for the dropdown button.
   */
  dropdownButtonClassName?: string;
  /**
   * Direction for dropdown position.
   * @default DropdownMenuPosition.Right
   */
  dynamicPosition?: DropdownMenuPosition;
  /**
   * Element index given by parent mapping.
   * @internal
   */
  index?: number;
  /**
   * Is dropdown open.
   */
  open: boolean;
  /**
   * Aria-label for the dropdown button to describe opening the dropdown.
   */
  openDropdownAriaButtonLabel?: string;
  /**
   * Function that is called when open value is changed.
   */
  setOpen: (isOpen: boolean, interaction: NavigationLinkInteraction) => void;
  /**
   * Depth in nested dropdowns.
   * @internal
   */
  depth: number;
}>;

export const NavigationLinkDropdown = ({
  children,
  dynamicPosition = DropdownMenuPosition.Right,
  className,
  index,
  open,
  setOpen,
  depth = 0,
  closeDropdownAriaButtonLabel,
  openDropdownAriaButtonLabel,
  dropdownButtonClassName,
}: NavigationLinkDropdownProps) => {
  // State for which nested dropdown link is open
  const { isNotLargeScreen } = useHeaderContext();
  const [openSubNavIndex, setOpenSubNavIndex] = useState<number>(-1);
  const ref = useRef<HTMLUListElement>(null);
  const chevronClasses = open ? classNames(styles.chevron, styles.chevronOpen) : styles.chevron;
  const depthClassName = styles[`depth-${depth - 1}`];
  const dropdownDirectionClass = dynamicPosition
    ? classNames(styles.dropdownMenu, styles[dynamicPosition])
    : styles.dropdownMenu;

  const handleMenuButtonClick = () => setOpen(!open, NavigationLinkInteraction.Click);
  const defaultOpenDropdownAriaLabel = 'Avaa alasvetovalikko.';
  const defaultCloseDropdownAriaLabel = 'Sulje alasvetovalikko.';
  const getDefaultButtonAriaLabel = () => {
    if (open) return closeDropdownAriaButtonLabel || defaultCloseDropdownAriaLabel;
    return openDropdownAriaButtonLabel || defaultOpenDropdownAriaLabel;
  };

  const childElements = getChildElementsEvenIfContainersInbetween(children);

  return (
    <>
      <button
        type="button"
        className={classNames(styles.button, { isNotLargeScreen }, depthClassName, dropdownButtonClassName)}
        onClick={handleMenuButtonClick}
        data-testid={`dropdown-button-${index}`}
        aria-label={getDefaultButtonAriaLabel()}
        aria-expanded={open}
      >
        <IconAngleDown className={chevronClasses} />
      </button>
      <ul
        className={classNames(dropdownDirectionClass, { isNotLargeScreen }, className)}
        {...(!open && { style: { display: 'none' } })}
        data-testid={`dropdown-menu-${index}`}
        ref={ref}
      >
        {childElements.map((child, childIndex) => {
          return (
            // eslint-disable-next-line react/no-array-index-key
            <li key={`link-dropdown-${index}-${childIndex}`}>
              {isValidElement(child)
                ? cloneElement(child as React.ReactElement, {
                    index: childIndex,
                    openSubNavIndex,
                    setOpenSubNavIndex,
                    depth,
                    className: child.props.active
                      ? classNames(styles.dropdownLink, styles.activeLink)
                      : styles.dropdownLink,
                    dropdownButtonClassName,
                  })
                : child}
            </li>
          );
        })}
      </ul>
    </>
  );
};
NavigationLinkDropdown.componentName = 'HDSNavigationLinkDropdown';
