import React from 'react';

import { TimeInput } from './TimeInput';

export default {
  component: TimeInput,
  title: 'Components/TimeInput',
};

export const Example = () => {
  return <TimeInput id="time" label="Label" helperText="Assistive text" />;
};
