import React from 'react';

// import core base styles
import 'hds-core';
import styles from './Button.module.scss';
import loadingSpinnerStyles from '../loadingSpinner/LoadingSpinner.module.scss';
import classNames from '../../utils/classNames';

export type ButtonSize = 'default' | 'small';
export type ButtonTheme = 'default' | 'coat' | 'black';
export type ButtonVariant = 'primary' | 'secondary' | 'supplementary' | 'success' | 'danger';

export type CommonButtonProps = React.ComponentPropsWithoutRef<'button'> & {
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
  variant?: Exclude<ButtonVariant, 'supplementary'>;
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
  /**
   * If `true` a loading spinner is displayed inside the button along `loadingText`
   */
  isLoading?: boolean;
  /**
   * Loading text to show alongside loading spinner
   */
  loadingText?: string;
};

// Supplementary variant requires iconLeft or iconRight
export type SupplementaryButtonProps = Omit<CommonButtonProps, 'variant'> & {
  variant: 'supplementary';
} & (
    | {
        iconLeft: React.ReactNode;
      }
    | {
        iconRight: React.ReactNode;
      }
  );

// Loading button requires loading text
export type LoadingButtonProps = Omit<CommonButtonProps, 'isLoading' | 'loadingText'> & {
  isLoading: true;
  loadingText: string;
};

export type ButtonProps = CommonButtonProps | SupplementaryButtonProps | LoadingButtonProps;

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
      isLoading = false,
      loadingText,
      onClick,
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

    const loadingSpinner = (
      <div className={classNames(loadingSpinnerStyles.loadingSpinner, loadingSpinnerStyles.small)}>
        <div />
        <div />
        <div />
      </div>
    );

    const loadingOnClick: React.MouseEventHandler<HTMLButtonElement> = (event) => {
      event.preventDefault();
    };

    return (
      <button
        ref={ref}
        disabled={disabled}
        aria-disabled={isLoading || disabled || undefined}
        type="button"
        className={classNames(
          styles.button,
          styles[variant],
          styles[`theme-${theme}`],
          styles[`size-${size}`],
          fullWidth ? styles.fullWidth : '',
          isLoading ? styles.isLoading : '',
          className,
        )}
        onClick={isLoading ? loadingOnClick : onClick}
        {...rest}
      >
        {isLoading ? loadingSpinner : iconElementLeft}
        <span className={styles.label}>{isLoading ? loadingText : children}</span>
        {isLoading ? null : iconElementRight}
      </button>
    );
  },
);
