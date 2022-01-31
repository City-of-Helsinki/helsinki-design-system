import React, { useReducer } from 'react';

import { Stepper } from './Stepper';
import styles from './Stepper.module.scss';
import { Step } from './Step';
import { Button } from '../button';
import { IconArrowLeft, IconArrowRight } from '../../icons';
import { TextInput } from '../textInput';
import { NumberInput } from '../numberInput';
import { Card } from '../card';

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

// args is required for docs tab to show source code
// eslint-disable-next-line no-unused-vars,@typescript-eslint/no-unused-vars
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
        className="stepper-margin"
        labels={labels}
        language="en"
        states={state.states}
        selectedStep={state.activeStep}
        stepsTotal={5}
        onStepClick={(event, number) => dispatch({ type: 'setActive', payload: number })}
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
          disabled={state.activeStep === 1}
          variant="secondary"
          onClick={() => dispatch({ type: 'setActive', payload: state.activeStep - 1 })}
          style={{ height: 'fit-content', width: 'fit-content' }}
          iconLeft={<IconArrowLeft />}
        >
          Previous
        </Button>
        <Button
          onClick={() => dispatch({ type: 'completeStep', payload: state.activeStep })}
          style={{ height: 'fit-content', width: 'fit-content' }}
          iconRight={<IconArrowRight />}
        >
          {state.activeStep === 5 ? 'Send' : 'Next'}
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
    activeStep: 1,
    states: ['available', 'disabled', 'disabled', 'disabled', 'disabled'],
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
        selectedStep={state.activeStep}
        stepsTotal={5}
        onStepClick={(event, number) => dispatch({ type: 'setActive', payload: number })}
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
          disabled={state.activeStep === 1}
          variant="secondary"
          onClick={() => dispatch({ type: 'setActive', payload: state.activeStep - 1 })}
          style={{ height: 'fit-content', width: 'fit-content' }}
          iconLeft={<IconArrowLeft />}
        >
          Previous
        </Button>
        <Button
          onClick={() => dispatch({ type: 'completeStep', payload: state.activeStep })}
          style={{ height: 'fit-content', width: 'fit-content' }}
          iconRight={<IconArrowRight />}
        >
          {state.activeStep === 5 ? 'Send' : 'Next'}
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
    activeStep: 1,
    states: ['available', 'disabled', 'disabled', 'disabled', 'disabled'],
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
        selectedStep={state.activeStep}
        stepsTotal={5}
        onStepClick={(event, number) => dispatch({ type: 'setActive', payload: number })}
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
          disabled={state.activeStep === 1}
          variant="secondary"
          onClick={() => dispatch({ type: 'setActive', payload: state.activeStep - 1 })}
          style={{ height: 'fit-content', width: 'fit-content' }}
          iconLeft={<IconArrowLeft />}
        >
          Previous
        </Button>
        <Button
          onClick={() => dispatch({ type: 'completeStep', payload: state.activeStep })}
          style={{ height: 'fit-content', width: 'fit-content' }}
          iconRight={<IconArrowRight />}
        >
          {state.activeStep === 5 ? 'Send' : 'Next'}
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
          disabled={state.activeStep === 1}
          variant="secondary"
          onClick={() => dispatch({ type: 'setActive', payload: state.activeStep - 1 })}
          style={{ height: 'fit-content', width: 'fit-content' }}
          iconLeft={<IconArrowLeft />}
        >
          Previous
        </Button>
        <Button
          onClick={() => dispatch({ type: 'completeStep', payload: state.activeStep })}
          style={{ height: 'fit-content', width: 'fit-content' }}
          iconRight={<IconArrowRight />}
        >
          {state.activeStep === 12 ? 'Send' : 'Next'}
        </Button>
      </div>
    </div>
  );
};

// args is required for docs tab to show source code
// eslint-disable-next-line no-unused-vars,@typescript-eslint/no-unused-vars
export const WithCustomTheme = (args) => {
  const reducer = commonReducer(5);

  const initialState = {
    activeStep: 1,
    states: ['available', 'disabled', 'disabled', 'disabled', 'disabled'],
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
        selectedStep={state.activeStep}
        stepsTotal={5}
        onStepClick={(event, number) => dispatch({ type: 'setActive', payload: number })}
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
          disabled={state.activeStep === 1}
          variant="secondary"
          onClick={() => dispatch({ type: 'setActive', payload: state.activeStep - 1 })}
          style={{ height: 'fit-content', width: 'fit-content' }}
          iconLeft={<IconArrowLeft />}
        >
          Previous
        </Button>
        <Button
          className="stepper-custom-primary-button"
          onClick={() => dispatch({ type: 'completeStep', payload: state.activeStep })}
          style={{ height: 'fit-content', width: 'fit-content' }}
          iconRight={<IconArrowRight />}
        >
          {state.activeStep === 5 ? 'Send' : 'Next'}
        </Button>
      </div>
    </div>
  );
};

// args is required for docs tab to show source code
// eslint-disable-next-line no-unused-vars,@typescript-eslint/no-unused-vars
export const SimpleFormExample = (args) => {
  const activeStepIsValid = (state) => {
    if (state.activeStep === 1) {
      // first name
      return state.fields.firstName.value && state.fields.firstName.value.length > 0;
    }
    if (state.activeStep === 2) {
      // last name
      return state.fields.lastName.value && state.fields.lastName.value.length > 0;
    }

    if (state.activeStep === 3) {
      // age
      return state.fields.age.value && state.fields.age.value.length > 0;
    }

    return state.activeStep === 4;
  };

  const weAreInLastAvailableStep = (state) => {
    let indexOfLastNonDisabledStep = 0;
    state.states.forEach((st, index) => {
      if (st !== 'disabled' && index > indexOfLastNonDisabledStep) {
        indexOfLastNonDisabledStep = index;
      }
    });

    return state.activeStep - 1 === indexOfLastNonDisabledStep;
  };

  const reducer = (state, action) => {
    switch (action.type) {
      case 'changeField': {
        if (action.newValue.length === 0) {
          return {
            activeStep: state.activeStep,
            states: state.states.map((stateName, index) => {
              if (index === state.activeStep - 1) {
                return 'attention';
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

        return {
          activeStep: state.activeStep,
          states: state.states.map((stateName, index) => {
            if (index === state.activeStep - 1) {
              return 'filled';
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
        const activeStep = action.payload === 4 ? 4 : action.payload + 1;
        return {
          activeStep,
          states: state.states.map((stateName, index) => {
            if (index === action.payload - 1 && index !== 4 - 1) {
              // current one but not last one
              return 'filled';
            }
            if (index === action.payload) {
              // next one
              return 'available';
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
            activeStep: state.activeStep,
            states: state.states.map((stateName, index) => {
              if (index === state.activeStep - 1) {
                return 'attention';
              }
              return stateName;
            }),
            fields: {
              ...state.fields,
            },
          };
        }

        return {
          activeStep: action.payload,
          states: state.states.map((stateName, index) => {
            if (index === action.payload - 1 && stateName !== 'attention' && stateName !== 'paused') {
              return 'available';
            }
            if (index === state.activeStep - 1 && activeStepIsValid(state)) {
              return 'filled';
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
    activeStep: 1,
    states: ['available', 'disabled', 'disabled', 'disabled'],
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
  const labels = ['First name', 'Last name', 'Age', 'Verify and send'];

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
        selectedStep={state.activeStep}
        stepsTotal={4}
        onStepClick={(event, number) => dispatch({ type: 'setActive', payload: number })}
      />

      <div style={{ height: '250px' }}>
        {state.activeStep === 1 && (
          <TextInput
            style={{ width: '300px', paddingTop: '60px' }}
            id="firstName"
            label="First name *"
            invalid={state.fields.firstName.value.length === 0 && state.fields.firstName.visited === true}
            errorText={
              state.fields.firstName.value.length === 0 &&
              state.fields.firstName.visited === true &&
              'First name is compulsory'
            }
            value={state.fields.firstName.value}
            onChange={(event) =>
              dispatch({ type: 'changeField', fieldName: 'firstName', newValue: event.target.value })
            }
          />
        )}
        {state.activeStep === 2 && (
          <TextInput
            style={{ width: '300px', paddingTop: '60px' }}
            id="lastName"
            label="Last name *"
            invalid={state.fields.lastName.value.length === 0 && state.fields.lastName.visited === true}
            errorText={
              state.fields.lastName.value.length === 0 &&
              state.fields.lastName.visited === true &&
              'Last name is compulsory'
            }
            value={state.fields.lastName.value}
            onChange={(event) => dispatch({ type: 'changeField', fieldName: 'lastName', newValue: event.target.value })}
          />
        )}
        {state.activeStep === 3 && (
          <NumberInput
            style={{ width: '300px', paddingTop: '60px' }}
            id="age"
            label="Age *"
            invalid={
              (!state.fields.age.value || state.fields.age.value.length === 0) && state.fields.age.visited === true
            }
            errorText={
              (!state.fields.age.value || state.fields.age.value.length === 0) &&
              state.fields.age.visited === true &&
              'Age is compulsory'
            }
            value={state.fields.age.value}
            onChange={(event) => dispatch({ type: 'changeField', fieldName: 'age', newValue: event.target.value })}
          />
        )}

        {state.activeStep === 4 && (
          <div style={{ marginTop: '20px' }}>
            <Card border heading="Basic info" headingAriaLevel={3}>
              <p style={{ margin: 0 }}>First name: {state.fields.firstName.value}</p>
              <p style={{ margin: 0 }}>Last name: {state.fields.lastName.value}</p>
              <p style={{ margin: 0 }}>Age: {state.fields.age.value}</p>
            </Card>
          </div>
        )}
      </div>

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
          disabled={state.activeStep === 1}
          variant="secondary"
          onClick={() => dispatch({ type: 'setActive', payload: state.activeStep - 1 })}
          style={{ height: 'fit-content', width: 'fit-content' }}
          iconLeft={<IconArrowLeft />}
        >
          Previous
        </Button>
        <Button
          disabled={!activeStepIsValid(state)}
          onClick={() => dispatch({ type: 'completeStep', payload: state.activeStep })}
          style={{ height: 'fit-content', width: 'fit-content' }}
          iconRight={<IconArrowRight />}
        >
          {state.activeStep === 4 ? 'Send' : 'Next'}
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
