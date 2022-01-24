import React from 'react';
import { render } from '@testing-library/react';
import { axe } from 'jest-axe';

import { Stepper, StepperProps } from './Stepper';

describe('<Stepper /> spec', () => {
  let state;
  let labels;

  beforeEach(() => {
    state = {
      activeStep: 1,
      states: ['available', 'disabled', 'disabled', 'disabled', 'disabled'] as StepperProps['states'],
    };
    labels = ['Step 1', 'Step 2', 'Step 3', 'Step 4 - longer text', 'Step 5'];
  });
  it('renders the component', () => {
    const { asFragment } = render(
      <Stepper labels={labels} language="en" states={state.states} selectedStep={state.activeStep} stepsTotal={5} />,
    );
    expect(asFragment()).toMatchSnapshot();
  });
  it('should not have basic accessibility issues', async () => {
    const { container } = render(
      <Stepper labels={labels} language="en" states={state.states} selectedStep={state.activeStep} stepsTotal={5} />,
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
