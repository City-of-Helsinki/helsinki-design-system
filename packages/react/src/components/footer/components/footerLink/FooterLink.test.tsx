import React from 'react';
import { render } from '@testing-library/react';
import { axe } from 'jest-axe';

import { FooterLink } from './FooterLink';
import { FooterWrapper } from '../../../../utils/test-utils';
import { FooterVariant } from '../../Footer.interface';
import { getCommonElementTestProps, getElementAttributesMisMatches } from '../../../../utils/testHelpers';

describe('<Link /> spec', () => {
  it('renders the component', () => {
    const { asFragment } = render(<FooterLink label="Link" />, { wrapper: FooterWrapper });
    expect(asFragment()).toMatchSnapshot();
  });
  it('should not have basic accessibility issues', async () => {
    const { container } = render(<FooterLink label="Link" />, { wrapper: FooterWrapper });
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
  it('renders the utility variant', () => {
    const { asFragment } = render(<FooterLink label="Link" variant={FooterVariant.Utility} />);
    expect(asFragment()).toMatchSnapshot();
  });

  it('renders the navigation variant', () => {
    const { asFragment } = render(<FooterLink label="Link" variant={FooterVariant.Navigation} />);
    expect(asFragment()).toMatchSnapshot();
  });

  it('renders the base variant', () => {
    const { asFragment } = render(<FooterLink label="Link" variant={FooterVariant.Base} />);
    expect(asFragment()).toMatchSnapshot();
  });
  it('native html props are passed to the element', async () => {
    const linkProps = getCommonElementTestProps<'a'>('a');
    const { getByTestId } = render(<FooterLink {...linkProps} label="Test" variant={FooterVariant.Base} />);
    const element = getByTestId(linkProps['data-testid']);
    expect(getElementAttributesMisMatches(element, linkProps)).toHaveLength(0);
  });
});
