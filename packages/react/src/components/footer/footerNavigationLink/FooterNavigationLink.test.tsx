import React from 'react';
import { render } from '@testing-library/react';
import { axe } from 'jest-axe';

import { FooterNavigationLink } from './FooterNavigationLink';
import { FooterWrapper } from '../../../utils/test-utils';

describe('<Footer.NavigationLink /> spec', () => {
  it('renders the component', () => {
    const { asFragment } = render(<FooterNavigationLink />, { wrapper: FooterWrapper });
    expect(asFragment()).toMatchSnapshot();
  });
  it('should not have basic accessibility issues', async () => {
    const { container } = render(<FooterNavigationLink />, { wrapper: FooterWrapper });
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
