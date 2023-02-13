import React, { ChangeEvent, useReducer, useState } from 'react';

import { SelectionGroup } from './SelectionGroup';
import { Checkbox } from '../checkbox';
import { RadioButton } from '../radioButton';
import { Fieldset } from '../fieldset';

export default {
  component: SelectionGroup,
  title: 'Components/SelectionGroup',
  decorators: [(storyFn) => <div style={{ maxWidth: '400px' }}>{storyFn()}</div>],
  parameters: {
    controls: { expanded: true, hideNoControlsWarning: true },
  },
  args: {
    numberOfItems: 3,
    label: 'Label',
    direction: 'vertical',
  },
};

const getCheckboxItems = (
  numberOfItems: number,
  checked: { [key: string]: boolean },
  handleChange: (e: ChangeEvent<HTMLInputElement>) => void,
) =>
  [...Array(numberOfItems)].map((_, i) => (
    <Checkbox
      id={`checkbox${i}`}
      label={`Option ${i + 1}`}
      name={`checkbox${i}`}
      key={`checkbox${i}`} // eslint-disable-line react/no-array-index-key
      checked={checked[`checkbox${i}`]}
      onChange={handleChange}
    />
  ));

const getRadioButtonItems = (
  numberOfItems: number,
  radioValue: string,
  handleChange: (e: ChangeEvent<HTMLInputElement>) => void,
) =>
  [...Array(numberOfItems)].map((_, i) => (
    <RadioButton
      id={`radio${i}`}
      label={`Option ${i + 1}`}
      key={`radio${i}`} // eslint-disable-line react/no-array-index-key
      value={`radio${i}`}
      name="radio"
      checked={radioValue === `radio${i}`}
      onChange={handleChange}
    />
  ));

export const Default = ({ numberOfItems, ...args }) => {
  const [checkedItems, setCheckedItems] = useState({});
  const [radioValue, setRadioValue] = useState('radio0');
  const handleCheckboxChange = (e: ChangeEvent<HTMLInputElement>) => {
    const item = e.target.name;
    const isChecked = e.target.checked;
    setCheckedItems({ ...checkedItems, [item]: isChecked });
  };
  const handleRadioChange = (e: ChangeEvent<HTMLInputElement>) => {
    setRadioValue(e.target.value);
  };
  const checkboxes = getCheckboxItems(numberOfItems, checkedItems, handleCheckboxChange);
  const radiobuttons = getRadioButtonItems(numberOfItems, radioValue, handleRadioChange);
  return (
    <>
      <SelectionGroup {...args}>{checkboxes}</SelectionGroup>
      <br />
      <br />
      <SelectionGroup {...args}>{radiobuttons}</SelectionGroup>
    </>
  );
};

export const Horizontal = ({ numberOfItems, ...args }) => {
  const [checkedItems, setCheckedItems] = useState({});
  const [radioValue, setRadioValue] = useState('radio0');
  const handleCheckboxChange = (e: ChangeEvent<HTMLInputElement>) => {
    const item = e.target.name;
    const isChecked = e.target.checked;
    setCheckedItems({ ...checkedItems, [item]: isChecked });
  };
  const handleRadioChange = (e: ChangeEvent<HTMLInputElement>) => {
    setRadioValue(e.target.value);
  };
  const checkboxes = getCheckboxItems(numberOfItems, checkedItems, handleCheckboxChange);
  const radiobuttons = getRadioButtonItems(numberOfItems, radioValue, handleRadioChange);
  return (
    <>
      <SelectionGroup {...args}>{checkboxes}</SelectionGroup>
      <br />
      <br />
      <SelectionGroup {...args}>{radiobuttons}</SelectionGroup>
    </>
  );
};
Horizontal.args = {
  direction: 'horizontal',
};

export const Required = ({ numberOfItems, ...args }) => {
  const [checkedItems, setCheckedItems] = useState({});
  const [radioValue, setRadioValue] = useState('radio0');
  const handleCheckboxChange = (e: ChangeEvent<HTMLInputElement>) => {
    const item = e.target.name;
    const isChecked = e.target.checked;
    setCheckedItems({ ...checkedItems, [item]: isChecked });
  };
  const handleRadioChange = (e: ChangeEvent<HTMLInputElement>) => {
    setRadioValue(e.target.value);
  };
  const checkboxes = getCheckboxItems(numberOfItems, checkedItems, handleCheckboxChange);
  const radiobuttons = getRadioButtonItems(numberOfItems, radioValue, handleRadioChange);
  return (
    <>
      <SelectionGroup {...args}>{checkboxes}</SelectionGroup>
      <br />
      <br />
      <SelectionGroup {...args}>{radiobuttons}</SelectionGroup>
    </>
  );
};
Required.args = {
  required: true,
};

export const Invalid = ({ numberOfItems, ...args }) => {
  const [checkedItems, setCheckedItems] = useState({});
  const [radioValue, setRadioValue] = useState('radio0');
  const handleCheckboxChange = (e: ChangeEvent<HTMLInputElement>) => {
    const item = e.target.name;
    const isChecked = e.target.checked;
    setCheckedItems({ ...checkedItems, [item]: isChecked });
  };
  const handleRadioChange = (e: ChangeEvent<HTMLInputElement>) => {
    setRadioValue(e.target.value);
  };
  const checkboxes = getCheckboxItems(numberOfItems, checkedItems, handleCheckboxChange);
  const radiobuttons = getRadioButtonItems(numberOfItems, radioValue, handleRadioChange);
  return (
    <>
      <SelectionGroup {...args}>{checkboxes}</SelectionGroup>
      <br />
      <br />
      <SelectionGroup {...args}>{radiobuttons}</SelectionGroup>
    </>
  );
};
Invalid.args = {
  required: true,
  errorText: 'Error text',
};

export const WithTooltip = ({ numberOfItems, ...args }) => {
  const [checkedItems, setCheckedItems] = useState({});
  const [radioValue, setRadioValue] = useState('radio0');
  const handleCheckboxChange = (e: ChangeEvent<HTMLInputElement>) => {
    const item = e.target.name;
    const isChecked = e.target.checked;
    setCheckedItems({ ...checkedItems, [item]: isChecked });
  };
  const handleRadioChange = (e: ChangeEvent<HTMLInputElement>) => {
    setRadioValue(e.target.value);
  };
  const checkboxes = getCheckboxItems(numberOfItems, checkedItems, handleCheckboxChange);
  const radiobuttons = getRadioButtonItems(numberOfItems, radioValue, handleRadioChange);
  return (
    <>
      <SelectionGroup {...args}>{checkboxes}</SelectionGroup>
      <br />
      <br />
      <SelectionGroup {...args}>{radiobuttons}</SelectionGroup>
    </>
  );
};
WithTooltip.args = {
  tooltipLabel: 'Tooltip',
  tooltipButtonLabel: 'Tooltip',
  tooltipText:
    'Tooltips contain "nice to have" information. Default Tooltip contents should not be longer than two to three sentences. For longer descriptions, provide a link to a separate page.',
};
WithTooltip.storyName = 'With tooltip';

export const WithParent = () => {
  enum CheckboxState {
    checked,
    unchecked,
    indeterminate,
  }

  const areAllChecked = (state) => {
    let checkedCount = 0;
    Object.keys(state).forEach((key) => {
      if (key === 'controllerCheckbox') {
        return;
      }
      if (state[key] === CheckboxState.checked) {
        checkedCount += 1;
      }
    });

    return checkedCount === 4;
  };

  const areAllUnchecked = (state) => {
    let checkedCount = 0;
    Object.keys(state).forEach((key) => {
      if (key === 'controllerCheckbox') {
        return;
      }
      if (state[key] === CheckboxState.checked) {
        checkedCount += 1;
      }
    });

    return checkedCount === 1;
  };

  const reducer = (state, action) => {
    switch (action.type) {
      case 'check': {
        if (action.payload === 'controllerCheckbox') {
          return {
            controllerCheckbox: CheckboxState.checked,
            checkbox1: CheckboxState.checked,
            checkbox2: CheckboxState.checked,
            checkbox3: CheckboxState.checked,
            checkbox4: CheckboxState.checked,
            checkbox5: CheckboxState.checked,
          };
        }
        return {
          ...state,
          [action.payload]: CheckboxState.checked,
          controllerCheckbox: areAllChecked(state) ? CheckboxState.checked : CheckboxState.indeterminate,
        };
      }
      case 'uncheck': {
        if (action.payload === 'controllerCheckbox') {
          return {
            controllerCheckbox: CheckboxState.unchecked,
            checkbox1: CheckboxState.unchecked,
            checkbox2: CheckboxState.unchecked,
            checkbox3: CheckboxState.unchecked,
            checkbox4: CheckboxState.unchecked,
            checkbox5: CheckboxState.unchecked,
          };
        }
        return {
          ...state,
          [action.payload]: CheckboxState.unchecked,
          controllerCheckbox: areAllUnchecked(state) ? CheckboxState.unchecked : CheckboxState.indeterminate,
        };
      }
      default:
        throw new Error();
    }
  };

  const initialState = {
    controllerCheckbox: CheckboxState.unchecked,
    checkbox1: CheckboxState.unchecked,
    checkbox2: CheckboxState.unchecked,
    checkbox3: CheckboxState.unchecked,
    checkbox4: CheckboxState.unchecked,
    checkbox5: CheckboxState.unchecked,
  };

  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <Fieldset heading="Group label *">
      <Checkbox
        aria-controls="checkbox1 checkbox2 checkbox3 checkbox4 checkbox5"
        id="controllerCheckbox"
        label="Label"
        indeterminate={state.controllerCheckbox === CheckboxState.indeterminate}
        checked={state.controllerCheckbox === CheckboxState.checked}
        style={{ marginTop: 'var(--spacing-xs)' }}
        onChange={() => {
          if (
            state.controllerCheckbox === CheckboxState.unchecked ||
            state.controllerCheckbox === CheckboxState.indeterminate
          ) {
            dispatch({ type: 'check', payload: 'controllerCheckbox' });
          } else {
            dispatch({ type: 'uncheck', payload: 'controllerCheckbox' });
          }
        }}
      />
      <ul style={{ marginLeft: 'var(--spacing-s)', paddingInlineStart: '0' }}>
        {Object.entries(state).map((entry) => {
          if (entry[0] === 'controllerCheckbox') {
            return null;
          }
          return (
            <li key={entry[0]} style={{ marginTop: 'var(--spacing-s)', listStyle: 'none' }}>
              <Checkbox
                id={entry[0]}
                key={entry[0]}
                label="Label"
                checked={entry[1] === CheckboxState.checked}
                onChange={() => {
                  if (entry[1] === CheckboxState.unchecked) {
                    dispatch({ type: 'check', payload: entry[0] });
                  } else {
                    dispatch({ type: 'uncheck', payload: entry[0] });
                  }
                }}
              />
            </li>
          );
        })}
      </ul>
    </Fieldset>
  );
};

WithParent.storyName = 'With a parent';
WithParent.parameters = {
  loki: { skip: true }, // There is an identical story in checkbox
};
export const WithHelperText = ({ numberOfItems, ...args }) => {
  const [checkedItems, setCheckedItems] = useState({});
  const [radioValue, setRadioValue] = useState('radio0');
  const handleCheckboxChange = (e: ChangeEvent<HTMLInputElement>) => {
    const item = e.target.name;
    const isChecked = e.target.checked;
    setCheckedItems({ ...checkedItems, [item]: isChecked });
  };
  const handleRadioChange = (e: ChangeEvent<HTMLInputElement>) => {
    setRadioValue(e.target.value);
  };
  const checkboxes = getCheckboxItems(numberOfItems, checkedItems, handleCheckboxChange);
  const radiobuttons = getRadioButtonItems(numberOfItems, radioValue, handleRadioChange);
  return (
    <>
      <SelectionGroup {...args}>{checkboxes}</SelectionGroup>
      <br />
      <br />
      <SelectionGroup {...args}>{radiobuttons}</SelectionGroup>
    </>
  );
};
WithHelperText.args = {
  helperText: 'Assistive text',
};
