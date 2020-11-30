import React from 'react';
import { render } from '@testing-library/react';
import { axe } from 'jest-axe';

import { Footer } from './Footer';

describe('<Footer /> spec', () => {
  it('renders the component', () => {
    const { asFragment } = render(<Footer footerAriaLabel="Foo" title="Bar" />);
    expect(asFragment()).toMatchSnapshot();
  });
  it('should not have basic accessibility issues', async () => {
    const { container } = render(<Footer footerAriaLabel="Foo" title="Bar" />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
