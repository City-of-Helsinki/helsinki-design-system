import React, { ReactElement } from 'react';

import styles from './Button.module.css';
import classNames from '../../utils/classNames';

export type ButtonProps = React.PropsWithChildren<{
  children: string;
  className?: string;
  disabled?: boolean;
  fullWidth?: boolean;
  color?: 'primary' | 'secondary' | 'tertiary' | 'supplementary';
  size?: 'default' | 'small';
  iconLeft?: ReactElement;
  iconRight?: ReactElement;
}>;

export default ({
  children,
  className,
  disabled = false,
  fullWidth,
  color = 'primary',
  size = 'default',
  iconLeft,
  iconRight,
}: ButtonProps) => {
  const iconElementLeft = iconLeft ? (
    <div className={styles.icon} aria-hidden="true">
      {iconLeft}
    </div>
  ) : null;

  const iconElementRight = iconRight ? (
    <div className={classNames(styles.icon, styles.iconRight)} aria-hidden="true">
      {iconRight}
    </div>
  ) : null;

  return (
    <button
      disabled={disabled}
      type="button"
      className={classNames(
        styles.button,
        styles[color],
        styles[size],
        disabled ? styles.disabled : '',
        fullWidth ? styles.fullWidth : '',
        className,
      )}
    >
      {iconElementLeft}
      <span className={styles.label}>{children}</span>
      {iconElementRight}
    </button>
  );
};
