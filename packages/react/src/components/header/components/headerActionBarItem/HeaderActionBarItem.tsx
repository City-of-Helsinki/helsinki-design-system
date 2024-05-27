import React, { cloneElement, forwardRef, ReactNode } from 'react';

import classes from './HeaderActionBarItem.module.scss';
import classNames from '../../../../utils/classNames';
import { IconAngleDown, IconAngleUp } from '../../../../icons';

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
  /**
   * Possibility to use a full-width version of the dropdown, for example in mobile use.
   */
  fullWidth?: boolean;
  /**
   * If SubItems
   */
  hasSubItems?: boolean;
  /**
   * Initials for avatar which replace icon.
   */
  avatar?: string | JSX.Element;
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
      fullWidth,
      hasSubItems,
      avatar,
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
      [classes.fullWidth]: fullWidth,
      [classes.hasSubItems]: hasSubItems,
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
      return (
        <span
          className={classNames(labelClassName, isForActiveState && classes.activeStateContentLabel)}
          {...(isForActiveState ? { 'aria-hidden': true } : {})}
        >
          {text}
        </span>
      );
    };

    const showCloseButton = hasActiveState && isActive && (!fullWidth || !hasSubItems);
    const showOpenButton = hasSubItems && !isActive;
    const showCollapseButton = hasSubItems && isActive;
    const showAvatar = avatar !== undefined && !showCloseButton;
    const showLabel = !(showAvatar && !fullWidth) && !showCloseButton;
    const showIcon = icon !== undefined && avatar === undefined && !showCloseButton;
    const showIconOrLabel = !showAvatar && (showIcon || showLabel);

    const avatarAndLabel = (
      <>
        <span className={classNames(classes.avatar)}>{avatar}</span>
        {showLabel && <Label text={label} isForActiveState={!fullWidth && hasActiveState && isActive} />}
      </>
    );

    const iconAndLabel = (
      <>
        {showIcon && <Icon element={icon} elementClassName={iconClassName} />}
        {showLabel && <Label text={label} isForActiveState={!fullWidth && hasActiveState && isActive} />}
      </>
    );

    return (
      <button
        type="button"
        {...rest}
        {...(ariaLabel && { 'aria-label': ariaLabel })}
        {...(ariaControls && { 'aria-controls': ariaControls })}
        className={buttonClassName}
        ref={ref}
      >
        {showAvatar && avatarAndLabel}
        {showIconOrLabel && (fullWidth ? iconAndLabel : <span>{iconAndLabel}</span>)}
        {showCloseButton && <Icon element={activeStateIcon} elementClassName={iconClassName} />}
        {showOpenButton && <IconAngleDown />}
        {showCollapseButton && <IconAngleUp />}
      </button>
    );
  },
);
