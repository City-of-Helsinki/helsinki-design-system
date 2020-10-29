import React, { ChangeEvent, useState } from 'react';
import { withKnobs } from '@storybook/addon-knobs';

import { SelectionGroup } from './SelectionGroup';
import { Checkbox } from '../checkbox';
import { RadioButton } from '../radioButton';

export default {
  component: SelectionGroup,
  title: 'Components/SelectionGroup',
  decorators: [withKnobs, (storyFn) => <div style={{ maxWidth: '400px' }}>{storyFn()}</div>],
  parameters: {
    controls: { expanded: true },
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
  const [radioValue, setRadioValue] = useState(null);
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
  const [radioValue, setRadioValue] = useState(null);
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
  const [radioValue, setRadioValue] = useState(null);
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

export const WithTooltip = ({ numberOfItems, ...args }) => {
  const [checkedItems, setCheckedItems] = useState({});
  const [radioValue, setRadioValue] = useState(null);
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
