import React from 'react';
import { radios, text, withKnobs } from '@storybook/addon-knobs';

import { StatusLabel } from './StatusLabel';

export default {
  component: StatusLabel,
  title: 'Components/Status label',
  parameters: {
    controls: { hideNoControlsWarning: true },
  },
  decorators: [withKnobs],
};

export const Neutral = () => <StatusLabel>Neutral</StatusLabel>;

export const Info = () => <StatusLabel type="info">Info</StatusLabel>;

export const Success = () => <StatusLabel type="success">Success</StatusLabel>;

export const Alert = () => <StatusLabel type="alert">Alert</StatusLabel>;

export const Error = () => <StatusLabel type="error">Error</StatusLabel>;

export const Playground = () => {
  const label = text('Label', 'Status');
  const type = radios(
    'Type',
    {
      neutral: 'neutral',
      info: 'info',
      success: 'success',
      alert: 'alert',
      error: 'error',
    },
    'neutral',
  );

  return <StatusLabel type={type}>{label}</StatusLabel>;
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
