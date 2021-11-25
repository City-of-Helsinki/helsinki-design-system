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

export const Calm = () => <Koros type="calm" />;

export const Flipped = () => (
  <>
    <Koros flipHorizontal />
    <br />
    <br />
    <Koros type="beat" flipHorizontal />
    <br />
    <br />
    <Koros type="pulse" flipHorizontal />
    <br />
    <br />
    <Koros type="wave" flipHorizontal />
    <br />
    <br />
    <Koros type="storm" flipHorizontal />
  </>
);

export const CustomColor = () => <Koros style={{ fill: 'var(--color-coat-of-arms)' }} />;

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
