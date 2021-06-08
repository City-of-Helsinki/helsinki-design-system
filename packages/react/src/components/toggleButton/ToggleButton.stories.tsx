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

export const Inline = (args) => <ToggleButton {...args}>ToggleButton</ToggleButton>;

Inline.args = {
  variant: 'inline',
  label: 'Inline',
};

export const InlineWithTooltip = (args) => <ToggleButton {...args}>ToggleButton</ToggleButton>;

InlineWithTooltip.args = {
  variant: 'inline',
  label: 'Allow notifications',
  tooltipLabel: 'What are the notifications?',
  tooltipButtonLabel: 'Open info tooltip',
  tooltipText:
    'When notifications are allowed, the application can use desktop notifications. But this is not mandatory for application to function.',
};

InlineWithTooltip.storyName = 'Inline with tooltip';
