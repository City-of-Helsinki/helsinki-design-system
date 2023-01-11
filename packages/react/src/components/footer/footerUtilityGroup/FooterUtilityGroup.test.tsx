import React from 'react';
import { render } from '@testing-library/react';
import { axe } from 'jest-axe';

import { FooterUtilityGroup } from './FooterUtilityGroup';
import { FooterWrapper } from '../../../utils/test-utils';

describe('<Footer.UtilityGroup /> spec', () => {
  it('renders the component', () => {
    const { asFragment } = render(<FooterUtilityGroup />, { wrapper: FooterWrapper });
    expect(asFragment()).toMatchSnapshot();
  });
  it('should not have basic accessibility issues', async () => {
    const { container } = render(<FooterUtilityGroup />, { wrapper: FooterWrapper });
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
