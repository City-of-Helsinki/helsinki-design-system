import React from 'react';

import { NavigationLinkDropdown } from './NavigationLinkDropdown';

export default {
  component: NavigationLinkDropdown,
  title: 'Components/NavigationLinkDropdown',
  parameters: {
    controls: { expanded: true },
  },
  args: {},
};

export const Example = (args) => <NavigationLinkDropdown {...args}>NavigationLinkDropdown</NavigationLinkDropdown>;
