import React from 'react';
import { render } from '@testing-library/react';
import { axe } from 'jest-axe';

import { Stepper } from './Stepper';
import { State } from './Step';

describe('<Stepper /> spec', () => {
  let state;

  beforeEach(() => {
    // Need to mock scrollIntoView for jest
    window.HTMLElement.prototype.scrollIntoView = function () {}; // eslint-disable-line
    state = {
      activeStepIndex: 0,
      steps: [
        {
          state: State.available,
          label: 'Step 1',
        },
        {
          state: State.disabled,
          label: 'Step 2',
        },
        {
          state: State.disabled,
          label: 'Step 3',
        },
        {
          state: State.disabled,
          label: 'Step 4 - longer text',
        },
        {
          state: State.disabled,
          label: 'Step 5',
        },
      ],
    };
  });

  it('renders the component', () => {
    const { asFragment } = render(<Stepper steps={state.steps} language="en" selectedStep={state.activeStepIndex} />);
    expect(asFragment()).toMatchSnapshot();
  });

  it('should be able to select available step', () => {
    const { container, rerender } = render(
      <Stepper steps={state.steps} language="en" selectedStep={state.activeStepIndex} />,
    );
    const availableButton = container.querySelector('[data-testid="hds-stepper-step-1"]');
    expect(availableButton).toHaveAttribute('aria-current', 'false');

    rerender(
      <Stepper
        steps={[
          {
            state: State.available,
            label: 'Step 1',
          },
          {
            state: State.available,
            label: 'Step 2',
          },
          {
            state: State.disabled,
            label: 'Step 3',
          },
          {
            state: State.disabled,
            label: 'Step 4 - longer text',
          },
          {
            state: State.disabled,
            label: 'Step 5',
          },
        ]}
        language="en"
        selectedStep={1}
      />,
    );
    expect(availableButton).toHaveAttribute('aria-current', 'step');
  });

  it('should not have basic accessibility issues', async () => {
    const { container } = render(<Stepper language="en" steps={state.steps} selectedStep={state.activeStepIndex} />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
