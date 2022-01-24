import React, { useReducer } from 'react';

import { Stepper } from './Stepper';
import styles from './Stepper.module.scss';
import { Step } from './Step';
import { Button } from '../button';

export default {
  component: Stepper,
  title: 'Components/Stepper',
  decorators: [(storyFn) => <div style={{ maxWidth: '700px' }}>{storyFn()}</div>],
  parameters: {
    controls: { expanded: true },
  },
  args: {},
};

const commonReducer = (stepsTotal) => (state, action) => {
  switch (action.type) {
    case 'completeStep': {
      const activeStep = action.payload === stepsTotal ? stepsTotal : action.payload + 1;
      return {
        activeStep,
        states: state.states.map((stateName, index) => {
          if (index === action.payload - 1 && index !== stepsTotal - 1) {
            // current one but not last one
            return 'filled';
          }
          if (index === action.payload) {
            // next one
            return 'available';
          }
          return stateName;
        }),
      };
    }
    case 'setActive': {
      return {
        activeStep: action.payload,
        states: state.states.map((stateName, index) => {
          if (index === action.payload - 1) {
            return 'available';
          }
          return stateName;
        }),
      };
    }
    default:
      throw new Error();
  }
};

export const Default = (args) => {
  const reducer = commonReducer(5);

  const initialState = {
    activeStep: 1,
    states: ['available', 'disabled', 'disabled', 'disabled', 'disabled'],
  };

  const labels = ['Step 1', 'Step 2', 'Step 3', 'Step 4 - longer text', 'Step 5'];

  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <div>
      <Stepper
        labels={labels}
        language="en"
        states={state.states}
        selectedStep={state.activeStep}
        stepsTotal={5}
        onStepClick={(event, number) => dispatch({ type: 'setActive', payload: number })}
      />

      <div style={{ height: '300px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <Button
          onClick={() => dispatch({ type: 'completeStep', payload: state.activeStep })}
          style={{ height: 'fit-content', width: 'fit-content' }}
        >
          Complete step {state.activeStep}
        </Button>
      </div>
    </div>
  );
};

export const Small = (args) => {
  const reducer = commonReducer(5);

  const initialState = {
    activeStep: 1,
    states: ['available', 'disabled', 'disabled', 'disabled', 'disabled'],
  };
  const labels = ['Step 1', 'Step 2', 'Step 3', 'Step 4 - longer text', 'Step 5'];

  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <div style={{ maxWidth: '300px' }}>
      <Stepper
        labels={labels}
        language="en"
        small
        states={state.states}
        selectedStep={state.activeStep}
        stepsTotal={5}
        onStepClick={(event, number) => dispatch({ type: 'setActive', payload: number })}
      />

      <div style={{ height: '300px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <Button
          onClick={() => dispatch({ type: 'completeStep', payload: state.activeStep })}
          style={{ height: 'fit-content', width: 'fit-content' }}
        >
          Complete step {state.activeStep}
        </Button>
      </div>
    </div>
  );
};

export const WithStepHeading = (args) => {
  const reducer = commonReducer(5);

  const initialState = {
    activeStep: 1,
    states: ['available', 'disabled', 'disabled', 'disabled', 'disabled'],
  };
  const labels = ['Step 1 - longer text', 'Step 2', 'Step 3', 'Step 4', 'Step 5'];

  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <div>
      <Stepper
        labels={labels}
        language="en"
        stepHeading
        states={state.states}
        selectedStep={state.activeStep}
        stepsTotal={5}
        onStepClick={(event, number) => dispatch({ type: 'setActive', payload: number })}
      />

      <div style={{ height: '300px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <Button
          onClick={() => dispatch({ type: 'completeStep', payload: state.activeStep })}
          style={{ height: 'fit-content', width: 'fit-content' }}
        >
          Complete step {state.activeStep}
        </Button>
      </div>
    </div>
  );
};

export const Overflow = (args) => {
  const reducer = commonReducer(12);

  const initialState = {
    activeStep: 1,
    states: [
      'available',
      'disabled',
      'disabled',
      'disabled',
      'disabled',
      'disabled',
      'disabled',
      'disabled',
      'disabled',
      'disabled',
      'disabled',
      'disabled',
    ],
  };
  const labels = [
    'Step 1 - longer text',
    'Step 2',
    'Step 3',
    'Step 4',
    'Step 5',
    'Step 6',
    'Step 7',
    'Step 8',
    'Step 9',
    'Step 10',
    'Step 11',
    'Step 12',
  ];

  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <div style={{ maxWidth: '400px' }}>
      <Stepper
        labels={labels}
        language="en"
        states={state.states}
        selectedStep={state.activeStep}
        stepsTotal={12}
        onStepClick={(event, number) => dispatch({ type: 'setActive', payload: number })}
      />

      <div style={{ height: '300px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <Button
          onClick={() => dispatch({ type: 'completeStep', payload: state.activeStep })}
          style={{ height: 'fit-content', width: 'fit-content' }}
        >
          Complete step {state.activeStep}
        </Button>
      </div>
    </div>
  );
};

export const States = (args) => {
  return (
    <div className={styles.stepperContainer}>
      <div
        className={styles.stepper}
        style={{
          display: 'grid',
          columnGap: '10px !important',
          gap: '32px',
          justifyItems: 'center',
          gridTemplateColumns: '1fr 1fr 1fr 1fr',
        }}
      >
        <Step label="Available" language="en" number={1} stepsTotal={9} state="available" />
        <Step label="Selected" language="en" number={2} stepsTotal={9} selected state="available" />
        <Step label="Filled" language="en" number={3} stepsTotal={9} state="filled" />
        <Step label="Disabled" language="en" number={4} stepsTotal={9} state="disabled" />
        <Step label="Needs attention" language="en" number={5} stepsTotal={9} state="attention" />
        <Step label="Attention + selected" language="en" selected number={6} stepsTotal={9} state="attention" />
        <Step label="Paused" language="en" number={7} stepsTotal={9} state="paused" />
        <Step label="Paused + selected" language="en" selected number={8} stepsTotal={9} state="paused" />
        <div className={styles.step}>
          <p>Small variant:</p>
          <Step
            label="Available"
            language="en"
            number={9}
            stepsTotal={9}
            small
            state="available"
            style={{ justifySelf: 'center' }}
          />
        </div>
      </div>
    </div>
  );
};
