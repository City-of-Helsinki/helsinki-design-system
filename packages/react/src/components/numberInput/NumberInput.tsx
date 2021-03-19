import React, { useEffect, useRef } from 'react';
import isFunction from 'lodash.isfunction';

import 'hds-core';
import styles from './NumberInput.module.scss';
import { IconMinus, IconPlus } from '../../icons';
import { InputWrapper } from '../../internal/input-wrapper/InputWrapper';
import { TextInputProps } from '../textInput';
import textInputStyles from '../textInput/TextInput.module.css';
import classNames from '../../utils/classNames';

export type NumberInputProps = Omit<
  TextInputProps,
  'buttonIcon' | 'buttonAriaLabel' | 'onButtonClick' | 'children' | 'label' | 'value' | 'defaultValue'
> & {
  /**
   * The default input element value. Use when the component is not controlled
   */
  defaultValue?: number;
  /**
   * The label for the input
   */
  label: string;
  /**
   * Max value allowed
   */
  max?: number;
  /**
   * Min value allowed
   */
  min?: number;
  /**
   * The aria label for minus step button
   */
  minusStepButtonAriaLabel?: string;
  /**
   * The aria label for plus step button
   */
  plusStepButtonAriaLabel?: string;
  /**
   * Number intervals that are used when using increase/decrease steppers.
   */
  step?: number;
  /**
   * Unit characters of the input. Example: €
   */
  unit?: string;
  /**
   * The value of the input element, required for a controlled component
   */
  value?: number;
};

function combineLabelAndUnit(label: string, unit: string): string | undefined {
  if (!label && unit) {
    return `(${unit})`;
  }
  if (label && unit) {
    return `${label} (${unit})`;
  }
  return label;
}

export const NumberInput = React.forwardRef<HTMLInputElement, NumberInputProps>(
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
      labelText,
      max,
      min,
      minusStepButtonAriaLabel,
      onChange = () => null,
      plusStepButtonAriaLabel,
      required,
      step,
      style,
      successText,
      tooltipLabel,
      tooltipText,
      tooltipButtonLabel,
      type = 'number',
      unit,
      ...rest
    }: NumberInputProps,
    ref?: React.Ref<HTMLInputElement>,
  ) => {
    const wrapperProps = {
      className,
      errorText,
      helperText,
      hideLabel,
      id,
      invalid,
      label: combineLabelAndUnit(label, unit),
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
    }, [inputRef, ref]);

    // Compose aria-describedby attribute
    const ariaDescribedBy = [helperText && `${id}-helper`, errorText && `${id}-error`, successText && `${id}-success`]
      .filter((item) => item)
      .join(' ');

    return (
      <InputWrapper {...wrapperProps}>
        <div className={styles.numberInputContainer}>
          <input
            className={classNames(textInputStyles.input, step ? styles.numberInputWithSteps : '')}
            defaultValue={defaultValue}
            disabled={disabled}
            id={id}
            max={max}
            min={min}
            step={step}
            onChange={onChange}
            ref={inputRef}
            required={required}
            type={type}
            aria-describedby={ariaDescribedBy.length > 0 ? ariaDescribedBy : null}
            {...rest}
          />
          {step && (
            <>
              <div className={styles.minusButtonWrapper}>
                <button
                  className={styles.button}
                  type="button"
                  onClick={(event) => {
                    // Prevent default to not submit form if we happen to be inside form
                    event.preventDefault();
                    inputRef.current.stepDown();
                  }}
                  aria-label={minusStepButtonAriaLabel || 'Decrease by one'}
                >
                  <IconMinus aria-hidden="true" />
                </button>
              </div>
              <div className={styles.plusButtonWrapper}>
                <button
                  className={styles.button}
                  type="button"
                  onClick={(event) => {
                    // Prevent default to not submit form if we happen to be inside form
                    event.preventDefault();
                    inputRef.current.stepUp();
                  }}
                  aria-label={plusStepButtonAriaLabel || 'Increase by one'}
                >
                  <IconPlus aria-hidden="true" />
                </button>
              </div>
            </>
          )}
        </div>
      </InputWrapper>
    );
  },
);
