import React from 'react';

import { Linkbox } from './Linkbox';

export default {
  component: Linkbox,
  title: 'Components/Linkbox/With text and heading',
  decorators: [(storyFn) => <div style={{ maxWidth: '320px' }}>{storyFn()}</div>],
  parameters: {
    backgrounds: {
      default: 'gray',
      values: [{ name: 'gray', value: '#efefef' }],
    },
    controls: { expanded: true },
  },
  args: {
    ariaLabel: 'HDS',
  },
};

export const Default = (args) => (
  <Linkbox {...args} href="https://hds.hel.fi" heading="Linkbox title" text="Linkbox text" />
);

export const WithBorder = (args) => (
  <Linkbox {...args} href="https://hds.hel.fi" heading="Linkbox title" text="Linkbox text" withBorder />
);

export const WithoutBackground = (args) => (
  <Linkbox {...args} href="https://hds.hel.fi" heading="Linkbox title" text="Linkbox text" noBackground />
);

export const External = (args) => (
  <Linkbox {...args} href="https://hds.hel.fi" heading="Linkbox title" text="Linkbox text" external />
);
