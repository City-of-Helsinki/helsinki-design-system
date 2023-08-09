import React from 'react';
import { render } from '@testing-library/react';
import { axe } from 'jest-axe';

import { Navigation } from './Navigation';
import { Logo } from '../logo';

describe('<Navigation /> spec', () => {
  it('renders the component', () => {
    const { asFragment } = render(
      <Navigation
        menuToggleAriaLabel="menu"
        skipTo="#content"
        skipToContentLabel="Skip to content"
        title="Foo"
        logo={<Logo src="dummySrc" />}
      />,
    );
    expect(asFragment()).toMatchSnapshot();
  });
  it('renders the component with titleUrl', () => {
    const { asFragment } = render(
      <Navigation
        titleUrl="hds.hel.fi"
        menuToggleAriaLabel="menu"
        skipTo="#content"
        skipToContentLabel="Skip to content"
        title="Foo"
        logo={<Logo src="dummySrc" />}
      />,
    );
    expect(asFragment()).toMatchSnapshot();
  });
  it('should not have basic accessibility issues', async () => {
    const { container } = render(
      <Navigation
        menuToggleAriaLabel="menu"
        skipTo="#content"
        skipToContentLabel="Skip to content"
        title="Foo"
        logo={<Logo src="dummySrc" />}
      />,
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
