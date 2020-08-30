import React from 'react';
import { render } from '@testing-library/react';

import { Logo } from './Logo';

describe('<Logo /> spec', () => {
  it('renders the component', () => {
    const { asFragment } = render(<Logo />);
    expect(asFragment()).toMatchSnapshot();
  });
});
