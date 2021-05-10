import React from 'react';
import { render } from '@testing-library/react';
import { axe } from 'jest-axe';

import { PasswordInput } from './PasswordInput';

describe('<PasswordInput /> spec', () => {
  it('renders the component', () => {
    const { asFragment } = render(
      <PasswordInput
        defaultValue="0451234567"
        helperText="Assistive text"
        id="passwordInputId"
        label="passwordInput label"
        revealPasswordButtonAriaLabel="Show password"
        concealPasswordButtonAriaLabel="Hide password"
      />,
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('should not have basic accessibility issues', async () => {
    const { container } = render(
      <PasswordInput
        defaultValue="0451234567"
        helperText="Assistive text"
        id="passwordInputId"
        label="passwordInput label"
        revealPasswordButtonAriaLabel="Show password"
        concealPasswordButtonAriaLabel="Hide password"
      />,
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
