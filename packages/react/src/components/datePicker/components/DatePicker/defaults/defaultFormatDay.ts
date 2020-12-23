import format from 'date-fns/format';
import Locale from 'date-fns/locale';

/**
 * The default function used to format the day date. Use the [[formatDay]] prop
 * to use another function.
 *
 * @return {string} The day formatted the `"d"` [format
 * string](https://date-fns.org/docs/format).
 * @private
 */
export function defaultFormatDay(day: Date, formatOptions?: { locale?: Locale }): string {
  return format(day, 'd', formatOptions);
}
