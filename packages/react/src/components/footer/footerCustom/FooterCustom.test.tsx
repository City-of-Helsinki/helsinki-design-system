import React from 'react';
import { render } from '@testing-library/react';
import { axe } from 'jest-axe';

import { FooterCustom } from './FooterCustom';
import { FooterWrapper } from '../../../utils/test-utils';

describe('<Footer.Custom /> spec', () => {
  it('renders the component', () => {
    const { asFragment } = render(<FooterCustom />, {
      wrapper: FooterWrapper,
    });
    expect(asFragment()).toMatchSnapshot();
  });
  it('should not have basic accessibility issues', async () => {
    const { container } = render(<FooterCustom  />, {
      wrapper: FooterWrapper,
    });
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
