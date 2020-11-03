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

export const CustomTheme = (args) => <LoadingSpinner {...args} />;
CustomTheme.args = {
  theme: {
    '--spinner-color': 'var(--color-suomenlinna)',
  },
};
