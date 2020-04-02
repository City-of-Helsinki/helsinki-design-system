import React, { useState } from 'react';
import { storiesOf } from '@storybook/react';

import RadioButton from './RadioButton';

const WrapperDecorator = storyFn => <div style={{ padding: '20px' }}> {storyFn()}</div>;

(RadioButton as React.FC).displayName = 'RadioButton';

storiesOf('RadioButton', module)
  .addDecorator(WrapperDecorator)
  .add('unselected', () => <RadioButton id="radio" labelText="Label" />)
  .add('selected', () => <RadioButton id="radio" labelText="Label" checked />)
  .add('disabled', () => <RadioButton id="radio" labelText="Label" disabled />)
  .add('selected disabled', () => <RadioButton id="radio" labelText="Label" checked disabled />)
  .add('default', () => {
    const [radioValue, setRadioValue] = useState(null);
    return (
      <>
        <RadioButton
          id="radio"
          value="foo"
          labelText="Label"
          onChange={event => setRadioValue((event.target as HTMLInputElement).value)}
          checked={radioValue === 'foo'}
        />
        <RadioButton
          id="radio2"
          value="bar"
          labelText="Label"
          onChange={event => setRadioValue((event.target as HTMLInputElement).value)}
          checked={radioValue === 'bar'}
        />
      </>
    );
  });
