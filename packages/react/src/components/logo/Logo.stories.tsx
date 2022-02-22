import React from 'react';

import { Logo } from './Logo';

export default {
  component: Logo,
  title: 'Components/Logo',
  parameters: {
    controls: { hideNoControlsWarning: true },
  },
};

export const Playground = (args) => <Logo language={args.language} size={args.size} />;

Playground.args = {
  language: 'fi',
  size: 'full',
};

Playground.argTypes = {
  language: {
    options: ['fi', 'sv', 'ru'],
    control: { type: 'radio' },
  },
  size: {
    options: ['full', 'small', 'medium', 'large'],
    control: { type: 'radio' },
  },
};
