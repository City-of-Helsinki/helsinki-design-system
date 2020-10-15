import React from 'react';
import { radios } from '@storybook/addon-knobs';

import { Logo } from './Logo';

export default {
  component: Logo,
  title: 'Components/Logo',
  parameters: {
    controls: { hideNoControlsWarning: true },
  },
};

export const Playground = () => {
  const language = radios('Language', { fi: 'fi', sv: 'sv' }, 'fi');
  const size = radios('Size', { full: 'full', small: 'small', medium: 'medium', large: 'large' }, 'full');

  return <Logo language={language} size={size} />;
};
