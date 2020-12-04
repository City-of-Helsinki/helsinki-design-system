import React from 'react';
import { render } from '@testing-library/react';
import { axe } from 'jest-axe';

import { NavigationItem } from './NavigationItem';
import { NavigationWrapper } from '../../../utils/test-utils';

describe('<Navigation.Item /> spec', () => {
  it('renders the component', () => {
    const { asFragment } = render(<NavigationItem />, { wrapper: NavigationWrapper });
    expect(asFragment()).toMatchSnapshot();
  });
  it('should not have basic accessibility issues', async () => {
    const { container } = render(<NavigationItem />, { wrapper: NavigationWrapper });
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
