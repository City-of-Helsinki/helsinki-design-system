import addDays from 'date-fns/addDays';
import differenceInDays from 'date-fns/differenceInDays';
import endOfMonth from 'date-fns/endOfMonth';
import getMonth from 'date-fns/getMonth';
import getWeek from 'date-fns/getWeek';
import startOfMonth from 'date-fns/startOfMonth';

import { DayPickerProps } from '../DatePicker';
import { getOutsideStartDays } from './getOutsideStartDays';
import { getOutsideEndDays } from './getOutsideEndDays';

/**
 * The weeks belonging to a month. Each key of the returned object is the
 * week number of the year.
 */
type MonthWeeks = { [weeknumber: string]: Date[] };

/**
 * Return the weeks belonging to the given month.
 */
export function getWeeks(month: Date, props: DayPickerProps): MonthWeeks {
  const { locale } = props;
  const monthStart = startOfMonth(month);
  const monthEnd = endOfMonth(month);

  const diff = differenceInDays(monthEnd, monthStart);

  const weeks: MonthWeeks = {};
  let lastWeekStr = '';
  // eslint-disable-next-line no-plusplus
  for (let i = 0; i <= diff; i++) {
    const date = addDays(monthStart, i);
    let week = getWeek(date, { locale });
    if (week === 1 && getMonth(date) === 11) {
      week = 53;
    }
    const weekStr: string = week.toString();

    if (!weeks[weekStr]) {
      const startDays = getOutsideStartDays(date, props);
      // Create a new week by adding outside start days
      weeks[weekStr] = startDays;
    }
    weeks[weekStr].push(date);
    lastWeekStr = weekStr;
  }

  const lastWeek = weeks[lastWeekStr];
  const lastDay = lastWeek[lastWeek.length - 1];
  const endDays = getOutsideEndDays(lastDay, props);
  weeks[lastWeekStr] = lastWeek.concat(endDays);

  return weeks;
}
