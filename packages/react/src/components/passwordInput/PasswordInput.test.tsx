import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
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

  it('should change input type when show password button is clicked', async () => {
    const { container } = render(
      <PasswordInput
        data-test="password-input"
        defaultValue="0451234567"
        helperText="Assistive text"
        id="passwordInputId"
        label="passwordInput label"
        revealPasswordButtonAriaLabel="Show password"
        concealPasswordButtonAriaLabel="Hide password"
      />,
    );
    expect(container.querySelector('[data-test="password-input"]').type).toBe('password');

    await act(async () => {
      const showPasswordButton = screen.getByLabelText('Show password');

      if (!showPasswordButton) {
        throw new Error('showPasswordButton not found');
      }
      await fireEvent.click(showPasswordButton);
    });

    expect(container.querySelector('[data-test="password-input"]').type).toBe('text');

    await act(async () => {
      const hidePasswordButton = screen.getByLabelText('Hide password');

      if (!hidePasswordButton) {
        throw new Error('hidePasswordButton not found');
      }
      await fireEvent.click(hidePasswordButton);
    });

    expect(container.querySelector('[data-test="password-input"]').type).toBe('password');
  });
});
