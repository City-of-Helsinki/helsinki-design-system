import React from 'react';

import { Tooltip } from './Tooltip';

export default {
  component: Tooltip,
  title: 'Components/Tooltip',
  parameters: {
    controls: { expanded: true },
  },
};

export const Default = (args) => (
  <Tooltip {...args}>
    Tooltips contain &quot;nice to have&quot; information. Default Tooltip contents should not be longer than two to
    three sentences. For longer descriptions, provide a link to a separate page.
  </Tooltip>
);

export const Small = (args) => <Tooltip {...args}>Less than five words long</Tooltip>;
Small.args = {
  small: true,
};

export const WithBoxShadow = (args) => (
  <Tooltip {...args}>
    Tooltips contain &quot;nice to have&quot; information. Default Tooltip contents should not be longer than two to
    three sentences. For longer descriptions, provide a link to a separate page.
  </Tooltip>
);
Small.args = {
  boxShadow: true,
};
