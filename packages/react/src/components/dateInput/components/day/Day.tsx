import React from 'react';
import endOfMonth from 'date-fns/endOfMonth';
import format from 'date-fns/format';
import isAfter from 'date-fns/isAfter';
import isBefore from 'date-fns/isBefore';
import isSameDay from 'date-fns/isSameDay';
import isToday from 'date-fns/isToday';
import startOfMonth from 'date-fns/startOfMonth';

import { DatePickerContext } from '../../context/DatePickerContext';
import cn from '../../../../utils/classNames';
import styles from '../datePicker/DatePicker.module.scss';

export type DayProps = {
  /**
   * The day to display in the calendar.
   */
  day: Date;
};

/**
 * The Day component renders the content of the day cell. It renders a button
 * if the day is interactive (i.e. it is clickable).
 */
export const Day = ({ day }: DayProps) => {
  const {
    focusedDate,
    currentMonth,
    selectedDate,
    setFocusedDate,
    locale,
    onDayClick,
    handleKeyboardNavigation,
  } = React.useContext(DatePickerContext);
  const dayRef = React.useRef<HTMLButtonElement>();
  const isPreviousMonth = isBefore(day, startOfMonth(currentMonth));
  const isNextMonth = isAfter(day, endOfMonth(currentMonth));
  const isOutsideCurrentMonth = isPreviousMonth || isNextMonth;
  const isHidden = isOutsideCurrentMonth;
  const isDisabled = isOutsideCurrentMonth;
  const isInteractive = onDayClick && !isDisabled;

  // Select the HTML element based on interactivity
  const DayElement = isInteractive ? 'button' : 'span';

  let tabIndex = -1;

  const hasFocusedDate =
    focusedDate &&
    !isBefore(focusedDate, startOfMonth(currentMonth)) &&
    !isAfter(focusedDate, endOfMonth(currentMonth));
  if ((!hasFocusedDate && day.getDate() === 1) || (hasFocusedDate && isSameDay(day, focusedDate))) {
    tabIndex = 0;
  }

  const dayElementProps = {
    'aria-disabled': !isInteractive || undefined,
    'aria-hidden': isHidden || undefined,
    'aria-pressed': isSameDay(day, selectedDate),
    disabled: isDisabled || undefined,
    onClick: isInteractive
      ? (e: React.MouseEvent<HTMLButtonElement>) => {
          e.stopPropagation();
          e.preventDefault();
          onDayClick(day, e);
        }
      : undefined,
    onFocus: () => setFocusedDate(day),
    onKeyDown: isInteractive ? handleKeyboardNavigation : undefined,
    ref: isInteractive ? dayRef : undefined,
    tabIndex: isInteractive ? tabIndex : undefined,
    className: cn(
      styles['hds-datepicker__day'],
      isToday(day) && styles['hds-datepicker__day--today'],
      isSameDay(day, selectedDate) && styles['hds-datepicker__day--selected'],
      isDisabled && styles['hds-datepicker__day--disabled'],
      isOutsideCurrentMonth && styles['hds-datepicker__day--outside'],
    ),
    'data-date': format(day, 'yyyy-MM-dd'),
  };

  return (
    <DayElement {...dayElementProps}>
      <span className={styles['hds-datepicker__day__wrapper']} aria-hidden>
        {format(day, 'd', { locale })}
      </span>
      <span className={styles['hds-datepicker__day__wrapper-vhidden']}>{format(day, 'LLLL d', { locale })}</span>
    </DayElement>
  );
};
