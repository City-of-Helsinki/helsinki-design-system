import Locale from 'date-fns/locale';
import addDays from 'date-fns/addDays';
import format from 'date-fns/format';
import startOfWeek from 'date-fns/startOfWeek';

/**
 * Return the name of the weekdays according to the formatting function.
 */
export function getWeekdaysNames(locale: Locale): string[][] {
  const start = startOfWeek(new Date(), { locale });
  const names = [];
  // eslint-disable-next-line no-plusplus
  for (let i = 0; i < 7; i++) {
    const day = addDays(start, i);
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    names.push([format(day, 'iiiiii', { locale }), format(day, 'iiii', { locale })]);
  }
  return names;
}
