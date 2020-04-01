import React from 'react';
import { render } from '@testing-library/react';

import RadioButton from './RadioButton';

describe('<RadioButton /> spec', () => {
  it('renders the component', () => {
    const { asFragment } = render(<RadioButton />);
    expect(asFragment()).toMatchSnapshot();
  });
});
