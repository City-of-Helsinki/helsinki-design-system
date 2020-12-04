import React from 'react';
import { render } from '@testing-library/react';

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
});
