/* eslint-disable react/forbid-component-props */
import React, { HTMLAttributes } from 'react';
import { render } from '@testing-library/react';
import { axe } from 'jest-axe';

import { Stepper } from './Stepper';
import { StepState } from './Step';
import { getCommonElementTestProps, getElementAttributesMisMatches } from '../../utils/testHelpers';

describe('<Stepper /> spec', () => {
  let state;

  beforeEach(() => {
    // Need to mock scrollIntoView for jest
    window.HTMLElement.prototype.scrollIntoView = function () {}; // eslint-disable-line
    state = {
      activeStepIndex: 0,
      steps: [
        {
          state: StepState.available,
          label: 'Step 1',
        },
        {
          state: StepState.disabled,
          label: 'Step 2',
        },
        {
          state: StepState.disabled,
          label: 'Step 3',
        },
        {
          state: StepState.disabled,
          label: 'Step 4 - longer text',
        },
        {
          state: StepState.disabled,
          label: 'Step 5',
        },
      ],
    };
  });

  it('renders the component', () => {
    const { asFragment } = render(
      <Stepper steps={state.steps} language="en" selectedStep={state.activeStepIndex} data-testid="hds-stepper" />,
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('should be able to select available step', () => {
    const { container, rerender } = render(
      <Stepper steps={state.steps} language="en" selectedStep={state.activeStepIndex} data-testid="hds-stepper" />,
    );
    const availableButton = container.querySelector('[data-testid="hds-stepper-step-1"]');
    expect(availableButton).toHaveAttribute('aria-current', 'false');

    rerender(
      <Stepper
        steps={[
          {
            state: StepState.available,
            label: 'Step 1',
          },
          {
            state: StepState.available,
            label: 'Step 2',
          },
          {
            state: StepState.disabled,
            label: 'Step 3',
          },
          {
            state: StepState.disabled,
            label: 'Step 4 - longer text',
          },
          {
            state: StepState.disabled,
            label: 'Step 5',
          },
        ]}
        language="en"
        selectedStep={1}
        data-testid="hds-stepper"
      />,
    );
    expect(availableButton).toHaveAttribute('aria-current', 'step');
  });

  it('should not have basic accessibility issues', async () => {
    const { container } = render(
      <Stepper language="en" steps={state.steps} selectedStep={state.activeStepIndex} data-testid="hds-stepper" />,
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
  it('native html props are passed to the element', async () => {
    const divProps = getCommonElementTestProps<'div'>('div');
    const { getByTestId } = render(
      <Stepper language="en" steps={state.steps} selectedStep={state.activeStepIndex} {...divProps} />,
    );
    const element = getByTestId(divProps['data-testid']);
    // className is applied to another element
    expect(
      getElementAttributesMisMatches(element, {
        ...divProps,
        className: undefined,
      } as HTMLAttributes<HTMLDivElement>),
    ).toHaveLength(0);
  });
});
