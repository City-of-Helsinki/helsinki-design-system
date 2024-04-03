import React, { FocusEventHandler, useEffect, useRef, useState } from 'react';

import '../../styles/base.module.css';
import styles from './TimeInput.module.scss';
import { InputWrapper } from '../../internal/input-wrapper/InputWrapper';
import { TextInputProps } from '../textInput/TextInput';
import textInputStyles from '../textInput/TextInput.module.css';
import classNames from '../../utils/classNames';
import composeAriaDescribedBy from '../../utils/composeAriaDescribedBy';
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
 * Returns hour and minute values from a provided value string. The provided value can be either value or defaultValue property.
 */
const getHourAndMinuteValues = (value?: string): string[] | null => {
  const valueString = `${value}`;
  if (value && valueString.length > 0) {
    if (valueString.match(/^\d{2}:\d{2}$/)) {
      return valueString.split(':');
    }
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
      value,
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
    if (defaultValue && value) {
      // eslint-disable-next-line no-console
      console.warn(
        'Use either defaultValue (for uncontrolled components) or value (for controlled components) in HDS TimeInput component.',
      );
    }

    const hoursAndMinutes: string[] | null = getHourAndMinuteValues(defaultValue || value);
    const inputRef = useRef<HTMLInputElement>(null);
    const hoursInputRef = useRef<HTMLInputElement>(null);
    const minutesInputRef = useRef<HTMLInputElement>(null);
    const [hours, setHours] = useState<string>(hoursAndMinutes ? hoursAndMinutes[0] : '');
    const [minutes, setMinutes] = useState<string>(hoursAndMinutes ? hoursAndMinutes[1] : '');
    const [time, setTime] = useState<string>(hoursAndMinutes ? hoursAndMinutes.join(':') : '');

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
      const hoursValue = event.target.value.slice(-2);

      // Allow number string only
      if (!isShortNumericString(hoursValue)) {
        event.preventDefault();
        return false;
      }

      updateTimeInput(hoursValue, minutes);
      return true;
    };

    /**
     * Handle minutes input change
     */
    const onMinutesChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
      const minutesValue = event.target.value.slice(-2);

      // Allow numbers string only
      if (!isShortNumericString(minutesValue)) {
        event.preventDefault();
        return false;
      }

      updateTimeInput(hours, minutesValue);
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
    const ariaDescribedBy = composeAriaDescribedBy(id, helperText, errorText, successText, infoText);

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
    const labelId = `${id}-label`;

    return (
      <InputWrapper {...wrapperProps} id={id} labelId={labelId} isAriaLabelledBy>
        <div {...frameProps} role="group" aria-labelledby={labelId}>
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
          {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
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
          {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
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
