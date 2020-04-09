import React, { useState } from 'react';
import { storiesOf } from '@storybook/react';

import Checkbox from './Checkbox';

const WrapperDecorator = storyFn => <div style={{ padding: '20px' }}> {storyFn()}</div>;

(Checkbox as React.FC).displayName = 'Checkbox';

storiesOf('Checkbox', module)
  .addDecorator(WrapperDecorator)
  .add('default', () => {
    const [checked, setChecked] = useState(false);
    return <Checkbox id="checkbox" labelText="Label" checked={checked} onChange={e => setChecked(e.target.checked)} />;
  })
  .add('unselected', () => <Checkbox id="checkbox" labelText="Label" />)
  .add('selected', () => <Checkbox id="checkbox" labelText="Label" checked />)
  .add('disabled', () => <Checkbox id="checkbox" labelText="Label" disabled />)
  .add('selected disabled', () => <Checkbox id="checkbox" labelText="Label" checked disabled />);
