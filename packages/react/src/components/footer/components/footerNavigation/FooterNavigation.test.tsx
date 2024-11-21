import React from 'react';
import { render } from '@testing-library/react';
import { axe } from 'jest-axe';

import { FooterNavigation } from './FooterNavigation';
import { FooterWrapper } from '../../../../utils/test-utils';
import { Footer } from '../../Footer';
import { getCommonElementTestProps, getElementAttributesMisMatches } from '../../../../utils/testHelpers';

describe('<Footer.Navigation /> spec', () => {
  it('renders the component', () => {
    const { asFragment } = render(
      <FooterNavigation>
        <Footer.Link label="Link 1" />
        <Footer.Link label="Link 2" />
        <Footer.Link label="Link 3" />
      </FooterNavigation>,
      { wrapper: FooterWrapper },
    );
    expect(asFragment()).toMatchSnapshot();
  });
  it('should not have basic accessibility issues', async () => {
    const { container } = render(
      <FooterNavigation>
        <Footer.Link label="Link 1" />
        <Footer.Link label="Link 2" />
        <Footer.Link label="Link 3" />
      </FooterNavigation>,
      { wrapper: FooterWrapper },
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
  it('native html props are passed to the element', async () => {
    const divProps = getCommonElementTestProps('div');
    divProps.role = 'role';
    const { getByTestId } = render(
      <FooterNavigation {...divProps}>
        <Footer.Link label="Link 1" />
        <Footer.Link label="Link 2" />
        <Footer.Link label="Link 3" />
      </FooterNavigation>,
      { wrapper: FooterWrapper },
    );
    const element = getByTestId(divProps['data-testid']);
    expect(getElementAttributesMisMatches(element, divProps)).toHaveLength(0);
  });
});
