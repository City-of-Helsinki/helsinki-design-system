import React, { useContext } from 'react';
import endOfWeek from 'date-fns/endOfWeek';
import getUnixTime from 'date-fns/getUnixTime';
import isToday from 'date-fns/isToday';
import startOfWeek from 'date-fns/startOfWeek';
import eachDayOfInterval from 'date-fns/eachDayOfInterval';

import { Day } from '../day';
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
