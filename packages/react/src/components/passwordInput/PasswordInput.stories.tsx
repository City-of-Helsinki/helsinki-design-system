import React, { useState } from 'react';

import { PasswordInput } from './PasswordInput';
import { Button } from '../button';
import { IconEye, IconEyeCrossed } from '../../icons';
import { useMobile } from '../../hooks/useMobile';

export default {
  component: PasswordInput,
  title: 'Components/PasswordInput',
  decorators: [(storyFn) => <div style={{ maxWidth: '400px' }}>{storyFn()}</div>],
  parameters: {
    controls: { expanded: true },
  },
  args: {},
};

export const Default = (args) => <PasswordInput {...args} />;
Default.args = {
  id: 'Default',
  helperText: 'Assistive text',
  label: 'Label',
  revealPasswordButtonAriaLabel: 'Show password',
  concealPasswordButtonAriaLabel: 'Hide password',
};

export const Disabled = (args) => <PasswordInput {...args} />;
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

export const WithDefaultValue = (args) => <PasswordInput {...args} />;
WithDefaultValue.storyName = 'WithDefaultValue';
WithDefaultValue.args = {
  id: 'WithDefaultValue',
  helperText: 'Assistive text',
  defaultValue: '0451234567',
  label: 'Label for with default value',
  revealPasswordButtonAriaLabel: 'Show password',
  concealPasswordButtonAriaLabel: 'Hide password',
};

export const InitiallyRevealed = (args) => <PasswordInput {...args} />;
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
export const AutoCompleteOn = (args) => <PasswordInput {...args} />;
AutoCompleteOn.storyName = 'Autocomplete on';
AutoCompleteOn.args = {
  id: 'Autocomplete on',
  helperText: 'Assistive text',
  label: 'Label for autocomplete on',
  autoComplete: 'on',
  revealPasswordButtonAriaLabel: 'Show password',
  concealPasswordButtonAriaLabel: 'Hide password',
};

export const Success = (args) => <PasswordInput {...args} />;
Success.storyName = 'Success';
Success.args = {
  id: 'Success',
  helperText: 'Assistive text',
  label: 'Label for success input',
  successText: 'Success text',
  revealPasswordButtonAriaLabel: 'Show password',
  concealPasswordButtonAriaLabel: 'Hide password',
};

export const Invalid = (args) => <PasswordInput {...args} />;
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
  const isMobile = useMobile();
  return (
    <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '300px' : '400px 200px', gap: '20px' }}>
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
