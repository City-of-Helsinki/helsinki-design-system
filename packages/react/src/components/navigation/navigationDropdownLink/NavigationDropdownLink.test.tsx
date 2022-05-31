import React from 'react';
import { render } from '@testing-library/react';
import { axe } from 'jest-axe';

import { NavigationDropdownLink } from './NavigationDropdownLink';
import { NavigationWrapper } from '../../../utils/test-utils';

describe('<Navigation.Dropdown /> spec', () => {
  it('renders the component', () => {
    const { asFragment } = render(<NavigationDropdownLink label="Foo" />, { wrapper: NavigationWrapper });
    expect(asFragment()).toMatchSnapshot();
  });
  it('should not have basic accessibility issues', async () => {
    const { container } = render(<NavigationDropdownLink label="Foo" />, { wrapper: NavigationWrapper });
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
