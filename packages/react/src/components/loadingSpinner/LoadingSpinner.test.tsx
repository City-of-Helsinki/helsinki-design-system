import React from 'react';
import { render } from '@testing-library/react';

import { LoadingSpinner } from './LoadingSpinner';

describe('<LoadingSpinner /> spec', () => {
  it('renders the component', () => {
    const { asFragment } = render(<LoadingSpinner />);
    expect(asFragment()).toMatchSnapshot();
  });
});
