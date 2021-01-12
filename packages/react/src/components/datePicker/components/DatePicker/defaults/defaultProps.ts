import startOfMonth from 'date-fns/startOfMonth';
import english from 'date-fns/locale/en-US';

import { DayPickerProps } from '../types';

const locale = {
  ...english,
  options: {
    ...english.options,
    weekStartsOn: 1 as 0 | 1 | 2 | 3 | 4 | 5 | 6,
  },
};

/**
 * List the default props used by the [[DayPicker]] component.
 */
export const defaultProps: DayPickerProps = {
  className: '',
  style: {},
  locale,
  nextMonthLabel: 'Next month',
  month: startOfMonth(new Date()),
  prevMonthLabel: 'Previous month',
  selectButtonLabel: 'Select',
  closeButtonLabel: 'Close',
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  onCloseButtonClick: () => {},
};
