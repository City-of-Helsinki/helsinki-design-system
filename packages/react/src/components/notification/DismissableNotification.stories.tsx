import React from 'react';
import { action } from '@storybook/addon-actions';
import { withKnobs } from '@storybook/addon-knobs';

import DismissableNotification from './DismissableNotification';

const onClose = action('closed');

const content =
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.';

export default {
  component: DismissableNotification,
  title: 'Components/DismissableNotification',
  decorators: [withKnobs, (storyFn) => <div style={{ maxWidth: '400px' }}>{storyFn()}</div>],
};

/**
 * Default
 */
export const Default = () => (
  <DismissableNotification labelText="label" closeButtonLabelText="dismiss" onClose={onClose}>
    {content}
  </DismissableNotification>
);

/**
 * Warning
 */
export const Warning = () => (
  <DismissableNotification labelText="label" closeButtonLabelText="dismiss" type="warning" onClose={onClose}>
    {content}
  </DismissableNotification>
);

/**
 * Error
 */
export const Error = () => (
  <DismissableNotification labelText="label" closeButtonLabelText="dismiss" type="error" onClose={onClose}>
    {content}
  </DismissableNotification>
);

/**
 * Success
 */
export const Success = () => (
  <DismissableNotification labelText="label" closeButtonLabelText="dismiss" type="success" onClose={onClose}>
    {content}
  </DismissableNotification>
);
