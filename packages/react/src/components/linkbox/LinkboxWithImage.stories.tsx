import React from 'react';

import { Linkbox } from './Linkbox';
/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-ignore
import smallImage from '../../assets/img/linkbox/placeholder-small.png';
// @ts-ignore
import mediumImage from '../../assets/img/linkbox/placeholder-medium.png';
// @ts-ignore
import largeImage from '../../assets/img/linkbox/placeholder-large.png';
/* eslint-enable @typescript-eslint/ban-ts-comment */

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
      linkboxAriaLabel="Linkbox: HDS"
      linkAriaLabel="HDS"
      href="https://hds.hel.fi"
      heading="Linkbox title"
      text="Linkbox text"
      imgProps={{ src: mediumImage, width: 384, height: 245 }}
    />
  </div>
);

export const WithBorder = () => (
  <div style={{ maxWidth: '384px' }}>
    <Linkbox
      linkboxAriaLabel="Linkbox: HDS"
      linkAriaLabel="HDS"
      href="https://hds.hel.fi"
      heading="Linkbox title"
      text="Linkbox text"
      border
      imgProps={{ src: mediumImage, width: 384, height: 245 }}
    />
  </div>
);

export const WithoutBackground = () => (
  <div style={{ maxWidth: '384px' }}>
    <Linkbox
      linkboxAriaLabel="Linkbox: HDS"
      linkAriaLabel="HDS"
      href="https://hds.hel.fi"
      heading="Linkbox title"
      text="Linkbox text"
      noBackground
      imgProps={{ src: mediumImage, width: 384, height: 245 }}
    />
  </div>
);

export const External = () => (
  <div style={{ maxWidth: '384px' }}>
    <Linkbox
      linkboxAriaLabel="Linkbox: HDS"
      linkAriaLabel="HDS"
      href="https://hds.hel.fi"
      heading="Linkbox title"
      text="Linkbox text"
      external
      openInNewTab
      imgProps={{ src: mediumImage, width: 384, height: 245 }}
    />
  </div>
);

export const SmallSize = () => (
  <div style={{ maxWidth: '284px' }}>
    <Linkbox
      linkboxAriaLabel="Linkbox: HDS"
      linkAriaLabel="HDS"
      href="https://hds.hel.fi"
      heading="Linkbox title"
      text="Linkbox text"
      imgProps={{ src: smallImage, width: 284, height: 181 }}
      size="small"
    />
  </div>
);

export const MediumSize = () => (
  <div style={{ maxWidth: '384px' }}>
    <Linkbox
      linkboxAriaLabel="Linkbox: HDS"
      linkAriaLabel="HDS"
      href="https://hds.hel.fi"
      heading="Linkbox title"
      text="Linkbox text"
      imgProps={{ src: mediumImage, width: 384, height: 245 }}
      size="medium"
    />
  </div>
);

export const LargeSize = () => (
  <div style={{ maxWidth: '567px' }}>
    <Linkbox
      linkboxAriaLabel="Linkbox: HDS"
      linkAriaLabel="HDS"
      href="https://hds.hel.fi"
      heading="Linkbox title"
      text="Linkbox text"
      imgProps={{ src: largeImage, width: 567, height: 363 }}
      size="large"
    />
  </div>
);
