import React, { useState } from 'react';
import { withKnobs } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';

// import { Dropdown } from './Dropdown';
import { Button } from '../button';
import { Select } from './Select';
import { IconFaceNeutral, IconFaceSad, IconFaceSmile } from '../../icons';
import { Combobox } from './Combobox';

function getOptions() {
  return [
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
}

const options = getOptions();

export default {
  component: Select,
  title: 'Components/Dropdown',
  // decorators: [withKnobs, (storyFn) => <div style={{ maxWidth: '420px' }}>{storyFn()}</div>],
  decorators: [withKnobs, (storyFn) => <div style={{ maxWidth: '100%' }}>{storyFn()}</div>],
};

// export const Default = () => (
//   <Dropdown options={options} placeholder="Placeholder" label="Label" helper="Assistive text" />
// );

export const SelectTest = () => (
  <>
    <Select
      icon={<IconFaceSmile />}
      label="Default"
      helper="Choose an element"
      placeholder="Placeholder"
      options={options}
    />
    <Select
      invalid
      icon={<IconFaceSad />}
      placeholder="Placeholder"
      label="Invalid"
      helper="Choose an element"
      error="Wrong element!"
      options={options}
      style={{ marginTop: 'var(--spacing-s)' }}
    />
    <Select
      disabled
      icon={<IconFaceNeutral />}
      placeholder="Placeholder"
      label="Disabled"
      helper="Choose an element"
      options={options}
      style={{ marginTop: 'var(--spacing-s)' }}
    />
  </>
);

export const SelectMultiselectTest = () => {
  const controlledOptions = getOptions();
  return (
    <Select
      label="Choose an element"
      placeholder="Placeholder"
      options={controlledOptions}
      multiselect
      // onChange={(values): void => console.log('Change', values)}
      // onBlur={() => console.log('Blur')}
      // onFocus={() => console.log('Focus')}
      clearButtonAriaLabel="Clear all selections"
      selectedItemRemoveButtonAriaLabel="Remove item {value}"
      selectedItemSrLabel="Selected item {value}"
      // helper="Hello! I'm a helper"
    />
  );
};

export const SelectTestControlled = () => {
  const controlledOptions = getOptions();

  const [selectedItem, setSelectedItem] = useState(null);

  return (
    <>
      <Button onClick={() => setSelectedItem(null)}>Reset</Button>
      <Button onClick={() => setSelectedItem(controlledOptions[0])} style={{ marginLeft: 'var(--spacing-s)' }}>
        Select first option
      </Button>
      <Select
        options={controlledOptions}
        label="Element:"
        helper="Choose an element"
        onChange={setSelectedItem}
        placeholder="Placeholder"
        value={selectedItem}
        style={{ marginTop: 'var(--spacing-s)' }}
      />
    </>
  );
};

export const SelectTestControlledMultiselect = () => {
  const controlledOptions = getOptions();

  const [selectedItems, setSelectedItems] = useState(null);

  return (
    <>
      <Button onClick={() => setSelectedItems(null)}>Reset</Button>
      <Button onClick={() => setSelectedItems(controlledOptions)} style={{ marginLeft: 'var(--spacing-s)' }}>
        Select all
      </Button>
      <Select
        options={controlledOptions}
        label="Element:"
        helper="Choose an element"
        onChange={setSelectedItems}
        placeholder="Placeholder"
        value={selectedItems}
        style={{ marginTop: 'var(--spacing-s)' }}
        multiselect
        clearButtonAriaLabel="Clear all selections"
        selectedItemRemoveButtonAriaLabel="Remove item {value}"
        selectedItemSrLabel="Selected item {value}"
      />
    </>
  );
};

export const ComboboxTest = () => {
  const controlledOptions = getOptions();

  const [selectedItem, setSelectedItem] = useState(null);

  const handleChange = (item) => {
    action('onChange')(item);
    setSelectedItem(item);
  };

  return (
    <>
      <Combobox
        options={controlledOptions}
        label="Element:"
        helper="Choose an element"
        onChange={handleChange}
        placeholder="Placeholder"
        value={selectedItem}
        style={{ marginTop: 'var(--spacing-s)' }}
        clearButtonAriaLabel="Clear all selections"
        selectedItemRemoveButtonAriaLabel="Remove item {value}"
        selectedItemSrLabel="Selected item {value}"
        onFocus={action('onFocus')}
        onBlur={action('onBlur')}
      />
    </>
  );
};

export const ComboboxMultiSelectTest = () => {
  const controlledOptions = getOptions();

  const [selectedItems, setSelectedItems] = useState(null);

  const handleChange = (items) => {
    action('onChange')(items);
    setSelectedItems(items);
  };

  return (
    <div style={{ width: 400 }}>
      <Combobox
        options={controlledOptions}
        label="Element:"
        helper="Choose an element"
        onChange={handleChange}
        placeholder="Placeholder"
        value={selectedItems}
        style={{ marginTop: 'var(--spacing-s)' }}
        multiselect
        clearButtonAriaLabel="Clear all selections"
        selectedItemRemoveButtonAriaLabel="Remove item {value}"
        selectedItemSrLabel="Selected item {value}"
        onFocus={action('onFocus')}
        onBlur={action('onBlur')}
      />
    </div>
  );
};

// export const Invalid = () => (
//   <Dropdown options={options} placeholder="Placeholder" label="Label" helper="Error text" invalid />
// );
//
// export const Disabled = () => (
//   <Dropdown options={options} placeholder="Placeholder" label="Label" helper="Assistive text" disabled />
// );
//
// export const DisabledOptions = () => (
//   <Dropdown
//     options={options}
//     placeholder="Placeholder"
//     label="Label"
//     isOptionDisabled={(option, index) => [1, 2, 4].includes(index)}
//   />
// );
// DisabledOptions.storyName = 'With disabled options';
//
// export const DefaultValue = () => (
//   <>
//     <Dropdown id="select" options={options} label="Dropdown with default value" defaultValue={options[2]} />
//     <br />
//     <Dropdown
//       id="multiselect"
//       options={options}
//       label="Multi-select dropdown with default values"
//       placeholder="Placeholder"
//       defaultValues={[options[2], options[3], options[4]]}
//       multiselect
//       closeMenuOnSelect={false}
//     />
//   </>
// );
// DefaultValue.storyName = 'With default value(s)';
//
// export const Multiselect = () => (
//   <Dropdown
//     options={options}
//     label="Multi-select dropdown"
//     placeholder="Placeholder"
//     multiselect
//     closeMenuOnSelect={false}
//   />
// );
// Multiselect.storyName = 'With multiselect';
//
// export const Controlled = () => {
//   // Initialize options within the render function to ensure that they
//   // are created a new on every render. This way this test case better
//   // ensures that the equality checks the Dropdown component does do not
//   // rely on reference equality.
//   const controlledOptions = getOptions();
//
//   const [selectedItem, setSelectedItem] = useState(null);
//   const [multiselectSelectedItem, setMultiselectSelectedItem] = useState(null);
//
//   const handleSelectedItemChange = (item) => setSelectedItem(item);
//   const handleMultiselectSelectedItemChange = (item) => setMultiselectSelectedItem(item);
//
//   return (
//     <>
//       <Button onClick={() => setSelectedItem(null)}>Reset</Button>
//       {['Dropdown 1', 'Dropdown 2'].map((label) => (
//         <Dropdown
//           key={label}
//           options={controlledOptions}
//           placeholder="Placeholder"
//           label={label}
//           onChange={handleSelectedItemChange}
//           selectedOption={selectedItem}
//           style={{ marginTop: 'var(--spacing-s)' }}
//         />
//       ))}
//       <Button onClick={() => setMultiselectSelectedItem(null)} style={{ marginTop: 'var(--spacing-xl)' }}>
//         Reset multiselect
//       </Button>
//       {['Multiselect 1', 'Multiselect 2'].map((label) => (
//         <Dropdown
//           key={label}
//           options={controlledOptions}
//           placeholder="Placeholder"
//           label={label}
//           multiselect
//           onChange={handleMultiselectSelectedItemChange}
//           selectedOption={multiselectSelectedItem}
//           closeMenuOnSelect={false}
//           style={{ marginTop: 'var(--spacing-s)' }}
//         />
//       ))}
//     </>
//   );
// };
// Controlled.storyName = 'With controlled state';
//
// export const Combobox = () => (
//   <Dropdown options={options} label="Filterable dropdown (combobox)" placeholder="Placeholder" filterable />
// );
// Combobox.storyName = 'With filtering (combobox)';
//
// export const Playground = () => {
//   const multiselect = boolean('Multiselect', false);
//   const filterable = boolean('Filterable', false);
//   const invalid = boolean('Invalid', false);
//   const disabled = boolean('Disabled', false);
//   const required = boolean('Required', false);
//   const hideLabel = boolean('Hide label', false);
//   const closeMenuOnSelect = boolean('Close menu on select', true);
//   const circularNavigation = boolean('Circular navigation', false);
//   const visibleOptions = number('Visible options', 5);
//   const placeholder = text('Placeholder', 'Placeholder');
//   const label = text('Label', 'Label');
//   const helper = text('Helper text', 'Assistive text');
//
//   return (
//     <Dropdown
//       circularNavigation={circularNavigation}
//       closeMenuOnSelect={closeMenuOnSelect}
//       disabled={disabled}
//       filterable={filterable}
//       helper={helper}
//       hideLabel={hideLabel}
//       invalid={invalid}
//       required={required}
//       label={label}
//       multiselect={multiselect}
//       options={options}
//       placeholder={placeholder}
//       visibleOptions={visibleOptions}
//     />
//   );
// };
// Playground.parameters = {
//   previewTabs: {
//     'storybook/docs/panel': {
//       hidden: true,
//     },
//   },
//   docs: {
//     disable: true,
//   },
// };
