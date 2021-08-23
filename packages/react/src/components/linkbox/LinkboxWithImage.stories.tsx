import React from 'react';

import { Linkbox } from './Linkbox';
/* eslint-disable @typescript-eslint/ban-ts-ignore */
// @ts-ignore
import exampleImage from './static/example-img-small.png';
// @ts-ignore
import exampleMediumImage from './static/example-img-medium.png';
// @ts-ignore
import exampleLargeImage from './static/example-img.png';
/* eslint-enable @typescript-eslint/ban-ts-ignore */

export default {
  component: Linkbox,
  title: 'Components/Linkbox/With image',
  decorators: [(storyFn) => <div style={{ maxWidth: '567px' }}>{storyFn()}</div>],
  parameters: {
    backgrounds: {
      default: 'gray',
      values: [{ name: 'gray', value: '#efefef' }],
    },
    controls: { expanded: true },
  },
};

export const Default = () => (
  <div style={{ maxWidth: '384px' }}>
    <Linkbox
      ariaLabel="Linkkiruutu: HDS"
      href="https://hds.hel.fi"
      heading="Linkbox title"
      text="Linkbox text"
      imgProps={{ src: exampleImage, width: 384, height: 245 }}
    />
  </div>
);

export const WithBorder = () => (
  <div style={{ maxWidth: '384px' }}>
    <Linkbox
      ariaLabel="Linkkiruutu: HDS"
      href="https://hds.hel.fi"
      heading="Linkbox title"
      text="Linkbox text"
      withBorder
      imgProps={{ src: exampleImage, width: 384, height: 245 }}
    />
  </div>
);

export const WithoutBackground = () => (
  <div style={{ maxWidth: '384px' }}>
    <Linkbox
      ariaLabel="Linkkiruutu: HDS"
      href="https://hds.hel.fi"
      heading="Linkbox title"
      text="Linkbox text"
      noBackground
      imgProps={{ src: exampleImage, width: 384, height: 245 }}
    />
  </div>
);

export const External = () => (
  <div style={{ maxWidth: '384px' }}>
    <Linkbox
      ariaLabel="Linkkiruutu: HDS"
      href="https://hds.hel.fi"
      heading="Linkbox title"
      text="Linkbox text"
      external
      openInNewTab
      imgProps={{ src: exampleImage, width: 384, height: 245 }}
    />
  </div>
);

export const SmallSize = () => (
  <div style={{ maxWidth: '284px' }}>
    <Linkbox
      ariaLabel="Linkkiruutu: HDS"
      href="https://hds.hel.fi"
      heading="Linkbox title"
      text="Linkbox text"
      imgProps={{ src: exampleMediumImage, width: 284, height: 181 }}
      size="small"
    />
  </div>
);

export const LargeSize = () => (
  <div style={{ maxWidth: '567px' }}>
    <Linkbox
      ariaLabel="Linkkiruutu: HDS"
      href="https://hds.hel.fi"
      heading="Linkbox title"
      text="Linkbox text"
      imgProps={{ src: exampleLargeImage, width: 567, height: 363 }}
      size="large"
    />
  </div>
);
