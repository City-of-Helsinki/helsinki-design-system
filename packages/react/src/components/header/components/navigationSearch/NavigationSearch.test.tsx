import React from 'react';
import { render } from '@testing-library/react';
import { axe } from 'jest-axe';

import { NavigationSearch } from './NavigationSearch';
import { NavigationWrapper } from '../../../../utils/test-utils';

describe('<Header.NavigationSearch /> spec', () => {
  it('renders the component', () => {
    const { asFragment } = render(<NavigationSearch />, { wrapper: NavigationWrapper });
    expect(asFragment()).toMatchSnapshot();
  });
  it('should not have basic accessibility issues', async () => {
    const { container } = render(<NavigationSearch />, { wrapper: NavigationWrapper });
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
