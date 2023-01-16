import React from 'react';
import { render } from '@testing-library/react';
import { axe } from 'jest-axe';

import { FooterNavigation } from './FooterNavigation';
import { FooterWrapper } from '../../../utils/test-utils';

describe('<Footer.Navigation /> spec', () => {
  it('renders the component', () => {
    const { asFragment } = render(<FooterNavigation ariaLabel="Foo" />, { wrapper: FooterWrapper });
    expect(asFragment()).toMatchSnapshot();
  });
  it('should not have basic accessibility issues', async () => {
    const { container } = render(<FooterNavigation ariaLabel="Foo" />, { wrapper: FooterWrapper });
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
