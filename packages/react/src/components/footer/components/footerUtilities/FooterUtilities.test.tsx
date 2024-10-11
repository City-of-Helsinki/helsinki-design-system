import React from 'react';
import { render } from '@testing-library/react';
import { axe } from 'jest-axe';

import { FooterUtilities } from './FooterUtilities';
import { FooterLink } from '../footerLink/FooterLink';
import { FooterWrapper } from '../../../../utils/test-utils';
import { getCommonElementTestProps, getElementAttributesMisMatches } from '../../../../utils/testHelpers';

describe('<Footer.Utilities /> spec', () => {
  it('renders the component', () => {
    const { asFragment } = render(
      <FooterUtilities>
        <FooterLink
          href="https://hel.fi/helsinki/fi/kaupunki-ja-hallinto/osallistu-ja-vaikuta/ota-yhteytta/ota-yhteytta"
          label="Yhteystiedot"
        />
        <FooterLink
          href="https://hel.fi/helsinki/fi/kaupunki-ja-hallinto/osallistu-ja-vaikuta/palaute/anna-palautetta"
          label="Anna ja lue palautetta"
        />
        <FooterLink href="https://hel.fi/kanslia/neuvonta-fi" label="Chat-neuvonta" />
      </FooterUtilities>,
      { wrapper: FooterWrapper },
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('should not have basic accessibility issues', async () => {
    const { container } = render(
      <FooterUtilities>
        <FooterLink
          href="https://hel.fi/helsinki/fi/kaupunki-ja-hallinto/osallistu-ja-vaikuta/ota-yhteytta/ota-yhteytta"
          label="Yhteystiedot"
        />
        <FooterLink
          href="https://hel.fi/helsinki/fi/kaupunki-ja-hallinto/osallistu-ja-vaikuta/palaute/anna-palautetta"
          label="Anna ja lue palautetta"
        />
        <FooterLink href="https://hel.fi/kanslia/neuvonta-fi" label="Chat-neuvonta" />
      </FooterUtilities>,
      { wrapper: FooterWrapper },
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
  it('native html props are passed to the element', async () => {
    const divProps = getCommonElementTestProps('div');
    divProps.role = 'role';
    const { getByTestId } = render(
      <FooterUtilities {...divProps}>
        <FooterLink
          href="https://hel.fi/helsinki/fi/kaupunki-ja-hallinto/osallistu-ja-vaikuta/ota-yhteytta/ota-yhteytta"
          label="Yhteystiedot"
        />
        <FooterLink
          href="https://hel.fi/helsinki/fi/kaupunki-ja-hallinto/osallistu-ja-vaikuta/palaute/anna-palautetta"
          label="Anna ja lue palautetta"
        />
        <FooterLink href="https://hel.fi/kanslia/neuvonta-fi" label="Chat-neuvonta" />
      </FooterUtilities>,
      { wrapper: FooterWrapper },
    );
    const element = getByTestId(divProps['data-testid']);
    expect(getElementAttributesMisMatches(element, divProps)).toHaveLength(0);
  });
});
