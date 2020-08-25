import React from 'react';
import { render } from '@testing-library/react';

import { Columns } from './Columns';

describe('<Columns /> spec', () => {
  it('renders the component', () => {
    const { asFragment } = render(<Columns />);
    expect(asFragment()).toMatchSnapshot();
  });
});
