import React from 'react';
import { render } from '@testing-library/react';
import { axe } from 'jest-axe';

import { Header } from './Header';

describe('<Header /> spec', () => {
  it('renders the component', () => {
    const { asFragment } = render(<Header />);
    expect(asFragment()).toMatchSnapshot();
  });

  it('should not have basic accessibility issues', async () => {
    const { container } = render(<Header />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
