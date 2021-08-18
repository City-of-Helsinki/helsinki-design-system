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
};

export const Default = () => (
  <Linkbox ariaLabel="Linkkiruutu: HDS" href="https://hds.hel.fi" heading="Linkbox title" text="Linkbox text" />
);

export const WithBorder = () => (
  <Linkbox
    ariaLabel="Linkkiruutu: HDS"
    href="https://hds.hel.fi"
    heading="Linkbox title"
    text="Linkbox text"
    withBorder
  />
);

export const WithoutBackground = () => (
  <Linkbox
    ariaLabel="Linkkiruutu: HDS"
    href="https://hds.hel.fi"
    heading="Linkbox title"
    text="Linkbox text"
    noBackground
  />
);

export const External = () => (
  <Linkbox
    ariaLabel="Linkkiruutu: HDS"
    href="https://hds.hel.fi"
    heading="Linkbox title"
    text="Linkbox text"
    external
    openInNewTab
  />
);
