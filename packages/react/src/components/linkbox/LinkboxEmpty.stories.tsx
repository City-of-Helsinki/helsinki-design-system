import React from 'react';

import { Linkbox, LinkboxSize } from './Linkbox';

export default {
  component: Linkbox,
  title: 'Components/Linkbox/Empty for custom content',
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
    <Linkbox linkboxAriaLabel="Linkbox: HDS" linkAriaLabel="HDS" href="https://hds.hel.fi">
      <div style={{ height: '224px' }} />
    </Linkbox>
  </div>
);

export const WithBorder = () => (
  <div style={{ width: '320px' }}>
    <Linkbox linkboxAriaLabel="Linkbox: HDS" linkAriaLabel="HDS" href="https://hds.hel.fi" border>
      <div style={{ height: '224px' }} />
    </Linkbox>
  </div>
);

export const WithoutBackground = () => (
  <div style={{ width: '320px' }}>
    <Linkbox linkboxAriaLabel="Linkbox: HDS" linkAriaLabel="HDS" href="https://hds.hel.fi" noBackground>
      <div style={{ height: '224px' }} />
    </Linkbox>
  </div>
);

export const External = () => (
  <div style={{ width: '320px' }}>
    <Linkbox linkboxAriaLabel="Linkbox: HDS" linkAriaLabel="HDS" href="https://hds.hel.fi" external openInNewTab>
      <div style={{ height: '224px' }} />
    </Linkbox>
  </div>
);

export const SmallSize = () => (
  <div style={{ width: '288px' }}>
    <Linkbox linkboxAriaLabel="Linkbox: HDS" linkAriaLabel="HDS" href="https://hds.hel.fi" size={LinkboxSize.Small}>
      <div style={{ height: '192px' }} />
    </Linkbox>
  </div>
);

export const MediumSize = () => (
  <div style={{ width: '320px' }}>
    <Linkbox linkboxAriaLabel="Linkbox: HDS" linkAriaLabel="HDS" href="https://hds.hel.fi" size={LinkboxSize.Medium}>
      <div style={{ height: '224px' }} />
    </Linkbox>
  </div>
);

export const LargeSize = () => (
  <div style={{ width: '400px' }}>
    <Linkbox linkboxAriaLabel="Linkbox: HDS" linkAriaLabel="HDS" href="https://hds.hel.fi" size={LinkboxSize.Large}>
      <div style={{ height: '296px' }} />
    </Linkbox>
  </div>
);
