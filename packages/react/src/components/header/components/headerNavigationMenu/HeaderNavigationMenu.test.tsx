import React from 'react';
import { render } from '@testing-library/react';
import { axe } from 'jest-axe';

import { HeaderNavigationMenu } from './HeaderNavigationMenu';

describe('<HeaderNavigationMenu /> spec', () => {
  it('renders the component', () => {
    const { asFragment } = render(<HeaderNavigationMenu />);
    expect(asFragment()).toMatchSnapshot();
  });

  it('should not have basic accessibility issues', async () => {
    const { container } = render(<HeaderNavigationMenu />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
