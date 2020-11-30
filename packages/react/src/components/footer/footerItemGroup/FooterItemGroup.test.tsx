import React from 'react';
import { render } from '@testing-library/react';
import { axe } from 'jest-axe';

import { FooterItemGroup } from './FooterItemGroup';
import { FooterWrapper } from '../../../utils/test-utils';

describe('<Footer.ItemGroup /> spec', () => {
  it('renders the component', () => {
    const { asFragment } = render(<FooterItemGroup />, { wrapper: FooterWrapper });
    expect(asFragment()).toMatchSnapshot();
  });
  it('should not have basic accessibility issues', async () => {
    const { container } = render(<FooterItemGroup />, { wrapper: FooterWrapper });
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
