import React, { useEffect, useRef, useState } from 'react';

import classes from './HeaderActionBarItemWithDropdown.module.scss';
import { IconCross } from '../../../../icons';
import { HeaderActionBarItem, HeaderActionBarItemProps } from './HeaderActionBarItem';
import classNames from '../../../../utils/classNames';

type HeaderActionBarItemWithDropdownProps = React.PropsWithChildren<{
  /**
   * ID of the dropdown item.
   */
  id: string;
  /**
   * Possibility to use a full-width version of the dropdown, for example in mobile use.
   */
  fullWidth?: boolean;
  /**
   * Additional classname for the icon.
   */
  iconClassName?: string;
  /**
   * Additional classname for the dropdown element.
   */
  dropdownClassName?: string;
  /**
   * Label for the action bar item.
   */
  label: string | JSX.Element;
  /**
   * Label for the action bar item when dropdown is open.
   */
  closeLabel?: string | JSX.Element;
  /**
   * Icon for the action bar item.
   */
  icon: JSX.Element;
  /**
   * Icon for the action bar item when dropdown is open.
   */
  closeIcon?: JSX.Element;
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
   * Menu button resizing is prevented by rendering button's active state to a separate element.
   */
  preventButtonResize?: boolean;
}> &
  React.ComponentPropsWithoutRef<'div'>;

export const HeaderActionBarItemWithDropdown = (properties: HeaderActionBarItemWithDropdownProps) => {
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
    closeIcon = <IconCross />,
    ariaLabel,
    labelOnRight,
    fixedRightPosition,
    preventButtonResize,
    ...props
  } = properties;
  const dropdownContentElementRef = useRef<HTMLElement>(null);
  const containerElementRef = useRef<HTMLDivElement>(null);
  const [visible, setDisplayProperty] = useState(false);
  const [hasContent, setHasContent] = useState(false);

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

  const iconLabel = visible && !preventButtonResize ? closeLabel : label;
  const iconClass = visible && !preventButtonResize ? closeIcon : icon;
  const visibilityClasses = {
    visible,
    [classes.visible]: visible,
    [classes.hasContent]: hasContent,
    [classes.fullWidth]: fullWidth,
  };
  const className = classNames(classes.container, classNameProp, visibilityClasses);
  const iconClassName = classNames(classes.icon, iconClassNameProp);
  const dropdownClassName = classNames(classes.dropdown, dropdownClassNameProp, visibilityClasses);
  const buttonOverlayProps: Pick<HeaderActionBarItemProps, 'activeStateIcon' | 'activeStateLabel'> = preventButtonResize
    ? {
        activeStateIcon: closeIcon,
        activeStateLabel: closeLabel,
      }
    : {};
  /* eslint-disable jsx-a11y/no-noninteractive-tabindex */
  return (
    <div {...props} id={id} className={className} ref={containerElementRef} onBlur={handleBlur}>
      <HeaderActionBarItem
        className={iconClassName}
        onClick={handleButtonClick}
        label={iconLabel}
        icon={iconClass}
        aria-expanded={visible}
        aria-label={ariaLabel}
        aria-controls={`${id}-dropdown`}
        labelOnRight={labelOnRight}
        fixedRightPosition={fixedRightPosition}
        isActive={visible}
        {...buttonOverlayProps}
      />
      <div className={classes.dropdownWrapper}>
        <aside id={`${id}-dropdown`} className={dropdownClassName} ref={dropdownContentElementRef}>
          {children}
        </aside>
      </div>
    </div>
  );
};

HeaderActionBarItemWithDropdown.defaultProps = {
  fullWidth: false,
  closeLabel: 'Sulje',
};
