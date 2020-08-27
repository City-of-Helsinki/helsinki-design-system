import React from 'react';
import { render } from '@testing-library/react';

import { ImageWithCard } from './ImageWithCard';

describe('<ImageWithCard /> spec', () => {
  it('renders the component', () => {
    const { asFragment } = render(<ImageWithCard src="" />);
    expect(asFragment()).toMatchSnapshot();
  });
});
