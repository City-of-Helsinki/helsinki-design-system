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
  .add('alternative', () => (
    <Notification labelText="label">
      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore
      magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.
    </Notification>
  ))
  .add('dismissable', () => (
    <DismissableNotification labelText="label" closeLabel="close notification">
      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore
      magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.
    </DismissableNotification>
  ))
  .add('dismissable alternative', () => (
    <DismissableNotification alternative labelText="label" closeLabel="close notification">
      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore
      magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.
    </DismissableNotification>
  ));
