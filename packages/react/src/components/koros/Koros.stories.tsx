import React from 'react';
import { ArgsTable, Stories, Title } from '@storybook/addon-docs/blocks';

import { Koros } from './Koros';

export default {
  component: Koros,
  title: 'Components/Koros',
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

export const Vibration = () => <Koros type="vibration" />;

export const Wave = () => <Koros type="wave" />;

export const Calm = () => <Koros type="calm" />;

export const Dense = () => (
  <>
    <Koros dense />
    <br />
    <Koros dense type="beat" />
    <br />
    <Koros dense type="pulse" />
    <br />
    <Koros dense type="vibration" />
    <br />
    <Koros dense type="wave" />
  </>
);

export const Flipped = (args) => (
  <>
    <Koros flipHorizontal={args.flipHorizontal} />
    <br />
    <br />
    <Koros type="beat" flipHorizontal={args.flipHorizontal} />
    <br />
    <br />
    <Koros type="pulse" flipHorizontal={args.flipHorizontal} />
    <br />
    <br />
    <Koros type="vibration" flipHorizontal={args.flipHorizontal} />
    <br />
    <br />
    <Koros type="wave" flipHorizontal={args.flipHorizontal} />
  </>
);

Flipped.args = {
  flipHorizontal: true,
};

export const Rotated = (args) => <Koros type={args.type} flipHorizontal={args.flipHorizontal} rotate={args.rotate} />;

Rotated.args = {
  type: 'basic',
  flipHorizontal: false,
  rotate: '45deg',
};

export const RotatedInContainer = () => {
  const rootStyle = { '--koros-height': '85px', '--hero-height': '300px', '--hero-width': '500px' };

  return (
    <div
      style={{
        ...rootStyle,
        backgroundColor: 'var(--color-silver-light)',
        height: 'var(--hero-height)',
        maxWidth: '100%',
        overflow: 'hidden',
        position: 'relative',
        width: 'var(--hero-width)',
      }}
    >
      <div
        style={{
          backgroundColor: 'var(--color-coat-of-arms)',
          clipPath: 'polygon(0 0, var(--hero-height) 0, 0 100%, 0% 100%)',
          height: '100%',
        }}
      />
      <Koros
        style={{
          fill: 'var(--color-coat-of-arms)',
          left: 'calc(-1 * var(--koros-height))',
          position: 'absolute',
          top: 'var(--koros-height)',
          transformOrigin: 'center',
          width: 'calc(2 * var(--hero-height))',
        }}
        rotate="135deg"
      />
    </div>
  );
};

export const CustomColor = () => <Koros style={{ fill: 'var(--color-coat-of-arms)' }} />;

export const Playground = (args) => (
  <Koros type={args.type} flipHorizontal={args.flipHorizontal} rotate={args.rotate} />
);

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

Playground.args = {
  type: 'basic',
  flipHorizontal: false,
  rotate: '',
};

Playground.argTypes = {
  type: {
    options: ['basic', 'beat', 'pulse', 'vibration', 'wave'],
    control: { type: 'radio' },
  },
};
