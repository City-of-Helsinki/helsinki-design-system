import React, { useState, useRef, useEffect } from 'react';
import addDays from 'date-fns/addDays';
import startOfMonth from 'date-fns/startOfMonth';
import format from 'date-fns/format';
import english from 'date-fns/locale/en-GB';
import finnish from 'date-fns/locale/fi';
import swedish from 'date-fns/locale/sv';

import styles from './DatePicker.module.scss';
import { defaultProps } from './defaults/defaultProps';
import { DatePickerContext } from '../../context/DatePickerContext';
import { DayPickerProps } from './types';
import { MonthTable } from '../monthTable';
import { Button } from '../../../button';
import { IconCheck, IconCross } from '../../../../icons';

const keyCode = {
  TAB: 9,
  ESC: 27,
  SPACE: 32,
  LEFT: 37,
  UP: 38,
  RIGHT: 39,
  DOWN: 40,
};

export const DatePicker = (providedProps: DayPickerProps) => {
  const {
    initialMonth,
    onMonthChange,
    onDaySelect,
    language,
    fromMonth,
    toMonth,
    onCloseButtonClick,
    selected,
    disableConfirmation,
    selectButtonLabel,
    closeButtonLabel,
  } = {
    ...defaultProps,
    ...providedProps,
  };

  /**
   * Datepicker container ref
   */
  const datepickerRef = useRef<HTMLDivElement>();

  /**
   * Current month
   */
  const [currentMonth, setCurrentMonth] = useState(startOfMonth(initialMonth || new Date()));

  /**
   * Currently focused date
   */
  const [focusedDate, setFocusedDate] = useState<Date>(null);

  /**
   * Currently selected date
   */
  const [selectedDate, setSelectedDate] = useState<Date>(null);

  /**
   * Update the selected date from props
   */
  useEffect(() => {
    if (selected && selected instanceof Date) {
      setSelectedDate(selected);
      setCurrentMonth(startOfMonth(selected));
    }
  }, [selected]);

  /**
   * Focus the selected date button
   */
  useEffect(() => {
    if (focusedDate) {
      const dateEl = datepickerRef.current.querySelector(`button[data-date='${format(focusedDate, 'yyyy-MM-dd')}']`);
      if (dateEl) {
        (dateEl as HTMLButtonElement).focus();
      }
    }
  }, [focusedDate]);

  /**
   * Handle month change and call onMonthChange callback if provided
   * @param nextMonth The next month
   * @param event The mouse event
   */
  const handleMonthChange = (nextMonth: Date, event: React.MouseEvent) => {
    setCurrentMonth(nextMonth);
    if (typeof onMonthChange === 'function') {
      onMonthChange(nextMonth, event);
    }
  };

  /**
   * Add/subtract from focused date
   * @param days
   */
  const addToFocusedDate = (days: number) => {
    if (focusedDate !== null) {
      const nextDate = addDays(focusedDate, days);
      setCurrentMonth(startOfMonth(nextDate));
      setFocusedDate(nextDate);
    }
  };

  /**
   * Handle single date click
   */
  const handleDayClick = (date: Date, e: React.MouseEvent) => {
    setSelectedDate(date);
    if (onDaySelect && disableConfirmation) {
      onDaySelect(date, e);
    }
  };

  /**
   * Handle confirm button click
   */
  const handleConfirmClick: React.MouseEventHandler<HTMLButtonElement> = (event) => {
    if (onDaySelect) {
      onDaySelect(selectedDate, event);
    }
  };

  /**
   * Handle the keyboard navigation
   * @param event
   */
  const handleKeyboardNavigation = (event: React.KeyboardEvent<HTMLButtonElement>) => {
    let handled = true;

    switch (event.keyCode) {
      case keyCode.RIGHT:
        addToFocusedDate(1);
        break;
      case keyCode.LEFT:
        addToFocusedDate(-1);
        break;
      case keyCode.UP:
        addToFocusedDate(-7);
        break;
      case keyCode.DOWN:
        addToFocusedDate(7);
        break;
      case keyCode.SPACE:
        handleDayClick(focusedDate, null);
        break;
      default:
        handled = false;
        break;
    }

    if (handled === true) {
      event.preventDefault();
    }
  };

  const getLocaleByLanguage = (lang: 'en' | 'fi' | 'sv') => {
    return { en: english, fi: finnish, sv: swedish }[lang];
  };

  return (
    <DatePickerContext.Provider
      value={{
        datepickerRef,
        fromMonth,
        toMonth,
        currentMonth,
        focusedDate,
        selectedDate,
        locale: getLocaleByLanguage(language),
        language,
        setCurrentMonth,
        setFocusedDate,
        setSelectedDate,
        onDayClick: handleDayClick,
        handleKeyboardNavigation,
        handleMonthChange,
      }}
    >
      <div className={styles['hds-datepicker']} ref={datepickerRef}>
        <MonthTable month={currentMonth} />
        <div className={styles['hds-datepicker__bottom-buttons']}>
          {!disableConfirmation && (
            <Button
              disabled={!selectedDate}
              size="small"
              variant="secondary"
              iconLeft={<IconCheck aria-hidden />}
              onClick={handleConfirmClick}
            >
              {selectButtonLabel}
            </Button>
          )}
          <Button
            size="small"
            variant="supplementary"
            iconLeft={<IconCross aria-hidden />}
            onClick={onCloseButtonClick}
          >
            {closeButtonLabel}
          </Button>
        </div>
      </div>
    </DatePickerContext.Provider>
  );
};
