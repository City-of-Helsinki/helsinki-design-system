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
   * Id of controlled dropdown menu.
   */
  ariaControls?: string;
  /**
   * Icon for the action bar item.
   */
  icon?: ReactNode;
  /**
   * Label for the action bar item.
   */
  label?: string | JSX.Element;
  /**
   * Positions the label right side of the icon.
   */
  labelOnRight?: boolean;
}

export const HeaderActionBarItem = forwardRef<HTMLButtonElement, HeaderActionBarItemProps>(
  ({ icon, label, labelOnRight, className, ariaLabel, ariaControls, ...rest }, ref) => {
    const buttonClassName = classNames(classes.actionBarItem, className);
    const iconClassName = classNames({ [classes.actionBarItemIcon]: true, [classes.labelOnRight]: labelOnRight });
    const labelClassName = classNames({ [classes.actionBarItemLabel]: true, [classes.labelOnRight]: labelOnRight });

    return (
      <button
        type="button"
        {...rest}
        {...(ariaLabel && { 'aria-label': ariaLabel })}
        {...(ariaControls && { 'aria-controls': ariaControls })}
        className={buttonClassName}
        ref={ref}
      >
        {icon && React.isValidElement(icon) && (
          <span className={iconClassName}>{cloneElement(icon, { 'aria-hidden': true })}</span>
        )}
        {label && <span className={labelClassName}>{label}</span>}
      </button>
    );
  },
);
