import React from 'react';
import { render } from '@testing-library/react';
import { axe } from 'jest-axe';

import { FooterNavigationGroup } from './FooterNavigationGroup';
import { FooterWrapper } from '../../../utils/test-utils';

describe('<Footer.NavigationGroup /> spec', () => {
  it('renders the component', () => {
    const { asFragment } = render(<FooterNavigationGroup />, { wrapper: FooterWrapper });
    expect(asFragment()).toMatchSnapshot();
  });
  it('should not have basic accessibility issues', async () => {
    const { container } = render(<FooterNavigationGroup />, { wrapper: FooterWrapper });
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
