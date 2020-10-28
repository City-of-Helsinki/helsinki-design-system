import React from 'react';
import { render } from '@testing-library/react';

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
});
