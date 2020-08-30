import React from 'react';
import { render } from '@testing-library/react';

import { Navigation } from './Navigation';

describe('<Navigation /> spec', () => {
  it('renders the component', () => {
    const { asFragment } = render(
      <Navigation
        menuCloseAriaLabel="close"
        menuOpenAriaLabel="open"
        skipTo="#content"
        skipToContentLabel="Skip to content"
        title="Foo"
      />,
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
