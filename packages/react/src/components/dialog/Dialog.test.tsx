import React from 'react';
import { render } from '@testing-library/react';
import { axe } from 'jest-axe';

import { Dialog } from './Dialog';

describe('<Dialog /> spec', () => {
  it('renders the component', () => {
    const { asFragment } = render(<Dialog />);
    expect(asFragment()).toMatchSnapshot();
  });
  it('should not have basic accessibility issues', async () => {
    const { container } = render(<Dialog />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
