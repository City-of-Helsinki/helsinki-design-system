import React from 'react';

import '../../styles/base.module.css';
import { LoadingSpinner } from '../loadingSpinner';
import styles from './Button.module.scss';
import classNames from '../../utils/classNames';
import { useTheme } from '../../hooks/useTheme';

export enum ButtonSize {
  Small = 'small',
  Medium = 'medium',
}
export interface ButtonCustomTheme {
  '--background-color'?: string;
  '--background-color-focus'?: string;
  '--background-color-hover'?: string;
  '--background-color-active'?: string;
  '--background-color-disabled'?: string;
  '--border-color'?: string;
  '--border-color-focus'?: string;
  '--border-color-hover'?: string;
  '--border-color-active'?: string;
  '--border-color-disabled'?: string;
  '--color'?: string;
  '--color-focus'?: string;
  '--color-hover'?: string;
  '--color-active'?: string;
  '--color-disabled'?: string;
  '--focus-outline-color'?: string;
}

export enum ButtonTheme {
  Black = 'black',
  Coat = 'coat',
  Bus = 'bus',
}

export type ButtonThemeType = `${ButtonTheme}`;

export type ButtonCombinedTheme = ButtonThemeType | ButtonCustomTheme;

export enum ButtonVariant {
  Danger = 'danger',
  Primary = 'primary',
  Secondary = 'secondary',
  Success = 'success',
  Supplementary = 'supplementary',
}

export type CommonButtonProps = {
  /**
   * The content (label) of the button
   */
  children: string;
  /**
   * Additional class names to apply to the button
   */
  className?: string;
  /**
   * Defines the button variant
   * @default ButtonVariant.Primary
   */
  variant?: Exclude<ButtonVariant, ButtonVariant.Supplementary>;
  /**
   * Defines the button theme
   * @default ButtonTheme.Bus
   */
  theme?: ButtonCombinedTheme;
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
  iconStart?: React.ReactNode;
  /**
   * Element placed on the right side of the button label
   */
  iconEnd?: React.ReactNode;
  /**
   * The size of the button
   * @default ButtonSize.Medium
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
} & React.ComponentPropsWithoutRef<'button'>;

// Supplementary variant requires iconStart or iconEnd
export type SupplementaryButtonProps = Omit<CommonButtonProps, 'variant'> & {
  variant: ButtonVariant.Supplementary;
} & (
    | {
        iconStart: React.ReactNode;
      }
    | {
        iconEnd: React.ReactNode;
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
      size = ButtonSize.Medium,
      theme = ButtonTheme.Bus,
      variant = ButtonVariant.Primary,
      iconStart,
      iconEnd,
      isLoading = false,
      loadingText,
      onClick,
      ...rest
    }: ButtonProps,
    ref: React.Ref<HTMLButtonElement>,
  ) => {
    // custom theme class that is applied to the root element
    const customThemeClass = useTheme<ButtonCombinedTheme>(styles.button, theme);

    const iconElementStart = iconStart ? (
      <div className={styles.icon} aria-hidden="true">
        {iconStart}
      </div>
    ) : null;

    const iconElementEnd = iconEnd ? (
      <div className={classNames(styles.icon)} aria-hidden="true">
        {iconEnd}
      </div>
    ) : null;

    const loadingOnClick: React.MouseEventHandler<HTMLButtonElement> = (event) => {
      event.preventDefault();
    };

    return (
      <button
        ref={ref}
        disabled={disabled}
        aria-disabled={isLoading || disabled || undefined}
        aria-label={isLoading ? loadingText : undefined}
        type="button"
        className={classNames(
          styles.button,
          styles[variant],
          styles[`theme-${theme}`],
          styles[`size-${size}`],
          fullWidth ? styles.fullWidth : '',
          isLoading ? styles.isLoading : '',
          customThemeClass,
          className,
        )}
        onClick={isLoading ? loadingOnClick : onClick}
        {...rest}
      >
        {isLoading ? <LoadingSpinner small /> : iconElementStart}
        <span>{isLoading ? loadingText : children}</span>
        {isLoading ? null : iconElementEnd}
      </button>
    );
  },
);
