import React from 'react';
import { render } from '@testing-library/react';
import { axe } from 'jest-axe';

import { HeaderActionBar } from './HeaderActionBar';
import { Header } from '../../Header';

describe('<HeaderUniversalBar /> spec', () => {
  it('renders the component', () => {
    const { asFragment } = render(
      <Header>
        <HeaderActionBar title="Test" />
      </Header>,
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('should not have basic accessibility issues', async () => {
    const { container } = render(
      <Header>
        <HeaderActionBar title="Test" />
      </Header>,
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
