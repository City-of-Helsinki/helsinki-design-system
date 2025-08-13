import { format, parse, isValid, subYears, addYears, startOfMonth, endOfMonth } from 'date-fns';
import React, { useState, useRef, useEffect, useCallback } from 'react';

import styles from './DateInput.module.scss';
import { IconCalendar } from '../../icons';
import mergeRefWithInternalRef from '../../utils/mergeRefWithInternalRef';
import { TextInput, TextInputProps } from '../textInput';
import { DatePicker, LegendItem } from './components/datePicker';

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
   * Minimum date to show in the datepicker calendar. Defaults to start of the month ten years before current date.
   */
  minDate?: Date;
  /**
   * Maximum date to show in the datepicker calendar. Defaults to end of the month ten years from current date.
   */
  maxDate?: Date;
  /**
   * The `ref` is forwarded to the native input element.
   */
  ref?: React.Ref<HTMLInputElement>;
  /**
   * Disables date(s) based on conditional function.
   */
  isDateDisabledBy?: (date) => boolean;
  /**
   * Set classNames for specific dates.
   */
  setDateClassName?: (date: Date) => string | undefined;
  /**
   * Legend items for the date picker.
   * @example
   * ```ts
   * legend={[{ elementId: 'legend-item-1', label: 'Text label', relatedClassName: 'custom-day' }, { elementId: 'legend-item-2', label: 'Text label', color: '#d6d66d' }]}
   * ```
   * */
  legend?: LegendItem[];
  /**
   * Function to set aria-describedby for dates.
   */
  setDateAriaDescribedBy?: (date: Date) => string | undefined;
  /**
   * Date format for the input value.
   * Documentation: https://date-fns.org/v2.16.1/docs/format
   * @default "d.M.yyyy"
   * */
  dateFormat?: string;
  /**
   * Error text for invalid date format, or if date does not exist.
   */
  malformedDateErrorText?: string;
  /**
   * Error text for date outside the allowed range.
   */
  dateOutsideRangeErrorText?: string;
};

export const DateInput = React.forwardRef<HTMLInputElement, DateInputProps>(
  (
    {
      closeButtonLabel,
      disableConfirmation = false,
      disableDatePicker = false,
      initialMonth: _initialMonth,
      language = 'en',
      openButtonAriaLabel,
      selectButtonLabel,
      defaultValue,
      value: providedValue,
      minDate,
      maxDate,
      isDateDisabledBy,
      setDateClassName,
      legend,
      setDateAriaDescribedBy,
      dateFormat = 'd.M.yyyy',
      malformedDateErrorText,
      dateOutsideRangeErrorText,
      ...textInputProps
    }: DateInputProps,
    ref?: React.Ref<HTMLInputElement>,
  ) => {
    const inputRef = useRef<HTMLInputElement | null>(null);
    const didMount = useRef(false);
    const [inputValue, setInputValue] = useState<string>(providedValue || defaultValue || '');
    const [showPicker, setShowPicker] = useState(false);
    const getToggleButton = (): HTMLButtonElement | null => inputRef.current?.parentNode.querySelector('button');
    const [dateIsInvalid, setDateIsInvalid] = useState(false);
    const [dateOutsideRange, setDateOutsideRange] = useState(false);
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
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setInputValue(e.target.value);
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

    const getMalformedDateText = () => {
      if (malformedDateErrorText) {
        return malformedDateErrorText;
      }
      return {
        en: 'Invalid date or date format',
        fi: 'Virheellinen päivämäärä tai päivämäärämuoto',
        sv: 'Ogiltigt datum eller datumformat',
      }[language];
    };

    const getDateOutsideRangeText = () => {
      if (dateOutsideRangeErrorText) {
        return dateOutsideRangeErrorText;
      }
      return {
        en: 'Date is outside the allowed range',
        fi: 'Päivämäärä on sallitun alueen ulkopuolella',
        sv: 'Datumet ligger utanför det tillåtna intervallet',
      }[language];
    };

    // Get the current value as Date object
    const inputValueAsDate = stringToDate(inputValue);
    const toggleButton = getToggleButton();
    const selected = isValid(inputValueAsDate) ? inputValueAsDate : undefined;
    const minDateToUse = minDate && isValid(minDate) ? minDate : startOfMonth(subYears(selected || new Date(), 10));
    const maxDateToUse = maxDate && isValid(maxDate) ? maxDate : endOfMonth(addYears(selected || new Date(), 10));
    const initialMonth = _initialMonth || new Date();

    const handleBlur = (value: string, e?: React.FocusEvent<HTMLInputElement>) => {
      if (value !== inputValue) {
        setInputValue(value);
      }

      if (textInputProps.onBlur && e) {
        textInputProps.onBlur(e);
      }

      const valueAsDate = stringToDate(value);

      if (textInputProps.onChange) {
        textInputProps.onChange(value, valueAsDate);
      }

      if (value === '') {
        return;
      }

      const isValidDate = isValid(valueAsDate) && (isDateDisabledBy ? !isDateDisabledBy(valueAsDate) : true);

      // check if the date is outside the allowed range (if minDate and/or maxDate are set)
      const isOutsideRange = (minDate ? valueAsDate < minDate : false) || (maxDate ? valueAsDate > maxDate : false);

      if (isOutsideRange !== dateOutsideRange) {
        setDateOutsideRange(isOutsideRange);
      }

      setDateIsInvalid(!isValidDate);
    };

    // form the error text, prioritize the given prop
    const errorText =
      textInputProps.errorText ||
      (dateIsInvalid && getMalformedDateText()) ||
      (dateOutsideRange && getDateOutsideRangeText()) ||
      undefined;

    return (
      <div lang={language} className={styles.wrapper}>
        <TextInput
          {...textInputProps}
          buttonIcon={disableDatePicker ? undefined : <IconCalendar />}
          buttonAriaLabel={disableDatePicker ? undefined : getOpenButtonLabel()}
          buttonAriaControlsId="hds-date-picker"
          buttonAriaExpanded={showPicker}
          onButtonClick={disableDatePicker ? undefined : onOpenButtonClick}
          onChange={handleInputChange}
          onBlur={(e) => handleBlur(e.target.value, e)}
          onKeyPress={(e) => {
            if (e.key === 'Enter') {
              e.preventDefault();
              handleBlur((e.target as HTMLInputElement).value);
            }
          }}
          value={inputValue}
          ref={inputRef}
          invalid={dateIsInvalid || dateOutsideRange}
          {...(dateIsInvalid || dateOutsideRange ? { 'aria-invalid': true } : {})}
          errorText={errorText}
        >
          {disableDatePicker === false && showPicker && (
            <DatePicker
              id="hds-date-picker"
              language={language}
              disableConfirmation={disableConfirmation}
              selected={selected}
              initialMonth={initialMonth}
              onDaySelect={(day) => {
                closeDatePicker();
                handleBlur(format(day, dateFormat));
              }}
              onCloseButtonClick={(focusToggleButton) => closeDatePicker(focusToggleButton)}
              selectButtonLabel={getSelectButtonLabel()}
              closeButtonLabel={getCloseButtonLabel()}
              minDate={minDateToUse}
              maxDate={maxDateToUse}
              isDateDisabledBy={isDateDisabledBy}
              open={showPicker}
              inputRef={inputRef}
              toggleButton={toggleButton}
              setDateClassName={setDateClassName}
              legend={legend}
              setDateAriaDescribedBy={setDateAriaDescribedBy}
            />
          )}
        </TextInput>
      </div>
    );
  },
);
