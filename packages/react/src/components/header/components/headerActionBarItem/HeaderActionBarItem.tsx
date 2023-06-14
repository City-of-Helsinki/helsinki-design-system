import React, { cloneElement, forwardRef, ReactNode } from 'react';

import classNames from '../../../../utils/classNames';
import classes from './HeaderActionBarItem.module.scss';

type ButtonAttributes = JSX.IntrinsicElements['button'];

export interface HeaderActionBarItemProps extends ButtonAttributes {
  /**
   * Aria label for the item.
   */
  ariaLabel?: string;
  /**
   * Icon for the action bar item.
   */
  icon?: ReactNode;
  /**
   * Label for the action bar item.
   */
  label?: string | JSX.Element;
}

export const HeaderActionBarItem = forwardRef<HTMLButtonElement, HeaderActionBarItemProps>(
  ({ icon, label, className, ariaLabel, ...rest }, ref) => {
    const buttonClassName = classNames(classes.actionBarItem, className);

    return (
      <button
        type="button"
        {...rest}
        {...(ariaLabel && { 'aria-label': ariaLabel })}
        className={buttonClassName}
        ref={ref}
      >
        {icon && React.isValidElement(icon) && (
          <span className={classes.actionBarItemIcon}>{cloneElement(icon, { 'aria-hidden': true })}</span>
        )}
        {label && <span className={classes.actionBarItemLabel}>{label}</span>}
      </button>
    );
  },
);
