import React, { ElementType, HTMLAttributes, useEffect, useRef, useState } from 'react';

import { IconCross } from '../../../../icons';
import { IconButton } from '../headerActionBar/HeaderActionBarItem';
import classNames from '../../../../utils/classNames';
import classes from './WithDropdown.module.scss';

export interface WithDropdownPropsType extends HTMLAttributes<HTMLDivElement> {
  id: string;
  label: string;
  icon: ElementType;
  children: JSX.Element;
}

export const WithDropdown = ({ id, children, label, icon, ...props }: WithDropdownPropsType): JSX.Element => {
  const containerElementRef = useRef<HTMLDivElement>(null);
  const [visible, setDisplayProperty] = useState(false);

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

  /* Set event listener only when dropdown open */
  useEffect(() => {
    if (visible) document.addEventListener('click', handleDocumentClick);
    return () => document.removeEventListener('click', handleDocumentClick);
  }, [containerElementRef.current, visible]);

  const className = classNames(classes.container, { [classes.visible]: visible });
  const dropdownClassName = classNames(classes.dropdown, 'hds-dropdown-content', { [classes.visible]: visible });

  /* eslint-disable jsx-a11y/no-noninteractive-tabindex */
  return (
    <div {...props} id={id} className={className} ref={containerElementRef} aria-haspopup onBlur={handleBlur}>
      <IconButton onClick={handleButtonClick} label={visible ? 'Sulje' : label} icon={visible ? IconCross : icon} />
      <div className={classes.dropdownWrapper} aria-expanded={visible}>
        <aside tabIndex={0} className={dropdownClassName}>
          {children}
        </aside>
      </div>
    </div>
  );
};
