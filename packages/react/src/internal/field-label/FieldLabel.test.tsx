import React from 'react';
import { render } from '@testing-library/react';

import { FieldLabel } from './FieldLabel';

describe('<FieldLabel /> spec', () => {
  it('renders the component', () => {
    const { asFragment } = render(<FieldLabel inputId="test" label="foo" required />);
    expect(asFragment()).toMatchSnapshot();
  });
});
