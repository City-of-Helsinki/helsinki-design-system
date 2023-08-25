import React, { cloneElement, forwardRef, ReactNode } from 'react';

import classNames from '../../../../utils/classNames';
import classes from './HeaderActionBarItem.module.scss';

type ButtonAttributes = JSX.IntrinsicElements['button'];

export interface HeaderActionBarItemProps extends ButtonAttributes {
  /**
   * Id of controlled dropdown menu.
   */
  ariaControls?: string;
  /**
   * Aria label for the item.
   */
  ariaLabel?: string;
  /**
   * Fix the item position to the right side of the action bar.
   */
  fixedRightPosition?: boolean;
  /**
   * Icon element for the action bar item.
   */
  icon?: ReactNode;
  /**
   * Label for the action bar item.
   */
  label?: string | JSX.Element;
  /**
   * Positions the label to the right side of the icon.
   * @internal
   */
  labelOnRight?: boolean;
}

export const HeaderActionBarItem = forwardRef<HTMLButtonElement, HeaderActionBarItemProps>(
  ({ icon, label, labelOnRight, fixedRightPosition, className, ariaLabel, ariaControls, ...rest }, ref) => {
    const buttonClassName = classNames({
      [classes.actionBarItem]: true,
      [className]: true,
      [classes.fixedRightPosition]: fixedRightPosition,
    });
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
