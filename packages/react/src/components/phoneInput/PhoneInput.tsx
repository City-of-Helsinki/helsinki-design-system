import React, { useEffect, useRef } from 'react';
import isFunction from 'lodash.isfunction';

import 'hds-core';
import { InputWrapper } from '../../internal/input-wrapper/InputWrapper';
import { TextInputProps } from '../textInput';
import textInputStyles from '../textInput/TextInput.module.css';
import comboseAriaDescribedBy from '../../utils/comboseAriaDescribedBy';

export type PhoneInputProps = Omit<
  TextInputProps,
  'buttonIcon' | 'buttonAriaLabel' | 'onButtonClick' | 'children' | 'label'
> & {
  /**
   * The label for the input
   */
  label?: string;
};

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
      labelText,
      onChange = () => null,
      required,
      style,
      successText,
      tooltipLabel,
      tooltipText,
      tooltipButtonLabel,
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
      labelText,
      required,
      style,
      successText,
      tooltipLabel,
      tooltipText,
      tooltipButtonLabel,
    };

    const inputRef = useRef<HTMLInputElement>(null);

    /**
     * Merge props.ref to the internal ref. This is needed because we need the ref ourself and cannot rely on
     * component user to provide it.
     */
    useEffect(() => {
      if (ref) {
        if (isFunction(ref)) {
          (ref as (instance: HTMLInputElement) => void)(inputRef.current);
        } else {
          // eslint-disable-next-line no-param-reassign
          (ref as React.MutableRefObject<HTMLInputElement>).current = inputRef.current;
        }
      }
      inputRef.current.addEventListener('input', () => {
        inputRef.current.value = inputRef.current.value.replace(/[^0-9+]/g, '');
      });

      const currentRef = inputRef.current;

      return () => {
        currentRef.removeEventListener('input', () => {
          currentRef.value = currentRef.value.replace(/[^0-9+]/g, '');
        });
      };
    }, [inputRef, ref]);

    // Compose aria-describedby attribute
    const ariaDescribedBy = [customAriaDescribedBy, comboseAriaDescribedBy(id, helperText, errorText, successText)]
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
          ref={inputRef}
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
