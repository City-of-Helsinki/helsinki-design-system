import React from 'react';
import { render } from '@testing-library/react';
import { axe } from 'jest-axe';

import { KeyboardNavigation } from './KeyboardNavigation';

describe('<KeyboardNavigation /> spec', () => {
  it('renders the component', () => {
    const { asFragment } = render(<KeyboardNavigation />);
    expect(asFragment()).toMatchSnapshot();
  });
  it('should not have basic accessibility issues', async () => {
    const { container } = render(<KeyboardNavigation />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
