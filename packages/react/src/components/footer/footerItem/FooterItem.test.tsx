import React from 'react';
import { render } from '@testing-library/react';
import { axe } from 'jest-axe';

import { FooterItem } from './FooterItem';
import { FooterWrapper } from '../../../utils/test-utils';

describe('<Footer.Item /> spec', () => {
  it('renders the component', () => {
    const { asFragment } = render(<FooterItem value="Foo" />, { wrapper: FooterWrapper });
    expect(asFragment()).toMatchSnapshot();
  });
  it('should not have basic accessibility issues', async () => {
    const { container } = render(<FooterItem value="Foo" />, { wrapper: FooterWrapper });
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
