import React from 'react';
import { render } from '@testing-library/react';
import { axe } from 'jest-axe';

import { NavigationUser } from './NavigationUser';
import { NavigationWrapper } from '../../../utils/test-utils';

describe('<Navigation.User /> spec', () => {
  it('renders the component', () => {
    const { asFragment } = render(<NavigationUser label="Foo" />, { wrapper: NavigationWrapper });
    expect(asFragment()).toMatchSnapshot();
  });
  it('should not have basic accessibility issues', async () => {
    const { container } = render(<NavigationUser label="Foo" />, { wrapper: NavigationWrapper });
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
