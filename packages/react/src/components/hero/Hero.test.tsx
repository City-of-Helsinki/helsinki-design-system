import React from 'react';
import { render } from '@testing-library/react';
import { axe } from 'jest-axe';

import { Hero } from './Hero';

describe('<Hero /> spec', () => {
  it('renders the component', () => {
    const { asFragment } = render(<Hero />);
    expect(asFragment()).toMatchSnapshot();
  });
  it('should not have basic accessibility issues', async () => {
    const { container } = render(<Hero />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
