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
    Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore.
  </Tooltip>
);

export const Small = (args) => <Tooltip {...args}>Lorem ipsum dolor</Tooltip>;
Small.args = {
  small: true,
};
