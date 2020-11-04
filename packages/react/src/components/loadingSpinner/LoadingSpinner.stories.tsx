import React from 'react';

import { LoadingSpinner } from './LoadingSpinner';

export default {
  component: LoadingSpinner,
  title: 'Components/LoadingSpinner',
};

export const Default = (args) => <LoadingSpinner {...args} />;

export const Small = (args) => <LoadingSpinner {...args} />;
Small.args = {
  small: true,
};

export const CustomTheme = (args) => (
  <>
    <LoadingSpinner {...args} multicolor={false} />
    <br />
    <LoadingSpinner {...args} multicolor />
  </>
);
CustomTheme.storyName = 'Custom theme';
CustomTheme.args = {
  theme: {
    '--spinner-color': 'var(--color-suomenlinna)',
    '--spinner-color-stage1': 'var(--color-engel)',
    '--spinner-color-stage2': 'var(--color-summer)',
    '--spinner-color-stage3': 'var(--color-metro)',
  },
};
