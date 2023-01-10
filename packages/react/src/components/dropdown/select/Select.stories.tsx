import React, { useState } from 'react';
import { action } from '@storybook/addon-actions';
import uniqueId from 'lodash.uniqueid';

import { Button } from '../../button';
import { Select } from './Select';
import { IconFaceSmile, IconLocation } from '../../../icons';

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
  decorators: [
    (storyFn, context) => {
      return <div style={{ maxWidth: `${context.name === 'With external label' ? 820 : 420}px` }}>{storyFn()}</div>;
    },
  ],
  parameters: {
    controls: { expanded: true },
  },
  args: {
    id: getId(),
    label: 'Item',
    helper: 'Choose an item',
    placeholder: 'Placeholder',
    clearButtonAriaLabel: 'Clear selection',
    options,
    onBlur: action('onBlur'),
    onChange: (change) => action('onChange')(change),
    onFocus: action('onFocus'),
  },
};

export const Default = (args) => <Select {...args} />;

export const WithClearButton = (args) => <Select {...args} />;
WithClearButton.storyName = 'With clear button';
WithClearButton.args = {
  clearable: true,
};
WithClearButton.parameters = { loki: { skip: true } };

export const Multiselect = (args) => <Select {...args} />;
Multiselect.storyName = 'Multi-select';
Multiselect.args = {
  multiselect: true,
  selectedItemRemoveButtonAriaLabel: 'Remove {value}',
};

export const Invalid = (args) => <Select {...args} />;
Invalid.args = {
  invalid: true,
  error: 'Wrong item!',
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
        selectedItemRemoveButtonAriaLabel="Remove {value}"
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
        selectedItemRemoveButtonAriaLabel="Remove {value}"
        isOptionDisabled={getIsDisabled}
        style={{ marginTop: 'var(--spacing-s)' }}
      />
    </>
  );
};
DisabledOptions.storyName = 'With disabled options';

export const Icon = (args) => <Select {...args} icon={<IconFaceSmile />} />;
Icon.storyName = 'With icon';

export const MultiselectWithIcon = (args) => <Select {...args} icon={<IconLocation />} />;
MultiselectWithIcon.storyName = 'Multi-select with icon';
MultiselectWithIcon.args = {
  multiselect: true,
  selectedItemRemoveButtonAriaLabel: 'Remove {value}',
};
MultiselectWithIcon.parameters = { loki: { skip: true } };

export const Tooltip = (args) => <Select {...args} />;
Tooltip.storyName = 'With tooltip';
Tooltip.args = {
  tooltipLabel: 'Tooltip',
  tooltipButtonLabel: 'Tooltip',
  tooltipText:
    'Tooltips contain "nice to have" information. Default Tooltip contents should not be longer than two to three sentences. For longer descriptions, provide a link to a separate page.',
};

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

export const MultiSelectExample = ({ options: itemOptions, ...args }) => {
  const [selectedItems, setSelectedItems] = useState([itemOptions[0], itemOptions[1]]);

  const handleMultiSelectChange = (item) => {
    action('onChange')(item);
    setSelectedItems(item);
  };

  return (
    <Select<Option>
      {...args}
      label="Items"
      helper="Choose items"
      multiselect
      clearButtonAriaLabel="Clear all selections"
      selectedItemRemoveButtonAriaLabel="Remove {value}"
      selectedItemSrLabel="Selected item {value}"
      getA11yRemovalMessage={({ removedSelectedItem }) => `${removedSelectedItem.label} was removed`}
      onChange={handleMultiSelectChange}
      value={selectedItems}
      options={itemOptions}
    />
  );
};
MultiSelectExample.storyName = 'Multi-select example';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const WithExternalLabel = (args) => {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr' }}>
      <p id="externalLabelId">External label for the select</p>
      <Select
        aria-labelledby="externalLabelId"
        id={getId()}
        helper="Choose an item"
        placeholder="Placeholder"
        clearButtonAriaLabel="Clear selection"
        options={options}
        onBlur={action('onBlur')}
        onChange={(change) => action('onChange')(change)}
        onFocus={action('onFocus')}
      />
    </div>
  );
};

WithExternalLabel.storyName = 'With external label';
