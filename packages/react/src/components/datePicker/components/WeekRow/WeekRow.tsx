import React from 'react';
import { getUnixTime, isToday } from 'date-fns';

import { WeekRowProps } from './types';
import { Day } from '../Day/Day';

/**
 * Render a week row.
 *
 * @category Components
 * @private
 */
export const WeekRow = (props: WeekRowProps) => {
  const { week } = props;
  return (
    <tr>
      {week.map((day) => (
        <td
          className="hds-datepicker__day-cell"
          key={getUnixTime(day)}
          aria-current={isToday(day) ? 'date' : undefined}
        >
          <Day day={day} />
        </td>
      ))}
    </tr>
  );
};
