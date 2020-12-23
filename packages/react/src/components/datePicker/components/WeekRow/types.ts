/* eslint-disable import/no-cycle */
import Locale from 'date-fns/locale';

import { DayPickerProps } from '../DatePicker';

/**
 * @private
 */
export interface WeekRowProps {
  weekNumber: number;
  /* The month that is displaying the row */
  currentMonth: Date;
  week: Date[];
  dayPickerProps: DayPickerProps;
}

/**
 * Format the weekday name.
 */
export type WeekdayNameFormatter = (day: Date, options?: { locale?: Locale }) => string;
