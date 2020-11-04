import React from 'react';
import { render } from '@testing-library/react';

import { Container } from './Container';

describe('<Container /> spec', () => {
  it('renders the component', () => {
    const { asFragment } = render(<Container>Foo</Container>);
    expect(asFragment()).toMatchSnapshot();
  });
});
