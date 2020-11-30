import React from 'react';
import { render } from '@testing-library/react';
import { axe } from 'jest-axe';

import { Card } from './Card';

describe('<Card /> spec', () => {
  it('renders the component', () => {
    const { asFragment } = render(<Card />);
    expect(asFragment()).toMatchSnapshot();
  });
  it('should not have basic accessibility issues', async () => {
    const { container } = render(<Card />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
  it('renders with additional props and children', () => {
    const { asFragment } = render(
      <Card border heading="Foo" text="Bar">
        Baz
      </Card>,
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
