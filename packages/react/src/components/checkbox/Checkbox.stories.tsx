import React, { useState } from 'react';
import { storiesOf } from '@storybook/react';

import Checkbox from './Checkbox';

const WrapperDecorator = (storyFn) => <div style={{ padding: '20px' }}> {storyFn()}</div>;

(Checkbox as React.FC).displayName = 'Checkbox';

storiesOf('Checkbox', module)
  .addDecorator(WrapperDecorator)
  .add('example', () => {
    const [checkedItems, setCheckedItems] = useState({});
    const options = ['Option 1', 'Option 2', 'Option 3'];

    const handleChange = (e) => {
      const item = e.target.name;
      const isChecked = e.target.checked;
      setCheckedItems({ ...checkedItems, [item]: isChecked });
    };

    return (
      <>
        {options.map((item) => (
          <Checkbox
            key={`checkbox-${item}`}
            id={`checkbox-${item}`}
            labelText={item}
            name={item}
            checked={checkedItems[item]}
            onChange={handleChange}
          />
        ))}
      </>
    );
  })
  .add('unselected', () => <Checkbox id="checkbox" labelText="Label" />)
  .add('selected', () => <Checkbox id="checkbox" labelText="Label" checked />)
  .add('disabled', () => <Checkbox id="checkbox" labelText="Label" disabled />)
  .add('selected disabled', () => <Checkbox id="checkbox" labelText="Label" checked disabled />);
