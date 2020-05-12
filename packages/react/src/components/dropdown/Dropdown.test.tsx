import React from 'react';
import { render } from '@testing-library/react';

import Dropdown from './Dropdown';

describe('<Dropdown /> spec', () => {
  it('renders the component', () => {
    const { asFragment } = render(<Dropdown />);
    expect(asFragment()).toMatchSnapshot();
  });
});
