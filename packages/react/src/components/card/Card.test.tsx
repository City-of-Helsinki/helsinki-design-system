import React from 'react';
import { render } from '@testing-library/react';

import { Card } from './Card';

describe('<Card /> spec', () => {
  it('renders the component', () => {
    const { asFragment } = render(<Card />);
    expect(asFragment()).toMatchSnapshot();
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
