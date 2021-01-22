import React from 'react';

import { TimeInput } from './TimeInput';
import { TimeInputAlternative } from './TimeInputAlternative';

export default {
  component: TimeInputAlternative,
  title: 'Components/TimeInput',
  decorators: [(storyFn) => <div style={{ maxWidth: '400px' }}>{storyFn()}</div>],
};

export const Example = () => {
  return <TimeInput id="time" label="Label" helperText="Assistive text" />;
};

export const Alternative = () => {
  return <TimeInputAlternative id="time" label="Label" helperText="Assistive text" />;
};
