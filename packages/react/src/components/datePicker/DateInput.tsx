import { format, parse, isValid } from 'date-fns';
import React, { useState, useRef, useEffect } from 'react';

import { IconCalendar } from '../../icons';
import { TextInput } from '../textInput';
import { DatePicker } from './components/DatePicker';
import styles from './DateInput.module.scss';

export const DateInput = () => {
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

  const dateFormat = 'dd.MM.yyyy';
  const date = parse(inputValue, dateFormat, new Date());

  return (
    <div className={styles.wrapper}>
      <TextInput
        id="date"
        label="Pick a date"
        buttonIcon={<IconCalendar aria-hidden />}
        buttonAriaLabel="Open date picker"
        onButtonClick={onButtonClick}
        onChange={(event) => setInputValue(event.target.value)}
        value={inputValue}
      />
      <div
        ref={pickerWrapperRef}
        className={styles.pickerWrapper}
        style={{ opacity: showPicker ? 1 : 0 }}
        role="dialog"
        aria-modal="true"
        aria-hidden={showPicker ? undefined : true}
      >
        <DatePicker
          selected={isValid(date) ? date : undefined}
          initialMonth={new Date(2021, 0)}
          onDayClick={(day) => {
            setInputValue(format(day, dateFormat));
          }}
          onCloseButtonClick={() => {
            setShowPicker(false);
          }}
        />
      </div>
    </div>
  );
};
