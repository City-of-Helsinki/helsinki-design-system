import React, { useState } from 'react';
import { withKnobs } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';
import uniqueId from 'lodash.uniqueid';

import { Button } from '../../button';
import { Combobox } from './Combobox';
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
  component: Combobox,
  title: 'Components/Dropdowns/Combobox',
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

export const Default = (args) => <Combobox {...args} />;

export const Multiselect = (args) => <Combobox {...args} />;
Multiselect.storyName = 'Multi-select';
Multiselect.args = {
  multiselect: true,
};

export const Invalid = (args) => <Combobox {...args} />;
Invalid.args = {
  invalid: true,
  error: 'Wrong element!',
};

export const Disabled = (args) => <Combobox {...args} />;
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
      <Combobox
        {...args}
        id={getId()}
        label="Combobox"
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
      <Combobox
        {...args}
        id={getId()}
        label="Multi-select combobox"
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
      <Combobox {...args} id={getId()} label="Combobox" isOptionDisabled={getIsDisabled} />
      <Combobox
        {...args}
        id={getId()}
        label="Multi-select combobox"
        multiselect
        isOptionDisabled={getIsDisabled}
        style={{ marginTop: 'var(--spacing-s)' }}
      />
    </>
  );
};
DisabledOptions.storyName = 'With disabled options';

export const Icon = (args) => <Combobox {...args} icon={<IconFaceSmile />} />;
Icon.storyName = 'With icon';

export const ComboboxExample = (args) => {
  return (
    <Combobox<Option>
      {...args}
      placeholder="Type to search"
      getA11yComboboxionMessage={({ selectedItem }) => `${selectedItem.label} selected`}
    />
  );
};
ComboboxExample.storyName = 'Combobox example';

export const MultiSelectExample = (args) => {
  return (
    <Combobox<Option>
      {...args}
      label="Elements"
      helper="Choose elements"
      placeholder="Type to search"
      multiselect
      clearButtonAriaLabel="Clear all selections"
      selectedItemRemoveButtonAriaLabel="Remove element {value}"
      selectedItemSrLabel="Selected element {value}"
      getA11yRemovalMessage={({ removedSelectedItem }) => `${removedSelectedItem.label} was removed`}
    />
  );
};
MultiSelectExample.storyName = 'Multi-select combobox example';
