import React, { useReducer } from 'react';

import { Stepper } from './Stepper';
import styles from './Stepper.module.scss';
import { Step, State as StepState } from './Step';
import { Button } from '../button';
import { IconArrowLeft, IconArrowRight } from '../../icons';
import { TextInput } from '../textInput';
import { NumberInput } from '../numberInput';
import { Card } from '../card';
import { ErrorSummary } from '../errorSummary';

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
      const activeStepIndex = action.payload === stepsTotal - 1 ? stepsTotal - 1 : action.payload + 1;
      return {
        activeStepIndex,
        states: state.states.map((stateName, index) => {
          if (index === action.payload && index !== stepsTotal - 1) {
            // current one but not last one
            return StepState.completed;
          }
          if (index === action.payload + 1) {
            // next one
            return StepState.available;
          }
          return stateName;
        }),
      };
    }
    case 'setActive': {
      return {
        activeStepIndex: action.payload,
        states: state.states.map((stateName, index) => {
          if (index === action.payload) {
            return StepState.available;
          }
          return stateName;
        }),
      };
    }
    default:
      throw new Error();
  }
};

// args is required for docs tab to show source code
// eslint-disable-next-line no-unused-vars,@typescript-eslint/no-unused-vars
export const Default = (args) => {
  const reducer = commonReducer(5);

  const initialState = {
    activeStepIndex: 0,
    states: [StepState.available, StepState.disabled, StepState.disabled, StepState.disabled, StepState.disabled],
  };

  const labels = ['Step 1', 'Step 2', 'Step 3', 'Step 4 - longer text', 'Step 5'];

  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <div>
      <Stepper
        className="stepper-margin"
        labels={labels}
        language="en"
        states={state.states}
        selectedStep={state.activeStepIndex}
        stepsTotal={5}
        onStepClick={(event, stepIndex) => dispatch({ type: 'setActive', payload: stepIndex })}
      />

      <div
        style={{
          height: '300px',
          display: 'flex',
          justifyContent: 'flex-start',
          alignItems: 'flex-end',
          gap: '24px',
        }}
      >
        <Button
          disabled={state.activeStepIndex === 0}
          variant="secondary"
          onClick={() => dispatch({ type: 'setActive', payload: state.activeStepIndex - 1 })}
          style={{ height: 'fit-content', width: 'fit-content' }}
          iconLeft={<IconArrowLeft />}
        >
          Previous
        </Button>
        <Button
          onClick={() => dispatch({ type: 'completeStep', payload: state.activeStepIndex })}
          style={{ height: 'fit-content', width: 'fit-content' }}
          iconRight={<IconArrowRight />}
        >
          {state.activeStepIndex === 4 ? 'Send' : 'Next'}
        </Button>
      </div>
    </div>
  );
};

// args is required for docs tab to show source code
// eslint-disable-next-line no-unused-vars,@typescript-eslint/no-unused-vars
export const Small = (args) => {
  const reducer = commonReducer(5);

  const initialState = {
    activeStepIndex: 0,
    states: [StepState.available, StepState.disabled, StepState.disabled, StepState.disabled, StepState.disabled],
  };
  const labels = ['Step 1', 'Step 2', 'Step 3', 'Step 4 - longer text', 'Step 5'];

  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <div className="stepper-small">
      <Stepper
        labels={labels}
        language="en"
        small
        states={state.states}
        selectedStep={state.activeStepIndex}
        stepsTotal={5}
        onStepClick={(event, stepIndex) => dispatch({ type: 'setActive', payload: stepIndex })}
      />

      <div
        style={{
          height: '300px',
          display: 'flex',
          justifyContent: 'flex-start',
          alignItems: 'flex-end',
          gap: '24px',
        }}
      >
        <Button
          disabled={state.activeStepIndex === 0}
          variant="secondary"
          onClick={() => dispatch({ type: 'setActive', payload: state.activeStepIndex - 1 })}
          style={{ height: 'fit-content', width: 'fit-content' }}
          iconLeft={<IconArrowLeft />}
        >
          Previous
        </Button>
        <Button
          onClick={() => dispatch({ type: 'completeStep', payload: state.activeStepIndex })}
          style={{ height: 'fit-content', width: 'fit-content' }}
          iconRight={<IconArrowRight />}
        >
          {state.activeStepIndex === 4 ? 'Send' : 'Next'}
        </Button>
      </div>
    </div>
  );
};

// args is required for docs tab to show source code
// eslint-disable-next-line no-unused-vars,@typescript-eslint/no-unused-vars
export const WithStepHeading = (args) => {
  const reducer = commonReducer(5);

  const initialState = {
    activeStepIndex: 0,
    states: [StepState.available, StepState.disabled, StepState.disabled, StepState.disabled, StepState.disabled],
  };
  const labels = ['Step 1 - longer text', 'Step 2', 'Step 3', 'Step 4', 'Step 5'];

  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <div>
      <Stepper
        headingClassName="stepper-heading"
        labels={labels}
        language="en"
        stepHeading
        states={state.states}
        selectedStep={state.activeStepIndex}
        stepsTotal={5}
        onStepClick={(event, stepIndex) => dispatch({ type: 'setActive', payload: stepIndex })}
      />

      <div
        style={{
          height: '300px',
          display: 'flex',
          justifyContent: 'flex-start',
          alignItems: 'flex-end',
          gap: '24px',
          marginLeft: '10px',
        }}
      >
        <Button
          disabled={state.activeStepIndex === 0}
          variant="secondary"
          onClick={() => dispatch({ type: 'setActive', payload: state.activeStepIndex - 1 })}
          style={{ height: 'fit-content', width: 'fit-content' }}
          iconLeft={<IconArrowLeft />}
        >
          Previous
        </Button>
        <Button
          onClick={() => dispatch({ type: 'completeStep', payload: state.activeStepIndex })}
          style={{ height: 'fit-content', width: 'fit-content' }}
          iconRight={<IconArrowRight />}
        >
          {state.activeStepIndex === 4 ? 'Send' : 'Next'}
        </Button>
      </div>
    </div>
  );
};

// args is required for docs tab to show source code
// eslint-disable-next-line no-unused-vars,@typescript-eslint/no-unused-vars
export const Overflow = (args) => {
  const reducer = commonReducer(12);

  const initialState = {
    activeStepIndex: 0,
    states: [
      StepState.available,
      StepState.disabled,
      StepState.disabled,
      StepState.disabled,
      StepState.disabled,
      StepState.disabled,
      StepState.disabled,
      StepState.disabled,
      StepState.disabled,
      StepState.disabled,
      StepState.disabled,
      StepState.disabled,
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
        selectedStep={state.activeStepIndex}
        stepsTotal={12}
        onStepClick={(event, stepIndex) => dispatch({ type: 'setActive', payload: stepIndex })}
      />
      <div
        style={{
          height: '300px',
          display: 'flex',
          justifyContent: 'flex-start',
          alignItems: 'flex-end',
          gap: '24px',
          marginLeft: '10px',
        }}
      >
        <Button
          disabled={state.activeStepIndex === 0}
          variant="secondary"
          onClick={() => dispatch({ type: 'setActive', payload: state.activeStepIndex - 1 })}
          style={{ height: 'fit-content', width: 'fit-content' }}
          iconLeft={<IconArrowLeft />}
        >
          Previous
        </Button>
        <Button
          onClick={() => dispatch({ type: 'completeStep', payload: state.activeStepIndex })}
          style={{ height: 'fit-content', width: 'fit-content' }}
          iconRight={<IconArrowRight />}
        >
          {state.activeStepIndex === 11 ? 'Send' : 'Next'}
        </Button>
      </div>
    </div>
  );
};

// args is required for docs tab to show source code
// eslint-disable-next-line no-unused-vars,@typescript-eslint/no-unused-vars
export const WithCustomTheme = (args) => {
  const reducer = commonReducer(4);

  const initialState = {
    activeStepIndex: 0,
    states: [StepState.available, StepState.disabled, StepState.disabled, StepState.disabled, StepState.disabled],
  };

  const labels = ['Step 1 - longer text', 'Step 2', 'Step 3', 'Step 4', 'Step 5'];

  const [state, dispatch] = useReducer(reducer, initialState);

  const theme = {
    '--hds-stepper-color': 'var(--color-tram)',
    '--hds-step-content-color': 'var(--color-tram)',
  };

  return (
    <div>
      <Stepper
        theme={theme}
        labels={labels}
        language="en"
        states={state.states}
        selectedStep={state.activeStepIndex}
        stepsTotal={5}
        onStepClick={(event, stepIndex) => dispatch({ type: 'setActive', payload: stepIndex })}
      />
      <div
        style={{
          height: '300px',
          display: 'flex',
          justifyContent: 'flex-start',
          alignItems: 'flex-end',
          gap: '24px',
          marginLeft: '10px',
        }}
      >
        <Button
          className="stepper-custom-secondary-button"
          disabled={state.activeStepIndex === 0}
          variant="secondary"
          onClick={() => dispatch({ type: 'setActive', payload: state.activeStepIndex - 1 })}
          style={{ height: 'fit-content', width: 'fit-content' }}
          iconLeft={<IconArrowLeft />}
        >
          Previous
        </Button>
        <Button
          className="stepper-custom-primary-button"
          onClick={() => dispatch({ type: 'completeStep', payload: state.activeStepIndex })}
          style={{ height: 'fit-content', width: 'fit-content' }}
          iconRight={<IconArrowRight />}
        >
          {state.activeStepIndex === 4 ? 'Send' : 'Next'}
        </Button>
      </div>
    </div>
  );
};

// args is required for docs tab to show source code
// eslint-disable-next-line no-unused-vars,@typescript-eslint/no-unused-vars
export const SimpleFormExample = (args) => {
  const activeStepIsValid = (state) => {
    if (state.activeStepIndex === 0) {
      // first name
      return state.fields.firstName.value && state.fields.firstName.value.length > 0;
    }
    if (state.activeStepIndex === 1) {
      // last name
      return state.fields.lastName.value && state.fields.lastName.value.length > 0;
    }

    if (state.activeStepIndex === 2) {
      // age
      return state.fields.age.value && state.fields.age.value.length > 0;
    }

    return state.activeStepIndex === 3;
  };

  const weAreInLastAvailableStep = (state) => {
    let indexOfLastNonDisabledStep = 0;
    state.states.forEach((st, index) => {
      if (st !== StepState.disabled && index > indexOfLastNonDisabledStep) {
        indexOfLastNonDisabledStep = index;
      }
    });

    return state.activeStepIndex === indexOfLastNonDisabledStep;
  };

  const reducer = (state, action) => {
    switch (action.type) {
      case 'changeField': {
        if (action.newValue.length === 0) {
          return {
            showErrorSummary: state.showErrorSummary,
            activeStepIndex: state.activeStepIndex,
            states: state.states,
            fields: {
              ...state.fields,
              [action.fieldName]: {
                value: action.newValue,
                visited: true,
              },
            },
          };
        }

        return {
          showErrorSummary: false,
          activeStepIndex: state.activeStepIndex,
          states: state.states.map((stateName, index) => {
            if (index === state.activeStepIndex) {
              return StepState.completed;
            }
            return stateName;
          }),
          fields: {
            ...state.fields,
            [action.fieldName]: {
              value: action.newValue,
              visited: true,
            },
          },
        };
      }
      case 'completeStep': {
        if (!activeStepIsValid(state)) {
          return {
            showErrorSummary: true,
            activeStepIndex: state.activeStepIndex,
            states: state.states,
            fields: {
              ...state.fields,
            },
          };
        }
        const activeStepIndex = action.payload === 3 ? 3 : action.payload + 1;
        return {
          showErrorSummary: state.showErrorSummary,
          activeStepIndex,
          states: state.states.map((stateName, index) => {
            if (index === action.payload && index !== 3) {
              // current one but not last one
              return StepState.completed;
            }
            if (index === action.payload + 1) {
              // next one
              return StepState.available;
            }
            return stateName;
          }),
          fields: {
            ...state.fields,
          },
        };
      }
      case 'setActive': {
        if (!activeStepIsValid(state) && !weAreInLastAvailableStep(state)) {
          return {
            showErrorSummary: true,
            activeStepIndex: state.activeStepIndex,
            states: state.states,
            fields: {
              ...state.fields,
            },
          };
        }

        return {
          showErrorSummary: state.showErrorSummary,
          activeStepIndex: action.payload,
          states: state.states.map((stateName, index) => {
            if (index === action.payload) {
              return StepState.available;
            }
            if (index === state.activeStepIndex && activeStepIsValid(state)) {
              return StepState.completed;
            }
            return stateName;
          }),
          fields: {
            ...state.fields,
          },
        };
      }
      default:
        throw new Error();
    }
  };

  const initialState = {
    showErrorSummary: false,
    activeStepIndex: 0,
    states: [StepState.available, StepState.disabled, StepState.disabled, StepState.disabled],
    fields: {
      firstName: {
        value: '',
        visited: false,
      },
      lastName: {
        value: '',
        visited: false,
      },
      age: {
        value: undefined,
        visited: false,
      },
    },
  };
  const labels = ['First name', 'Last name', 'Age', 'Review and send'];

  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <form>
      <h1 style={{ marginTop: '0', fontSize: '52px', lineHeight: '62px' }}>Simple form example</h1>
      <Stepper
        className="stepper-form-validation"
        labels={labels}
        language="en"
        stepHeading
        states={state.states}
        selectedStep={state.activeStepIndex}
        stepsTotal={4}
        onStepClick={(event, stepIndex) => dispatch({ type: 'setActive', payload: stepIndex })}
      />
      {state.showErrorSummary && (
        <div style={{ marginTop: 'var(--spacing-l)' }}>
          <ErrorSummary autofocus label="Form contains following errors">
            <ul>
              {state.activeStepIndex === 0 && (
                <li>
                  Error 1: <a href="#firstName">Please enter your first name</a>
                </li>
              )}
              {state.activeStepIndex === 1 && (
                <li>
                  Error 1: <a href="#lastName">Please enter your last name</a>
                </li>
              )}
              {state.activeStepIndex === 2 && (
                <li>
                  Error 1: <a href="#age">Please enter your age</a>
                </li>
              )}
            </ul>
          </ErrorSummary>
        </div>
      )}
      {[0, 1, 2].includes(state.activeStepIndex) && (
        <div style={{ height: '164px' }}>
          {state.activeStepIndex === 0 && (
            <TextInput
              style={{ width: '300px', paddingTop: 'var(--spacing-l)' }}
              required
              id="firstName"
              label="First name"
              invalid={state.fields.firstName.value.length === 0 && state.fields.firstName.visited === true}
              errorText={
                state.fields.firstName.value.length === 0 &&
                state.fields.firstName.visited === true &&
                'Please enter your first name'
              }
              value={state.fields.firstName.value}
              onChange={(event) =>
                dispatch({ type: 'changeField', fieldName: 'firstName', newValue: event.target.value })
              }
            />
          )}
          {state.activeStepIndex === 1 && (
            <TextInput
              style={{ width: '300px', paddingTop: 'var(--spacing-l)' }}
              required
              id="lastName"
              label="Last name"
              invalid={state.fields.lastName.value.length === 0 && state.fields.lastName.visited === true}
              errorText={
                state.fields.lastName.value.length === 0 &&
                state.fields.lastName.visited === true &&
                'Please enter your last name'
              }
              value={state.fields.lastName.value}
              onChange={(event) =>
                dispatch({ type: 'changeField', fieldName: 'lastName', newValue: event.target.value })
              }
            />
          )}
          {state.activeStepIndex === 2 && (
            <NumberInput
              style={{ width: '300px', paddingTop: 'var(--spacing-l)' }}
              required
              id="age"
              label="Age"
              invalid={
                (!state.fields.age.value || state.fields.age.value.length === 0) && state.fields.age.visited === true
              }
              errorText={
                (!state.fields.age.value || state.fields.age.value.length === 0) &&
                state.fields.age.visited === true &&
                'Please enter your age'
              }
              value={state.fields.age.value}
              onChange={(event) => dispatch({ type: 'changeField', fieldName: 'age', newValue: event.target.value })}
            />
          )}
        </div>
      )}
      {state.activeStepIndex === 3 && (
        <div style={{ marginTop: 'var(--spacing-l)', marginBottom: 'var(--spacing-2-xl)' }}>
          <Card className="stepper-card" border heading="Review your basic information" headingAriaLevel={3}>
            <p style={{ margin: 0 }}>First name: {state.fields.firstName.value}</p>
            <p style={{ margin: 0 }}>Last name: {state.fields.lastName.value}</p>
            <p style={{ margin: 0 }}>Age: {state.fields.age.value}</p>
          </Card>
        </div>
      )}

      <div
        style={{
          height: '100px',
          display: 'flex',
          justifyContent: 'flex-start',
          alignItems: 'flex-start',
          gap: '24px',
        }}
      >
        <Button
          disabled={state.activeStepIndex === 0}
          variant="secondary"
          onClick={() => dispatch({ type: 'setActive', payload: state.activeStepIndex - 1 })}
          style={{ height: 'fit-content', width: 'fit-content' }}
          iconLeft={<IconArrowLeft />}
        >
          Previous
        </Button>
        <Button
          onClick={() => dispatch({ type: 'completeStep', payload: state.activeStepIndex })}
          style={{ height: 'fit-content', width: 'fit-content' }}
          iconRight={<IconArrowRight />}
        >
          {state.activeStepIndex === 3 ? 'Send' : 'Next'}
        </Button>
      </div>
    </form>
  );
};

// args is required for docs tab to show source code
// eslint-disable-next-line no-unused-vars,@typescript-eslint/no-unused-vars
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
        <Step label="Available" language="en" index={0} stepsTotal={9} state={StepState.available} />
        <Step label="Selected" language="en" index={1} stepsTotal={9} selected state={StepState.available} />
        <Step label="Completed" language="en" index={2} stepsTotal={9} state={StepState.completed} />
        <Step label="Disabled" language="en" index={3} stepsTotal={9} state={StepState.disabled} />
        <Step label="Needs attention" language="en" index={4} stepsTotal={9} state={StepState.attention} />
        <Step
          label="Attention + selected"
          language="en"
          selected
          index={5}
          stepsTotal={9}
          state={StepState.attention}
        />
        <Step label="Paused" language="en" index={6} stepsTotal={9} state={StepState.paused} />
        <Step label="Paused + selected" language="en" selected index={7} stepsTotal={9} state={StepState.paused} />
        <div className={styles.step}>
          <p>Small variant:</p>
          <Step
            label="Available"
            language="en"
            index={8}
            stepsTotal={9}
            small
            state={StepState.available}
            style={{ justifySelf: 'center' }}
          />
        </div>
      </div>
    </div>
  );
};
