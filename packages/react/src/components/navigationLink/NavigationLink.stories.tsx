import React from 'react';

import { NavigationLink } from './NavigationLink';

export default {
  component: NavigationLink,
  title: 'Components/NavigationLink',
  parameters: {
    controls: { expanded: true },
  },
  args: {},
};

export const Default = (args) => <NavigationLink {...args} href="#" />;
Default.args = {
  label: 'Link',
};
