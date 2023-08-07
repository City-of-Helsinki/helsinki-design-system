import React, { useEffect, useRef, useState } from 'react';

import { IconCross } from '../../../../icons';
import { HeaderActionBarItem } from './HeaderActionBarItem';
import classNames from '../../../../utils/classNames';
import classes from './HeaderActionBarItemWithDropdown.module.scss';

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
    closeIcon = IconCross,
    ariaLabel,
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
    const container = getContainer();
    const eventTargetNode = event.target;
    if (!container.contains(eventTargetNode)) {
      setDisplayProperty(false);
    }
  };

  const handleBlur = (event) => {
    const container = getContainer();
    const eventTargetNode = event.relatedTarget;
    if (!container.contains(eventTargetNode)) {
      setDisplayProperty(false);
    }
  };

  // Set event listener only when dropdown open
  useEffect(() => {
    if (visible) document.addEventListener('click', handleDocumentClick);
    return () => document.removeEventListener('click', handleDocumentClick);
  }, [containerElementRef.current, visible]);

  // Hide the component if there is no content
  useEffect(() => {
    setHasContent(dropdownContentElementRef.current?.childNodes.length !== 0);
  }, [children]);

  const iconLabel = visible ? closeLabel : label;
  const iconClass = visible ? closeIcon : icon;
  const visibilityClasses = {
    visible,
    [classes.visible]: visible,
    [classes.hasContent]: hasContent,
    [classes.fullWidth]: fullWidth,
  };
  const className = classNames(classes.container, classNameProp, visibilityClasses);
  const iconClassName = classNames(classes.icon, iconClassNameProp);
  const dropdownClassName = classNames(classes.dropdown, dropdownClassNameProp, visibilityClasses);

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
      />
      <div className={classes.dropdownWrapper}>
        <aside id={`${id}-dropdown`} tabIndex={0} className={dropdownClassName} ref={dropdownContentElementRef}>
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
