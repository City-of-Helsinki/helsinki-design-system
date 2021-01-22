import React, { FocusEventHandler, useLayoutEffect, useRef, useState } from 'react';
import 'hds-core';
import isFunction from 'lodash.isfunction';

import { InputWrapper } from '../../internal/input-wrapper/InputWrapper';
import { TextInputProps } from '../textInput/TextInput';
import styles from './TimeInputAlternative.module.scss';

const zeroPad = (value: string) => {
  if (value.length >= 2) {
    return value;
  }
  if (value.length === 1) {
    return `0${value}`;
  }
  return value;
};

const incrementNumber = (min: number, max: number, current: number, modifier: number) => {
  return Math.max(Math.min(current + modifier, max), min);
};

const NUMBER_KEYS = '0,1,2,3,4,5,6,7,8,9'.split(',');

export const TimeInputAlternative = React.forwardRef<HTMLInputElement, TextInputProps>(
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
      onChange = () => null,
      required,
      style,
      successText,
      tooltipLabel,
      tooltipText,
      tooltipButtonLabel,
      type = 'text',
      ...rest
    }: TextInputProps,
    ref?: React.Ref<HTMLInputElement>,
  ) => {
    const inputRef = useRef<HTMLInputElement>(null);
    const hoursInputRef = useRef<HTMLInputElement>(null);
    const minutesInputRef = useRef<HTMLInputElement>(null);
    const [hours, setHours] = useState<string>('');
    const [minutes, setMinutes] = useState<string>('');
    const [time, setTime] = useState<string>('');

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

    /**
     * Update the full time input and dispatch the native onChange event
     */
    const updateTimeInput = (newHours: string, newMinutes: string) => {
      setHours(newHours);
      setMinutes(newMinutes);
      const newTimeValue = `${newHours}:${newMinutes}`;
      setTime(newTimeValue);
      const nativeInputValueSetter = Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, 'value').set;
      nativeInputValueSetter.call(inputRef.current, newTimeValue);
      const event = new Event('input', { bubbles: true });
      inputRef.current.dispatchEvent(event);
    };

    /**
     * Merge props.ref to the internal ref
     */
    useLayoutEffect(() => {
      if (ref) {
        if (isFunction(ref)) {
          (ref as (instance: HTMLInputElement) => void)(inputRef.current);
        } else {
          // eslint-disable-next-line no-param-reassign
          (ref as React.MutableRefObject<HTMLInputElement>).current = inputRef.current;
        }
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
      const { value } = event.target;
      const intValue = parseInt(value, 10);
      if (intValue < 0 || intValue > 23 || !value.match(/^(\d{1,2})?$/)) {
        event.preventDefault();
        return false;
      }
      if (value.length <= 2) {
        updateTimeInput(event.target.value, minutes);
      }
    };

    /**
     * Handle minutes input change
     */
    const onMinutesChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
      const { value } = event.target;
      const intValue = parseInt(value, 10);
      if (intValue < 0 || intValue > 59 || !value.match(/^(\d{1,2})?$/)) {
        event.preventDefault();
        return false;
      }
      if (value.length <= 2) {
        updateTimeInput(hours, event.target.value);
      }
    };

    /**
     * Focus minutes input after hours input has 2 chars
     */
    const onHoursKeyUp: React.KeyboardEventHandler<HTMLInputElement> = (event) => {
      if (event.currentTarget.value.length === 2 && NUMBER_KEYS.includes(event.key)) {
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
      if (['ArrowUp', 'ArrowDown'].includes(event.key)) {
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
      if (['ArrowUp', 'ArrowDown'].includes(event.key)) {
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
    const ariaDescribedBy = [helperText && `${id}-helper`, errorText && `${id}-error`, successText && `${id}-success`]
      .filter((item) => item)
      .join(' ');

    // Compose props for the input frame
    const frameProps = {
      className: styles.input,
      onClick: (event: React.MouseEvent) => {
        if (event.target !== hoursInputRef.current && event.target !== minutesInputRef.current) {
          hoursInputRef.current.focus();
        }
      },
    };

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
            tabIndex={0}
            value={time}
            {...rest}
          />
          <input
            className={styles.partialInput}
            type="text"
            id={`${id}-hours`}
            ref={hoursInputRef}
            value={hours}
            inputMode="numeric"
            onChange={onHoursChange}
            onKeyDown={onHoursKeyDown}
            onKeyUp={onHoursKeyUp}
            onFocus={onInputFocus}
            onBlur={onHoursBlur}
            aria-label="Hours"
            aria-describedby={ariaDescribedBy.length > 0 ? ariaDescribedBy : undefined}
            placeholder="--"
          />
          <div className={styles.divider}>:</div>
          <input
            className={styles.partialInput}
            type="text"
            id={`${id}-minutes`}
            ref={minutesInputRef}
            value={minutes}
            inputMode="numeric"
            onChange={onMinutesChange}
            onKeyDown={onMinutesKeyDown}
            onFocus={onInputFocus}
            onBlur={onMinutesBlur}
            aria-label="Minutes"
            aria-describedby={ariaDescribedBy.length > 0 ? ariaDescribedBy : undefined}
            placeholder="--"
          />
        </div>
      </InputWrapper>
    );
  },
);
