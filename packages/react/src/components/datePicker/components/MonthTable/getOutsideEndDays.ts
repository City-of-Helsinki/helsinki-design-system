import endOfWeek from 'date-fns/endOfWeek';
import differenceInDays from 'date-fns/differenceInDays';
import addDays from 'date-fns/addDays';

import { DayPickerProps } from '../DatePicker';

/**
 * Return the outside ending days for the given day.
 */
export function getOutsideEndDays(day: Date, props: DayPickerProps): Date[] {
  const { locale } = props;
  const days = [];
  const lastDayOfWeek = endOfWeek(day, { locale });
  const endDiff = differenceInDays(lastDayOfWeek, day);

  // eslint-disable-next-line no-plusplus
  for (let i = 1; i <= endDiff; i++) {
    const dayDate = addDays(day, i);
    days.push(dayDate);
  }
  return days;
}
