import React, { ElementType, forwardRef } from 'react';

import classNames from '../../../../utils/classNames';
import classes from './HeaderActionBarItem.module.scss';

type ButtonAttributes = JSX.IntrinsicElements['button'];

export interface HeaderActionBarItemProps extends ButtonAttributes {
  icon?: ElementType;
  label?: string | JSX.Element;
}

export const HeaderActionBarItem = forwardRef<HTMLButtonElement, HeaderActionBarItemProps>((properties, ref) => {
  const {
    icon: IconClass,
    label,
    className,
    'aria-label': ariaLabel,
    'aria-expanded': ariaExpanded,
    ...props
  } = properties;

  const buttonClassName = classNames(classes.actionBarItem, className);

  const aria = {
    'aria-label': ariaLabel || (typeof label === 'string' && label),
    'aria-haspopup': true,
  };

  if (ariaExpanded) aria['aria-expanded'] = true;

  return (
    <button type="button" {...props} {...aria} className={buttonClassName} ref={ref}>
      {IconClass && (
        <span className={classes.actionBarItemIcon}>
          <IconClass aria-hidden />
        </span>
      )}
      {label && <span className={classes.actionBarItemLabel}>{label}</span>}
    </button>
  );
});
