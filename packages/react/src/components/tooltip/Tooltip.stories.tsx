import React from 'react';

import { Tooltip, TooltipProps } from './Tooltip';

export default {
  component: Tooltip,
  title: 'Components/Tooltip',
  parameters: {
    controls: { expanded: true },
  },
};

export const Default = (args: TooltipProps) => (
  <Tooltip {...args}>
    Tooltips contain &quot;nice to have&quot; information. Default Tooltip contents should not be longer than two to
    three sentences. For longer descriptions, provide a link to a separate page.
  </Tooltip>
);

export const Small = (args: TooltipProps) => <Tooltip {...args}>Less than five words long</Tooltip>;
Small.args = {
  small: true,
};

export const WithBoxShadow = (args: TooltipProps) => (
  <Tooltip {...args} boxShadow>
    Tooltips contain &quot;nice to have&quot; information. Default Tooltip contents should not be longer than two to
    three sentences. For longer descriptions, provide a link to a separate page.
  </Tooltip>
);
