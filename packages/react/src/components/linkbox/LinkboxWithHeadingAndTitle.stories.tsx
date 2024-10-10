import React from 'react';

import { Linkbox, LinkboxSize } from './Linkbox';

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
    <Linkbox
      linkboxAriaLabel="Linkbox: HDS"
      linkAriaLabel="HDS"
      href="https://hds.hel.fi"
      heading="Linkbox title"
      text="Linkbox text"
    />
  </div>
);

export const WithBorder = () => (
  <div style={{ width: '320px' }}>
    <Linkbox
      linkboxAriaLabel="Linkbox: HDS"
      linkAriaLabel="HDS"
      href="https://hds.hel.fi"
      heading="Linkbox title"
      text="Linkbox text"
      border
    />
  </div>
);

export const WithoutBackground = () => (
  <div style={{ width: '320px' }}>
    <Linkbox
      linkboxAriaLabel="Linkbox: HDS"
      linkAriaLabel="HDS"
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
      linkboxAriaLabel="Linkbox: HDS"
      linkAriaLabel="HDS"
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
      linkboxAriaLabel="Linkbox: HDS"
      linkAriaLabel="HDS"
      href="https://hds.hel.fi"
      heading="Linkbox title"
      text="Linkbox text"
      size={LinkboxSize.Small}
    />
  </div>
);

export const MediumSize = () => (
  <div style={{ width: '320px' }}>
    <Linkbox
      linkboxAriaLabel="Linkbox: HDS"
      linkAriaLabel="HDS"
      href="https://hds.hel.fi"
      heading="Linkbox title"
      text="Linkbox text"
      size={LinkboxSize.Medium}
    />
  </div>
);

export const LargeSize = () => (
  <Linkbox
    linkboxAriaLabel="Linkbox: HDS"
    linkAriaLabel="HDS"
    href="https://hds.hel.fi"
    heading="Linkbox title"
    text="Linkbox text"
    size={LinkboxSize.Large}
  />
);
