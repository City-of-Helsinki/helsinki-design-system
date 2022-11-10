import React from 'react';

import { Header } from './Header';

export default {
  component: Header,
  title: 'Components/Header',
  parameters: {
    controls: { expanded: true },
  },
  args: {  },
};

export const Example = (args) => <Header {...args}>Header</Header>;
