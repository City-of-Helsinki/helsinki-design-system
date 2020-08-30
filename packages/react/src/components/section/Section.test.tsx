import React from 'react';
import { render } from '@testing-library/react';

import { Section } from './Section';

describe('<Section /> spec', () => {
  it('renders the component', () => {
    const { asFragment } = render(<Section />);
    expect(asFragment()).toMatchSnapshot();
  });
});
