import React from 'react';
import { render } from '@testing-library/react';
import { axe } from 'jest-axe';

import { NumberInput } from './NumberInput';

describe('<NumberInput /> spec', () => {
  it('renders the component', () => {
    const { asFragment } = render(<NumberInput />);
    expect(asFragment()).toMatchSnapshot();
  });
  it('should not have basic accessibility issues', async () => {
    const { container } = render(<NumberInput />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
