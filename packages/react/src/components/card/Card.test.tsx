import React from 'react';
import { render } from '@testing-library/react';

import Card from './Card';

describe('<Card /> spec', () => {
  it('renders the component', () => {
    const { asFragment } = render(<Card />);
    expect(asFragment()).toMatchSnapshot();
  });
});
