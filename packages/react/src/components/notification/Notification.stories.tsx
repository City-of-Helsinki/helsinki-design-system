import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import Notification from './Notification';

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
  .add('with close action', () => (
    <Notification labelText="label" onClickClose={action('close-button-click')}>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore
      magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.
    </Notification>
  ))
  .add('alternative with close action', () => (
    <Notification alternative labelText="label" onClickClose={action('close-button-click')}>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore
      magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.
    </Notification>
  ));
