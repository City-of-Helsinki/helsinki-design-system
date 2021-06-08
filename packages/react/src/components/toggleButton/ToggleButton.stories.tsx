import React from 'react';

import { ToggleButton } from './ToggleButton';

export default {
  component: ToggleButton,
  title: 'Components/ToggleButton',
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
