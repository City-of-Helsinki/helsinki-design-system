import React from 'react';
import { render } from '@testing-library/react';

import { Navigation } from './Navigation';

describe('<Navigation /> spec', () => {
  it('renders the component', () => {
    const { asFragment } = render(
      <Navigation menuToggleAriaLabel="menu" skipTo="#content" skipToContentLabel="Skip to content" title="Foo" />,
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
