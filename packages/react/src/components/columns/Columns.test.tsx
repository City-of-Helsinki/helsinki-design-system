import React from 'react';
import { render } from '@testing-library/react';
import { axe } from 'jest-axe';

import { Columns } from './Columns';

describe('<Columns /> spec', () => {
  it('renders the component', () => {
    const { asFragment } = render(<Columns />);
    expect(asFragment()).toMatchSnapshot();
  });
  it('should not have basic accessibility issues', async () => {
    const { container } = render(<Columns />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
