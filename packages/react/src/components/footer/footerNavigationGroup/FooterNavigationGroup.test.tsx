import React from 'react';
import { render } from '@testing-library/react';
import { axe } from 'jest-axe';

import { FooterNavigationGroup } from './FooterNavigationGroup';
import { FooterNavigationWrapper } from '../../../utils/test-utils';
import { Footer } from '../Footer';
import { FooterVariant } from '../Footer.interface';

describe('<Footer.NavigationGroup /> spec', () => {
  it('renders the navigation groups', () => {
    const { asFragment } = render(
      <FooterNavigationGroup
        headingLink={
          <Footer.GroupHeading href="https://yourpath.com" label="Main Page" variant={FooterVariant.Navigation} />
        }
      >
        <Footer.NavigationLink label="Link 1" />
        <Footer.NavigationLink label="Link 2" />
        <Footer.NavigationLink label="Link 3" />
      </FooterNavigationGroup>,
      { wrapper: FooterNavigationWrapper },
    );
    expect(asFragment()).toMatchSnapshot();
  });
  it('should not have basic accessibility issues', async () => {
    const { container } = render(
      <FooterNavigationGroup
        headingLink={
          <Footer.GroupHeading href="https://yourpath.com" label="Main Page" variant={FooterVariant.Navigation} />
        }
        ariaLabel="Navigation group"
      >
        <Footer.NavigationLink label="Link 1" />
        <Footer.NavigationLink label="Link 2" />
        <Footer.NavigationLink label="Link 3" />
      </FooterNavigationGroup>,
      { wrapper: FooterNavigationWrapper },
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
