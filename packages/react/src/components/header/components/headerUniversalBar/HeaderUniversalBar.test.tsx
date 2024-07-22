import React from 'react';
import { render } from '@testing-library/react';
import { axe } from 'jest-axe';

import { HeaderUniversalBar } from './HeaderUniversalBar';
import { Header } from '../../Header';
import { getElementAttributesMisMatches, getCommonElementTestProps } from '../../../../utils/testHelpers';

describe('<HeaderUniversalBar /> spec', () => {
  it('renders the component', () => {
    const { asFragment } = render(
      <Header>
        <HeaderUniversalBar primaryLinkText="hel.fi" primaryLinkHref="#" />
      </Header>,
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('should not have basic accessibility issues', async () => {
    const { container } = render(
      <Header>
        <HeaderUniversalBar primaryLinkText="hel.fi" primaryLinkHref="#" />
      </Header>,
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
  it('native html props are passed to the element', async () => {
    const divProps = getCommonElementTestProps('div');
    divProps.role = 'role';
    // header has "ariaLabel", which should override "aria-label"
    divProps['aria-label'] = 'Real ariaLabel';
    const { getByTestId } = render(
      <Header>
        <HeaderUniversalBar
          {...divProps}
          primaryLinkText="hel.fi"
          primaryLinkHref="#"
          aria-label="Is overridden"
          ariaLabel="Real ariaLabel"
        />
      </Header>,
    );
    const element = getByTestId(divProps['data-testid']);
    expect(getElementAttributesMisMatches(element, divProps)).toHaveLength(0);
  });
});
