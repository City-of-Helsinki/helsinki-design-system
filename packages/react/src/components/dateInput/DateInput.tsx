import { format, parse, isValid } from 'date-fns';
import React, { useState, useRef, useEffect, useCallback } from 'react';

import { IconCalendar } from '../../icons';
import classNames from '../../utils/classNames';
import { TextInput, TextInputProps } from '../textInput';
import { DatePicker } from './components/datePicker';
import styles from './DateInput.module.scss';

export type DateInputProps = Omit<TextInputProps, 'onChange'> & {
  /**
   * Close button label
   */
  closeButtonLabel?: string;
  /**
   * When `true`, the selected date must be confirmed with the "select" button
   */
  confirmDate?: boolean;
  /**
   * Enable date picker alongside the input
   */
  datePicker?: boolean;
  /**
   * The initial month open in calendar.
   */
  initialMonth?: Date;
  /**
   * Language
   *
   * @default "en"
   */
  language?: 'en' | 'fi' | 'sv';
  /**
   * Callback fired when text input value is changed
   */
  onChange?: (value: string, valueAsDate: Date) => void;
  /**
   * Calendar button aria-label
   */
  openButtonAriaLabel?: string;
  /**
   * Select button label
   */
  selectButtonLabel?: string;
};

export const DateInput = ({
  closeButtonLabel,
  confirmDate = true,
  datePicker = true,
  initialMonth = new Date(),
  language = 'en',
  openButtonAriaLabel,
  selectButtonLabel,
  ...textInputProps
}: DateInputProps) => {
  const dateFormat = 'd.M.yyyy';

  const pickerWrapperRef = useRef<HTMLDivElement>();
  const inputRef = useRef<HTMLInputElement>();
  const [inputValue, setInputValue] = useState<string>('');
  const [showPicker, setShowPicker] = useState(false);

  /**
   * Close the datepicker modal
   */
  const closeDatePicker = () => {
    setShowPicker(false);
    // Focus the date picker open button
    if (inputRef.current) {
      const button = inputRef.current.parentNode.querySelector('button');
      if (button) {
        button.focus();
      }
    }
  };

  /**
   * Close datepicker when clicked outside
   */
  useEffect(() => {
    const handleClickOutsideWrapper = (event: MouseEvent) => {
      const isOutside = pickerWrapperRef.current && !pickerWrapperRef.current.contains(event.target as Node);
      if (showPicker === true && isOutside) {
        closeDatePicker();
      }
    };
    window.addEventListener('click', handleClickOutsideWrapper);
    return () => {
      window.removeEventListener('click', handleClickOutsideWrapper);
    };
  });

  /**
   * Handle tab inside date picker
   */
  useEffect(() => {
    const pickerModalElement = pickerWrapperRef.current;
    const tabbleEventHandler = (event: KeyboardEvent) => {
      // Skip if pressed key was not tab
      const isTab = event.key === 'Tab' || event.keyCode === 9;
      if (!isTab) {
        return;
      }
      // Get all focusable elements inside the modal
      const focusableElements = pickerModalElement.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
      );
      const firstFocusableElement = focusableElements[0];
      const lastFocusableElement = focusableElements[focusableElements.length - 1];

      // Check if shift key is pressed
      if (event.shiftKey) {
        // If currently focused element is the first element, move focus the last one
        if (document.activeElement === firstFocusableElement) {
          (lastFocusableElement as HTMLElement).focus();
          event.preventDefault();
        }
      }
      // If shift is not pressed and currently focused element is the last element,
      // move focust the first one
      else if (document.activeElement === lastFocusableElement) {
        (firstFocusableElement as HTMLElement).focus();
        event.preventDefault();
      }
    };
    if (pickerModalElement) {
      pickerModalElement.addEventListener('keydown', tabbleEventHandler);
    }
    return () => {
      if (pickerModalElement) {
        pickerModalElement.removeEventListener('keydown', tabbleEventHandler);
      }
    };
  }, []);

  /**
   * Focus the first focusable element inside the datepicker
   * when opened.
   */
  useEffect(() => {
    if (showPicker === true && pickerWrapperRef.current) {
      const focusableElements = 'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])';
      const firstFocusableElement = pickerWrapperRef.current.querySelector(focusableElements);
      if (firstFocusableElement) {
        (firstFocusableElement as HTMLElement).focus();
      }
    }
  }, [showPicker]);

  /**
   * Handle the date picker open button
   */
  const onOpenButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    setShowPicker(!showPicker);
  };

  // Parse input value string to date
  const stringToDate = useCallback((value: string) => parse(value, dateFormat, new Date()), [dateFormat]);

  // Handle the input change
  const handleInputChange = (value: string) => {
    const disallowedCharacters = /[^0-9.]+/g;
    const newValue = value.replace(disallowedCharacters, '');
    setInputValue(newValue);
    const valueAsDate = stringToDate(newValue);
    if (textInputProps.onChange) {
      textInputProps.onChange(newValue, valueAsDate);
    }
  };

  // Get the open button label based on language
  const getOpenButtonLabel = () => {
    if (openButtonAriaLabel) {
      return openButtonAriaLabel;
    }
    return {
      en: 'Choose date',
      fi: 'Valitse päivämäärä',
      sv: 'Välj datum',
    }[language];
  };

  // Get the select button label based on language
  const getSelectButtonLabel = () => {
    if (selectButtonLabel) {
      return selectButtonLabel;
    }
    return {
      en: 'Select',
      fi: 'Valitse',
      sv: 'Välj',
    }[language];
  };

  // Get the close button label based on language
  const getCloseButtonLabel = () => {
    if (closeButtonLabel) {
      return closeButtonLabel;
    }
    return {
      en: 'Close',
      fi: 'Sulje',
      sv: 'Stäng',
    }[language];
  };

  // Get the current value as Date object
  const inputValueAsDate = stringToDate(inputValue);

  return (
    <div className={styles.wrapper}>
      <TextInput
        {...textInputProps}
        buttonIcon={datePicker ? <IconCalendar aria-hidden /> : undefined}
        buttonAriaLabel={datePicker ? getOpenButtonLabel() : undefined}
        onButtonClick={datePicker ? onOpenButtonClick : undefined}
        onChange={(event) => {
          handleInputChange(event.target.value);
        }}
        value={inputValue}
        ref={inputRef}
        inputMode="numeric"
      />
      {datePicker && (
        <div
          ref={pickerWrapperRef}
          className={classNames(styles.pickerWrapper, showPicker && styles.isVisible)}
          role="dialog"
          aria-modal="true"
          aria-hidden={showPicker ? undefined : true}
        >
          <DatePicker
            language={language}
            confirmDate={confirmDate}
            selected={isValid(inputValueAsDate) ? inputValueAsDate : undefined}
            initialMonth={initialMonth}
            onDaySelect={(day) => {
              closeDatePicker();
              handleInputChange(format(day, dateFormat));
            }}
            onCloseButtonClick={closeDatePicker}
            selectButtonLabel={getSelectButtonLabel()}
            closeButtonLabel={getCloseButtonLabel()}
          />
        </div>
      )}
    </div>
  );
};
