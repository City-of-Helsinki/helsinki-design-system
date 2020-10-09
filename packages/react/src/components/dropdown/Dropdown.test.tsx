import React from 'react';
import { render } from '@testing-library/react';

// import { Dropdown } from './Dropdown';
import { Select } from './select/Select';

const options = [{ value: 'foo' }, { value: 'bar' }, { value: 'baz' }];
const dropdownProps = {
  options,
  label: 'Label',
  helper: 'Helper',
};

// describe('<Dropdown /> spec', () => {
//   it('renders the component', () => {
//     const { asFragment } = render(<Dropdown {...dropdownProps} />);
//     expect(asFragment()).toMatchSnapshot();
//   });
// });

describe('<Select /> spec', () => {
  it('renders the component', () => {
    const { asFragment } = render(<Select {...dropdownProps} />);
    expect(asFragment()).toMatchSnapshot();
  });
});

// todo: write tests
// https://helsinkisolutionoffice.atlassian.net/browse/HDS-224
