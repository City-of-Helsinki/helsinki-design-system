import React from 'react';
import { render } from '@testing-library/react';
import { axe } from 'jest-axe';

import { FooterSoMe } from './FooterSoMe';
import { FooterWrapper } from '../../../utils/test-utils';

describe('<Footer.SoMe /> spec', () => {
  it('renders the component', () => {
    const { asFragment } = render(<FooterSoMe />, { wrapper: FooterWrapper });
    expect(asFragment()).toMatchSnapshot();
  });
  it('should not have basic accessibility issues', async () => {
    const { container } = render(<FooterSoMe />, { wrapper: FooterWrapper });
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
