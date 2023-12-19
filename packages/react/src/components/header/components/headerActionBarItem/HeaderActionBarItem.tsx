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
  /**
   * Label shown only visually when button is in active state. Screenreaders see only the "label".
   */
  activeStateLabel?: string | JSX.Element;
  /**
   * Icon shown when button is in active state.
   */
  activeStateIcon?: ReactNode;
  /**
   * Indicates button is in active state
   */
  isActive?: boolean;
}

export const HeaderActionBarItem = forwardRef<HTMLButtonElement, HeaderActionBarItemProps>(
  (
    {
      icon,
      label,
      labelOnRight,
      fixedRightPosition,
      className,
      ariaLabel,
      ariaControls,
      activeStateLabel,
      activeStateIcon,
      isActive,
      ...rest
    },
    ref,
  ) => {
    const hasActiveState = !!(activeStateLabel || activeStateIcon);
    const buttonClassName = classNames({
      [classes.actionBarItem]: true,
      [className]: true,
      [classes.fixedRightPosition]: fixedRightPosition,
      [classes.isActive]: hasActiveState && isActive,
    });
    const iconClassName = classNames({ [classes.actionBarItemIcon]: true, [classes.labelOnRight]: labelOnRight });
    const labelClassName = classNames({ [classes.actionBarItemLabel]: true, [classes.labelOnRight]: labelOnRight });

    const Icon = ({
      element,
      elementClassName,
    }: {
      element: HeaderActionBarItemProps['icon'];
      elementClassName?: string;
    }) => {
      if (!element && !React.isValidElement(element)) {
        return null;
      }
      return (
        <span className={elementClassName}>{cloneElement(element as React.ReactElement, { 'aria-hidden': true })}</span>
      );
    };

    const Label = ({
      text,
      isForActiveState,
    }: {
      text: HeaderActionBarItemProps['label'];
      isForActiveState?: boolean;
    }) => {
      if (!text) {
        return null;
      }
      return (
        <span
          className={classNames(labelClassName, isForActiveState && classes.activeStateContentLabel)}
          {...(isForActiveState ? { 'aria-hidden': true } : {})}
        >
          {text}
        </span>
      );
    };

    const Content = () => {
      return (
        <>
          <Icon element={icon} elementClassName={iconClassName} />
          <Label text={label} />
        </>
      );
    };

    const ActiveStateContent = () => {
      if (!hasActiveState) {
        return null;
      }
      return (
        <div className={classes.activeStateContent}>
          <Icon element={activeStateIcon} elementClassName={iconClassName} />
          <Label text={activeStateLabel} isForActiveState />
        </div>
      );
    };
    return (
      <button
        type="button"
        {...rest}
        {...(ariaLabel && { 'aria-label': ariaLabel })}
        {...(ariaControls && { 'aria-controls': ariaControls })}
        className={buttonClassName}
        ref={ref}
      >
        <Content />
        <ActiveStateContent />
      </button>
    );
  },
);
