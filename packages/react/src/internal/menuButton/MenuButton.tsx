import React, { useEffect, useRef, useState } from 'react';
// import core base styles
import 'hds-core';
import uniqueId from 'lodash.uniqueid';
import mergeRefs from 'react-merge-refs';
import useMeasure from 'react-use-measure';
import { ResizeObserver } from '@juggle/resize-observer';

import styles from './MenuButton.module.scss';
import { Menu } from './menu/Menu';
import { IconAngleDown, IconAngleUp } from '../../icons';
import classNames from '../../utils/classNames';
import { useMobile } from '../../hooks/useMobile';

export type MenuButtonProps = React.PropsWithChildren<{
  /**
   * aria-label for the dropdown toggle button
   */
  buttonAriaLabel?: string;
  /**
   * Additional class names to apply to the dropdown
   */
  className?: string;
  /**
   * Should the menu close after item is clicked
   */
  closeOnItemClick?: boolean;
  /**
   * Used to generate the first part of the id on the elements
   */
  id?: string;
  /**
   * Icon to be displayed in the dropdown
   */
  icon?: React.ReactNode;
  /**
   * Label for the dropdown
   */
  label: React.ReactNode;
  /**
   * Spacing between the toggle button and the menu
   */
  menuOffset?: number;
  /**
   * label outside
   */
  labelOutside?: boolean;
}>;

export const MenuButton = ({
  buttonAriaLabel,
  children,
  className,
  closeOnItemClick = false,
  icon,
  id: _id,
  label,
  menuOffset,
  labelOutside,
}: MenuButtonProps) => {
  const [ref, menuContainerSize] = useMeasure({ debounce: 0, scroll: false, polyfill: ResizeObserver });
  const [menuOpen, setMenuOpen] = useState<boolean>(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const id = useRef<string>(_id || uniqueId('hds-menu-button-')).current;
  const buttonId = `${id}-button`;
  const menuId = `${id}-menu`;
  const isMobile = useMobile();

  useEffect(() => {
    // closes the menu when a user clicks outside the container element
    const handleOutsideClick = (e: MouseEvent) => {
      if (containerRef.current) {
        if (menuOpen && !containerRef.current.contains(e.target as Node)) {
          setMenuOpen(false);
        }
      }
    };

    document.addEventListener('click', handleOutsideClick);
    return () => document.removeEventListener('click', handleOutsideClick);
  }, [menuOpen]);

  const [useHoverProps, setUseHoverProps] = useState(!isMobile);
  const hoverProps = {
    onMouseOver: () => setMenuOpen(true),
    onFocus: () => setMenuOpen(true),
    onBlur: () => setMenuOpen(false),
    onMouseLeave: () => setMenuOpen(false),
  };
  useEffect(() => labelOutside && setUseHoverProps(!isMobile), [isMobile]);

  return (
    <div
      ref={mergeRefs<HTMLDivElement>([ref, containerRef])}
      className={classNames(styles.menuButton, className)}
      {...(useHoverProps && hoverProps)}
    >
      {labelOutside && label}
      <button
        type="button"
        id={buttonId}
        className={styles.toggleButton}
        aria-label={buttonAriaLabel}
        aria-haspopup="true"
        aria-controls={menuId}
        aria-expanded={menuOpen}
        onClick={() => setMenuOpen(!menuOpen)}
      >
        {icon}
        {!labelOutside && <span className={styles.toggleButtonLabel}>{label}</span>}
        {menuOpen ? <IconAngleUp aria-hidden /> : <IconAngleDown aria-hidden />}
      </button>
      <Menu
        id={menuId}
        aria-labelledby={buttonId}
        menuContainerSize={menuContainerSize}
        menuOffset={menuOffset}
        menuOpen={menuOpen}
        onItemClick={closeOnItemClick ? () => setMenuOpen(false) : undefined}
      >
        {children}
      </Menu>
    </div>
  );
};
