import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';

import { Tooltip } from './Tooltip';

describe('<TooltipNew /> spec', () => {
  it('renders the component', () => {
    const { asFragment } = render(<Tooltip />);
    expect(asFragment()).toMatchSnapshot();
  });
  it('opens the tooltip when button is clicked', async () => {
    const { asFragment, getByRole } = render(<Tooltip />);
    fireEvent.click(getByRole('button'));
    waitFor(() => getByRole('section'));
    expect(asFragment()).toMatchSnapshot();
  });
});
