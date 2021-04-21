import React from 'react';
import { radios, text, withKnobs } from '@storybook/addon-knobs';

import { StatusLabel } from './StatusLabel';
import { IconCheckCircle, IconInfoCircle } from '../../icons';

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

export const Icons = () => (
  <>
    <StatusLabel iconLeft={<IconInfoCircle />}>Default</StatusLabel>
    <br />
    <br />
    <StatusLabel type="info" iconLeft={<IconInfoCircle />}>
      Info
    </StatusLabel>
    <br />
    <br />
    <StatusLabel type="success" iconLeft={<IconCheckCircle />}>
      Success
    </StatusLabel>
    <br />
    <br />
    <StatusLabel type="alert" iconLeft={<IconInfoCircle />}>
      Alert
    </StatusLabel>
    <br />
    <br />
    <StatusLabel type="error" iconLeft={<IconInfoCircle />}>
      Error
    </StatusLabel>
  </>
);

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
