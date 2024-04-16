import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';
import { axe } from 'jest-axe';

import { PasswordInput, PasswordInputProps } from './PasswordInput';

describe('<PasswordInput /> spec', () => {
  const defaultInputProps: PasswordInputProps = {
    defaultValue: '0451234567',
    helperText: 'Assistive text',
    id: 'passwordInputId',
    label: 'passwordInput label',
    revealPasswordButtonAriaLabel: 'Show password',
    concealPasswordButtonAriaLabel: 'Hide password',
  };

  const getInputElement = (container: HTMLElement) => {
    return container.querySelector('[data-test="password-input"]') as Element;
  };

  it('renders the component', () => {
    const { asFragment } = render(<PasswordInput {...defaultInputProps} />);
    expect(asFragment()).toMatchSnapshot();
  });

  it('should not have basic accessibility issues', async () => {
    const { container } = render(<PasswordInput {...defaultInputProps} />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('should change input type when show password button is clicked', async () => {
    const { container } = render(<PasswordInput {...defaultInputProps} data-test="password-input" />);

    expect(getInputElement(container).getAttribute('type')).toBe('password');

    await act(async () => {
      userEvent.click(screen.getByLabelText('Show password'));
    });

    expect(getInputElement(container).getAttribute('type')).toBe('text');

    await act(async () => {
      userEvent.click(screen.getByLabelText('Hide password'));
    });

    expect(getInputElement(container).getAttribute('type')).toBe('password');
  });
});
