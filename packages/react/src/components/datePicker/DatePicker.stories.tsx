import React from 'react';

import { DatePicker } from '.';
import { DateInput } from './DateInput';

export default {
  component: DatePicker,
  title: 'Components/DatePicker',
  decorators: [(storyFn) => <div style={{ maxWidth: '400px' }}>{storyFn()}</div>],
};

export const Example = () => {
  return <DateInput />;
};
