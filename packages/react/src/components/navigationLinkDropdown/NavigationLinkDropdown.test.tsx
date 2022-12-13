import React from 'react';
import { render } from '@testing-library/react';
import { axe } from 'jest-axe';

import { NavigationLinkDropdown } from './NavigationLinkDropdown';

describe('<NavigationLinkDropdown /> spec', () => {
  it('renders the component', () => {
    const { asFragment } = render(<NavigationLinkDropdown />);
    expect(asFragment()).toMatchSnapshot();
  });
  it('should not have basic accessibility issues', async () => {
    const { container } = render(<NavigationLinkDropdown />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
