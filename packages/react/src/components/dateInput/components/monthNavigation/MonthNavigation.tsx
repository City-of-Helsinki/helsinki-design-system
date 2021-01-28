import React, { ChangeEvent, useContext } from 'react';
import eachMonthOfInterval from 'date-fns/eachMonthOfInterval';
import format from 'date-fns/format';
import eachYearOfInterval from 'date-fns/eachYearOfInterval';
import startOfMonth from 'date-fns/startOfMonth';
import addMonths from 'date-fns/addMonths';
import endOfMonth from 'date-fns/endOfMonth';
import endOfYear from 'date-fns/endOfYear';
import startOfYear from 'date-fns/startOfYear';

import { DatePickerContext } from '../../context/DatePickerContext';
import { IconAngleDown, IconAngleLeft, IconAngleRight } from '../../../../icons';
import styles from '../datePicker/DatePicker.module.scss';

export interface MonthCaptionProps {
  /**
   * The month the caption is referring to.
   */
  month: Date;
}

/**
 * Renders the caption of the month.
 *
 * @category Components
 */
export const MonthNavigation = ({ month }: MonthCaptionProps) => {
  const { locale, language, handleMonthChange, minDate, maxDate } = useContext(DatePickerContext);
  const selectedYear = month.getFullYear();

  let prevMonth: Date | undefined;
  if (!minDate || month > startOfMonth(minDate)) {
    prevMonth = addMonths(month, -1);
  }

  let nextMonth: Date | undefined;
  if (!maxDate || addMonths(month, 1) <= startOfMonth(maxDate)) {
    nextMonth = addMonths(month, 1);
  }

  const onMonthChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const newSelectedMonth = new Date(month);
    newSelectedMonth.setMonth(Number(event.target.value));
    handleMonthChange(newSelectedMonth);
  };

  const onYearChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const newSelectedMonth = new Date(month);
    newSelectedMonth.setFullYear(Number(event.target.value));
    handleMonthChange(newSelectedMonth);
  };

  const onPrevClick = (e: React.MouseEvent<HTMLButtonElement>): void => {
    if (!prevMonth) return;
    handleMonthChange(prevMonth, e);
  };

  const onNextClick = (e: React.MouseEvent<HTMLButtonElement>): void => {
    if (!nextMonth) return;
    handleMonthChange(nextMonth, e);
  };

  const getPrevMonthLabel = () => {
    return {
      en: 'Previous month',
      fi: 'Edellinen kuukausi',
      sv: 'Föregående månad',
    }[language];
  };

  const getNextMonthLabel = () => {
    return {
      en: 'Next month',
      fi: 'Seuraava kuukausi',
      sv: 'Nästa månad',
    }[language];
  };

  return (
    <div className={styles['hds-datepicker__navigation']}>
      <div className={styles['hds-datepicker__navigation__select']}>
        <select aria-label="Month" onChange={onMonthChange} value={month.getMonth()}>
          {eachMonthOfInterval({ start: new Date(selectedYear, 0, 1), end: new Date(selectedYear, 11, 31) }).map(
            (monthDate) => {
              const monthNumber = monthDate.getMonth();
              const isDisabled = startOfMonth(minDate) > monthDate || endOfMonth(maxDate) < monthDate;
              return (
                <option value={monthNumber} key={monthNumber} disabled={isDisabled}>
                  {format(monthDate, 'LLLL', { locale })}
                </option>
              );
            },
          )}
        </select>
        <div className={styles['hds-datepicker__navigation__select-label']} aria-hidden>
          {format(month, 'LLL', { locale })}
          <div className={styles['hds-datepicker__navigation__select-icon']}>
            <IconAngleDown />
          </div>
        </div>
      </div>
      <div className={styles['hds-datepicker__navigation__select']}>
        <select aria-label="Year" onChange={onYearChange} value={selectedYear}>
          {eachYearOfInterval({ start: startOfYear(minDate), end: endOfYear(maxDate) }).map((yearDate) => {
            const year = yearDate.getFullYear();
            return (
              <option value={year} key={year}>
                {year}
              </option>
            );
          })}
        </select>
        <div className={styles['hds-datepicker__navigation__select-label']} aria-hidden>
          {month.getFullYear()}
          <div className={styles['hds-datepicker__navigation__select-icon']}>
            <IconAngleDown aria-hidden />
          </div>
        </div>
      </div>
      <div className={styles['hds-datepicker__navigation__buttons']}>
        <button disabled={!prevMonth} type="button" onClick={onPrevClick} aria-label={getPrevMonthLabel()}>
          <IconAngleLeft aria-hidden />
        </button>
        <button disabled={!nextMonth} type="button" onClick={onNextClick} aria-label={getNextMonthLabel()}>
          <IconAngleRight aria-hidden />
        </button>
      </div>
    </div>
  );
};
