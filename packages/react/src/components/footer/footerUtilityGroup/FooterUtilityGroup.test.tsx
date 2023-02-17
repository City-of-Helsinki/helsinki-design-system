import React from 'react';
import { render } from '@testing-library/react';
import { axe } from 'jest-axe';

import { Footer } from '../Footer';
import { FooterUtilitiesWrapper } from '../../../utils/test-utils';
import { FooterVariant } from '../Footer.interface';
import { IconFacebook } from '../../../icons';

describe('<Footer.UtilityGroup /> spec', () => {
  it('renders the utility groups', () => {
    const { asFragment } = render(
      <>
        <Footer.UtilityGroup>
          <Footer.GroupHeading
            href="https://google.com"
            onClick={(e) => e.preventDefault()}
            label="Main Page"
            variant={FooterVariant.Utility}
          />
          <Footer.NavigationLink
            href="https://google.com"
            onClick={(e) => e.preventDefault()}
            label="Sub page"
            variant={FooterVariant.Utility}
          />
          <Footer.NavigationLink
            href="https://google.com"
            onClick={(e) => e.preventDefault()}
            label="Sub page"
            variant={FooterVariant.Utility}
          />
        </Footer.UtilityGroup>
        <Footer.UtilityGroup key={6}>
          <Footer.GroupHeading label="Social media" variant={FooterVariant.Utility} />
          <Footer.NavigationLink
            title="Helsingin kaupungin Facebook-tili"
            label="Facebook"
            aria-label="Helsingin kaupungin Facebook-tili"
            icon={<IconFacebook aria-hidden="true" />}
            href="https://facebook.com/helsinginkaupunki/"
          />
          <Footer.NavigationLink
            title="Helsingin kaupungin Facebook-tili"
            label="Facebook"
            aria-label="Helsingin kaupungin Facebook-tili"
            icon={<IconFacebook aria-hidden="true" />}
            href="https://facebook.com/helsinginkaupunki/"
          />
        </Footer.UtilityGroup>
      </>,
      { wrapper: FooterUtilitiesWrapper },
    );
    expect(asFragment()).toMatchSnapshot();
  });
  it('should not have basic accessibility issues', async () => {
    const { container } = render(
      <>
        <Footer.UtilityGroup ariaLabel="Utility links group">
          <Footer.GroupHeading
            href="https://google.com"
            onClick={(e) => e.preventDefault()}
            label="Main Page"
            variant={FooterVariant.Utility}
          />
          <Footer.NavigationLink
            href="https://google.com"
            onClick={(e) => e.preventDefault()}
            label="Sub page"
            variant={FooterVariant.Utility}
          />
          <Footer.NavigationLink
            href="https://google.com"
            onClick={(e) => e.preventDefault()}
            label="Sub page"
            variant={FooterVariant.Utility}
          />
        </Footer.UtilityGroup>
        <Footer.UtilityGroup key={6} ariaLabel="Social media links">
          <Footer.GroupHeading label="Social media" variant={FooterVariant.Utility} />
          <Footer.NavigationLink
            title="Helsingin kaupungin Facebook-tili"
            label="Facebook"
            aria-label="Helsingin kaupungin Facebook-tili"
            icon={<IconFacebook aria-hidden="true" />}
            href="https://facebook.com/helsinginkaupunki/"
          />
          <Footer.NavigationLink
            title="Helsingin kaupungin Facebook-tili"
            label="Facebook"
            aria-label="Helsingin kaupungin Facebook-tili"
            icon={<IconFacebook aria-hidden="true" />}
            href="https://facebook.com/helsinginkaupunki/"
          />
        </Footer.UtilityGroup>
      </>,
      { wrapper: FooterUtilitiesWrapper },
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
