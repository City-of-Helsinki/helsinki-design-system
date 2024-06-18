/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useRef, useState } from 'react';

import classes from './HeaderActionBarItem.module.scss';
import { HeaderActionBarItemButton, HeaderActionBarItemButtonProps } from './HeaderActionBarItemButton';
import { useHeaderContext } from '../../HeaderContext';
import classNames from '../../../../utils/classNames';

export type HeaderActionBarItemProps = React.PropsWithChildren<{
  /**
   * Possibility to use a full-width version of the dropdown, for example in mobile use.
   */
  fullWidth?: boolean;
  /**
   * Label for the action bar item.
   */
  label?: string | JSX.Element;
  /**
   * Aria-label attribute for the dropdown button.
   */
  ariaLabel?: string;
  /**
   * Positions the label right side of the icon.
   */
  labelOnRight?: boolean;
  /**
   * Fix the item position to the right side of the action bar.
   */
  fixedRightPosition?: boolean;
  /**
   * Initials for avatar which replace icon.
   */
  avatar?: string | JSX.Element;

  /**
   * ID of the dropdown item.
   */
  id: string;
  /**
   * Additional classname for the icon.
   */
  iconClassName?: string;
  /**
   * Additional classname for the dropdown element.
   */
  dropdownClassName?: string;
  /**
   * Label for the action bar item when dropdown is open.
   */
  closeLabel?: string | JSX.Element;
  /**
   * Icon for the action bar item.
   */
  icon?: JSX.Element;
  /**
   * Icon for the action bar item when dropdown is open.
   */
  closeIcon?: JSX.Element;
  /**
   * Menu button resizing is prevented by rendering button's active state to a separate element.
   */
  preventButtonResize?: boolean;
}> &
  React.ComponentPropsWithoutRef<'div'>;

export const HeaderActionBarItem = (properties: HeaderActionBarItemProps) => {
  const {
    id,
    children,
    label,
    fullWidth,
    className: classNameProp,
    iconClassName: iconClassNameProp,
    dropdownClassName: dropdownClassNameProp,
    closeLabel,
    icon,
    closeIcon,
    ariaLabel,
    labelOnRight,
    fixedRightPosition,
    preventButtonResize,
    avatar,
    ...props
  } = properties;
  const dropdownContentElementRef = useRef<HTMLDivElement>(null);
  const containerElementRef = useRef<HTMLDivElement>(null);
  const [hasContent, setHasContent] = useState(false);
  const { isNotLargeScreen } = useHeaderContext();
  const [visible, setDisplayProperty] = useState(false);

  const getContainer = () => containerElementRef.current as HTMLDivElement;

  const handleButtonClick = () => {
    setDisplayProperty(!visible);
  };

  const handleDocumentClick = (event) => {
    if (!visible) return;
    const container = getContainer();
    const eventTargetNode = event.target;
    if (!container.contains(eventTargetNode)) {
      setDisplayProperty(false);
    }
  };

  const handleBlur = (event) => {
    if (!visible) return;
    const container = getContainer();
    const eventTargetNode = event.relatedTarget;
    if (!container.contains(eventTargetNode)) {
      setDisplayProperty(false);
    }
  };

  useEffect(() => {
    document.addEventListener('click', handleDocumentClick);
    return () => document.removeEventListener('click', handleDocumentClick);
  }, [containerElementRef.current]);

  // Hide the component if there is no content
  useEffect(() => {
    setHasContent(dropdownContentElementRef.current?.childNodes.length !== 0);
  }, [children]);

  const iconLabel = closeLabel && visible && !preventButtonResize ? closeLabel : label;
  const iconClass = closeIcon && visible && !preventButtonResize ? closeIcon : icon;
  const hasSubItems = React.Children.count(children) > 0;
  const visibilityClasses = {
    visible,
    [classes.visible]: visible,
    [classes.hasContent]: hasContent,
    [classes.fullWidth]: fullWidth || isNotLargeScreen,
    [classes.hasSubItems]: hasSubItems,
    [classes.menuItem]: id === 'Menu',
  };
  const className = classNames(classes.container, classNameProp, visibilityClasses);
  const iconClassName = classNames(classes.icon, iconClassNameProp);
  const dropdownClassName = classNames(classes.dropdown, dropdownClassNameProp, visibilityClasses);
  const buttonOverlayProps: Pick<HeaderActionBarItemButtonProps, 'activeStateIcon' | 'activeStateLabel'> =
    preventButtonResize
      ? {
          activeStateIcon: closeIcon,
          activeStateLabel: closeLabel,
        }
      : {};

  /* eslint-disable jsx-a11y/no-noninteractive-tabindex */
  return (
    <div {...props} id={id} className={className} ref={containerElementRef} onBlur={handleBlur}>
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
            {visible && !fullWidth && label && <h3>{label}</h3>}
            <ul>{children}</ul>
          </div>
        </div>
      )}
    </div>
  );
};

HeaderActionBarItem.defaultProps = {
  fullWidth: false,
};
