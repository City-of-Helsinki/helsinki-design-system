import React from 'react';
import { storiesOf } from '@storybook/react';

import Notification from './Notification';
import DismissableNotification from './DismissableNotification';

// A simple Wrapper to control max-width and the spacing around inputs.
const WrapperDecorator = storyFn => <div style={{ padding: '10px', maxWidth: '400px' }}> {storyFn()}</div>;

(Notification as React.FC).displayName = 'Notification';

storiesOf('Notification', module)
  .addDecorator(WrapperDecorator)
  .add('default', () => (
    <Notification labelText="label">
      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore
      magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.
    </Notification>
  ))
  .add('warning', () => (
    <Notification labelText="label" type="warning">
      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore
      magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.
    </Notification>
  ))
  .add('error', () => (
    <Notification labelText="label" type="error">
      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore
      magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.
    </Notification>
  ))
  .add('success', () => (
    <Notification labelText="label" type="success">
      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore
      magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.
    </Notification>
  ))
  .add('dismissable', () => (
    <DismissableNotification labelText="label" closeButtonlabelText="dismiss">
      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore
      magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.
    </DismissableNotification>
  ))
  .add('dismissable warning', () => (
    <DismissableNotification labelText="label" type="warning" closeButtonlabelText="dismiss">
      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore
      magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.
    </DismissableNotification>
  ))
  .add('dismissable error', () => (
    <DismissableNotification labelText="label" type="error" closeButtonlabelText="dismiss">
      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore
      magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.
    </DismissableNotification>
  ))
  .add('dismissable success', () => (
    <DismissableNotification labelText="label" type="success" closeButtonlabelText="dismiss">
      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore
      magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.
    </DismissableNotification>
  ));
