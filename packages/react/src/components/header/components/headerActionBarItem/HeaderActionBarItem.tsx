/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useRef, useState } from 'react';

import classes from './HeaderActionBarItem.module.scss';
import { HeaderActionBarItemButton, HeaderActionBarItemButtonProps } from './HeaderActionBarItemButton';
import { useHeaderContext } from '../../HeaderContext';
import classNames from '../../../../utils/classNames';
import { AllElementPropsWithRef } from '../../../../utils/elementTypings';
import { addDocumentFocusPrevention } from '../../utils/focusPrevention';

export type HeaderActionBarItemProps = React.PropsWithChildren<
  AllElementPropsWithRef<'div'> & {
    /**
     * An avatar which replaces the icon. Usually user's initials, but can be any Element.
     */
    avatar?: string | JSX.Element;
    /**
     * Icon for the action bar item when dropdown is open.
     */
    closeIcon?: JSX.Element;
    /**
     * Label for the action bar item when dropdown is open.
     */
    closeLabel?: string | JSX.Element;
    /**
     * Additional classname for the dropdown element.
     */
    dropdownClassName?: string;
    /**
     * Fix the item position to the right side of the action bar.
     */
    fixedRightPosition?: boolean;
    /**
     * Possibility to use a full-width version of the dropdown, for example in mobile use.
     */
    fullWidth?: boolean;
    /**
     * Makes only the dropdown full-width without affecting the button styling.
     * Use this when you want a full-width dropdown but keep the normal button appearance.
     */
    fullWidthDropdown?: boolean;
    /**
     * Icon for the action bar item.
     */
    icon?: JSX.Element;
    /**
     * Additional classname for the icon.
     */
    iconClassName?: string;
    /**
     * ID of the dropdown item.
     */
    id: string;
    /**
     * Label for the action bar item.
     */
    label?: string | JSX.Element;
    /**
     * Positions the label right side of the icon.
     */
    labelOnRight?: boolean;
    /**
     * Menu button resizing is prevented by rendering button's active state to a separate element.
     */
    preventButtonResize?: boolean;
  }
>;

export const HeaderActionBarItem = (properties: HeaderActionBarItemProps) => {
  const {
    id,
    children,
    label,
    fullWidth,
    fullWidthDropdown,
    className: classNameProp,
    iconClassName: iconClassNameProp,
    dropdownClassName: dropdownClassNameProp,
    closeLabel,
    icon,
    closeIcon,
    'aria-label': ariaLabel,
    labelOnRight,
    fixedRightPosition,
    preventButtonResize,
    avatar,
    ...rest
  } = properties;
  const dropdownContentElementRef = useRef<HTMLDivElement>(null);
  const containerElementRef = useRef<HTMLDivElement>(null);
  const backdropRef = useRef<HTMLDivElement>(null);
  const originalTabIndexes = useRef<Map<Element, string | null>>(new Map());
  const [hasContent, setHasContent] = useState(false);
  const { isSmallScreen } = useHeaderContext();
  const [visible, setDisplayProperty] = useState(false);

  const getContainer = () => containerElementRef.current as HTMLDivElement;

  const handleButtonClick = () => {
    setDisplayProperty(!visible);
  };

  const handleDocumentClick = (event) => {
    if (!visible) return;
    const container = getContainer();
    const eventTargetNode = event.target;

    // Check if click is inside the container
    if (container.contains(eventTargetNode)) {
      return;
    }

    // For Menu item, also check if click is inside the controlled element (mobile menu)
    if (id === 'Menu') {
      const controlledElement = document.getElementById('hds-mobile-menu');
      if (controlledElement && controlledElement.contains(eventTargetNode)) {
        return;
      }
    }

    // Click is outside - close the dropdown and prevent this click from doing anything else
    event.preventDefault();
    event.stopPropagation();
    event.stopImmediatePropagation();
    setDisplayProperty(false);
  };

  const handleBlur = (event) => {
    if (!visible) return;
    const container = getContainer();
    const backdrop = backdropRef.current;
    const eventTargetNode = event.relatedTarget;
    // close the dropdown if the focus is outside the container on large screens
    // but not if focus moved to the backdrop
    // Also keep open if relatedTarget is null — this happens during click-triggered DOM updates
    if (eventTargetNode && !container.contains(eventTargetNode) && eventTargetNode !== backdrop && !isSmallScreen) {
      setDisplayProperty(false);
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Escape' && visible) {
      // Don't close if event was already handled by an inner component (e.g. Search dropdown)
      if (event.defaultPrevented) {
        return;
      }
      event.preventDefault();
      setDisplayProperty(false);
    }
  };

  useEffect(() => {
    if (visible) {
      // Only add the listener when dropdown is visible
      document.addEventListener('click', handleDocumentClick, true);
      document.addEventListener('keydown', handleKeyDown);

      // Use the shared utility function to prevent focus and pointer events on elements outside the header
      const header = containerElementRef.current?.closest('header') as HTMLElement;
      const cleanupFocusPrevention = header ? addDocumentFocusPrevention(header, originalTabIndexes, true) : null;

      return () => {
        document.removeEventListener('click', handleDocumentClick, true);
        document.removeEventListener('keydown', handleKeyDown);

        // Cleanup focus prevention
        if (cleanupFocusPrevention) {
          cleanupFocusPrevention();
        }
      };
    }
    return undefined;
  }, [visible]);

  // Hide the component if there is no content
  useEffect(() => {
    setHasContent(dropdownContentElementRef.current?.childNodes.length !== 0);
  }, [children]);

  const iconLabel = closeLabel && visible && !preventButtonResize ? closeLabel : label;
  const iconClass = closeIcon && visible && !preventButtonResize ? closeIcon : icon;
  const hasSubItems = React.Children.count(children) > 0;
  const isFullWidth = fullWidth || (isSmallScreen && fixedRightPosition);
  const isDropdownFullWidth = isFullWidth || fullWidthDropdown;

  const visibilityClasses = {
    visible,
    [classes.visible]: visible,
    [classes.hasContent]: hasContent,
    [classes.fullWidth]: isFullWidth,
    [classes.fullWidthDropdown]: fullWidthDropdown,
    [classes.hasSubItems]: hasSubItems,
    [classes.menuItem]: id === 'Menu',
  };
  const className = classNames(classes.container, classNameProp, visibilityClasses);
  const iconClassName = classNames(classes.icon, iconClassNameProp);

  // Dropdown gets fullWidth class if either fullWidth OR fullWidthDropdown is true
  const dropdownVisibilityClasses = {
    ...visibilityClasses,
    [classes.fullWidth]: isDropdownFullWidth,
  };
  const dropdownClassName = classNames(classes.dropdown, dropdownClassNameProp, dropdownVisibilityClasses);

  const buttonOverlayProps: Pick<HeaderActionBarItemButtonProps, 'activeStateIcon' | 'activeStateLabel'> =
    preventButtonResize
      ? {
          activeStateIcon: closeIcon,
          activeStateLabel: closeLabel,
        }
      : {};
  const heading = visible && !isFullWidth && label && avatar;

  /* eslint-disable jsx-a11y/no-noninteractive-tabindex */
  return (
    <>
      {visible && hasSubItems && (
        <div
          ref={backdropRef}
          className={classes.backdrop}
          aria-hidden="true"
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            zIndex: 99,
            pointerEvents: 'none',
          }}
        />
      )}
      <div {...rest} id={id} className={className} ref={containerElementRef} onBlur={handleBlur}>
        <HeaderActionBarItemButton
          className={iconClassName}
          onClick={handleButtonClick}
          label={iconLabel}
          icon={iconClass}
          aria-expanded={visible}
          aria-label={ariaLabel !== undefined ? ariaLabel : String(label)}
          aria-controls={id === 'Menu' ? `hds-mobile-menu` : `${id}-dropdown`}
          labelOnRight={labelOnRight}
          fixedRightPosition={fixedRightPosition}
          isActive={visible}
          fullWidth={fullWidth}
          hasSubItems={hasSubItems}
          avatar={avatar}
          preventButtonResize={preventButtonResize}
          {...buttonOverlayProps}
        />
        {hasSubItems && (
          <div className={classes.dropdownWrapper}>
            <div id={`${id}-dropdown`} className={dropdownClassName} ref={dropdownContentElementRef}>
              {heading && <h3>{label}</h3>}
              <ul>{children}</ul>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

HeaderActionBarItem.defaultProps = {
  fullWidth: false,
};
