import React, { ReactNode, ReactElement } from 'react';

import styles from './Button.module.css';
import classNames from '../../utils/classNames';

export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  /**
   * The content of the button
   */
  children: ReactNode;
  /**
   * Additional class names to apply to the button
   */
  className?: string;
  /**
   * Defines the button color
   *
   * Available options: `'primary' | 'secondary' | 'supplementary'`
   */
  color?: 'primary' | 'secondary' | 'tertiary' | 'supplementary';
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
  iconLeft?: ReactElement;
  /**
   * Element placed on the right side of the button label
   */
  iconRight?: ReactElement;
  /**
   * The size of the button
   *
   * Available options: `'default' | 'small'`
   */
  size?: 'default' | 'small';
};

const Button: React.FC<ButtonProps> = ({
  children,
  className,
  color = 'primary',
  disabled,
  fullWidth,
  iconLeft,
  iconRight,
  size = 'default',
  ...rest
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
      {...rest}
    >
      {iconElementLeft}
      <span className={styles.label}>{children}</span>
      {iconElementRight}
    </button>
  );
};

export default Button;
