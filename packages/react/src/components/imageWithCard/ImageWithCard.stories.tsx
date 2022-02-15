import React from 'react';
import { ArgsTable, Title } from '@storybook/addon-docs/blocks';

import { ImageWithCard } from './ImageWithCard';
import imageFile from '../../assets/img/placeholder_1920x1080.jpg';

const contentTitle = 'Lorem ipsum';
const contentText =
  'Lorem ipsum dolor sit amet, consectetur adipisci elit, sed eiusmod tempor incidunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquid ex ea commodi consequat. Quis aute iure reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint obcaecat cupiditat non proident.';

const content = (
  <>
    <h2 style={{ fontSize: 'var(--fontsize-heading-l)' }}>{contentTitle}</h2>
    <p style={{ margin: 'var(--spacing-l) 0' }}>{contentText}</p>
  </>
);

export default {
  component: ImageWithCard,
  title: 'Components/ImageWithCard',
  parameters: {
    controls: { hideNoControlsWarning: true },
    layout: 'fullscreen',
    docs: {
      page: () => (
        <>
          <Title>Props</Title>
          <ArgsTable />
        </>
      ),
    },
  },
};

export const Default = () => <ImageWithCard src={imageFile}>{content}</ImageWithCard>;

export const Hover = () => (
  <ImageWithCard cardLayout="hover" src={imageFile}>
    {content}
  </ImageWithCard>
);

export const HoverFullWidth = () => (
  <ImageWithCard cardLayout="hover" fullWidth src={imageFile}>
    {content}
  </ImageWithCard>
);
HoverFullWidth.storyName = 'Hover full width';

export const Split = () => (
  <ImageWithCard cardLayout="split" src={imageFile}>
    {content}
  </ImageWithCard>
);

export const SplitFullWidth = () => (
  <ImageWithCard cardLayout="split" fullWidth src={imageFile}>
    {content}
  </ImageWithCard>
);
SplitFullWidth.storyName = 'Split full width';

export const Playground = (args) => (
  <ImageWithCard
    color={args.color}
    cardAlignment={args.cardAlignment}
    fullWidth={args.fullWidth}
    cardLayout={args.cardLayout}
    src={imageFile}
  >
    <h2 style={{ fontSize: 'var(--fontsize-heading-l)' }}>{args.title}</h2>
    <p style={{ margin: 'var(--spacing-l) 0' }}>{args.text}</p>
  </ImageWithCard>
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
  title: 'Title',
  text: 'Text',
  color: 'plain',
  fullWidth: false,
  cardAlignment: 'left',
  cardLayout: null,
};

Playground.argTypes = {
  color: {
    options: ['plain', 'primary', 'secondary', 'tertiary'],
    control: { type: 'radio' },
  },
  cardAlignment: {
    options: ['left', 'right'],
    control: { type: 'radio' },
  },
  cardLayout: {
    options: ['hover', 'split', null],
    control: { type: 'radio' },
  },
};
