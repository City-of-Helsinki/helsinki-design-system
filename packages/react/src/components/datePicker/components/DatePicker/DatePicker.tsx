import React, { useState, useRef, useEffect } from 'react';
import addDays from 'date-fns/addDays';
import startOfMonth from 'date-fns/startOfMonth';
import format from 'date-fns/format';

import { defaultProps } from './defaults/defaultProps';
import { DatePickerContext } from '../../context/DatePickerContext';
import { DayPickerProps } from './types';
import '../../style.scss';
import { MonthTable } from '../MonthTable';
import { IconCross } from '../../../..';
import { Button } from '../../../button';

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
    onDayClick,
    locale,
    fromMonth,
    toMonth,
    nextMonthLabel,
    prevMonthLabel,
    onCloseButtonClick,
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
    if (onDayClick) {
      onDayClick(date, e);
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

  return (
    <DatePickerContext.Provider
      value={{
        datepickerRef,
        fromMonth,
        toMonth,
        currentMonth,
        focusedDate,
        selectedDate,
        locale,
        nextMonthLabel,
        prevMonthLabel,
        setCurrentMonth,
        setFocusedDate,
        setSelectedDate,
        onDayClick: handleDayClick,
        handleKeyboardNavigation,
        handleMonthChange,
      }}
    >
      <div className="hds-datepicker" ref={datepickerRef}>
        <MonthTable month={currentMonth} dayPickerProps={{ ...defaultProps, ...providedProps }} />
        <div className="hds-datepicker__bottom-buttons">
          <Button
            size="small"
            variant="supplementary"
            iconLeft={<IconCross aria-hidden />}
            onClick={onCloseButtonClick}
          >
            Close
          </Button>
        </div>
      </div>
    </DatePickerContext.Provider>
  );
};
