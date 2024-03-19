import React from 'react';

import '../../styles/base.module.css';
import { LoadingSpinner } from '../loadingSpinner';
import styles from './NewButton.module.scss';
import classNames from '../../utils/classNames';
import { useTheme } from '../../hooks/useTheme';

export enum NewButtonSize {
  Default = 'default',
  Small = 'small',
}
export interface NewButtonCustomTheme {
  '--background-color'?: string;
  '--background-color-hover'?: string;
  '--background-color-focus'?: string;
  '--background-color-disabled'?: string;
  '--border-color'?: string;
  '--border-color-hover'?: string;
  '--border-color-focus'?: string;
  '--border-color-disabled'?: string;
  '--color'?: string;
  '--color-hover'?: string;
  '--color-focus'?: string;
  '--color-disabled'?: string;
  '--focus-outline-color'?: string;
}

export enum NewButtonTheme {
  Black = 'black',
  Coat = 'coat',
  Default = 'default',
}

export type NewButtonThemeType = `${NewButtonTheme}`;

export type NewTheme = NewButtonThemeType | NewButtonCustomTheme;

export enum NewButtonVariant {
  Danger = 'danger',
  Primary = 'primary',
  Secondary = 'secondary',
  Success = 'success',
  Supplementary = 'supplementary',
}

export type CommonNewButtonProps = {
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
   */
  variant?: Exclude<NewButtonVariant, NewButtonVariant.Supplementary>;
  /**
   * Defines the button theme
   */
  theme?: NewTheme;
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
   */
  size?: NewButtonSize;
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
export type SupplementaryNewButtonProps = Omit<CommonNewButtonProps, 'variant'> & {
  variant: NewButtonVariant.Supplementary;
} & (
    | {
        iconStart: React.ReactNode;
      }
    | {
        iconEnd: React.ReactNode;
      }
  );

// Loading button requires loading text
export type LoadingNewButtonProps = Omit<CommonNewButtonProps, 'isLoading' | 'loadingText'> & {
  isLoading: true;
  loadingText: string;
};

export type NewButtonProps = CommonNewButtonProps | SupplementaryNewButtonProps | LoadingNewButtonProps;

export const NewButton = React.forwardRef<HTMLButtonElement, NewButtonProps>(
  (
    {
      children,
      className,
      disabled = false,
      fullWidth,
      size = NewButtonSize.Default,
      theme = NewButtonTheme.Default,
      variant = NewButtonVariant.Primary,
      iconStart,
      iconEnd,
      isLoading = false,
      loadingText,
      onClick,
      ...rest
    }: NewButtonProps,
    ref: React.Ref<HTMLButtonElement>,
  ) => {
    // custom theme class that is applied to the root element
    const customThemeClass = useTheme<NewTheme>(styles.button, theme);

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
