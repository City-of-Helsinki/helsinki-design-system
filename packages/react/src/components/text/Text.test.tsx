import React from 'react';
import { render } from '@testing-library/react';

import Text from './Text';

describe('<Text /> spec', () => {
  it('renders the component', () => {
    const { asFragment } = render(<Text />);
    expect(asFragment()).toMatchSnapshot();
  });
});
