import eachMonthOfInterval from 'date-fns/eachMonthOfInterval';
import format from 'date-fns/format';
import eachYearOfInterval from 'date-fns/eachYearOfInterval';
import React, { ChangeEvent, useContext } from 'react';
import { startOfMonth } from 'date-fns';
import { addMonths } from 'date-fns/esm';

import { DatePickerContext } from '../../context/DatePickerContext';
import { IconAngleDown, IconAngleLeft, IconAngleRight } from '../../../../icons';

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
  const { locale, handleMonthChange, fromMonth, toMonth, nextMonthLabel, prevMonthLabel } = useContext(
    DatePickerContext,
  );
  const selectedYear = month.getFullYear();
  const minYear = selectedYear - 10;
  const maxYear = selectedYear + 10;

  let prevMonth: Date | undefined;
  if (!fromMonth || month > startOfMonth(fromMonth)) {
    prevMonth = addMonths(month, -1);
  }

  let nextMonth: Date | undefined;
  if (!toMonth || addMonths(month, 1) <= startOfMonth(toMonth)) {
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

  return (
    <div className="hds-datepicker__navigation">
      <div className="hds-datepicker__navigation__select">
        <select aria-label="Month" onChange={onMonthChange} value={month.getMonth()}>
          {eachMonthOfInterval({ start: new Date(selectedYear, 0, 1), end: new Date(selectedYear, 11, 31) }).map(
            (monthDate) => {
              const monthNumber = monthDate.getMonth();
              return (
                <option value={monthNumber} key={monthNumber}>
                  {format(monthDate, 'LLLL', { locale })}
                </option>
              );
            },
          )}
        </select>
        <div className="hds-datepicker__navigation__select-label" aria-hidden>
          {format(month, 'LLL', { locale })}
          <div className="hds-datepicker__navigation__select-icon">
            <IconAngleDown />
          </div>
        </div>
      </div>
      <div className="hds-datepicker__navigation__select">
        <select aria-label="Year" onChange={onYearChange} value={selectedYear}>
          {eachYearOfInterval({ start: new Date(minYear, 1, 1), end: new Date(maxYear, 1, 1) }).map((yearDate) => {
            const year = yearDate.getFullYear();
            return (
              <option value={year} key={year}>
                {year}
              </option>
            );
          })}
        </select>
        <div className="hds-datepicker__navigation__select-label" aria-hidden>
          {month.getFullYear()}
          <div className="hds-datepicker__navigation__select-icon">
            <IconAngleDown aria-hidden />
          </div>
        </div>
      </div>
      <div className="hds-datepicker__navigation__buttons">
        {prevMonthLabel && (
          <button disabled={!prevMonth} type="button" onClick={onPrevClick} aria-label={prevMonthLabel}>
            <IconAngleLeft aria-hidden />
          </button>
        )}
        {nextMonthLabel && (
          <button disabled={!prevMonth} type="button" onClick={onNextClick} aria-label={nextMonthLabel}>
            <IconAngleRight aria-hidden />
          </button>
        )}
      </div>
    </div>
  );
};
