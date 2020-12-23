import React from 'react';

import { Head } from '../Head';
import { MonthNavigation } from '../MonthNavigation';
import { WeekRow } from '../WeekRow/WeekRow';
import { getWeeks } from './getWeeks';
import { MonthTableProps } from './types';

/**
 * Render the month table.
 * @category Components
 */
export const MonthTable = (props: MonthTableProps) => {
  const { month, dayPickerProps } = props;
  const { locale } = dayPickerProps;

  const weeks = getWeeks(month, dayPickerProps);

  return (
    <div>
      <MonthNavigation month={month} />
      <table className="hds-datepicker__month-table">
        <Head locale={locale} />
        <tbody>
          {Object.keys(weeks).map((weekNumber) => (
            <WeekRow
              currentMonth={month}
              key={weekNumber}
              week={weeks[weekNumber]}
              weekNumber={Number(weekNumber)}
              dayPickerProps={dayPickerProps}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};
