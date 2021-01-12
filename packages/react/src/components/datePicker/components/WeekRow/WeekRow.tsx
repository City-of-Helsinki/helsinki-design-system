import React, { useContext } from 'react';
import { endOfWeek, getUnixTime, isToday, startOfWeek } from 'date-fns';
import { eachDayOfInterval } from 'date-fns/esm';

import { Day } from '../Day/Day';
import { DatePickerContext } from '../../context/DatePickerContext';

export type WeekRowProps = {
  week: Date;
};

export const WeekRow = (props: WeekRowProps) => {
  const { week } = props;
  const { locale } = useContext(DatePickerContext);

  const daysInterval = { start: startOfWeek(week, { locale }), end: endOfWeek(week, { locale }) };
  const days = eachDayOfInterval(daysInterval);

  return (
    <tr>
      {days.map((day) => (
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
