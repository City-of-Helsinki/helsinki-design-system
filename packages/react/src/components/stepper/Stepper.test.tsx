import React from 'react';
import { render } from '@testing-library/react';
import { axe } from 'jest-axe';

import { Stepper, StepperProps } from './Stepper';

describe('<Stepper /> spec', () => {
  let state;
  let labels;

  beforeEach(() => {
    // Need to mock scrollIntoView for jest
    window.HTMLElement.prototype.scrollIntoView = function () {}; // eslint-disable-line
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
  it('should be able to select available step', () => {
    const { container, rerender } = render(
      <Stepper
        labels={labels}
        language="en"
        states={['available', 'available', 'disabled', 'disabled', 'disabled']}
        selectedStep={state.activeStep}
        stepsTotal={5}
      />,
    );
    const availableButton = container.querySelector('[data-testid="hds-stepper-step-1"]');
    expect(availableButton).toHaveAttribute('aria-current', 'false');

    rerender(
      <Stepper
        labels={labels}
        language="en"
        states={['available', 'available', 'disabled', 'disabled', 'disabled']}
        selectedStep={2}
        stepsTotal={5}
      />,
    );
    expect(availableButton).toHaveAttribute('aria-current', 'step');
  });
  it('should not have basic accessibility issues', async () => {
    const { container } = render(
      <Stepper labels={labels} language="en" states={state.states} selectedStep={state.activeStep} stepsTotal={5} />,
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
