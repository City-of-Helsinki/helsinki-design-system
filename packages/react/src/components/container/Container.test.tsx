import React from 'react';
import { render } from '@testing-library/react';
import { axe } from 'jest-axe';

import { Container } from './Container';

describe('<Container /> spec', () => {
  it('renders the component', () => {
    const { asFragment } = render(<Container>Foo</Container>);
    expect(asFragment()).toMatchSnapshot();
  });
  it('should not have basic accessibility issues', async () => {
    const { container } = render(<Container>Foo</Container>);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
