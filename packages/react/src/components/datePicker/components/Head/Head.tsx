import React from 'react';

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
          <th key={names[0]} scope="col" className="hds-datepicker__head__weekday">
            <span aria-hidden>{names[0]}</span>
            <span className="hds-datepicker__head__weekday-vhidden">{names[1]}</span>
          </th>
        ))}
      </tr>
    </thead>
  );
};
