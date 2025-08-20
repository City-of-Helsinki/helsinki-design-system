import React from 'react';
import { render } from '@testing-library/react';
import { axe } from 'jest-axe';

import { Search } from './Search';

describe('<Search /> spec', () => {
  it('renders the component', () => {
    const { asFragment } = render(<Search />);
    expect(asFragment()).toMatchSnapshot();
  });
  it('should not have basic accessibility issues', async () => {
    const { container } = render(<Search />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
