import React, { useState } from 'react';

import { PasswordInput, PasswordInputProps } from './PasswordInput';
import { Button } from '../button';
import { IconEye, IconEyeCrossed } from '../../icons';

export default {
  component: PasswordInput,
  title: 'Components/PasswordInput',
  decorators: [(storyFn) => <div style={{ maxWidth: '400px' }}>{storyFn()}</div>],
  parameters: {
    controls: { expanded: true },
  },
  args: {},
};

export const Default = (args: PasswordInputProps) => <PasswordInput {...args} />;
Default.args = {
  id: 'Default',
  helperText: 'Assistive text',
  label: 'Label',
  revealPasswordButtonAriaLabel: 'Show password',
  concealPasswordButtonAriaLabel: 'Hide password',
};

export const Disabled = (args: PasswordInputProps) => <PasswordInput {...args} />;
Disabled.storyName = 'Disabled';
Disabled.args = {
  id: 'Disabled',
  helperText: 'Assistive text',
  defaultValue: '0451234567',
  label: 'Label for disabled',
  disabled: true,
  revealPasswordButtonAriaLabel: 'Show password',
  concealPasswordButtonAriaLabel: 'Hide password',
};

export const WithDefaultValue = (args: PasswordInputProps) => <PasswordInput {...args} />;
WithDefaultValue.storyName = 'WithDefaultValue';
WithDefaultValue.args = {
  id: 'WithDefaultValue',
  helperText: 'Assistive text',
  defaultValue: '0451234567',
  label: 'Label for with default value',
  revealPasswordButtonAriaLabel: 'Show password',
  concealPasswordButtonAriaLabel: 'Hide password',
};

export const InitiallyRevealed = (args: PasswordInputProps) => <PasswordInput {...args} />;
InitiallyRevealed.storyName = 'InitiallyRevealed';
InitiallyRevealed.args = {
  id: 'InitiallyRevealed',
  helperText: 'Assistive text',
  defaultValue: '0451234567',
  label: 'Label for initially revealed',
  initiallyRevealed: true,
  revealPasswordButtonAriaLabel: 'Show password',
  concealPasswordButtonAriaLabel: 'Hide password',
};
export const AutoCompleteOn = (args: PasswordInputProps) => <PasswordInput {...args} />;
AutoCompleteOn.storyName = 'Autocomplete on';
AutoCompleteOn.args = {
  id: 'Autocomplete on',
  helperText: 'Assistive text',
  label: 'Label for autocomplete on',
  autoComplete: 'on',
  revealPasswordButtonAriaLabel: 'Show password',
  concealPasswordButtonAriaLabel: 'Hide password',
};

export const Success = (args: PasswordInputProps) => <PasswordInput {...args} />;
Success.storyName = 'Success';
Success.args = {
  id: 'Success',
  helperText: 'Assistive text',
  label: 'Label for success input',
  successText: 'Success text',
  revealPasswordButtonAriaLabel: 'Show password',
  concealPasswordButtonAriaLabel: 'Hide password',
};

export const Invalid = (args: PasswordInputProps) => <PasswordInput {...args} />;
Invalid.storyName = 'Invalid';
Invalid.args = {
  id: 'Error',
  invalid: true,
  helperText: 'Assistive text',
  label: 'Label for invalid input',
  errorText: 'Error text',
  revealPasswordButtonAriaLabel: 'Show password',
  concealPasswordButtonAriaLabel: 'Hide password',
};

export const WithExternalShowPasswordButton = () => {
  const [revealPassword, setRevealPassword] = useState<boolean>(false);
  return (
    <div className="password-input--external-show-password-button">
      <PasswordInput
        label="Label for external show password button"
        id="external-password-button"
        includeShowPasswordButton={false}
        helperText="Assistive text"
        type={revealPassword ? 'text' : 'password'}
      />
      <Button
        variant="supplementary"
        onClick={() => setRevealPassword(!revealPassword)}
        iconLeft={revealPassword ? <IconEyeCrossed aria-hidden /> : <IconEye aria-hidden />}
      >
        {revealPassword ? 'Hide password' : 'Show password'}
      </Button>
    </div>
  );
};

WithExternalShowPasswordButton.storyName = 'With external show password button';
