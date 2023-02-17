import React from 'react';

import { StatusLabel } from './StatusLabel';
import { IconCheckCircle, IconInfoCircle, IconAlertCircle, IconError } from '../../icons';

export default {
  component: StatusLabel,
  title: 'Components/StatusLabel',
  parameters: {
    controls: { hideNoControlsWarning: true },
  },
};

export const Neutral = () => <StatusLabel>Neutral</StatusLabel>;

export const Info = () => <StatusLabel type="info">Info</StatusLabel>;

export const Success = () => <StatusLabel type="success">Success</StatusLabel>;

export const Alert = () => <StatusLabel type="alert">Alert</StatusLabel>;

export const Error = () => <StatusLabel type="error">Error</StatusLabel>;

export const WithRoundedCorners = () => <StatusLabel variant="rounded">Rounded</StatusLabel>;

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
    <StatusLabel type="alert" iconLeft={<IconAlertCircle />}>
      Alert
    </StatusLabel>
    <br />
    <br />
    <StatusLabel type="error" iconLeft={<IconError />}>
      Error
    </StatusLabel>
    <br />
    <br />
    <StatusLabel type="info" variant="rounded" iconLeft={<IconInfoCircle />}>
      Rounded
    </StatusLabel>
  </>
);

export const Playground = (args) => <StatusLabel type={args.type}>{args.label}</StatusLabel>;

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
  label: 'Status',
  type: 'neutral',
};

Playground.argTypes = {
  type: {
    options: ['neutral', 'info', 'success', 'alert', 'error'],
    control: { type: 'radio' },
  },
};
