import { format, parse, isValid, Locale } from 'date-fns';
import React, { useState, useRef, useEffect } from 'react';
import english from 'date-fns/locale/en-GB';

import { IconCalendar } from '../../icons';
import classNames from '../../utils/classNames';
import { TextInput, TextInputProps } from '../textInput';
import { DatePicker } from './components/DatePicker';
import styles from './DateInput.module.scss';

export type DateInputProps = TextInputProps & {
  /**
   * When `true`, the selected date must be confirmed with the "select" button
   */
  confirmDate?: boolean;
  /**
   * Date format based on date-fns format tokens (https://date-fns.org/docs/format)
   * @default "d.M.yyyy"
   */
  dateFormat?: string;
  /**
   * Calendar button aria-label
   * @default "Choose date"
   */
  openButtonAriaLabel?: string;
  /**
   * Select button label
   * @default "Select"
   */
  selectButtonLabel?: string;
  /**
   * Close button label
   * @default "Close"
   */
  closeButtonLabel?: string;
  /**
   * Locale. See date-fns documentation for more information: https://date-fns.org/docs/I18n
   *
   * @default "English with weeks starting on monday"
   */
  locale?: Locale;
};

export const DateInput = ({
  confirmDate = true,
  dateFormat = 'd.M.yyyy',
  openButtonAriaLabel = 'Choose date',
  locale = english,
  selectButtonLabel = 'Select',
  closeButtonLabel = 'Close',
  ...textInputProps
}: DateInputProps) => {
  const pickerWrapperRef = useRef<HTMLDivElement>();
  const [inputValue, setInputValue] = useState<string>('');
  const [showPicker, setShowPicker] = useState(false);

  /**
   * Close datepicker when clicked outside
   */
  useEffect(() => {
    const handleClickOutsideWrapper = (event: MouseEvent) => {
      if (showPicker === true && pickerWrapperRef.current && !pickerWrapperRef.current.contains(event.target as Node)) {
        setShowPicker(false);
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
    const handleTab = (event: KeyboardEvent) => {
      // Skip if pressed key was not tab
      if (!(event.key === 'Tab' || event.keyCode === 9)) {
        return;
      }
      // Get all focusable elements inside the modal
      const focusableElements = pickerWrapperRef.current.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
      );
      const firstFocusableElement = focusableElements[0];
      const lastFocusableElement = focusableElements[focusableElements.length - 1];

      // Check if shift key is pressed
      if (event.shiftKey) {
        // If currently active element is the first element, focus the last one
        if (document.activeElement === firstFocusableElement) {
          (lastFocusableElement as HTMLElement).focus();
          event.preventDefault();
        }
      }
      // If shift is not pressed and active element is the last element, focust the first one
      else if (document.activeElement === lastFocusableElement) {
        (firstFocusableElement as HTMLElement).focus();
        event.preventDefault();
      }
    };
    const pickerModal = pickerWrapperRef.current;
    pickerModal.addEventListener('keydown', handleTab);
    return () => {
      if (pickerModal) {
        pickerModal.removeEventListener('keydown', handleTab);
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
   * Handle the toggle button clicks
   */
  const onButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    setShowPicker(!showPicker);
  };

  // Parse input value to Date
  const date = parse(inputValue, dateFormat, new Date());

  return (
    <div className={styles.wrapper}>
      <TextInput
        {...textInputProps}
        buttonIcon={<IconCalendar aria-hidden />}
        buttonAriaLabel={openButtonAriaLabel}
        onButtonClick={onButtonClick}
        onChange={(event) => setInputValue(event.target.value)}
        value={inputValue}
      />
      <div
        ref={pickerWrapperRef}
        className={classNames(styles.pickerWrapper, showPicker && styles.isVisible)}
        role="dialog"
        aria-modal="true"
        aria-hidden={showPicker ? undefined : true}
      >
        <DatePicker
          locale={locale}
          confirmDate={confirmDate}
          selected={isValid(date) ? date : undefined}
          initialMonth={new Date(2021, 0)}
          onDaySelect={(day) => {
            setShowPicker(false);
            setInputValue(format(day, dateFormat));
          }}
          onCloseButtonClick={() => {
            setShowPicker(false);
          }}
          selectButtonLabel={selectButtonLabel}
          closeButtonLabel={closeButtonLabel}
        />
      </div>
    </div>
  );
};
