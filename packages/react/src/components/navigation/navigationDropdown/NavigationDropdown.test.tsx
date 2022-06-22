import React from 'react';
import { render } from '@testing-library/react';
import { axe } from 'jest-axe';

import { NavigationDropdown } from './NavigationDropdown';
import { NavigationWrapper } from '../../../utils/test-utils';

describe('<Navigation.Dropdown /> spec', () => {
  it('renders the component', () => {
    const { asFragment } = render(<NavigationDropdown label="Foo" />, { wrapper: NavigationWrapper });
    expect(asFragment()).toMatchSnapshot();
  });
  it('should not have basic accessibility issues', async () => {
    const { container } = render(<NavigationDropdown label="Foo" />, { wrapper: NavigationWrapper });
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
