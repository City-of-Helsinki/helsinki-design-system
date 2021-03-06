import React from 'react';
import { render } from '@testing-library/react';
import { axe } from 'jest-axe';

import { PhoneInput } from './PhoneInput';

describe('<PhoneInput /> spec', () => {
  it('renders the component', () => {
    const { asFragment } = render(<PhoneInput id="phone-input" label="test label" />);
    expect(asFragment()).toMatchSnapshot();
  });
  it('should not have basic accessibility issues', async () => {
    const { container } = render(<PhoneInput id="phone-input" label="test label" />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
