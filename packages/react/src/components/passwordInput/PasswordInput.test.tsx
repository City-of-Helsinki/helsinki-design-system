import React from 'react';
import { render } from '@testing-library/react';
import { axe } from 'jest-axe';

import { PasswordInput } from './PasswordInput';

describe('<PasswordInput /> spec', () => {
  it('renders the component', () => {
    const { asFragment } = render(<PasswordInput id="passwordInputId" label="passwordInput label" />);
    expect(asFragment()).toMatchSnapshot();
  });
  it('should not have basic accessibility issues', async () => {
    const { container } = render(<PasswordInput id="passwordInputId" label="passwordInput label" />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
