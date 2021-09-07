import React, { FocusEventHandler, useEffect, useRef, useState } from 'react';
import 'hds-core';

import { InputWrapper } from '../../internal/input-wrapper/InputWrapper';
import { TextInputProps } from '../textInput/TextInput';
import textInputStyles from '../textInput/TextInput.module.css';
import styles from './TimeInput.module.scss';
import classNames from '../../utils/classNames';
import comboseAriaDescribedBy from '../../utils/comboseAriaDescribedBy';
import mergeRefWithInternalRef from '../../utils/mergeRefWithInternalRef';

export type TimeInputProps = Omit<TextInputProps, 'children' | 'buttonIcon' | 'buttonAriaLabel' | 'onButtonClick'> & {
  /**
   * A visually hidden label for the hours. Helps to navigate the component with screen readers.
   */
  hoursLabel: string;
  /**
   * A visually hidden label for the minutes. Helps to navigate the component with screen readers.
   */
  minutesLabel: string;
};

const NUMBER_KEYS: string[] = '0,1,2,3,4,5,6,7,8,9'.split(',');

/**
 * Pad a one-char string with a leading zero
 */
const zeroPad = (value: string) => {
  if (value.length === 1) {
    return `0${value}`;
  }
  return value;
};

/**
 * Increment a number inside a range
 * @param min Min number to return
 * @param max Max number to return
 * @param current Number to modify
 * @param modifier Modifier number to add tot the current number
 */
const incrementNumber = (min: number, max: number, current: number, modifier: number) => {
  return Math.max(Math.min(current + modifier, max), min);
};

/**
 * Returns the default hour/minute values from a defaultValue string
 */
const getDefaultValues = (defaultValue?: string): string[] | null => {
  const defaultValueString = `${defaultValue}`;
  if (defaultValue && defaultValueString.length > 0) {
    if (defaultValueString.match(/^\d{2}:\d{2}$/)) {
      return defaultValueString.split(':');
    }
    // eslint-disable-next-line no-console
    console.warn('Invalid default value for TimeInput. The default value must be in hh:mm format');
  }
  return null;
};

const isShortNumericString = (inputValue: string): boolean => inputValue.match(/^(\d{1,2})?$/) !== null;

export const TimeInput = React.forwardRef<HTMLInputElement, TimeInputProps>(
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
      hoursLabel,
      minutesLabel,
      onChange = () => null,
      required,
      style,
      successText,
      infoText,
      tooltipLabel,
      tooltipText,
      tooltipButtonLabel,
      type = 'text',
      ...rest
    }: TimeInputProps,
    ref?: React.Ref<HTMLInputElement>,
  ) => {
    const defaultValues = getDefaultValues(defaultValue);
    const inputRef = useRef<HTMLInputElement>(null);
    const hoursInputRef = useRef<HTMLInputElement>(null);
    const minutesInputRef = useRef<HTMLInputElement>(null);
    const [hours, setHours] = useState<string>(defaultValues ? defaultValues[0] : '');
    const [minutes, setMinutes] = useState<string>(defaultValues ? defaultValues[1] : '');
    const [time, setTime] = useState<string>(defaultValues ? defaultValues.join(':') : '');

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

    /**
     * Update the full time input and dispatch the native onChange event
     */
    const updateTimeInput = (newHours: string, newMinutes: string) => {
      setHours(newHours);
      setMinutes(newMinutes);
      const newTimeValue = newHours.length === 0 && newMinutes.length === 0 ? '' : `${newHours}:${newMinutes}`;
      setTime(newTimeValue);
      const nativeInputValueSetter = Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, 'value').set;
      nativeInputValueSetter.call(inputRef.current, newTimeValue);
      const event = new Event('input', { bubbles: true });
      inputRef.current.dispatchEvent(event);
    };

    /**
     * Merge props.ref to the internal ref
     */
    useEffect(() => {
      if (ref) {
        mergeRefWithInternalRef(ref, inputRef);
      }
    }, [inputRef, ref]);

    /**
     * Select input text on focus
     */
    const onInputFocus: FocusEventHandler<HTMLInputElement> = (event) => {
      event.preventDefault();
      event.target.select();
    };

    /**
     * Handle hours input change
     */
    const onHoursChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
      const value = event.target.value.slice(-2);

      // Allow number string only
      if (!isShortNumericString(value)) {
        event.preventDefault();
        return false;
      }

      updateTimeInput(value, minutes);
      return true;
    };

    /**
     * Handle minutes input change
     */
    const onMinutesChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
      const value = event.target.value.slice(-2);

      // Allow numbers string only
      if (!isShortNumericString(value)) {
        event.preventDefault();
        return false;
      }

      updateTimeInput(hours, value);
      return true;
    };

    /**
     * Focus minutes input after hours input has 2 chars
     */
    const onHoursKeyUp: React.KeyboardEventHandler<HTMLInputElement> = (event) => {
      if (
        event.currentTarget.value.length === 2 &&
        event.currentTarget.value !== '00' &&
        NUMBER_KEYS.includes(event.key)
      ) {
        minutesInputRef.current.focus();
      }
    };

    /**
     * Handle keydown event on hours input
     */
    const onHoursKeyDown: React.KeyboardEventHandler<HTMLInputElement> = (event) => {
      // Move to the minutes input with right arrow key
      if (event.key === 'ArrowRight' && !event.shiftKey) {
        event.preventDefault();
        minutesInputRef.current.focus();
      }
      // Increase/decrease the value with arrow up/down keys
      if (['ArrowUp', 'ArrowDown'].includes(event.key) && !event.shiftKey) {
        event.preventDefault();
        const modifier = event.key === 'ArrowUp' ? 1 : -1;
        const hoursAsInt = parseInt(hours, 10) || 0;
        const newHours = zeroPad(`${incrementNumber(0, 23, hoursAsInt, modifier)}`);
        updateTimeInput(newHours, minutes);
      }
    };

    /**
     * Handle keydown event on minutes input
     */
    const onMinutesKeyDown: React.KeyboardEventHandler<HTMLInputElement> = (event) => {
      // Move to the hours input with left arrow key
      if (event.key === 'ArrowLeft' && !event.shiftKey) {
        event.preventDefault();
        hoursInputRef.current.focus();
      }
      // Increase/decrease the value with arrow up/down keys
      if (['ArrowUp', 'ArrowDown'].includes(event.key) && !event.shiftKey) {
        event.preventDefault();
        const modifier = event.key === 'ArrowUp' ? 1 : -1;
        const minutesAsInt = parseInt(minutes, 10) || 0;
        const newMinutes = zeroPad(`${incrementNumber(0, 59, minutesAsInt, modifier)}`);
        updateTimeInput(hours, newMinutes);
      }
    };

    /**
     * Format hours on blur
     */
    const onHoursBlur: React.FocusEventHandler = () => {
      if (hours.length > 0) {
        updateTimeInput(zeroPad(hours), minutes);
      }
    };

    /**
     * Format minutes on blur
     */
    const onMinutesBlur: React.FocusEventHandler = () => {
      if (minutes.length > 0) {
        updateTimeInput(hours, zeroPad(minutes));
      }
    };

    // Compose aria-describedby attribute
    const ariaDescribedBy = comboseAriaDescribedBy(id, helperText, errorText, successText);

    // Compose props for the input frame
    const frameProps = {
      className: classNames(textInputStyles.input, styles.timeInputFrame, disabled && styles.disabled),
      onClick: (event: React.MouseEvent) => {
        if (event.target !== hoursInputRef.current && event.target !== minutesInputRef.current) {
          hoursInputRef.current.focus();
        }
      },
    };

    const hourInputId = `${id}-hours`;
    const minuteInputId = `${id}-minutes`;

    return (
      <InputWrapper {...wrapperProps} id={`${id}-hours`}>
        <div {...frameProps}>
          <input
            aria-hidden
            readOnly
            className={styles.fullInput}
            disabled={disabled}
            id={id}
            onChange={onChange}
            ref={inputRef}
            required={required}
            type={type}
            tabIndex={-1}
            value={time}
            {...rest}
          />
          <label htmlFor={hourInputId} className={styles.partialInputLabel}>
            {hoursLabel}
          </label>
          <input
            className={styles.partialInput}
            type="text"
            disabled={disabled}
            id={hourInputId}
            ref={hoursInputRef}
            value={hours}
            inputMode="numeric"
            onChange={onHoursChange}
            onKeyDown={onHoursKeyDown}
            onKeyUp={onHoursKeyUp}
            onFocus={onInputFocus}
            onBlur={onHoursBlur}
            aria-describedby={ariaDescribedBy.length > 0 ? ariaDescribedBy : undefined}
            placeholder="--"
          />
          <div className={styles.divider}>:</div>
          <label htmlFor={minuteInputId} className={styles.partialInputLabel}>
            {minutesLabel}
          </label>
          <input
            className={styles.partialInput}
            type="text"
            disabled={disabled}
            id={minuteInputId}
            ref={minutesInputRef}
            value={minutes}
            inputMode="numeric"
            onChange={onMinutesChange}
            onKeyDown={onMinutesKeyDown}
            onFocus={onInputFocus}
            onBlur={onMinutesBlur}
            aria-describedby={ariaDescribedBy.length > 0 ? ariaDescribedBy : undefined}
            placeholder="--"
          />
        </div>
      </InputWrapper>
    );
  },
);
