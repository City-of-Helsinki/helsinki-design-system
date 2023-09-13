import React from 'react';

import { Logo, logoFi, logoSv, logoRu } from './Logo';

export default {
  component: Logo,
  title: 'Components/Logo',
  parameters: {
    controls: { hideNoControlsWarning: true },
  },
};

export const Playground = (args) => <Logo {...args} />;

Playground.args = {
  size: 'full',
  src: logoFi,
  alt: 'Helsingin kaupunki',
  ariaHidden: false,
};

Playground.argTypes = {
  size: {
    options: ['full', 'small', 'medium', 'large'],
    control: { type: 'radio' },
  },
  src: {
    options: [logoFi, logoSv, logoRu],
    control: { type: 'radio' },
  },
  ariaHidden: {
    options: [true, false],
    control: { type: 'radio' },
  },
};
