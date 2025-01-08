import React from 'react';

import '../../styles/base.module.css';
import styles from './Button.module.scss';
import classNames from '../../utils/classNames';
import { useTheme } from '../../hooks/useTheme';
import { AllElementPropsWithoutRef } from '../../utils/elementTypings';

export enum ButtonSize {
  Small = 'small',
  Medium = 'medium',
}
export interface ButtonTheme {
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
  '--outline-color-focus'?: string;
  [key: string]: string;
}

export enum ButtonPresetTheme {
  Bus = 'bus',
  Coat = 'coat',
  Black = 'black',
}

export enum ButtonVariant {
  Primary = 'primary',
  Secondary = 'secondary',
  Supplementary = 'supplementary',
  Success = 'success',
  Danger = 'danger',
  Clear = 'clear',
}

type CommonButtonProps = AllElementPropsWithoutRef<'button'> & {
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
  theme?: ButtonPresetTheme | ButtonTheme;
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
};

// Supplementary variant requires iconStart or iconEnd
type SupplementaryButtonProps = Omit<CommonButtonProps, 'variant'> & {
  variant: ButtonVariant.Supplementary;
} & (
    | {
        iconStart: React.ReactNode;
      }
    | {
        iconEnd: React.ReactNode;
      }
  );

export type ButtonProps = CommonButtonProps | SupplementaryButtonProps;

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      children,
      className,
      disabled = false,
      fullWidth,
      size = ButtonSize.Medium,
      theme = ButtonPresetTheme.Bus,
      variant = ButtonVariant.Primary,
      iconStart,
      iconEnd,
      onClick,
      ...rest
    }: ButtonProps,
    ref: React.Ref<HTMLButtonElement>,
  ) => {
    // custom theme class that is applied to the root element
    const customThemeClass = useTheme<ButtonPresetTheme | ButtonTheme>(styles.button, theme);

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

    return (
      <button
        ref={ref}
        disabled={disabled}
        type="button"
        className={classNames(
          styles.button,
          styles[variant],
          typeof theme === 'string' ? styles[`theme-${theme}`] : '',
          styles[`size-${size}`],
          fullWidth ? styles.fullWidth : '',
          customThemeClass,
          className,
        )}
        onClick={!disabled ? onClick : undefined}
        {...rest}
      >
        {iconElementStart}
        <span>{children}</span>
        {iconElementEnd}
      </button>
    );
  },
);
