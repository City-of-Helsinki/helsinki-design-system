import React from 'react';

import { Breadcrumb } from './Breadcrumb';

export default {
  component: Breadcrumb,
  title: 'Components/Breadcrumb',
  parameters: {
    controls: { expanded: true },
  },
  args: {
    list: [
      { title: 'home', path: '/' },
      { title: 'level 1', path: '/level1' },
      { title: 'current', path: '/level1/current' },
    ],
  },
};

export const Example = (args) => <Breadcrumb {...args}>Breadcrumb</Breadcrumb>;
