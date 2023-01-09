import React from 'react';

import { Breadcrumb } from './Breadcrumb';

export default {
  component: Breadcrumb,
  title: 'Components/Breadcrumb',
  parameters: {
    controls: { expanded: true },
  },
  args: {},
};

export const Example = (args) => <Breadcrumb {...args}>Breadcrumb</Breadcrumb>;
