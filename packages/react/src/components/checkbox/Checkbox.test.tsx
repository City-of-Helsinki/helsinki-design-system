import React from 'react';
import { render } from '@testing-library/react';

import Checkbox from './Checkbox';

describe('<Checkbox /> spec', () => {
  it('renders the component', () => {
    const { asFragment } = render(<Checkbox />);
    expect(asFragment()).toMatchSnapshot();
  });
});
