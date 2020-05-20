import React from 'react';
import { boolean, number, text, withKnobs } from '@storybook/addon-knobs';

import Dropdown from './Dropdown';

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
  <Dropdown options={options} placeholder="Choose one" label="Label" helper="Assistive text" />
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

Multiselect.story = {
  name: 'With multiselect',
};

export const Combobox = () => (
  <Dropdown options={options} label="Filterable dropdown (combobox)" placeholder="Placeholder" filterable />
);

Combobox.story = {
  name: 'With filtering (combobox)',
};

export const Playground = () => {
  const multiselect = boolean('Multiselect', false);
  const filterable = boolean('Filterable', false);
  const invalid = boolean('Invalid', false);
  const disabled = boolean('Disabled', false);
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
