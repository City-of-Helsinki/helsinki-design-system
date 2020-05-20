import React, { ChangeEventHandler, CSSProperties, FC, forwardRef, InputHTMLAttributes, RefObject } from 'react';

import styles from './TextInput.module.css';
import InputWrapper from '../../internal/inputwrapper/InputWrapper';

export type TextInputProps = InputHTMLAttributes<HTMLInputElement> & {
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
  labelText?: string;
  /**
   * Callback fired when the state is changed
   */
  onChange?: ChangeEventHandler<HTMLInputElement>;
  /**
   * Short hint displayed in the input before the user enters a value
   */
  placeholder?: string;
  /**
   * If `true`, prevents the user from changing the value of the field (not from interacting with the field)
   */
  readOnly?: boolean;
  /**
   * If `true`, the label is displayed as required and the `input` element will be required.
   */
  required?: boolean;
  /**
   * Override or extend the styles applied to the component. See text field [tokens](https://city-of-helsinki.github.io/helsinki-design-system/components/text-field#tokens) for available CSS variables
   */
  style?: CSSProperties;
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
  ref?: RefObject<HTMLInputElement>;
};

const TextInput: FC<TextInputProps> = forwardRef(
  (
    {
      className = '',
      disabled = false,
      defaultValue,
      helperText,
      hideLabel,
      invalid,
      id,
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
    ref?: RefObject<HTMLInputElement>,
  ) => {
    const wrapperProps = {
      className,
      helperText,
      hideLabel,
      id,
      invalid,
      labelText,
      required,
      style,
      tooltipLabel,
      tooltipText,
      tooltipOpenButtonLabelText,
      tooltipCloseButtonLabelText,
    };

    return (
      <InputWrapper id={id} {...wrapperProps}>
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

export default TextInput;
