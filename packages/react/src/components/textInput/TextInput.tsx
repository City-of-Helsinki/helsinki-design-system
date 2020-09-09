import React from 'react';

// import core base styles
import 'hds-core';
import styles from './TextInput.module.css';
import { InputWrapper } from '../../internal/input-wrapper/InputWrapper';

export type TextInputProps = React.ComponentPropsWithoutRef<'input'> & {
  /**
   * Additional class names to apply to the text input
   */
  className?: string;
  /**
   * The default input element value. Use when the component is not controlled
   */
  defaultValue?: string;
  /**
   * If `true`, the input will be disabled
   */
  disabled?: boolean;
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
   * If `true`, the input and `helperText` will be displayed in an invalid state.
   */
  invalid?: boolean;
  /**
   * The label for the input
   */
  label?: string | React.ReactNode;
  /**
   * **[DEPRECATED]** This prop will be removed in a future version. Use the `label` prop instead
   */
  labelText?: string;
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
   * The label of the tooltip
   */
  tooltipLabel?: string;
  /**
   * The text content of the tooltip
   */
  tooltipText?: string;
  /**
   * The title for the tooltip open button
   */
  tooltipOpenButtonLabelText?: string;
  /**
   * The title for the tooltip close button
   */
  tooltipCloseButtonLabelText?: string;
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
};

export const TextInput = React.forwardRef<HTMLInputElement, TextInputProps>(
  (
    {
      className = '',
      disabled = false,
      defaultValue,
      helperText,
      hideLabel,
      invalid,
      id,
      label,
      labelText,
      onChange = () => null,
      required,
      style,
      tooltipLabel,
      tooltipText,
      tooltipOpenButtonLabelText,
      tooltipCloseButtonLabelText,
      type = 'text',
      ...rest
    }: TextInputProps,
    ref?: React.Ref<HTMLInputElement>,
  ) => {
    const wrapperProps = {
      className,
      helperText,
      hideLabel,
      id,
      invalid,
      label,
      labelText,
      required,
      style,
      tooltipLabel,
      tooltipText,
      tooltipOpenButtonLabelText,
      tooltipCloseButtonLabelText,
    };

    return (
      <InputWrapper {...wrapperProps}>
        <input
          className={styles.input}
          defaultValue={defaultValue}
          disabled={disabled}
          id={id}
          onChange={onChange}
          ref={ref}
          required={required}
          type={type}
          {...rest}
        />
      </InputWrapper>
    );
  },
);
