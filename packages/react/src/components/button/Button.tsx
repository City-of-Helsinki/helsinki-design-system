import React from 'react';

// import core base styles
import 'hds-core';
import styles from './Button.module.css';
import classNames from '../../utils/classNames';

export type ButtonSize = 'default' | 'small';
export type ButtonTheme = 'default' | 'coat' | 'black';
export type ButtonVariant = 'primary' | 'secondary' | 'supplementary' | 'success' | 'danger';

export type ButtonProps = React.ComponentPropsWithoutRef<'button'> & {
  /**
   * The content of the button
   */
  children: React.ReactNode;
  /**
   * Additional class names to apply to the button
   */
  className?: string;
  /**
   * Defines the button variant
   */
  variant?: ButtonVariant;
  /**
   * Defines the button theme
   */
  theme?: ButtonTheme;
  /**
   * If `true`, the button will be disabled
   */
  disabled?: boolean;
  /**
   * If `true`, the button will take up the full width of its container
   */
  fullWidth?: boolean;
  /**
   * Element placed on the left side of the button label
   */
  iconLeft?: React.ReactNode;
  /**
   * Element placed on the right side of the button label
   */
  iconRight?: React.ReactNode;
  /**
   * The size of the button
   */
  size?: ButtonSize;
};

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      children,
      className,
      disabled = false,
      fullWidth,
      size = 'default',
      theme = 'default',
      variant = 'primary',
      iconLeft,
      iconRight,
      ...rest
    }: ButtonProps,
    ref: React.Ref<HTMLButtonElement>,
  ) => {
    const iconElementLeft = iconLeft ? (
      <div className={styles.icon} aria-hidden="true">
        {iconLeft}
      </div>
    ) : null;

    const iconElementRight = iconRight ? (
      <div className={classNames(styles.icon)} aria-hidden="true">
        {iconRight}
      </div>
    ) : null;

    return (
      <button
        ref={ref}
        disabled={disabled}
        type="button"
        className={classNames(
          styles.button,
          styles[variant],
          styles[`theme-${theme}`],
          styles[`size-${size}`],
          fullWidth ? styles.fullWidth : '',
          className,
        )}
        {...rest}
      >
        {iconElementLeft}
        <span className={styles.label}>{children}</span>
        {iconElementRight}
      </button>
    );
  },
);
