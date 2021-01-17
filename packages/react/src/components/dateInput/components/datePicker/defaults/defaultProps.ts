import startOfMonth from 'date-fns/startOfMonth';

import { DayPickerProps } from '../types';

/**
 * List the default props used by the [[DayPicker]] component.
 */
export const defaultProps: DayPickerProps = {
  className: '',
  style: {},
  language: 'en',
  month: startOfMonth(new Date()),
  selectButtonLabel: 'Select',
  closeButtonLabel: 'Close',
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  onCloseButtonClick: () => {},
};
