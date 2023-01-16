import React from 'react';
import { render } from '@testing-library/react';
import { axe } from 'jest-axe';

import { FooterUtilities } from './FooterUtilities';
import { FooterNavigationLink } from '../footerNavigationLink/FooterNavigationLink';
import { FooterWrapper } from '../../../utils/test-utils';

describe('<Footer.Utilities /> spec', () => {
  it('renders the component', () => {
    const { asFragment } = render(
      <FooterUtilities>
        <FooterNavigationLink
          href="https://hel.fi/helsinki/fi/kaupunki-ja-hallinto/osallistu-ja-vaikuta/ota-yhteytta/ota-yhteytta"
          label="Yhteystiedot"
        />
        <FooterNavigationLink
          href="https://hel.fi/helsinki/fi/kaupunki-ja-hallinto/osallistu-ja-vaikuta/palaute/anna-palautetta"
          label="Anna ja lue palautetta"
        />
        <FooterNavigationLink href="https://hel.fi/kanslia/neuvonta-fi" label="Chat-neuvonta" />
      </FooterUtilities>,
      { wrapper: FooterWrapper },
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('should not have basic accessibility issues', async () => {
    const { container } = render(
      <FooterUtilities>
        <FooterNavigationLink
          href="https://hel.fi/helsinki/fi/kaupunki-ja-hallinto/osallistu-ja-vaikuta/ota-yhteytta/ota-yhteytta"
          label="Yhteystiedot"
        />
        <FooterNavigationLink
          href="https://hel.fi/helsinki/fi/kaupunki-ja-hallinto/osallistu-ja-vaikuta/palaute/anna-palautetta"
          label="Anna ja lue palautetta"
        />
        <FooterNavigationLink href="https://hel.fi/kanslia/neuvonta-fi" label="Chat-neuvonta" />
      </FooterUtilities>,
      { wrapper: FooterWrapper },
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
