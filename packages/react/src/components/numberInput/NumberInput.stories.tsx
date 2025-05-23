import React from 'react';

import { NumberInput, NumberInputProps } from './NumberInput';
import { Tooltip } from '../tooltip';

export default {
  component: NumberInput,
  title: 'Components/NumberInput',
  decorators: [(storyFn) => <div style={{ maxWidth: '300px' }}>{storyFn()}</div>],
  parameters: {
    controls: { expanded: true },
  },
  args: {
    helperText: 'Assistive text',
    label: 'Label',
    minusStepButtonAriaLabel: 'Decrease by one',
    plusStepButtonAriaLabel: 'Increase by one',
    unit: '€',
  },
};

export const Default = (args: NumberInputProps) => <NumberInput {...args} />;
Default.args = {
  id: 'Default',
};

export const WithTooltip = (args: NumberInputProps) => <NumberInput {...args} />;
WithTooltip.args = {
  id: 'WithTooltip',
  tooltip: <Tooltip>This is a tooltip</Tooltip>,
};

export const CustomStep = (args: NumberInputProps) => <NumberInput {...args} />;
CustomStep.storyName = 'With a custom step value';
CustomStep.args = {
  id: 'CustomStep',
  step: 10,
  helperText: 'Assistive text for input with steps of 10',
  label: 'Label for step test',
  minusStepButtonAriaLabel: 'Decrease by ten',
  plusStepButtonAriaLabel: 'Increase by ten',
};

export const Disabled = (args: NumberInputProps) => <NumberInput {...args} />;
Disabled.storyName = 'Disabled';
Disabled.args = {
  id: 'Disabled',
  step: 10,
  label: 'Label for disabled',
  minusStepButtonAriaLabel: 'Decrease by ten',
  plusStepButtonAriaLabel: 'Increase by ten',
  disabled: true,
};

export const WithMinAndMax = (args: NumberInputProps) => <NumberInput {...args} />;
WithMinAndMax.storyName = 'With min and max value';
WithMinAndMax.args = {
  id: 'WithMinAndMax',
  step: 1,
  min: 15,
  max: 40,
  label: 'Label for min 15 max 40',
  minusStepButtonAriaLabel: 'Decrease by one',
  plusStepButtonAriaLabel: 'Increase by one',
};

export const WithDefaultValue = (args: NumberInputProps) => <NumberInput {...args} />;
WithDefaultValue.storyName = 'With a default value';
WithDefaultValue.args = {
  id: 'WithDefaultValue',
  step: 10,
  defaultValue: 20,
  label: 'Label for default 20, step 10',
  minusStepButtonAriaLabel: 'Decrease by ten',
  plusStepButtonAriaLabel: 'Increase by ten',
};

export const Invalid = (args: NumberInputProps) => <NumberInput {...args} />;
Invalid.args = {
  id: 'Invalid',
  invalid: true,
  errorText: 'Invalid value',
};

export const Success = (args: NumberInputProps) => <NumberInput {...args} />;
Success.args = {
  id: 'Success',
  successText: 'Valid value',
};
