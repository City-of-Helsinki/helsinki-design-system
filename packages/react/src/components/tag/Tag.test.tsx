import React from 'react';
import { render } from '@testing-library/react';

import { Tag } from './Tag';

describe('<Tag /> spec', () => {
  it('renders the component', () => {
    const { asFragment } = render(<Tag label="Foo" />);
    expect(asFragment()).toMatchSnapshot();
  });
});
