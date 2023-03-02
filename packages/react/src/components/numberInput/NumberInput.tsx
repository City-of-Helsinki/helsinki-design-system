import React, { useEffect, useRef, useState } from 'react';
import 'hds-core';
import throttle from 'lodash.throttle';
import { VisuallyHidden } from '@react-aria/visually-hidden';

import styles from './NumberInput.module.scss';
import { IconMinus, IconPlus } from '../../icons';
import { InputWrapper } from '../../internal/input-wrapper/InputWrapper';
import { TextInputProps } from '../textInput';
import textInputStyles from '../textInput/TextInput.module.css';
import classNames from '../../utils/classNames';
import composeAriaDescribedBy from '../../utils/composeAriaDescribedBy';
import mergeRefWithInternalRef from '../../utils/mergeRefWithInternalRef';

export type NumberInputProps = Omit<
  TextInputProps,
  'buttonIcon' | 'buttonAriaLabel' | 'onButtonClick' | 'children' | 'label' | 'value' | 'defaultValue' | 'placeholder'
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
   * The aria-label for minus step button
   */
  minusStepButtonAriaLabel?: string;
  /**
   * The aria-label for plus step button
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
  value?: number | '';
};

function combineLabelAndUnit(label: string, unit: string | undefined): string | undefined {
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
      max,
      min,
      minusStepButtonAriaLabel,
      onChange = () => null,
      plusStepButtonAriaLabel,
      required,
      step,
      style,
      successText,
      infoText,
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
      required,
      style,
      successText,
      infoText,
      tooltipLabel,
      tooltipText,
      tooltipButtonLabel,
      labelId: step ? `${id}-label` : undefined,
    };

    const inputRef = useRef<HTMLInputElement>(null);
    const [screenReaderValue, setScreenReaderValue] = useState<string>(null);
    const notifyScreenReaderStepperChangedValue = () => {
      setScreenReaderValue(String(inputRef.current.value));
    };
    let throttledMouseWheel = false;

    const throttledMouseWheeloggler = throttle(() => {
      throttledMouseWheel = false;
    }, 200);

    useEffect(() => {
      const ignoreScroll = (e) => {
        if (throttledMouseWheel) {
          e.preventDefault();
        }
        throttledMouseWheel = true;
        throttledMouseWheeloggler();
      };
      if (inputRef.current) {
        inputRef.current.addEventListener('wheel', ignoreScroll);
      }
      return () => {
        if (inputRef.current) {
          inputRef.current.removeEventListener('wheel', ignoreScroll);
        }
      };
    }, [inputRef]);

    /**
     * Merge props.ref to the internal ref. This is needed because we need the ref ourself and cannot rely on
     * component user to provide it.
     */
    useEffect(() => {
      if (ref) {
        mergeRefWithInternalRef(ref, inputRef);
      }
    }, [inputRef, ref]);

    const dispatchNativeOnChangeEvent = (): void => {
      const nativeInputValueSetter = Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, 'value').set;
      nativeInputValueSetter.call(inputRef.current, inputRef.current.value);
      const onChangeEvent = new Event('input', { bubbles: true });
      inputRef.current.dispatchEvent(onChangeEvent);
    };

    const onChangeListener = step
      ? (e: React.ChangeEvent<HTMLInputElement>) => {
          if (screenReaderValue !== null) {
            setScreenReaderValue(null);
          }
          onChange(e);
        }
      : onChange;

    // Compose aria-describedby attribute
    const ariaDescribedBy = composeAriaDescribedBy(id, helperText, errorText, successText, infoText);

    return (
      <InputWrapper {...wrapperProps}>
        <div
          className={styles.numberInputContainer}
          {...(step && { role: 'group', 'aria-labelledby': wrapperProps.labelId })}
        >
          <input
            className={classNames(textInputStyles.input, step ? styles.numberInputWithSteps : '')}
            defaultValue={defaultValue}
            disabled={disabled}
            id={id}
            max={max}
            min={min}
            step={step}
            onChange={onChangeListener}
            ref={inputRef}
            required={required}
            type={type}
            aria-describedby={ariaDescribedBy.length > 0 ? ariaDescribedBy : null}
            {...rest}
          />
          {step && (
            <>
              <div className={disabled ? styles.minusButtonWrapperWithoutBorder : styles.minusButtonWrapper}>
                <button
                  className={styles.button}
                  disabled={disabled}
                  type="button"
                  onClick={(event) => {
                    // Prevent default to not submit form if we happen to be inside form
                    event.preventDefault();
                    inputRef.current.stepDown();
                    dispatchNativeOnChangeEvent();
                    notifyScreenReaderStepperChangedValue();
                  }}
                  aria-label={minusStepButtonAriaLabel || 'Decrease by one'}
                >
                  <IconMinus aria-hidden="true" />
                </button>
              </div>
              <div className={disabled ? styles.plusButtonWrapperWithoutBorder : styles.plusButtonWrapper}>
                <button
                  className={styles.button}
                  disabled={disabled}
                  type="button"
                  onClick={(event) => {
                    // Prevent default to not submit form if we happen to be inside form
                    event.preventDefault();
                    inputRef.current.stepUp();
                    dispatchNativeOnChangeEvent();
                    notifyScreenReaderStepperChangedValue();
                  }}
                  aria-label={plusStepButtonAriaLabel || 'Increase by one'}
                >
                  <IconPlus aria-hidden="true" />
                </button>
              </div>
              {screenReaderValue !== null && (
                <VisuallyHidden>
                  <span aria-live="assertive">{screenReaderValue}</span>
                </VisuallyHidden>
              )}
            </>
          )}
        </div>
      </InputWrapper>
    );
  },
);
