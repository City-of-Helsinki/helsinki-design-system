import React from 'react';

import '../../styles/base.module.css';
import { InputWrapper } from '../../internal/input-wrapper/InputWrapper';
import { TextInputProps } from '../textInput';
import textInputStyles from '../textInput/TextInput.module.css';
import composeAriaDescribedBy from '../../utils/composeAriaDescribedBy';

export type PhoneInputProps = Omit<TextInputProps, 'buttonIcon' | 'buttonAriaLabel' | 'onButtonClick' | 'children'>;

export const PhoneInput = React.forwardRef<HTMLInputElement, PhoneInputProps>(
  (
    {
      'aria-describedby': customAriaDescribedBy,
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
      type = 'tel',
      ...rest
    }: PhoneInputProps,
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
      tooltipLabel,
      tooltipText,
      tooltipButtonLabel,
      tooltip,
    };

    // Compose aria-describedby attribute
    const ariaDescribedBy = [
      customAriaDescribedBy,
      composeAriaDescribedBy(id, helperText, errorText, successText, infoText),
    ]
      .filter((item) => item)
      .join(' ');

    return (
      <InputWrapper {...wrapperProps}>
        <input
          className={textInputStyles.input}
          defaultValue={defaultValue}
          disabled={disabled}
          id={id}
          onChange={onChange}
          ref={ref}
          required={required}
          type={type}
          aria-describedby={ariaDescribedBy.length > 0 ? ariaDescribedBy : null}
          autoComplete="tel"
          {...rest}
        />
      </InputWrapper>
    );
  },
);
