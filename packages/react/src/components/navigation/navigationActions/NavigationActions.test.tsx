import React from 'react';
import { render } from '@testing-library/react';
import { axe } from 'jest-axe';

import { NavigationActions } from './NavigationActions';
import { NavigationWrapper } from '../../../utils/test-utils';

describe('<Navigation.Actions /> spec', () => {
  it('renders the component', () => {
    const { asFragment } = render(<NavigationActions />, { wrapper: NavigationWrapper });
    expect(asFragment()).toMatchSnapshot();
  });
  it('should not have basic accessibility issues', async () => {
    const { container } = render(<NavigationActions />, { wrapper: NavigationWrapper });
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
