import React from 'react';
import { render } from '@testing-library/react';

import { Visible } from './Visible';

describe('<Visible /> spec', () => {
  it('renders the component', () => {
    const { asFragment } = render(<Visible below="m">Visible content</Visible>);
    expect(asFragment()).toMatchSnapshot();
  });
});
