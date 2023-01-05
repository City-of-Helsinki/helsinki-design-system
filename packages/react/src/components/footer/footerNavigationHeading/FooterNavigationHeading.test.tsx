import React from 'react';
import { render } from '@testing-library/react';
import { axe } from 'jest-axe';

import { FooterNavigationHeading } from './FooterNavigationHeading';
import { FooterWrapper } from '../../../utils/test-utils';

describe('<Footer.NavigationHeading /> spec', () => {
  it('renders the component', () => {
    const { asFragment } = render(<FooterNavigationHeading />, { wrapper: FooterWrapper });
    expect(asFragment()).toMatchSnapshot();
  });
  it('should not have basic accessibility issues', async () => {
    const { container } = render(<FooterNavigationHeading />, { wrapper: FooterWrapper });
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
