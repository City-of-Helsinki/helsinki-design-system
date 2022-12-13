import React, { cloneElement, isValidElement, useEffect, useRef, useState } from 'react';
import useMeasure from 'react-use-measure';
import mergeRefs from 'react-merge-refs';

// import core base styles
import 'hds-core';
import styles from './NavigationLinkDropdown.module.scss';
import { IconAngleDown } from '../../icons';
import classNames from '../../utils/classNames';

export type NavigationLinkDropdownProps = React.PropsWithChildren<{
  /**
   * Element index given by parent mapping.
   * @internal
   */
  index?: string;
  /**
   * Is dropdown open.
   */
  open?: boolean;
  setOpen?: (isOpen: boolean) => void;
}>;

export const NavigationLinkDropdown = ({ children, index, open, setOpen }: NavigationLinkDropdownProps) => {
  // State for which nested dropdown link is open
  const [openSubNavIndex, setOpenSubNavIndex] = useState<string | null>(null);
  const [ref] = useMeasure({ debounce: 0, scroll: false, polyfill: ResizeObserver });
  // menuContainerSize
  const containerRef = useRef<HTMLDivElement>(null);
  const chevronClasses = open ? classNames(styles.chevron, styles.chevronOpen) : styles.chevron;
  const menuClasses = open ? styles.dropdownMenu : styles.hidden;

  useEffect(() => {
    // closes the menu when a user clicks outside the container element
    const handleOutsideClick = (e: MouseEvent) => {
      if (containerRef.current) {
        if (open && !containerRef.current.contains(e.target as Node)) {
          console.log('Should close on click');
          setOpen(false);
        }
      }
    };

    document.addEventListener('click', handleOutsideClick);
    return () => document.removeEventListener('click', handleOutsideClick);
  }, []);

  const handleOpenChange = () => {
    setOpen(!open);
  };
  return (
    <div ref={mergeRefs<HTMLDivElement>([ref, containerRef])}>
      <button type="button" className={styles.button} onClick={handleOpenChange}>
        <IconAngleDown className={chevronClasses} />
      </button>
      <div className={menuClasses}>
        {React.Children.map(children, (child) => {
          return isValidElement(child)
            ? cloneElement(child, {
                index: `${index}-nested${index}`,
                openSubNavIndex,
                setOpenSubNavIndex,
              })
            : child;
        })}
      </div>
    </div>
  );
};
NavigationLinkDropdown.componentName = 'HDSNavigationLinkDropdown';
