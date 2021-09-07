import React from 'react';

// import core base styles
import 'hds-core';
import styles from './TextInput.module.css';
import { InputWrapper } from '../../internal/input-wrapper/InputWrapper';
import classNames from '../../utils/classNames';
import composeAriaDescribedBy from '../../utils/composeAriaDescribedBy';

export type TextInputProps = React.ComponentPropsWithoutRef<'input'> & {
  /**
   * Additional class names to apply to the text input
   */
  className?: string;
  /**
   * Additional children to render after the input.
   */
  children?: React.ReactNode;
  /**
   * The default input element value. Use when the component is not controlled
   */
  defaultValue?: string;
  /**
   * If `true`, the input will be disabled
   */
  disabled?: boolean;
  /**
   * The error text content that will be shown below the input
   */
  errorText?: string;
  /**
   * The helper text content that will be shown below the input
   */
  helperText?: string;
  /**
   * Hides the label above the input
   */
  hideLabel?: boolean;
  /**
   * The id of the input element
   */
  id: string;
  /**
   * If `true`, the input will be displayed in an invalid state.
   */
  invalid?: boolean;
  /**
   * The label for the input
   */
  label?: string | React.ReactNode;
  /**
   * Callback fired when the state is changed
   */
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  /**
   * Short hint displayed in the input before the user enters a value
   */
  placeholder?: string;
  /**
   * If `true`, prevents the user from changing the value of the field (not from interacting with the field)
   */
  readOnly?: boolean;
  /**
   * If `true`, the label is displayed as required and the `input` element will be required
   */
  required?: boolean;
  /**
   * Override or extend the styles applied to the component
   */
  style?: React.CSSProperties;
  /**
   * The success text content that will be shown below the input
   */
  successText?: string;
  /**
   * The info text content that will be shown below the input
   */
  infoText?: string;
  /**
   * Aria-label text for the tooltip
   */
  tooltipLabel?: string;
  /**
   * Aria-label text for the tooltip trigger button
   */
  tooltipButtonLabel?: string;
  /**
   * The text content of the tooltip
   */
  tooltipText?: string;
  /**
   * Type of the input element
   */
  type?: string;
  /**
   * The value of the input element, required for a controlled component
   */
  value?: string;
  /**
   * The `ref` is forwarded to the native input element.
   */
  ref?: React.Ref<HTMLInputElement>;
  /**
   * Button icon
   */
  buttonIcon?: React.ReactNode;
  /**
   * Button aria-label
   */
  buttonAriaLabel?: string;
  /**
   * Button click callback
   */
  onButtonClick?: React.MouseEventHandler<HTMLButtonElement>;
};

export const TextInput = React.forwardRef<HTMLInputElement, TextInputProps>(
  (
    {
      className = '',
      children,
      disabled = false,
      defaultValue,
      errorText,
      helperText,
      hideLabel,
      invalid,
      id,
      label,
      onChange = () => null,
      required,
      style,
      successText,
      infoText,
      tooltipLabel,
      tooltipText,
      tooltipButtonLabel,
      type = 'text',
      buttonIcon,
      buttonAriaLabel,
      onButtonClick,
      ...rest
    }: TextInputProps,
    ref?: React.Ref<HTMLInputElement>,
  ) => {
    const wrapperProps = {
      className,
      errorText,
      helperText,
      hideLabel,
      id,
      invalid,
      label,
      required,
      style,
      successText,
      infoText,
      tooltipLabel,
      tooltipText,
      tooltipButtonLabel,
    };

    // Compose aria-describedby attribute
    const ariaDescribedBy = composeAriaDescribedBy(id, helperText, errorText, successText, infoText);

    const hasButton = Boolean(buttonIcon && onButtonClick);

    return (
      <InputWrapper {...wrapperProps}>
        <input
          className={classNames(styles.input, hasButton && styles.hasButton)}
          defaultValue={defaultValue}
          disabled={disabled}
          id={id}
          onChange={onChange}
          ref={ref}
          required={required}
          type={type}
          aria-describedby={ariaDescribedBy.length > 0 ? ariaDescribedBy : null}
          {...rest}
        />
        {hasButton && (
          <div className={styles.buttonWrapper}>
            <button
              className={styles.button}
              disabled={disabled}
              type="button"
              onClick={onButtonClick}
              aria-label={buttonAriaLabel}
            >
              {buttonIcon}
            </button>
          </div>
        )}
        {children}
      </InputWrapper>
    );
  },
);
