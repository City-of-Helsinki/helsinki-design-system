import React, { useState } from 'react';
import { withKnobs } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';
import uniqueId from 'lodash.uniqueid';

import { Button } from '../../button';
import { Select } from './Select';
import { IconFaceSmile } from '../../../icons';

type Option = { label: string };

function getId(): string {
  return uniqueId('hds-select-');
}

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
  title: 'Components/Dropdowns/Select',
  decorators: [withKnobs, (storyFn) => <div style={{ maxWidth: '420px' }}>{storyFn()}</div>],
  parameters: {
    controls: { expanded: true },
  },
  args: {
    id: getId(),
    label: 'Element',
    helper: 'Choose an element',
    placeholder: 'Placeholder',
    options,
    onBlur: action('onBlur'),
    onChange: (change) => action('onChange')(change),
    onFocus: action('onFocus'),
  },
};

export const Default = (args) => <Select {...args} />;

export const Multiselect = (args) => <Select {...args} />;
Multiselect.storyName = 'Multi-select';
Multiselect.args = {
  multiselect: true,
};

export const Invalid = (args) => <Select {...args} />;
Invalid.args = {
  invalid: true,
  error: 'Wrong element!',
};

export const Disabled = (args) => <Select {...args} />;
Disabled.args = {
  disabled: true,
};

export const Controlled = (args) => {
  const [selectedItem, setSelectedItem] = useState(null);
  const [selectedItems, setSelectedItems] = useState(null);

  const handleChange = (item) => {
    action('onChange')(item);
    setSelectedItem(item);
  };

  const handleMultiSelectChange = (item) => {
    action('onChange')(item);
    setSelectedItems(item);
  };

  return (
    <>
      <Button onClick={() => setSelectedItem(null)}>Reset</Button>
      <Button onClick={() => setSelectedItem(args.options[0])} style={{ marginLeft: 'var(--spacing-s)' }}>
        Select first option
      </Button>
      <Select
        {...args}
        id={getId()}
        label="Select"
        onChange={handleChange}
        value={selectedItem}
        style={{ marginTop: 'var(--spacing-s)' }}
      />

      <Button onClick={() => setSelectedItems(null)} style={{ marginTop: 'var(--spacing-l)' }}>
        Reset
      </Button>
      <Button
        onClick={() => setSelectedItems(args.options)}
        style={{ margin: 'var(--spacing-l) 0 0 var(--spacing-s)' }}
      >
        Select all
      </Button>
      <Select
        {...args}
        id={getId()}
        label="Multi-select"
        multiselect
        onChange={handleMultiSelectChange}
        value={selectedItems}
        style={{ marginTop: 'var(--spacing-s)' }}
      />
    </>
  );
};

export const DisabledOptions = (args) => {
  const getIsDisabled = (item, index): boolean => index % 2 === 1;

  return (
    <>
      <Select {...args} id={getId()} label="Select" isOptionDisabled={getIsDisabled} />
      <Select
        {...args}
        id={getId()}
        label="Multi-select"
        multiselect
        isOptionDisabled={getIsDisabled}
        style={{ marginTop: 'var(--spacing-s)' }}
      />
    </>
  );
};
DisabledOptions.storyName = 'With disabled options';

export const Icon = (args) => <Select {...args} icon={<IconFaceSmile />} />;
Icon.storyName = 'With icon';

export const CustomTheme = (args) => <Select {...args} multiselect />;
CustomTheme.storyName = 'With custom theme';
CustomTheme.args = {
  theme: {
    '--dropdown-background-default': 'var(--color-white)',
    '--dropdown-background-disabled': 'var(--color-black-10)',
    '--dropdown-border-color-default': 'var(--color-black-50)',
    '--dropdown-border-color-hover': 'var(--color-black-90)',
    '--dropdown-border-color-hover-invalid': 'var(--color-error-dark)',
    '--dropdown-border-color-focus': 'var(--color-black-90)',
    '--dropdown-border-color-invalid': 'var(--color-error)',
    '--dropdown-border-color-disabled': 'var(--color-black-10)',
    '--dropdown-color-default': 'var(--color-black-90)',
    '--dropdown-color-disabled': 'var(--color-black-40)',
    '--focus-outline-color': 'var(--color-black-90)',
    '--helper-color-default': 'var(--color-black-60)',
    '--helper-color-invalid': 'var(--color-error)',
    '--menu-divider-color': 'var(--color-black-20)',
    '--menu-item-background-default': 'var(--color-white)',
    '--menu-item-background-hover': 'var(--color-bus)',
    '--menu-item-background-selected': 'var(--color-white)',
    '--menu-item-background-selected-hover': 'var(--color-bus)',
    '--menu-item-background-disabled': 'var(--color-white)',
    '--menu-item-color-default': 'var(--color-black-90)',
    '--menu-item-color-hover': 'var(--color-white)',
    '--menu-item-color-selected': 'var(--color-black-90)',
    '--menu-item-color-selected-hover': 'var(--color-white)',
    '--menu-item-color-disabled': 'var(--color-black-40)',
    '--menu-item-icon-color-selected': 'var(--color-white)',
    '--menu-item-icon-color-disabled': 'var(--color-black-40)',
    '--multiselect-checkbox-background-selected': 'var(--color-black-90)',
    '--multiselect-checkbox-background-disabled': 'var(--color-black-10)',
    '--multiselect-checkbox-border-default': 'var(--color-black-50)',
    '--multiselect-checkbox-border-hover': 'var(--color-black-90)',
    '--multiselect-checkbox-border-disabled': 'var(--color-black-10)',
    '--multiselect-checkbox-color-default': 'transparent',
    '--multiselect-checkbox-color-selected': 'var(--color-white)',
    '--multiselect-checkbox-color-selected-disabled': 'var(--color-white)',
    '--placeholder-color': 'var(--color-black-60)',
  },
};

export const SelectExample = (args) => {
  return <Select<Option> {...args} getA11ySelectionMessage={({ selectedItem }) => `${selectedItem.label} selected`} />;
};
SelectExample.storyName = 'Select example';

export const MultiSelectExample = (args) => {
  return (
    <Select<Option>
      {...args}
      label="Elements"
      helper="Choose elements"
      multiselect
      clearButtonAriaLabel="Clear all selections"
      selectedItemRemoveButtonAriaLabel="Remove element {value}"
      selectedItemSrLabel="Selected element {value}"
      getA11yRemovalMessage={({ removedSelectedItem }) => `${removedSelectedItem.label} was removed`}
    />
  );
};
MultiSelectExample.storyName = 'Multi-select example';
