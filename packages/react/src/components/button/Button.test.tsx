import React from 'react';
import { render } from '@testing-library/react';

import { Button } from './Button';

describe('<Button /> spec', () => {
  it('renders the component', () => {
    const { asFragment } = render(<Button>My Button</Button>);
    expect(asFragment()).toMatchSnapshot();
  });
});
