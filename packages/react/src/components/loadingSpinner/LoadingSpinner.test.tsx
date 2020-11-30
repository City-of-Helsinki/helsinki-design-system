import React from 'react';
import { render } from '@testing-library/react';
import { axe } from 'jest-axe';

import { LoadingSpinner } from './LoadingSpinner';

describe('<LoadingSpinner /> spec', () => {
  it('renders the component', () => {
    const { asFragment } = render(<LoadingSpinner />);
    expect(asFragment()).toMatchSnapshot();
  });
  it('should not have basic accessibility issues', async () => {
    const { container } = render(<LoadingSpinner />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
