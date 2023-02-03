import React, { ComponentType, ElementType, PropsWithChildren, useEffect, useRef, useState } from 'react';

import { IconCross } from '../../../../icons';
import { HeaderActionBarItem } from './HeaderActionBarItem';
import classNames from '../../../../utils/classNames';
import classes from './HeaderActionBarItemWithDropdown.module.scss';

type DivAttributes = JSX.IntrinsicElements['div'];

interface WithDropdownAttributes extends DivAttributes {
  id: string;
  iconClassName?: WithDropdownProps['className'];
  dropdownClassName?: WithDropdownProps['className'];
  label: string | JSX.Element;
  closeLabel?: string | JSX.Element;
  icon: ElementType;
  closeIcon?: ElementType;
}

export type WithDropdownProps = PropsWithChildren<WithDropdownAttributes>;

export const HeaderActionBarItemWithDropdown: ComponentType<WithDropdownProps> = (properties) => {
  const {
    id,
    children,
    label,
    className: classNameProp,
    iconClassName: iconClassNameProp,
    dropdownClassName: dropdownClassNameProp,
    closeLabel = 'Sulje',
    icon,
    closeIcon = IconCross,
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
  const visibleClass = { [classes.visible]: visible, visible };
  const className = classNames(classes.container, classNameProp, visibleClass, hasContent && classes.hasContent);
  const iconClassName = classNames(classes.icon, iconClassNameProp);
  const dropdownClassName = classNames(classes.dropdown, dropdownClassNameProp, 'hds-dropdown-content', visibleClass);

  // if (!hasContent) return null;

  /* eslint-disable jsx-a11y/no-noninteractive-tabindex */
  return (
    <div {...props} id={id} className={className} ref={containerElementRef} aria-haspopup onBlur={handleBlur}>
      <HeaderActionBarItem
        className={iconClassName}
        onClick={handleButtonClick}
        label={iconLabel}
        icon={iconClass}
        aria-expanded={visible}
      />
      <div className={classes.dropdownWrapper}>
        <aside tabIndex={0} className={dropdownClassName} ref={dropdownContentElementRef}>
          {children}
        </aside>
      </div>
    </div>
  );
};
