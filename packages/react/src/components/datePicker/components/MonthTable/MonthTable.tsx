import { eachWeekOfInterval, endOfMonth, startOfMonth } from 'date-fns/esm';
import React, { useContext } from 'react';

import { DatePickerContext } from '../../context/DatePickerContext';
import { Head } from '../Head';
import { MonthNavigation } from '../MonthNavigation';
import { WeekRow } from '../WeekRow/WeekRow';

export type MonthTableProps = {
  month: Date;
};

export const MonthTable = (props: MonthTableProps) => {
  const { locale } = useContext(DatePickerContext);
  const { month } = props;

  const weeksInterval = { start: startOfMonth(month), end: endOfMonth(month) };
  const weeks = eachWeekOfInterval(weeksInterval, { locale });

  return (
    <div>
      <MonthNavigation month={month} />
      <table className="hds-datepicker__month-table">
        <Head locale={locale} />
        <tbody>
          {weeks.map((week) => (
            <WeekRow key={week.toString()} week={week} />
          ))}
        </tbody>
      </table>
    </div>
  );
};
