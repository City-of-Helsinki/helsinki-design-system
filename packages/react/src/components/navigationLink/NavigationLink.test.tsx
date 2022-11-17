import React from 'react';
import { render } from '@testing-library/react';
import { axe } from 'jest-axe';

import { NavigationLink } from './NavigationLink';

describe('<NavigationLink /> spec', () => {
  it('renders the component', () => {
    const { asFragment } = render(<NavigationLink href="#">Link</NavigationLink>);
    expect(asFragment()).toMatchSnapshot();
  });
  it('should not have basic accessibility issues', async () => {
    const { container } = render(<NavigationLink href="#">Link</NavigationLink>);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
