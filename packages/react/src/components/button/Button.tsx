import React, { ReactElement } from 'react';

import styles from './Button.module.css';
import classNames from '../../utils/classNames';

export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  className?: string;
  disabled?: boolean;
  fullWidth?: boolean;
  variant?: 'primary' | 'secondary' | 'supplementary';
  theme?: 'default' | 'bus' | 'engel';
  size?: 'default' | 'small';
  iconLeft?: ReactElement;
  iconRight?: ReactElement;
};

export default ({
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
}: ButtonProps) => {
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
};
