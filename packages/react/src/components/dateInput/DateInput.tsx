import { format, parse, isValid, subYears, addYears, startOfMonth, endOfMonth } from 'date-fns';
import React, { useState, useRef, useEffect, useCallback } from 'react';
import { usePopper } from 'react-popper';

import { IconCalendar } from '../../icons';
import classNames from '../../utils/classNames';
import mergeRefWithInternalRef from '../../utils/mergeRefWithInternalRef';
import { scrollIntoViewIfNeeded } from '../../utils/scrollIntoViewIfNeeded';
import { TextInput, TextInputProps } from '../textInput';
import { DatePicker } from './components/datePicker';
import styles from './DateInput.module.scss';

export type DateInputProps = Omit<TextInputProps, 'onChange'> & {
  /**
   * Close button label
   */
  closeButtonLabel?: string;
  /**
   * Select the date from date picker without confirmation button.
   */
  disableConfirmation?: boolean;
  /**
   * Show the input without the date picker.
   */
  disableDatePicker?: boolean;
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
  /**
   * Minumum date to show in the datepicker calendar. Defaults to start of the month one year before current date.
   */
  minDate?: Date;
  /**
   * Maximum date to show in the datepicker calendar. Defaults to end of the month one year from current date.
   */
  maxDate?: Date;
  /**
   * The `ref` is forwarded to the native input element.
   */
  ref?: React.Ref<HTMLInputElement>;
  /**
   * Disables date(s) based on conditional function
   */
  isDateDisabledBy?: (date) => boolean;
};

export const DateInput = React.forwardRef<HTMLInputElement, DateInputProps>(
  (
    {
      closeButtonLabel,
      disableConfirmation = false,
      disableDatePicker = false,
      initialMonth = new Date(),
      language = 'en',
      openButtonAriaLabel,
      selectButtonLabel,
      defaultValue,
      value: providedValue,
      minDate,
      maxDate,
      isDateDisabledBy,
      ...textInputProps
    }: DateInputProps,
    ref?: React.Ref<HTMLInputElement>,
  ) => {
    const dateFormat = 'd.M.yyyy';
    const pickerWrapperRef = useRef<HTMLDivElement>();
    const inputRef = useRef<HTMLInputElement>();
    const didMount = useRef(false);
    const [inputValue, setInputValue] = useState<string>(providedValue || defaultValue || '');
    const [showPicker, setShowPicker] = useState(false);
    const getToggleButton = (): HTMLButtonElement | null => inputRef.current?.parentNode.querySelector('button');

    /**
     * Set the input value if value prop changes
     */
    useEffect(() => {
      if (didMount.current) {
        setInputValue(providedValue || '');
      } else {
        didMount.current = true;
      }
    }, [providedValue]);

    /**
     * Close the datepicker modal
     */
    const closeDatePicker = (focusToggleButton = true) => {
      setShowPicker(false);

      // Focus the date picker open button
      if (inputRef.current && focusToggleButton) {
        const button = getToggleButton();
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
        if (showPicker === true) {
          const isOutside = pickerWrapperRef.current && !pickerWrapperRef.current.contains(event.target as Node);
          const toggleButton = getToggleButton();
          const isToggleButton =
            toggleButton && (toggleButton === event.target || toggleButton.contains(event.target as Node));
          if (isOutside && !isToggleButton) {
            const focusToggleButton = document.activeElement === null || document.activeElement.tagName === 'BODY';
            closeDatePicker(focusToggleButton);
          }
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
      let scrollTimeout;
      if (showPicker === true && pickerWrapperRef.current) {
        const focusableElements = 'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])';
        const firstFocusableElement = pickerWrapperRef.current.querySelector(focusableElements);
        if (firstFocusableElement) {
          (firstFocusableElement as HTMLElement).focus();
        }
        scrollTimeout = setTimeout(() => {
          scrollIntoViewIfNeeded(pickerWrapperRef.current);
        }, 30);
      }
      return () => {
        clearTimeout(scrollTimeout);
      };
    }, [showPicker]);

    /**
     * Handle the date picker open button
     */
    const onOpenButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
      event.preventDefault();
      setShowPicker(!showPicker);
    };

    /**
     * Merge props.ref to the internal ref. This is needed because we need the ref ourself and cannot rely on
     * component user to provide it.
     */
    useEffect(() => {
      if (ref) {
        mergeRefWithInternalRef(ref, inputRef);
      }
    }, [inputRef, ref]);

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

    // Initialize Popper.js
    const { styles: datePickerPopperStyles, attributes: datePickerPopperAttributes } = usePopper(
      inputRef.current,
      pickerWrapperRef.current,
      {
        placement: 'bottom-end',
        modifiers: [
          {
            name: 'offset',
            options: {
              offset: [0, 5],
            },
          },
          {
            name: 'flip',
            options: {
              rootBoundary: 'document',
              fallbackPlacements: ['bottom-start', 'top-end'],
            },
          },
          {
            name: 'eventListeners',
            options: {
              scroll: false,
              resize: true,
            },
          },
        ],
      },
    );

    return (
      <div lang={language} className={styles.wrapper}>
        <TextInput
          {...textInputProps}
          buttonIcon={disableDatePicker ? undefined : <IconCalendar aria-hidden />}
          buttonAriaLabel={disableDatePicker ? undefined : getOpenButtonLabel()}
          onButtonClick={disableDatePicker ? undefined : onOpenButtonClick}
          onChange={(event) => {
            handleInputChange(event.target.value);
          }}
          value={inputValue}
          ref={inputRef}
          inputMode="numeric"
        >
          {disableDatePicker === false && (
            <div
              ref={pickerWrapperRef}
              className={classNames(styles.pickerWrapper, showPicker && styles.isVisible)}
              role="dialog"
              aria-modal="true"
              aria-hidden={showPicker ? undefined : true}
              style={datePickerPopperStyles.popper}
              {...datePickerPopperAttributes.popper}
            >
              <DatePicker
                language={language}
                disableConfirmation={disableConfirmation}
                selected={isValid(inputValueAsDate) ? inputValueAsDate : undefined}
                initialMonth={initialMonth}
                onDaySelect={(day) => {
                  closeDatePicker();
                  handleInputChange(format(day, dateFormat));
                }}
                onCloseButtonClick={() => closeDatePicker()}
                selectButtonLabel={getSelectButtonLabel()}
                closeButtonLabel={getCloseButtonLabel()}
                minDate={minDate && isValid(minDate) ? minDate : startOfMonth(subYears(new Date(), 10))}
                maxDate={maxDate && isValid(maxDate) ? maxDate : endOfMonth(addYears(new Date(), 10))}
                isDateDisabledBy={isDateDisabledBy}
              />
            </div>
          )}
        </TextInput>
      </div>
    );
  },
);
