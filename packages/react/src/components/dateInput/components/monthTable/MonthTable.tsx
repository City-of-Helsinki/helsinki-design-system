import React, { useContext } from 'react';
import getWeeksInMonth from 'date-fns/getWeeksInMonth';
import eachWeekOfInterval from 'date-fns/eachWeekOfInterval';
import add from 'date-fns/add';
import endOfMonth from 'date-fns/endOfMonth';
import startOfMonth from 'date-fns/startOfMonth';
import Locale from 'date-fns/locale';

import { DatePickerContext } from '../../context/DatePickerContext';
import { Head } from '../head';
import { MonthNavigation } from '../monthNavigation';
import { WeekRow } from '../weekRow';
import styles from '../datePicker/DatePicker.module.scss';

export type MonthTableProps = {
  month: Date;
};

const getCalendarWeeks = (month: Date, locale: Locale): Date[] => {
  const start: Date = startOfMonth(month);
  const end: Date = endOfMonth(month);
  const monthCalendarWeeks: number = getWeeksInMonth(month, { weekStartsOn: 1 });
  const maxAmountOfCalendarWeeks = 6;
  const weeksEnd: Date =
    monthCalendarWeeks === maxAmountOfCalendarWeeks
      ? end
      : add(end, { weeks: maxAmountOfCalendarWeeks - monthCalendarWeeks }); // To ensure equal height month tables, we need to add extra week rows at the end of the table.
  const weeksInterval: { start: Date; end: Date } = { start, end: weeksEnd };
  return eachWeekOfInterval(weeksInterval, { locale });
};

export const MonthTable = (props: MonthTableProps) => {
  const { locale } = useContext(DatePickerContext);
  const { month }: { month: Date } = props;
  const weeks: Date[] = getCalendarWeeks(month, locale);

  return (
    <div>
      <MonthNavigation month={month} />
      <table className={styles['hds-datepicker__month-table']} aria-live="polite">
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
