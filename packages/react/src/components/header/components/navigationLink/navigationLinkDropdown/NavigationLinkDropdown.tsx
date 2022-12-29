import React, { cloneElement, isValidElement, useRef, useState } from 'react';

// import core base styles
import 'hds-core';
import styles from './NavigationLinkDropdown.module.scss';
import { IconAngleDown } from '../../../../../icons';
import classNames from '../../../../../utils/classNames';

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
   * Function that is called when open value is changed.
   */
  setOpen: (isOpen: boolean, event: React.MouseEvent) => void;
}>;

export const NavigationLinkDropdown = ({
  children,
  dynamicPosition = DropdownMenuPosition.Right,
  index,
  open,
  setOpen,
}: NavigationLinkDropdownProps) => {
  // State for which nested dropdown link is open
  const [openSubNavIndex, setOpenSubNavIndex] = useState<number>(-1);
  const ref = useRef<HTMLUListElement>(null);
  const chevronClasses = open ? classNames(styles.chevron, styles.chevronOpen) : styles.chevron;
  const dropdownDirectionClass = dynamicPosition
    ? classNames(styles.dropdownMenu, styles[dynamicPosition])
    : styles.dropdownMenu;

  const handleMenuButtonClick = (e: React.MouseEvent) => setOpen(!open, e);

  return (
    <div className={styles.navigationLinkDropdownContainer}>
      <button
        type="button"
        className={styles.button}
        onClick={handleMenuButtonClick}
        data-testid={`dropdown-button-${index}`}
      >
        <IconAngleDown className={chevronClasses} />
      </button>
      <ul
        className={dropdownDirectionClass}
        {...(!open && { style: { display: 'none' } })}
        data-testid={`dropdown-menu-${index}`}
        ref={ref}
      >
        {React.Children.map(children, (child, childIndex) => {
          return (
            // eslint-disable-next-line react/no-array-index-key
            <li key={index}>
              {isValidElement(child)
                ? cloneElement(child as React.ReactElement, {
                    index: childIndex,
                    openSubNavIndex,
                    setOpenSubNavIndex,
                    className: child.props.active
                      ? classNames(styles.dropdownLink, styles.activeLink)
                      : styles.dropdownLink,
                  })
                : child}
            </li>
          );
        })}
      </ul>
    </div>
  );
};
NavigationLinkDropdown.componentName = 'HDSNavigationLinkDropdown';
