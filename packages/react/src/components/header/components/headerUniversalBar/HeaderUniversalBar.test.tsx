import React from 'react';
import { render } from '@testing-library/react';
import { axe } from 'jest-axe';

import { HeaderUniversalBar } from './HeaderUniversalBar';
import { Header } from '../../Header';

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
});
