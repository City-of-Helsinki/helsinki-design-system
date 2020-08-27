import React from 'react';
import { render } from '@testing-library/react';

import { [-replace-name-capital-] } from './[-replace-name-capital-]';

describe('<[-replace-name-capital-] /> spec', () => {
  it('renders the component', () => {
    const { asFragment } = render(<[-replace-name-capital-] />);
    expect(asFragment()).toMatchSnapshot(); 
  });
});
