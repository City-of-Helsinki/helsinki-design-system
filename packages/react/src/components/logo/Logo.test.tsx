import React from 'react';
import { render } from '@testing-library/react';
import { axe } from 'jest-axe';

import { Logo } from './Logo';

describe('<Logo /> spec', () => {
  it('renders the component', () => {
    const { asFragment } = render(<Logo />);
    expect(asFragment()).toMatchSnapshot();
  });
  it('should not have basic accessibility issues', async () => {
    const { container } = render(<Logo />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
