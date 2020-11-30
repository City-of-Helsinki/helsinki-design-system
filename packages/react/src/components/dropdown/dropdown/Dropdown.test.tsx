import React from 'react';
import { render } from '@testing-library/react';
import { axe } from 'jest-axe';

import { Dropdown } from './Dropdown';

const options = [{ value: 'foo' }, { value: 'bar' }, { value: 'baz' }];
const dropdownProps = {
  options,
  label: 'Label',
  helper: 'Helper',
};

describe('<Dropdown /> spec', () => {
  it('renders the component', () => {
    const { asFragment } = render(<Dropdown {...dropdownProps} />);
    expect(asFragment()).toMatchSnapshot();
  });
  it('should not have basic accessibility issues', async () => {
    const { container } = render(<Dropdown {...dropdownProps} />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
