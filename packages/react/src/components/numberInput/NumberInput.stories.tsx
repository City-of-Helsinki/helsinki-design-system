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
  helperText: 'Assistive text',
  label: 'Label',
  minusStepButtonAriaLabel: 'Decrease by one',
  placeholder: 'Placeholder',
  plusStepButtonAriaLabel: 'Increase by one',
  step: 1,
  unit: '€',
};

export const CustomStep = (args) => <NumberInput {...args} />;
CustomStep.storyName = 'With a custom step value';
CustomStep.args = {
  id: 'CustomStep',
  step: 10,
  helperText: 'Assistive text',
  label: 'Label',
  minusStepButtonAriaLabel: 'Decrease by ten',
  plusStepButtonAriaLabel: 'Increase by ten',
  placeholder: 'Placeholder',
  unit: '€',
};

export const WithoutSteps = (args) => <NumberInput {...args} />;
WithoutSteps.storyName = 'Without steps';
WithoutSteps.args = {
  id: 'WithoutSteps',
  helperText: 'Assistive text',
  label: 'Label',
  placeholder: 'Placeholder',
  unit: '€',
};
