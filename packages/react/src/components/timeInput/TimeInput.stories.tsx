import React from 'react';

import { TimeInput, TimeInputProps } from './TimeInput';

export default {
  component: TimeInput,
  title: 'Components/TimeInput',
  decorators: [(storyFn) => <div style={{ maxWidth: '400px' }}>{storyFn()}</div>],
  parameters: {
    controls: { expanded: true },
  },
  args: {
    id: 'time',
    label: 'Label',
    hoursLabel: 'hours',
    minutesLabel: 'minutes',
    helperText: 'Assistive text',
    value: '00:00',
    disabled: false,
  },
};

export const Default = (args: TimeInputProps) => {
  return <TimeInput {...args} />;
};

export const Invalid = (args: TimeInputProps) => <TimeInput {...args} />;
Invalid.args = {
  id: 'Invalid',
  invalid: true,
  errorText: 'Invalid value',
};

export const Success = (args: TimeInputProps) => <TimeInput {...args} />;
Success.args = {
  id: 'Default',
  successText: 'Valid value',
};
