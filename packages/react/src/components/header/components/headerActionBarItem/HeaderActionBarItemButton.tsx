import React, { cloneElement, forwardRef, ReactNode, RefObject } from 'react';

import classes from './HeaderActionBarItemButton.module.scss';
import classNames from '../../../../utils/classNames';
import { IconAngleDown, IconAngleUp } from '../../../../icons';

type ButtonAttributes = JSX.IntrinsicElements['button'];

export interface HeaderActionBarItemButtonProps extends ButtonAttributes {
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
  ref?: RefObject<HTMLButtonElement>;
  /**
   * Menu button resizing is prevented by rendering button's active state to a separate element.
   */
  preventButtonResize?: boolean;
}

export const HeaderActionBarItemButton = forwardRef<HTMLButtonElement, HeaderActionBarItemButtonProps>(
  (
    {
      icon,
      label,
      labelOnRight,
      fixedRightPosition,
      className,
      activeStateLabel,
      activeStateIcon,
      isActive,
      fullWidth,
      hasSubItems,
      avatar,
      preventButtonResize,
      ...rest
    },
    ref,
  ) => {
    const hasActiveState = !!(activeStateLabel || activeStateIcon);
    const buttonClassName = classNames({
      [classes.actionBarItemButton]: true,
      [className]: true,
      [classes.fixedRightPosition]: fixedRightPosition,
      [classes.isActive]: hasActiveState && isActive,
      [classes.fullWidth]: fullWidth,
      [classes.hasSubItems]: hasSubItems,
      [classes.preventButtonResize]: preventButtonResize && hasActiveState && isActive,
    });
    const iconClassName = classNames({ [classes.actionBarItemButtonIcon]: true, [classes.labelOnRight]: labelOnRight });
    const labelClassName = classNames({
      [classes.actionBarItemButtonLabel]: true,
      [classes.labelOnRight]: labelOnRight,
    });

    const Icon = ({
      element,
      elementClassName,
    }: {
      element: HeaderActionBarItemButtonProps['icon'];
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
      text: HeaderActionBarItemButtonProps['label'];
      isForActiveState?: boolean;
    }) => {
      return (
        <span
          className={classNames(labelClassName, isForActiveState && classes.activeStateContentLabel)}
          {...(isForActiveState && !isActive ? { 'aria-hidden': true } : {})}
        >
          {text}
        </span>
      );
    };

    const showActiveState = hasActiveState && isActive && (!fullWidth || !hasSubItems) && !preventButtonResize;
    const showOpenButton = hasSubItems && !isActive;
    const showCollapseButton = hasSubItems && isActive;
    const showAvatar = avatar !== undefined && !showActiveState;
    const showLabel = (preventButtonResize && hasActiveState) || (!(showAvatar && !fullWidth) && !showActiveState);
    const showIcon =
      icon !== undefined && avatar === undefined && ((preventButtonResize && hasActiveState) || !showActiveState);
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

    const activeStateContent = (
      <div className={classes.activeStateContent}>
        <Icon element={activeStateIcon} elementClassName={iconClassName} />
        <Label text={activeStateLabel} isForActiveState />
      </div>
    );

    return (
      <button type="button" {...rest} className={buttonClassName} ref={ref}>
        <div className={classes.buttonContent}>
          {showAvatar && avatarAndLabel}
          {showIconOrLabel && (fullWidth ? iconAndLabel : <span>{iconAndLabel}</span>)}
          {showActiveState && <Icon element={activeStateIcon} elementClassName={iconClassName} />}
          {showOpenButton && <IconAngleDown />}
          {showCollapseButton && <IconAngleUp />}
          {hasActiveState && activeStateContent}
        </div>
      </button>
    );
  },
);
