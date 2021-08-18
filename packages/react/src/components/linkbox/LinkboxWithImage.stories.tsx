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
  <div style={{ width: '284px' }}>
    <Linkbox
      ariaLabel="Linkkiruutu: HDS"
      href="https://hds.hel.fi"
      heading="Linkbox title"
      text="Linkbox text"
      withImg
      imgProps={{ src: exampleImage, width: 284, height: 181 }}
    />
  </div>
);

export const WithBorder = () => (
  <div style={{ width: '284px' }}>
    <Linkbox
      ariaLabel="Linkkiruutu: HDS"
      href="https://hds.hel.fi"
      heading="Linkbox title"
      text="Linkbox text"
      withBorder
      withImg
      imgProps={{ src: exampleImage, width: 284, height: 181 }}
    />
  </div>
);

export const WithoutBackground = () => (
  <div style={{ width: '284px' }}>
    <Linkbox
      ariaLabel="Linkkiruutu: HDS"
      href="https://hds.hel.fi"
      heading="Linkbox title"
      text="Linkbox text"
      noBackground
      withImg
      imgProps={{ src: exampleImage, width: 284, height: 181 }}
    />
  </div>
);

export const External = () => (
  <div style={{ width: '284px' }}>
    <Linkbox
      ariaLabel="Linkkiruutu: HDS"
      href="https://hds.hel.fi"
      heading="Linkbox title"
      text="Linkbox text"
      external
      openInNewTab
      withImg
      imgProps={{ src: exampleImage, width: 284, height: 181 }}
    />
  </div>
);

export const MediumSize = () => (
  <div style={{ width: '384px' }}>
    <Linkbox
      ariaLabel="Linkkiruutu: HDS"
      href="https://hds.hel.fi"
      heading="Linkbox title"
      text="Linkbox text"
      withImg
      imgProps={{ src: exampleMediumImage, width: 384, height: 245 }}
      withImgSize="medium"
    />
  </div>
);

export const LargeSize = () => (
  <div style={{ width: '567px' }}>
    <Linkbox
      ariaLabel="Linkkiruutu: HDS"
      href="https://hds.hel.fi"
      heading="Linkbox title"
      text="Linkbox text"
      withImg
      imgProps={{ src: exampleLargeImage, width: 567, height: 363 }}
      withImgSize="large"
    />
  </div>
);
