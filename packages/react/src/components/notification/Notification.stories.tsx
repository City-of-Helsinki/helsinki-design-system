import React from 'react';
import { withKnobs } from '@storybook/addon-knobs';

import Notification from './Notification';

const content =
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.';

export default {
  component: Notification,
  title: 'Components/Notification',
  decorators: [withKnobs, (storyFn) => <div style={{ maxWidth: '400px' }}>{storyFn()}</div>],
};

export const Default = () => <Notification labelText="label">{content}</Notification>;

export const Warning = () => (
  <Notification labelText="label" type="warning">
    {content}
  </Notification>
);

export const Error = () => (
  <Notification labelText="label" type="error">
    {content}
  </Notification>
);

export const Success = () => (
  <Notification labelText="label" type="success">
    {content}
  </Notification>
);
