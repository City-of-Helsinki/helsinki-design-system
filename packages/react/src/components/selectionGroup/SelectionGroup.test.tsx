import React from 'react';
import { render } from '@testing-library/react';
import { axe } from 'jest-axe';

import { SelectionGroup } from './SelectionGroup';
import { Checkbox } from '../checkbox';

describe('<SelectionGroup /> spec', () => {
  it('renders the component', () => {
    const { asFragment } = render(
      <SelectionGroup>
        <Checkbox id="checkbox" label="Foo" />
      </SelectionGroup>,
    );
    expect(asFragment()).toMatchSnapshot();
  });
  it('should not have basic accessibility issues', async () => {
    const { container } = render(
      <SelectionGroup>
        <Checkbox id="checkbox" label="Foo" />
      </SelectionGroup>,
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
