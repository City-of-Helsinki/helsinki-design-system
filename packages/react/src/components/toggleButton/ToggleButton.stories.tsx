import React from 'react';
import { withKnobs } from '@storybook/addon-knobs';

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
    value: false,
    disabled: false,
  },
};

export const Default = (args) => <ToggleButton {...args}>ToggleButton</ToggleButton>;

export const Disabled = (args) => <ToggleButton {...args}>ToggleButton</ToggleButton>;

Disabled.args = {
  disabled: true,
};

export const DisabledSelected = (args) => <ToggleButton {...args}>ToggleButton</ToggleButton>;

DisabledSelected.args = {
  value: true,
  disabled: true,
};

export const WithTooltip = (args) => <ToggleButton {...args}>ToggleButton</ToggleButton>;

WithTooltip.args = {
  label: 'Allow notifications',
  tooltipLabel: 'What are the notifications?',
  tooltipButtonLabel: 'Open info tooltip',
  tooltipText:
    'When notifications are allowed, the application can use desktop notifications. But this is not mandatory for application to function.',
};

WithTooltip.storyName = 'With tooltip';

export const Inline = () => {
  const fields = [
    { label: 'Allow strictly necessary cookies', id: 'allow-necessary' },
    { label: 'Allow functional cookies', id: 'allow-functional' },
    { label: 'Allow marketing cookies', id: 'marketing' },
  ];

  return (
    <>
      {fields.map((field, index) => (
        <div style={{ marginBottom: '1.5rem' }}>
          <ToggleButton id={field.id} label={field.label} variant="inline" value={index === 0} />
        </div>
      ))}
    </>
  );
};

export const InlineWithTooltip = () => {
  const fields = [
    {
      label: 'Allow strictly necessary cookies',
      id: 'allow-necessary',
      tooltipLabel: 'What are the necessary cookies?',
      tooltipButtonLabel: 'Open necessary cookies info tooltip',
      tooltipText: 'Necessary cookies are not mandatory but they ensure that the application will function correctly',
    },
    {
      label: 'Allow functional cookies',
      id: 'allow-functional',
      tooltipLabel: 'What are the functional cookies?',
      tooltipButtonLabel: 'Open functional cookies info tooltip',
      tooltipText: 'Functional cookies are not mandatory but they improve the user experience',
    },
    {
      label: 'Allow marketing cookies',
      id: 'marketing',
      tooltipLabel: 'What are the marketing cookies?',
      tooltipButtonLabel: 'Open marketing cookies info tooltip',
      tooltipText: 'Functional cookies are not mandatory and they are used to target advertisement',
    },
  ];

  return (
    <>
      {fields.map((field, index) => (
        <div style={{ marginBottom: '1.5rem' }}>
          <ToggleButton
            id={field.id}
            label={field.label}
            variant="inline"
            value={index === 0}
            tooltipLabel={field.tooltipLabel}
            tooltipButtonLabel={field.tooltipButtonLabel}
            tooltipText={field.tooltipText}
          />
        </div>
      ))}
    </>
  );
};

InlineWithTooltip.storyName = 'Inline with tooltip';

export const CustomTheme = () => {
  const customThemes = [
    { '--toggle-button-color': '#f10000', '--toggle-button-hover-color': '#690000' },
    { '--toggle-button-color': '#0ba900', '--toggle-button-hover-color': '#076500' },
    { '--toggle-button-color': '#0062b9', '--toggle-button-hover-color': '#004f94' },
  ];

  return (
    <>
      {customThemes.map((theme, index) => (
        <div style={{ marginBottom: '1.5rem' }}>
          <ToggleButton id={`toggle-button-${index}`} label="label" variant="inline" value theme={theme} />
        </div>
      ))}
    </>
  );
};

CustomTheme.storyName = 'Custom theme';
