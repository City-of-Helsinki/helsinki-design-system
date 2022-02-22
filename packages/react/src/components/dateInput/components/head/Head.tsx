import React from 'react';
import Locale from 'date-fns/locale';

import styles from '../datePicker/DatePicker.module.scss';
import { getWeekdaysNames } from './getWeekdaysNames';

export interface HeadProps {
  locale: Locale;
}

/**
 * Render the head of the month table, including the weekday names (Mon, Tue,
 * etc.).
 */
export const Head = ({ locale }: HeadProps) => {
  const weekdayNames = getWeekdaysNames(locale);
  return (
    <thead>
      <tr>
        {weekdayNames.map((names) => (
          <th key={names[0]} scope="col" className={styles['hds-datepicker__head__weekday']}>
            <span aria-hidden>{names[0]}</span>
            <span className={styles['hds-datepicker__head__weekday-vhidden']}>{names[1]}</span>
          </th>
        ))}
      </tr>
    </thead>
  );
};
