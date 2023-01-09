import React from 'react';
import { render } from '@testing-library/react';
import { axe } from 'jest-axe';

import { Breadcrumb } from './Breadcrumb';

describe('<Breadcrumb /> spec', () => {
  it('renders the component', () => {
    const { asFragment } = render(<Breadcrumb />);
    expect(asFragment()).toMatchSnapshot();
  });
  it('should not have basic accessibility issues', async () => {
    const { container } = render(<Breadcrumb />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
