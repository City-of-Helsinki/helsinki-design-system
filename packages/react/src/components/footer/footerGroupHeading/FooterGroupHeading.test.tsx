import React from 'react';
import { render } from '@testing-library/react';
import { axe } from 'jest-axe';

import { FooterGroupHeading } from './FooterGroupHeading';
import { FooterWrapper } from '../../../utils/test-utils';
import { FooterVariant } from '../Footer.interface';

describe('<Footer.FooterGroupHeading /> spec', () => {
  it('renders the component', () => {
    const { asFragment } = render(<FooterGroupHeading label="Test" />, { wrapper: FooterWrapper });
    expect(asFragment()).toMatchSnapshot();
  });

  it('should not have basic accessibility issues', async () => {
    const { container } = render(<FooterGroupHeading label="Test" />, { wrapper: FooterWrapper });
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('renders the utility variant', () => {
    const { asFragment } = render(<FooterGroupHeading label="Test" variant={FooterVariant.Utility} />);
    expect(asFragment()).toMatchSnapshot();
  });

  it('renders the navigation variant', () => {
    const { asFragment } = render(<FooterGroupHeading label="Test" variant={FooterVariant.Navigation} />);
    expect(asFragment()).toMatchSnapshot();
  });
});
