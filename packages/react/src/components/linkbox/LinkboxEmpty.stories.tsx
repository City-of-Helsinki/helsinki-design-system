import React from 'react';

import { Linkbox } from './Linkbox';

export default {
  component: Linkbox,
  title: 'Components/Linkbox/Empty for custom content',
  decorators: [(storyFn) => <div style={{ maxWidth: '320px' }}>{storyFn()}</div>],
  parameters: {
    backgrounds: {
      default: 'gray',
      values: [{ name: 'gray', value: '#efefef' }],
    },
    controls: { expanded: true },
  },
};

export const Default = () => (
  <Linkbox ariaLabel="Linkkiruutu: HDS" href="https://hds.hel.fi">
    <div style={{ height: '106px' }} />
  </Linkbox>
);

export const WithBorder = () => (
  <Linkbox ariaLabel="Linkkiruutu: HDS" href="https://hds.hel.fi" withBorder>
    <div style={{ height: '106px' }} />
  </Linkbox>
);

export const WithoutBackground = () => (
  <Linkbox ariaLabel="Linkkiruutu: HDS" href="https://hds.hel.fi" noBackground>
    <div style={{ height: '106px' }} />
  </Linkbox>
);

export const External = () => (
  <Linkbox ariaLabel="Linkkiruutu: HDS" href="https://hds.hel.fi" external openInNewTab>
    <div style={{ height: '106px' }} />
  </Linkbox>
);
