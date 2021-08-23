import React from 'react';

import { Linkbox } from './Linkbox';

export default {
  component: Linkbox,
  title: 'Components/Linkbox/With text and heading',
  decorators: [(storyFn) => <div style={{ maxWidth: '400px' }}>{storyFn()}</div>],
  parameters: {
    backgrounds: {
      default: 'gray',
      values: [{ name: 'gray', value: '#efefef' }],
    },
    controls: { expanded: true },
  },
};

export const Default = () => (
  <div style={{ width: '320px' }}>
    <Linkbox ariaLabel="Linkkiruutu: HDS" href="https://hds.hel.fi" heading="Linkbox title" text="Linkbox text" />
  </div>
);

export const WithBorder = () => (
  <div style={{ width: '320px' }}>
    <Linkbox
      ariaLabel="Linkkiruutu: HDS"
      href="https://hds.hel.fi"
      heading="Linkbox title"
      text="Linkbox text"
      withBorder
    />
  </div>
);

export const WithoutBackground = () => (
  <div style={{ width: '320px' }}>
    <Linkbox
      ariaLabel="Linkkiruutu: HDS"
      href="https://hds.hel.fi"
      heading="Linkbox title"
      text="Linkbox text"
      noBackground
    />
  </div>
);

export const External = () => (
  <div style={{ width: '320px' }}>
    <Linkbox
      ariaLabel="Linkkiruutu: HDS"
      href="https://hds.hel.fi"
      heading="Linkbox title"
      text="Linkbox text"
      external
      openInNewTab
    />
  </div>
);

export const SmallSize = () => (
  <div style={{ width: '288px' }}>
    <Linkbox
      ariaLabel="Linkkiruutu: HDS"
      href="https://hds.hel.fi"
      heading="Linkbox title"
      text="Linkbox text"
      size="small"
    />
  </div>
);

export const LargeSize = () => (
  <Linkbox
    ariaLabel="Linkkiruutu: HDS"
    href="https://hds.hel.fi"
    heading="Linkbox title"
    text="Linkbox text"
    size="large"
  />
);
