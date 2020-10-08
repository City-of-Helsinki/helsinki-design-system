import React from 'react';
import { render } from '@testing-library/react';

import { MenuButton } from './MenuButton';

describe('<MenuButton /> spec', () => {
  it('renders the component', () => {
    const { asFragment } = render(<MenuButton />);
    expect(asFragment()).toMatchSnapshot();
  });
});
