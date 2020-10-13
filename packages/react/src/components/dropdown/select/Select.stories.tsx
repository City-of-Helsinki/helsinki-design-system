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
