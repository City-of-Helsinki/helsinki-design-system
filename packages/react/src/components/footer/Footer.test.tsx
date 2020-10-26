import React from 'react';
import { render } from '@testing-library/react';

import { Footer } from './Footer';

describe('<Footer /> spec', () => {
  it('renders the component', () => {
    const { asFragment } = render(<Footer footerAriaLabel="Foo" title="Bar" />);
    expect(asFragment()).toMatchSnapshot();
  });
});
