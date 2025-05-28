import React from 'react';

import { TimeInput, TimeInputProps } from './TimeInput';
import { Tooltip } from '../tooltip';

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

export const WithTooltip = (args: TimeInputProps) => <TimeInput {...args} />;
WithTooltip.args = {
  id: 'WithTooltip',
  tooltip: (
    <Tooltip tooltipLabel="Tooltip" buttonLabel="Tooltip">
      Tooltips contain &quot;nice to have&quot; information. Default Tooltip contents should not be longer than two to
      three three sentences. For longer descriptions, provide a link to a separate page.
    </Tooltip>
  ),
};
