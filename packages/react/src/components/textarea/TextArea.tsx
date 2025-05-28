import React from 'react';

import '../../styles/base.module.css';
import styles from '../textInput/TextInput.module.css';
import { InputWrapper, InputWrapperProps } from '../../internal/input-wrapper/InputWrapper';
import composeAriaDescribedBy from '../../utils/composeAriaDescribedBy';

export type TextAreaProps = Omit<InputWrapperProps, keyof React.TextareaHTMLAttributes<HTMLTextAreaElement>> &
  React.TextareaHTMLAttributes<HTMLTextAreaElement> & {
    /**
     * The default textarea element value. Use when the component is not controlled
     */
    defaultValue?: string;
    /**
     * Short hint displayed in the textarea before the user enters a value
     */
    placeholder?: string;
    /**
     * Override or extend the styles applied to the component. See text field [tokens](https://city-of-helsinki.github.io/helsinki-design-system/components/text-field#tokens) for available CSS variables
     */
    style?: React.CSSProperties;
    /**
     * The value of the textarea element, required for a controlled component
     */
    value?: string;
    /**
     * The `ref` is forwarded to the native textarea element.
     */
    ref?: React.Ref<HTMLTextAreaElement>;
  };

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
      tooltip,
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
      tooltip,
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
          aria-describedby={ariaDescribedBy}
          {...rest}
        />
      </InputWrapper>
    );
  },
);
