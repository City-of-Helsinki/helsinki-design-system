import React from 'react';

import { NumberInput } from './NumberInput';

export default {
  component: NumberInput,
  title: 'Components/NumberInput',
  decorators: [(storyFn) => <div style={{ maxWidth: '300px' }}>{storyFn()}</div>],
  parameters: {
    controls: { expanded: true },
  },
};

export const Default = (args) => <NumberInput {...args} />;
Default.args = {
  id: 'Default',
  helperText: 'Assistive text',
  label: 'Label',
  minusStepButtonAriaLabel: 'Decrease by one',
  plusStepButtonAriaLabel: 'Increase by one',
  unit: '€',
};

export const CustomStep = (args) => <NumberInput {...args} />;
CustomStep.storyName = 'With a custom step value';
CustomStep.args = {
  id: 'CustomStep',
  step: 10,
  helperText: 'Assistive text for input with steps of 10',
  label: 'Label for step test',
  minusStepButtonAriaLabel: 'Decrease by ten',
  plusStepButtonAriaLabel: 'Increase by ten',
  unit: '€',
};

export const Disabled = (args) => <NumberInput {...args} />;
Disabled.storyName = 'Disabled';
Disabled.args = {
  id: 'Disabled',
  step: 10,
  helperText: 'Assistive text',
  label: 'Label for disabled',
  minusStepButtonAriaLabel: 'Decrease by ten',
  plusStepButtonAriaLabel: 'Increase by ten',
  unit: '€',
  disabled: true,
};

export const WithMinAndMax = (args) => <NumberInput {...args} />;
WithMinAndMax.storyName = 'With min and max value';
WithMinAndMax.args = {
  id: 'WithMinAndMax',
  step: 1,
  min: 15,
  max: 40,
  helperText: 'Assistive text',
  label: 'Label for min 15 max 40',
  minusStepButtonAriaLabel: 'Decrease by one',
  plusStepButtonAriaLabel: 'Increase by one',
  unit: '€',
};

export const WithDefaultValue = (args) => <NumberInput {...args} />;
WithDefaultValue.storyName = 'With a default value';
WithDefaultValue.args = {
  id: 'WithDefaultValue',
  step: 10,
  defaultValue: 20,
  helperText: 'Assistive text',
  label: 'Label for default 20, step 10',
  minusStepButtonAriaLabel: 'Decrease by ten',
  plusStepButtonAriaLabel: 'Increase by ten',
  unit: '€',
};
