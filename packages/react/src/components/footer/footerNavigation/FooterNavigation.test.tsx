import React from 'react';
import { render } from '@testing-library/react';
import { axe } from 'jest-axe';

import { FooterNavigation } from './FooterNavigation';
import { FooterWrapper } from '../../../utils/test-utils';
import { Footer } from '../Footer';

describe('<Footer.Navigation /> spec', () => {
  it('renders the component', () => {
    const { asFragment } = render(
      <FooterNavigation ariaLabel="Foo">
        <Footer.NavigationLink label="Link 1" />
        <Footer.NavigationLink label="Link 2" />
        <Footer.NavigationLink label="Link 3" />
      </FooterNavigation>,
      { wrapper: FooterWrapper },
    );
    expect(asFragment()).toMatchSnapshot();
  });
  it('should not have basic accessibility issues', async () => {
    const { container } = render(
      <FooterNavigation ariaLabel="Foo">
        <Footer.NavigationLink label="Link 1" />
        <Footer.NavigationLink label="Link 2" />
        <Footer.NavigationLink label="Link 3" />
      </FooterNavigation>,
      { wrapper: FooterWrapper },
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
