import React from 'react';
import { render } from '@testing-library/react';
import { axe } from 'jest-axe';

import { FooterUtilities } from './FooterUtilities';
import { FooterWrapper } from '../../../utils/test-utils';

describe('<Footer.Utilities /> spec', () => {
  it('renders the component', () => {
    const { asFragment } = render(<FooterUtilities />, { wrapper: FooterWrapper });
    expect(asFragment()).toMatchSnapshot();
  });
  it('should not have basic accessibility issues', async () => {
    const { container } = render(<FooterUtilities backToTopLabel="Test label" />, { wrapper: FooterWrapper });
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
