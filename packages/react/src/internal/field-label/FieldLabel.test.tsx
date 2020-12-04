import React from 'react';
import { render } from '@testing-library/react';
import { axe } from 'jest-axe';

import { FieldLabel } from './FieldLabel';

describe('<FieldLabel /> spec', () => {
  it('renders the component', () => {
    const { asFragment } = render(<FieldLabel inputId="test" label="foo" required />);
    expect(asFragment()).toMatchSnapshot();
  });
  it('should not have basic accessibility issues', async () => {
    const { container } = render(<FieldLabel inputId="test" label="foo" required />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
