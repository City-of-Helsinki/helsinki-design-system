import startOfWeek from 'date-fns/startOfWeek';
import differenceInDays from 'date-fns/differenceInDays';
import addDays from 'date-fns/addDays';

import { DayPickerProps } from '../DatePicker';

/**
 * Return the outside starting days for the given day.
 */
export function getOutsideStartDays(day: Date, props: DayPickerProps): Date[] {
  const { locale } = props;
  const days = [];
  const firstDayOfWeek = startOfWeek(day, { locale });
  const startDiff = differenceInDays(day, firstDayOfWeek);

  // eslint-disable-next-line no-plusplus
  for (let i = 0; i < startDiff; i++) {
    const newDay = addDays(firstDayOfWeek, i);
    days.push(newDay);
  }
  return days;
}
