import React from 'react';
// import { action } from '@storybook/addon-actions';
import { withKnobs } from '@storybook/addon-knobs';

import DismissableNotification from './DismissableNotification';

// const onClose = action('closed');

// const content =
//   'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.';

export default {
  component: DismissableNotification,
  title: 'Components/DismissableNotification',
  decorators: [withKnobs, (storyFn) => <div style={{ maxWidth: '400px' }}>{storyFn()}</div>],
};

// export const Default = () => (
//   <DismissableNotification label="label" closeButtonLabelText="dismiss" onClose={onClose}>
//     {content}
//   </DismissableNotification>
// );
//
// export const Warning = () => (
//   <DismissableNotification labelText="label" closeButtonLabelText="dismiss" type="warning" onClose={onClose}>
//     {content}
//   </DismissableNotification>
// );
//
// export const Error = () => (
//   <DismissableNotification label="label" closeButtonLabelText="dismiss" type="error" onClose={onClose}>
//     {content}
//   </DismissableNotification>
// );
//
// export const Success = () => (
//   <DismissableNotification label="label" closeButtonLabelText="dismiss" type="success" onClose={onClose}>
//     {content}
//   </DismissableNotification>
// );
