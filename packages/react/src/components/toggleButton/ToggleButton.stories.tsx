import React, { useState } from 'react';
import { boolean, radios, text, withKnobs } from '@storybook/addon-knobs';

import { ToggleButton } from './ToggleButton';

export default {
  component: ToggleButton,
  title: 'Components/ToggleButton',
  decorators: [withKnobs, (storyFn) => <div style={{ maxWidth: '400px' }}>{storyFn()}</div>],
  parameters: {
    controls: { expanded: true },
  },
  args: {
    id: 'toggle-button',
    label: 'Label',
    disabled: false,
    checked: false,
  },
};

export const Default = (args) => {
  const [checked, setChecked] = useState<boolean>(args.checked);
  const [oppositeChecked, setOppositeChecked] = useState<boolean>(!args.checked);
  return (
    <>
      <ToggleButton {...args} label="Label" checked={checked} onChange={() => setChecked(!checked)} />
      <br />
      <ToggleButton
        {...args}
        id={`${args.id}-opposite`}
        label="Label"
        checked={oppositeChecked}
        onChange={() => setOppositeChecked(!oppositeChecked)}
      />
    </>
  );
};

export const Disabled = (args) => {
  const [checked, setChecked] = useState(false);
  const [oppositeChecked, setOppositeChecked] = useState<boolean>(!args.checked);

  return (
    <>
      <ToggleButton {...args} label="Label" checked={checked} onChange={() => setChecked(!checked)} />
      <br />
      <ToggleButton
        {...args}
        id={`${args.id}-opposite`}
        label="Label"
        checked={oppositeChecked}
        onChange={() => setOppositeChecked(!oppositeChecked)}
      />
    </>
  );
};

Disabled.args = {
  disabled: true,
};

export const WithTooltip = (args) => {
  const [checked, setChecked] = useState<boolean>(args.checked);
  return <ToggleButton {...args} checked={checked} onChange={() => setChecked(!checked)} />;
};

WithTooltip.args = {
  label: 'Allow notifications',
  tooltipLabel: 'What are the notifications?',
  tooltipButtonLabel: 'Open info tooltip',
  tooltipText:
    'When notifications are allowed, the application can use desktop notifications. But this is not mandatory for application to function.',
};

WithTooltip.storyName = 'With tooltip';

export const Inline = (args) => {
  const [checked, setChecked] = useState<boolean>(args.checked);
  const [checkedWithTooltip, setCheckedWithTooltip] = useState<boolean>(args.checked);

  return (
    <>
      <ToggleButton
        id={args.id}
        label={args.label}
        variant={args.variant}
        checked={checked}
        onChange={() => setChecked(!checked)}
      />
      <br />
      <ToggleButton
        id={`${args.id}-without-tooltip`}
        label={args.label}
        variant={args.variant}
        checked={checkedWithTooltip}
        onChange={() => setCheckedWithTooltip(!checkedWithTooltip)}
        tooltipText={args.tooltipText}
        tooltipButtonLabel={args.tooltipButtonLabel}
        tooltipLabel={args.tooltipLabel}
      />
    </>
  );
};

Inline.args = {
  variant: 'inline',
  label: 'Allow notifications',
  tooltipLabel: 'What are the notifications?',
  tooltipButtonLabel: 'Open info tooltip',
  tooltipText:
    'When notifications are allowed, the application can use desktop notifications. But this is not mandatory for application to function.',
};

WithTooltip.storyName = 'With tooltip';

export const CustomTheme = (args) => {
  const customThemes = [
    {
      '--toggle-button-color': '#f10000',
      '--toggle-button-hover-color': '#690000',
      state: useState<boolean>(args.checked),
    },
    {
      '--toggle-button-color': '#0ba900',
      '--toggle-button-hover-color': '#076500',
      state: useState<boolean>(args.checked),
    },
    {
      '--toggle-button-color': '#0062b9',
      '--toggle-button-hover-color': '#004f94',
      state: useState<boolean>(args.checked),
    },
  ];

  return (
    <>
      {customThemes.map(({ state, ...theme }, index) => {
        const [checked, setIsChecked] = state;

        return (
          <div style={{ marginBottom: '1.5rem' }}>
            <ToggleButton
              id={`toggle-button-${index}`}
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

export const Playground = () => {
  const id = text('Id', 'toggle-button');
  const label = text('Label', 'Toggle button');
  const tooltipLabel = text('TooltipLabel', 'Tooltip label');
  const tooltipButtonLabel = text('TooltipButtonLabel', 'Tooltip button label');
  const tooltipText = text('TooltipText', 'Tooltip text');
  const variant = radios(
    'Variant',
    {
      default: 'default',
      inline: 'inline',
    },
    'default',
  );

  const value = boolean('Value', true);
  const [checked, setChecked] = useState(value);
  const disabled = boolean('Disabled', false);

  return (
    <ToggleButton
      id={id}
      label={label}
      variant={variant}
      checked={checked}
      onChange={() => setChecked(!checked)}
      disabled={disabled}
      tooltipLabel={tooltipLabel}
      tooltipButtonLabel={tooltipButtonLabel}
      tooltipText={tooltipText}
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
