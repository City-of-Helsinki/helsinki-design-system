import React from 'react';

import { StatusLabel, StatusLabelProps } from './StatusLabel';
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

export const Icons = () => (
  <>
    <StatusLabel iconStart={<IconInfoCircle />}>Default</StatusLabel>
    <br />
    <br />
    <StatusLabel type="info" iconStart={<IconInfoCircle />}>
      Info
    </StatusLabel>
    <br />
    <br />
    <StatusLabel type="success" iconStart={<IconCheckCircle />}>
      Success
    </StatusLabel>
    <br />
    <br />
    <StatusLabel type="alert" iconStart={<IconAlertCircle />}>
      Alert
    </StatusLabel>
    <br />
    <br />
    <StatusLabel type="error" iconStart={<IconError />}>
      Error
    </StatusLabel>
  </>
);

export const Playground = (args: StatusLabelProps & { label: string }) => (
  <StatusLabel type={args.type}>{args.label}</StatusLabel>
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
  label: 'Status',
  type: 'neutral',
};

Playground.argTypes = {
  type: {
    options: ['neutral', 'info', 'success', 'alert', 'error'],
    control: { type: 'radio' },
  },
};
