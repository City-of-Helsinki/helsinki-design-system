import React from 'react';

import { Hero } from './Hero';

export default {
  component: Hero,
  title: 'Components/Hero',
  parameters: {
    controls: { expanded: true },
  },
  args: {},
};

export const Example = (args) => <Hero {...args}>Hero</Hero>;
