import React from 'react';
import { render } from '@testing-library/react';
import { axe } from 'jest-axe';

import { MenuButton } from './MenuButton';

describe('<MenuButton /> spec', () => {
  it('renders the component', () => {
    const { asFragment } = render(
      <MenuButton label="Foo">
        <a href="#foo">Foo</a>
        <a href="#bar">Bar</a>
      </MenuButton>,
    );
    expect(asFragment()).toMatchSnapshot();
  });
  it('should not have basic accessibility issues', async () => {
    const { container } = render(
      <MenuButton label="Foo">
        <a href="#foo">Foo</a>
        <a href="#bar">Bar</a>
      </MenuButton>,
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
