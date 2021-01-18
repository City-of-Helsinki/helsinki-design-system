import React, { useContext } from 'react';
import eachWeekOfInterval from 'date-fns/eachWeekOfInterval';
import endOfMonth from 'date-fns/endOfMonth';
import startOfMonth from 'date-fns/startOfMonth';

import { DatePickerContext } from '../../context/DatePickerContext';
import { Head } from '../head';
import { MonthNavigation } from '../monthNavigation';
import { WeekRow } from '../weekRow';
import styles from '../datePicker/DatePicker.module.scss';

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
      <table className={styles['hds-datepicker__month-table']}>
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
