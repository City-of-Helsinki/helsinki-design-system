import React, { ReactElement } from 'react';

import styles from './Button.module.css';
import classNames from '../../utils/classNames';

export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  className?: string;
  disabled?: boolean;
  fullWidth?: boolean;
  variant?: 'primary' | 'secondary' | 'supplementary' | 'success' | 'danger';
  theme?: 'default' | 'bus' | 'coat' | 'black';
  size?: 'default' | 'small';
  iconLeft?: ReactElement;
  iconRight?: ReactElement;
};

export default React.forwardRef(
  (
    {
      children,
      className,
      disabled = false,
      fullWidth,
      variant = 'primary',
      theme = 'default',
      size = 'default',
      iconLeft,
      iconRight,
      ...rest
    }: ButtonProps,
    ref: React.RefObject<HTMLButtonElement>,
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
          styles[theme],
          styles[size],
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
