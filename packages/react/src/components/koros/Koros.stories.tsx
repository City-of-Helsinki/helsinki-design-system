import React from 'react';
import { boolean, radios, withKnobs } from '@storybook/addon-knobs';
import { ArgsTable, Stories, Title } from '@storybook/addon-docs/blocks';

import { Koros } from './Koros';

export default {
  component: Koros,
  title: 'Components/Koros',
  decorators: [withKnobs],
  parameters: {
    controls: { hideNoControlsWarning: true },
    docs: {
      page: () => (
        <>
          <Title>Props</Title>
          <ArgsTable />
          <Stories title="Examples" includePrimary />
        </>
      ),
    },
  },
};

export const Basic = () => <Koros />;

export const Beat = () => <Koros type="beat" />;

export const Pulse = () => <Koros type="pulse" />;

export const Wave = () => <Koros type="wave" />;

export const Storm = () => <Koros type="storm" />;

export const Flipped = () => <Koros flipHorizontal />;

export const Playground = () => {
  const type = radios('Type', { basic: 'basic', beat: 'beat', pulse: 'pulse', wave: 'wave', storm: 'storm' }, 'basic');
  const flipped = boolean('Flip horizontal', false);

  return <Koros type={type} flipHorizontal={flipped} />;
};
Playground.parameters = {
  previewTabs: {
    'storybook/docs/panel': {
      hidden: true,
    },
  },
  docs: {
    disable: true,
  },
};
