import React from 'react';
import { boolean, radios, withKnobs } from '@storybook/addon-knobs';
import { Props, Stories, Title } from '@storybook/addon-docs/dist/blocks';

import Koros from './Koros';

export default {
  component: Koros,
  title: 'Components/Koros',
  decorators: [withKnobs],
  parameters: {
    docs: {
      page: () => (
        <>
          <Title>Props</Title>
          <Props />
          <Stories title="Examples" includePrimary />
        </>
      ),
    },
  },
};

/**
 * Basic
 */
export const Basic = () => <Koros />;

/**
 * Beat
 */
export const Beat = () => <Koros type="beat" />;

/**
 * Pulse
 */
export const Pulse = () => <Koros type="pulse" />;

/**
 * Wave
 */
export const Wave = () => <Koros type="wave" />;

/**
 * Storm
 */
export const Storm = () => <Koros type="storm" />;

/**
 * Flipped
 */
export const Flipped = () => <Koros flipHorizontal />;

/**
 * Playground
 */
export const Playground = () => {
  const type = radios('Type', { basic: 'basic', beat: 'beat', pulse: 'pulse', wave: 'wave', storm: 'storm' }, 'basic');
  const flipped = boolean('Flip horizontal', false);

  return <Koros type={type} flipHorizontal={flipped} />;
};

Playground.story = {
  parameters: {
    previewTabs: {
      'storybook/docs/panel': {
        hidden: true,
      },
    },
    docs: {
      disable: true,
    },
  },
};
