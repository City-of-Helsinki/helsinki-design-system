import React from 'react';

import { Card, CardProps } from './Card';
import { Button, ButtonPresetTheme, ButtonVariant } from '../button';

export default {
  component: Card,
  title: 'Components/Card',
  parameters: {
    controls: { expanded: true },
  },
};

export const Empty = (args: CardProps) => <Card {...args} />;

export const WithBorder = (args: CardProps) => <Card {...args} />;
WithBorder.storyName = 'With border';
WithBorder.args = {
  border: true,
};

export const WithBoxShadow = (args: CardProps) => <Card {...args} />;
WithBoxShadow.storyName = 'With box shadow';
WithBoxShadow.args = {
  boxShadow: true,
};

export const TextHeading = (args: CardProps) => <Card {...args} />;
TextHeading.storyName = 'With text & heading';
TextHeading.args = {
  heading: 'Card',
  text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
};

export const WithOtherComponents = (args: CardProps) => (
  <Card {...args}>
    <Button variant={ButtonVariant.Secondary} theme={ButtonPresetTheme.Black} role="link">
      Button
    </Button>
  </Card>
);
WithOtherComponents.storyName = 'With other components';
WithOtherComponents.args = {
  heading: 'Card',
  text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
};

export const WithCustomTheme = (args: CardProps) => <Card {...args} />;
WithCustomTheme.storyName = 'With custom theme';
WithCustomTheme.args = {
  border: true,
  heading: 'Card',
  text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
  theme: {
    '--background-color': 'var(--color-white)',
    '--border-color': 'var(--color-black-90)',
    '--border-width': '2px',
    '--color': 'var(--color-black-90)',
    '--padding-horizontal': 'var(--spacing-l)',
    '--padding-vertical': 'var(--spacing-m)',
  },
};
