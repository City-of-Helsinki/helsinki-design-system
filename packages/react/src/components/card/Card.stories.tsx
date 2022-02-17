import React from 'react';

import { Card } from './Card';
import { Button } from '../button';

export default {
  component: Card,
  title: 'Components/Card',
  parameters: {
    controls: { expanded: true },
  },
};

export const Empty = (args) => <Card {...args} />;

export const WithBorder = (args) => <Card {...args} />;
WithBorder.storyName = 'With border';
WithBorder.args = {
  border: true,
};

export const TextHeading = (args) => <Card {...args} />;
TextHeading.storyName = 'With text & heading';
TextHeading.args = {
  heading: 'Card',
  text:
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
};

export const WithOtherComponents = (args) => (
  <Card {...args}>
    <Button variant="secondary" theme="black" role="link">
      Button
    </Button>
  </Card>
);
WithOtherComponents.storyName = 'With other components';
WithOtherComponents.args = {
  heading: 'Card',
  text:
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
};

export const WithCustomTheme = (args) => <Card {...args} />;
WithCustomTheme.storyName = 'With custom theme';
WithCustomTheme.args = {
  border: true,
  heading: 'Card',
  text:
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
  theme: {
    '--background-color': 'var(--color-white)',
    '--border-color': 'var(--color-black-90)',
    '--border-width': '2px',
    '--color': 'var(--color-black-90)',
    '--padding-horizontal': 'var(--spacing-l)',
    '--padding-vertical': 'var(--spacing-m)',
  },
};
