import React from 'react';

// import core base styles
import 'hds-core';
import styles from '../textInput/TextInput.module.css';
import { InputWrapper } from '../../internal/input-wrapper/InputWrapper';
import composeAriaDescribedBy from '../../utils/composeAriaDescribedBy';

export type TextAreaProps = {
  /**
   * Additional class names to apply to the textarea
   */
  className?: string;
  /**
   * The default textarea element value. Use when the component is not controlled
   */
  defaultValue?: string;
  /**
   * If `true`, the textarea will be disabled
   */
  disabled?: boolean;
  /**
   * The error text content that will be shown below the textarea
   */
  errorText?: string;
  /**
   * The helper text content that will be shown below the textarea
   */
  helperText?: string;
  /**
   * Hides the label above the textarea
   */
  hideLabel?: boolean;
  /**
   * The id of the textarea element
   */
  id: string;
  /**
   * If `true`, the textarea and `helperText` will be displayed in an invalid state.
   */
  invalid?: boolean;
  /**
   * The label for the textarea
   */
  label?: string | React.ReactNode;
  /**
   * Callback fired when the state is changed
   */
  onChange?: React.ChangeEventHandler<HTMLTextAreaElement>;
  /**
   * Short hint displayed in the textarea before the user enters a value
   */
  placeholder?: string;
  /**
   * If `true`, the label is displayed as required and the `textarea` element will be required
   */
  required?: boolean;
  /**
   * Override or extend the styles applied to the component. See text field [tokens](https://city-of-helsinki.github.io/helsinki-design-system/components/text-field#tokens) for available CSS variables
   */
  style?: React.CSSProperties;
  /**
   * The success text content that will be shown below the text area
   */
  successText?: string;
  /**
   * The info text content that will be shown below the text area
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
   * The value of the textarea element, required for a controlled component
   */
  value?: string;
  /**
   * The `ref` is forwarded to the native textarea element.
   */
  ref?: React.Ref<HTMLTextAreaElement>;
} & React.ComponentPropsWithoutRef<'textarea'>;

export const TextArea = React.forwardRef<HTMLTextAreaElement, TextAreaProps>(
  (
    {
      className = '',
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
      ...rest
    }: TextAreaProps,
    ref: React.Ref<HTMLTextAreaElement>,
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

    return (
      <InputWrapper {...wrapperProps}>
        <textarea
          className={styles.input}
          defaultValue={defaultValue}
          disabled={disabled}
          id={id}
          onChange={onChange}
          ref={ref}
          required={required}
          aria-describedby={ariaDescribedBy.length > 0 ? ariaDescribedBy : null}
          {...rest}
        />
      </InputWrapper>
    );
  },
);
