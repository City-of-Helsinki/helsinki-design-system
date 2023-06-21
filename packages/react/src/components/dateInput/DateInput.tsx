import { format, parse, isValid, subYears, addYears, startOfMonth, endOfMonth, max } from 'date-fns';
import React, { useState, useRef, useEffect, useCallback, useMemo } from 'react';

import { IconCalendar } from '../../icons';
import mergeRefWithInternalRef from '../../utils/mergeRefWithInternalRef';
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
   * Disables date(s) based on conditional function
   */
  isDateDisabledBy?: (date) => boolean;
  /**
   * Function to set class names for dates
   */
  setDateClassNames?: (date: Date) => string | undefined;
  /**
   * Legend items for the date picker
   * @param {{ key: string, label: string }} LegendItem
   * */
  legend?: {
    key: string;
    label: string;
  }[];
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
      setDateClassNames,
      legend,
      ...textInputProps
    }: DateInputProps,
    ref?: React.Ref<HTMLInputElement>,
  ) => {
    const dateFormat = 'd.M.yyyy';
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
    const toggleButton = getToggleButton();
    // Use useMemo for minDateToUse, maxDateToUse, selected and initialMonth to set
    // new currentMonth value in DatePicker component only if any of these values
    // is changed.
    // Changing currentMonth value re-renders MonthTable and values of all the input
    // fields it contains will be reseted which can be quite irritating for the user.
    const minDateToUse = useMemo(
      () => (minDate && isValid(minDate) ? minDate : startOfMonth(subYears(new Date(), 10))),
      [minDate],
    );
    const maxDateToUse = useMemo(
      () => (maxDate && isValid(maxDate) ? maxDate : endOfMonth(addYears(max([minDateToUse, new Date()]), 10))),
      [maxDate],
    );
    const selected = useMemo(() => (isValid(inputValueAsDate) ? inputValueAsDate : undefined), [inputValueAsDate]);
    const initialMonth = useMemo(() => _initialMonth || new Date(), [_initialMonth]);

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
        >
          {disableDatePicker === false && showPicker && (
            <DatePicker
              language={language}
              disableConfirmation={disableConfirmation}
              selected={selected}
              initialMonth={initialMonth}
              onDaySelect={(day) => {
                closeDatePicker();
                handleInputChange(format(day, dateFormat));
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
              setDateClassNames={setDateClassNames}
              legend={legend}
            />
          )}
        </TextInput>
      </div>
    );
  },
);
