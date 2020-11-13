import React from 'react';
import { render } from '@testing-library/react';

import { SelectionGroup } from './SelectionGroup';
import { Checkbox } from '../checkbox';

describe('<SelectionGroup /> spec', () => {
  it('renders the component', () => {
    const { asFragment } = render(
      <SelectionGroup>
        <Checkbox id="checkbox" />
      </SelectionGroup>,
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
