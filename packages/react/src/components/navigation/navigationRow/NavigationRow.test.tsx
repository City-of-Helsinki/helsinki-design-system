import React from 'react';
import { render } from '@testing-library/react';
import { axe } from 'jest-axe';

import { NavigationRow } from './NavigationRow';
import { NavigationWrapper } from '../../../utils/test-utils';

describe('<Navigation.Row /> spec', () => {
  it('renders the component', () => {
    const { asFragment } = render(<NavigationRow />, { wrapper: NavigationWrapper });
    expect(asFragment()).toMatchSnapshot();
  });
  it('should not have basic accessibility issues', async () => {
    const { container } = render(<NavigationRow />, { wrapper: NavigationWrapper });
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
