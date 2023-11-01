import React, { cloneElement, isValidElement, useRef, useState } from 'react';

// import base styles
import '../../../../../styles/base.css';
import styles from './HeaderLinkDropdown.module.scss';
import { IconAngleDown, IconAngleLeft, IconAngleRight } from '../../../../../icons';
import { useHeaderContext } from '../../../HeaderContext';
import classNames from '../../../../../utils/classNames';
import { getChildElementsEvenIfContainersInbetween } from '../../../../../utils/getChildren';
import useIsomorphicLayoutEffect from '../../../../../hooks/useIsomorphicLayoutEffect';

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
  position?: DropdownMenuPosition;
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
  setOpen: (isOpen: boolean) => void;
  /**
   * Depth in nested dropdowns.
   * @internal
   */
  depth: number;
}>;

export const HeaderLinkDropdown = ({
  children,
  position = DropdownMenuPosition.Right,
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
  const [dropdownPosition, setDropdownPosition] = useState<{ left?: number; right?: number }>({ left: 0 });

  const ref = useRef<HTMLUListElement>(null);

  const chevronClassName = open ? classNames(styles.chevron, styles.chevronOpen) : styles.chevron;
  const isFirstLevelDropdown = depth === 1;
  const depthClassName = styles[`depth-${depth - 1}`];
  const dropdownDirectionClass = position ? classNames(styles.dropdownMenu, styles[position]) : styles.dropdownMenu;

  const handleMenuButtonClick = (e) => {
    e.preventDefault();
    setOpen(!open);
  };

  const defaultOpenDropdownAriaLabel = 'Avaa alasvetovalikko.';
  const defaultCloseDropdownAriaLabel = 'Sulje alasvetovalikko.';
  const getDefaultButtonAriaLabel = () => {
    if (open) return closeDropdownAriaButtonLabel || defaultCloseDropdownAriaLabel;
    return openDropdownAriaButtonLabel || defaultOpenDropdownAriaLabel;
  };

  const childElements = getChildElementsEvenIfContainersInbetween(children);

  const renderIcon = () => {
    if (depth > 1 && position === DropdownMenuPosition.Right) return <IconAngleRight className={chevronClassName} />;
    if (depth > 1 && position === DropdownMenuPosition.Left) return <IconAngleLeft className={chevronClassName} />;
    return <IconAngleDown className={chevronClassName} />;
  };

  useIsomorphicLayoutEffect(() => {
    const setPosition = (current: HTMLUListElement) => {
      if (current != null) {
        const { right, width } = current.getBoundingClientRect();

        if (window.innerWidth <= right) {
          setDropdownPosition({ right: 0 });
        } else if (window.innerWidth - right > width) {
          setDropdownPosition({ left: 0 });
        }
      }
    };

    if (isFirstLevelDropdown) {
      setPosition(ref.current);

      if (open) {
        window.addEventListener('resize', () => setPosition(ref.current));
      }
    }

    return () => {
      window.removeEventListener('resize', () => setPosition(ref.current));

      setDropdownPosition({ left: 0 });
    };
  }, [ref.current, open, isFirstLevelDropdown]);

  return (
    <>
      <button
        type="button"
        className={classNames(styles.button, { isNotLargeScreen }, depthClassName, dropdownButtonClassName)}
        onClick={handleMenuButtonClick}
        data-testid={`dropdown-button-${index}`}
        aria-label={getDefaultButtonAriaLabel()}
      >
        {renderIcon()}
      </button>
      <ul
        style={isFirstLevelDropdown ? dropdownPosition : {}}
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
HeaderLinkDropdown.componentName = 'HDSNavigationLinkDropdown';
