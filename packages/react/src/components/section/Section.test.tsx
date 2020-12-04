import React from 'react';
import { render } from '@testing-library/react';
import { axe } from 'jest-axe';

import { Section } from './Section';

describe('<Section /> spec', () => {
  it('renders the component', () => {
    const { asFragment } = render(<Section />);
    expect(asFragment()).toMatchSnapshot();
  });
  it('should not have basic accessibility issues', async () => {
    const { container } = render(<Section />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
