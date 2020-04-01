import React from 'react';
import { storiesOf } from '@storybook/react';

import RadioButton from './RadioButton';

const WrapperDecorator = storyFn => <div style={{ padding: '20px' }}> {storyFn()}</div>;

(RadioButton as React.FC).displayName = 'RadioButton';

storiesOf('RadioButton', module)
  .addDecorator(WrapperDecorator)
  .add('default', () => <RadioButton id="radio" labelText="Label" />)
  .add('selected', () => <RadioButton id="radio" labelText="Label" checked />)
  .add('disabled', () => <RadioButton id="radio" labelText="Label" disabled />)
  .add('selected disabled', () => <RadioButton id="radio" labelText="Label" checked disabled />);
