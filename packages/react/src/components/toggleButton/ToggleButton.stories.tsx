import React, { useState } from 'react';

import { ToggleButton, ToggleButtonProps } from './ToggleButton';

export default {
  component: ToggleButton,
  title: 'Components/ToggleButton',
  decorators: [(storyFn) => <div style={{ maxWidth: '400px' }}>{storyFn()}</div>],
  parameters: {
    controls: { expanded: true },
  },
  args: {
    id: 'toggle-button',
    disabled: false,
    checked: false,
  },
};

export const Default = (args: ToggleButtonProps) => {
  const [checked, setChecked] = useState<boolean>(args.checked);
  const [oppositeChecked, setOppositeChecked] = useState<boolean>(!args.checked);
  return (
    <>
      <ToggleButton {...args} label="Allow notifications" checked={checked} onChange={() => setChecked(!checked)} />
      <br />
      <ToggleButton
        {...args}
        id={`${args.id}-opposite`}
        label="Allow desktop notifications"
        checked={oppositeChecked}
        onChange={() => setOppositeChecked(!oppositeChecked)}
      />
    </>
  );
};

export const Disabled = (args: ToggleButtonProps) => {
  const [checked, setChecked] = useState(false);
  const [oppositeChecked, setOppositeChecked] = useState<boolean>(!args.checked);

  return (
    <>
      <ToggleButton {...args} label="Allow notifications" checked={checked} onChange={() => setChecked(!checked)} />
      <br />
      <ToggleButton
        {...args}
        id={`${args.id}-opposite`}
        label="Allow desktop notifications"
        checked={oppositeChecked}
        onChange={() => setOppositeChecked(!oppositeChecked)}
      />
    </>
  );
};

Disabled.args = {
  disabled: true,
};

export const WithTooltip = (args: ToggleButtonProps) => {
  const [checked, setChecked] = useState<boolean>(args.checked);
  return <ToggleButton {...args} label="Allow notifications" checked={checked} onChange={() => setChecked(!checked)} />;
};

WithTooltip.args = {
  tooltipLabel: 'What are the notifications?',
  tooltipButtonLabel: 'Open info tooltip',
  tooltipText:
    'When notifications are allowed, the application can use desktop notifications. But this is not mandatory for application to function.',
};

WithTooltip.storyName = 'With tooltip';

export const Inline = (args: ToggleButtonProps) => {
  const [checked, setChecked] = useState<boolean>(args.checked);
  const [checkedWithTooltip, setCheckedWithTooltip] = useState<boolean>(args.checked);

  return (
    <>
      <ToggleButton
        id={args.id}
        label="Allow notifications"
        checked={checked}
        onChange={() => setChecked(!checked)}
        variant={args.variant}
      />
      <br />
      <ToggleButton
        id={`${args.id}-without-tooltip`}
        label="Allow desktop notifications"
        checked={checkedWithTooltip}
        onChange={() => setCheckedWithTooltip(!checkedWithTooltip)}
        variant={args.variant}
        tooltipText={args.tooltipText}
        tooltipButtonLabel={args.tooltipButtonLabel}
        tooltipLabel={args.tooltipLabel}
      />
    </>
  );
};

Inline.args = {
  variant: 'inline',
  tooltipLabel: 'What are the notifications?',
  tooltipButtonLabel: 'Open info tooltip',
  tooltipText:
    'When notifications are allowed, the application can use desktop notifications. But this is not mandatory for application to function.',
};

WithTooltip.storyName = 'With tooltip';

export const CustomTheme = (args: ToggleButtonProps) => {
  const customThemes = [
    {
      id: 'error',
      '--toggle-button-color': 'var(--color-brick)',
      '--toggle-button-hover-color': 'var(--color-brick-dark)',
      state: useState<boolean>(args.checked),
    },
    {
      id: 'success',
      '--toggle-button-color': 'var(--color-tram)',
      '--toggle-button-hover-color': 'var(--color-tram-dark)',
      state: useState<boolean>(args.checked),
    },
    {
      id: 'primary',
      '--toggle-button-color': 'var(--color-coat-of-arms)',
      '--toggle-button-hover-color': 'var(--color-coat-of-arms-dark)',
      state: useState<boolean>(args.checked),
    },
  ];

  return (
    <>
      {customThemes.map(({ id, state, ...theme }) => {
        const [checked, setIsChecked] = state;

        return (
          <div key={`toggle-button-${id}-container`} style={{ marginBottom: '1.5rem' }}>
            <ToggleButton
              id={`toggle-button-${id}`}
              label="label"
              checked={checked}
              onChange={() => setIsChecked(!checked)}
              variant={args.variant}
              theme={theme}
            />
          </div>
        );
      })}
    </>
  );
};
CustomTheme.args = {
  checked: true,
  variant: 'default',
};

CustomTheme.storyName = 'Custom theme';

export const Playground = (args: ToggleButtonProps) => {
  const [checked, setChecked] = useState(!!args.value);

  return (
    <ToggleButton
      id={args.id}
      label={args.label}
      checked={checked}
      onChange={() => setChecked(!checked)}
      disabled={args.disabled}
      tooltipLabel={args.tooltipLabel}
      tooltipButtonLabel={args.tooltipButtonLabel}
      tooltipText={args.tooltipText}
      variant={args.variant}
    />
  );
};
Playground.parameters = {
  previewTabs: {
    'storybook/docs/panel': {
      hidden: true,
    },
  },
  docs: {
    disable: true,
  },
  loki: { skip: true },
};

Playground.args = {
  id: 'toggle-button',
  label: 'Toggle button',
  tooltipLabel: 'Tooltip label',
  tooltipButtonLabel: 'Tooltip button label',
  tooltipText: 'Tooltip text',
  variant: 'default',
  disabled: false,
};

Playground.argTypes = {
  variant: {
    options: ['default', 'inline'],
    control: { type: 'radio' },
  },
};
