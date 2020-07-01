import React, { useState } from 'react';
import { boolean, number, text, withKnobs } from '@storybook/addon-knobs';

import Dropdown from './Dropdown';
import Button from '../button/Button';

const options = [
  { label: 'Plutonium' },
  { label: 'Americium' },
  { label: 'Copernicium' },
  { label: 'Nihonium' },
  { label: 'Flerovium' },
  { label: 'Moscovium' },
  { label: 'Livermorium' },
  { label: 'Tennessine' },
  { label: 'Oganesson' },
];

export default {
  component: Dropdown,
  title: 'Components/Dropdown',
  decorators: [withKnobs, (storyFn) => <div style={{ maxWidth: '400px' }}>{storyFn()}</div>],
};

export const Default = () => (
  <Dropdown options={options} placeholder="Placeholder" label="Label" helper="Assistive text" />
);

export const Invalid = () => (
  <Dropdown options={options} placeholder="Placeholder" label="Label" helper="Error text" invalid />
);

export const Disabled = () => (
  <Dropdown options={options} placeholder="Placeholder" label="Label" helper="Assistive text" disabled />
);

export const DisabledOptions = () => (
  <Dropdown
    options={options}
    placeholder="Placeholder"
    label="Label"
    isOptionDisabled={(option, index) => [1, 2, 4].includes(index)}
  />
);

DisabledOptions.story = {
  name: 'With disabled options',
};

export const DefaultValue = () => (
  <>
    <Dropdown id="select" options={options} label="Dropdown with default value" defaultValue={options[2]} />
    <br />
    <Dropdown
      id="multiselect"
      options={options}
      label="Multi-select dropdown with default values"
      placeholder="Placeholder"
      defaultValues={[options[2], options[3], options[4]]}
      multiselect
      closeMenuOnSelect={false}
    />
  </>
);

DefaultValue.story = {
  name: 'With default value(s)',
};

export const Multiselect = () => (
  <Dropdown
    options={options}
    label="Multi-select dropdown"
    placeholder="Placeholder"
    multiselect
    closeMenuOnSelect={false}
  />
);

export const Controlled = () => {
  const [selectedItem, setSelectedItem] = useState(null);
  const [multiselectSelectedItem, setMultiselectSelectedItem] = useState(null);

  const handleSelectedItemChange = (item) => setSelectedItem(item);
  const handleMultiselectSelectedItemChange = (item) => setMultiselectSelectedItem(item);

  return (
    <>
      <Button onClick={() => setSelectedItem(null)}>Reset</Button>
      {['Dropdown 1', 'Dropdown 2'].map((label) => (
        <Dropdown
          key={label}
          options={options}
          placeholder="Placeholder"
          label={label}
          onChange={handleSelectedItemChange}
          selectedOption={selectedItem}
          style={{ marginTop: 'var(--spacing-s)' }}
        />
      ))}
      <Button onClick={() => setMultiselectSelectedItem(null)} style={{ marginTop: 'var(--spacing-xl)' }}>
        Reset multiselect
      </Button>
      {['Multiselect 1', 'Multiselect 2'].map((label) => (
        <Dropdown
          key={label}
          options={options}
          placeholder="Placeholder"
          label={label}
          multiselect
          onChange={handleMultiselectSelectedItemChange}
          selectedOption={multiselectSelectedItem}
          style={{ marginTop: 'var(--spacing-s)' }}
        />
      ))}
    </>
  );
};

Controlled.story = {
  name: 'With controlled state',
};

Multiselect.story = {
  name: 'With multiselect',
};

export const Combobox = () => (
  <Dropdown options={options} label="Filterable dropdown (combobox)" placeholder="Placeholder" filterable />
);

Combobox.story = {
  name: 'With filtering (combobox)',
};

export const MultiSelectCombobox = () => (
  <Dropdown
    options={options}
    label="Multiselect filterable dropdown (combobox) and buttons below"
    placeholder="Placeholder"
    filterable
    multiselect
    showSelectedBelow
  />
);

MultiSelectCombobox.story = {
  name: 'Multiselect with filtering (combobox) and buttons below',
};

export const Playground = () => {
  const multiselect = boolean('Multiselect', false);
  const filterable = boolean('Filterable', false);
  const invalid = boolean('Invalid', false);
  const disabled = boolean('Disabled', false);
  const required = boolean('Required', false);
  const hideLabel = boolean('Hide label', false);
  const closeMenuOnSelect = boolean('Close menu on select', true);
  const circularNavigation = boolean('Circular navigation', false);
  const visibleOptions = number('Visible options', 5);
  const placeholder = text('Placeholder', 'Placeholder');
  const label = text('Label', 'Label');
  const helper = text('Helper text', 'Assistive text');

  return (
    <Dropdown
      circularNavigation={circularNavigation}
      closeMenuOnSelect={closeMenuOnSelect}
      disabled={disabled}
      filterable={filterable}
      helper={helper}
      hideLabel={hideLabel}
      invalid={invalid}
      required={required}
      label={label}
      multiselect={multiselect}
      options={options}
      placeholder={placeholder}
      visibleOptions={visibleOptions}
    />
  );
};

Playground.story = {
  parameters: {
    previewTabs: {
      'storybook/docs/panel': {
        hidden: true,
      },
    },
    docs: {
      disable: true,
    },
  },
};
