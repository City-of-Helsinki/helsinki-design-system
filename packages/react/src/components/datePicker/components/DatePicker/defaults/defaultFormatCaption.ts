import format from 'date-fns/format';
import Locale from 'date-fns/locale';

/**
 * The default function used to format the caption. Use the [[formatCaption]]
 * prop to use another function.
 *
 * @return {string} The month using the `"LLLL Y:` [format
 * string](https://date-fns.org/docs/format).
 * @private
 */
export function defaultFormatCaption(month: Date, formatOptions?: { locale?: Locale }): string {
  return format(month, 'LLLL Y', formatOptions);
}
