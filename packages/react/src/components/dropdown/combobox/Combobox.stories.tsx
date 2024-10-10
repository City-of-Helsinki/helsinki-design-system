import React, { useState } from 'react';
import { action } from '@storybook/addon-actions';
import { uniqueId } from 'lodash';

import { Button } from '../../button';
import { Combobox, ComboboxProps } from './Combobox';
import { IconFaceSmile, IconLocation } from '../../../icons';
import { MultiSelectProps } from '../select';

type Option = { label: string };
type MultiSelectEssentials = Pick<MultiSelectProps<Option>, 'onChange' | 'multiselect'>;
// when aria-labelledby is set, label must be undefined
type MultiSelectArgsWithLabel = ComboboxProps<Option> & { 'aria-labelledby': undefined } & MultiSelectEssentials;
type DefaultArgs = Pick<
  Required<ComboboxProps<Option>>,
  | 'id'
  | 'label'
  | 'helper'
  | 'placeholder'
  | 'clearButtonAriaLabel'
  | 'options'
  | 'onBlur'
  | 'onFocus'
  | 'toggleButtonAriaLabel'
> & { multiselect: false; onChange: (option: Option | Option[]) => void };

type StoryArgs = DefaultArgs & Partial<ComboboxProps<Option>>;
// for some reason ComboboxProps<Option> causes ts errors
type ComponentProps = ComboboxProps<{ label: string }>;
type MultiSelectComponentProps = ComponentProps & MultiSelectEssentials;

function getId(): string {
  return uniqueId('hds-combobox-');
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

function getRegionOptions() {
  return [
    { label: 'Helsinki', value: 'helsinki' },
    { label: 'Helsinki east region', value: 'helsinki-east' },
    { label: 'Helsinki north region', value: 'helsinki-north' },
    { label: 'Helsinki northeast region', value: 'helsinki-northeast' },
    { label: 'Helsinki northwest region', value: 'helsinki-northwest' },
    { label: 'Helsinki west region', value: 'helsinki-west' },
  ];
}

export default {
  component: Combobox,
  title: 'Components/Dropdowns/Combobox',
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
    toggleButtonAriaLabel: 'Open the combobox',
  } as DefaultArgs,
};

export const Default = (args: StoryArgs) => <Combobox {...(args as ComponentProps)} />;

export const WithClearButton = (args: StoryArgs) => <Combobox {...(args as ComponentProps)} />;
WithClearButton.storyName = 'With clear button';
WithClearButton.args = {
  clearable: true,
};
WithClearButton.parameters = { loki: { skip: true } };

export const Multiselect = (args: StoryArgs) => <Combobox {...(args as ComponentProps)} />;
Multiselect.storyName = 'Multi-select';
Multiselect.args = {
  multiselect: true,
  options: getRegionOptions(),
  selectedItemRemoveButtonAriaLabel: 'Remove {value}',
};

export const Invalid = (args: StoryArgs) => <Combobox {...(args as ComponentProps)} />;
Invalid.args = {
  invalid: true,
  error: 'Wrong item!',
};

export const Disabled = (args: StoryArgs) => <Combobox {...(args as ComponentProps)} />;
Disabled.args = {
  disabled: true,
};

export const Controlled = (args: StoryArgs) => {
  const [selectedItem, setSelectedItem] = useState<Option | null>(null);
  const [selectedItems, setSelectedItems] = useState<Option[] | null>(null);

  const handleChange = (item: Option) => {
    action('onChange')(item);
    setSelectedItem(item);
  };

  const handleMultiSelectChange = (item: Option[]) => {
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
        {...(args as DefaultArgs)}
        id={getId()}
        label="Combobox"
        onChange={handleChange}
        value={selectedItem}
        style={{ marginTop: 'var(--spacing-s)' }}
        toggleButtonAriaLabel="Open the combobox"
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
      <Combobox<Option>
        {...(args as unknown as MultiSelectComponentProps & { 'aria-labelledby': undefined })}
        id={getId()}
        label="Multi-select combobox"
        multiselect
        selectedItemRemoveButtonAriaLabel="Remove {value}"
        onChange={handleMultiSelectChange}
        value={selectedItems}
        style={{ marginTop: 'var(--spacing-s)' }}
      />
    </>
  );
};

export const DisabledOptions = (args: StoryArgs) => {
  const getIsDisabled = (item: Option, index: number): boolean => index % 2 === 1;

  return (
    <>
      <Combobox {...(args as DefaultArgs)} id={getId()} label="Combobox" isOptionDisabled={getIsDisabled} />
      <Combobox<Option>
        {...(args as unknown as MultiSelectArgsWithLabel)}
        id={getId()}
        label="Multi-select combobox"
        multiselect
        selectedItemRemoveButtonAriaLabel="Remove {value}"
        isOptionDisabled={getIsDisabled}
        style={{ marginTop: 'var(--spacing-s)' }}
      />
    </>
  );
};
DisabledOptions.storyName = 'With disabled options';

export const Icon = (args: ComboboxProps<Option>) => (
  <Combobox {...(args as ComponentProps)} icon={<IconFaceSmile />} />
);
Icon.storyName = 'With icon';

export const MultiselectWithIcon = (args: ComboboxProps<Option>) => (
  <Combobox {...(args as ComponentProps)} icon={<IconLocation />} />
);
MultiselectWithIcon.storyName = 'Multi-select with icon';
MultiselectWithIcon.args = {
  multiselect: true,
  options: getRegionOptions(),
  selectedItemRemoveButtonAriaLabel: 'Remove {value}',
};

MultiselectWithIcon.parameters = { loki: { skip: true } };

export const Tooltip = (args: ComboboxProps<Option>) => <Combobox {...(args as ComponentProps)} />;
Tooltip.storyName = 'With tooltip';
Tooltip.args = {
  tooltipLabel: 'Tooltip',
  tooltipButtonLabel: 'Tooltip',
  tooltipText:
    'Tooltips contain "nice to have" information. Default Tooltip contents should not be longer than two to three sentences. For longer descriptions, provide a link to a separate page.',
};

export const CustomTheme = (args: StoryArgs) => (
  <Combobox<Option>
    {...(args as unknown as MultiSelectArgsWithLabel)}
    multiselect
    selectedItemRemoveButtonAriaLabel="Remove {value}"
  />
);
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

export const ComboboxExample = (args: ComboboxProps<Option>) => {
  return (
    <Combobox
      {...(args as ComponentProps)}
      placeholder="Type to search"
      getA11ySelectionMessage={({ selectedItem }) => {
        return selectedItem ? `${selectedItem.label} selected` : '';
      }}
    />
  );
};
ComboboxExample.storyName = 'Combobox example';

export const MultiSelectExample = (args: MultiSelectArgsWithLabel) => {
  return (
    <Combobox<Option>
      {...(args as unknown as MultiSelectComponentProps & { 'aria-labelledby': undefined })}
      label="Items"
      helper="Choose items"
      placeholder="Type to search"
      multiselect
      clearButtonAriaLabel="Clear all selections"
      selectedItemRemoveButtonAriaLabel="Remove {value}"
      selectedItemSrLabel="Selected item {value}"
      getA11yRemovalMessage={({ removedSelectedItem }) => `${removedSelectedItem.label} was removed`}
      toggleButtonAriaLabel="Open the combobox"
    />
  );
};
MultiSelectExample.storyName = 'Multi-select combobox example';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const WithExternalLabel = (args: ComboboxProps<Option>) => {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr' }}>
      <p id="externalLabelId">External label for the combobox</p>
      <Combobox
        aria-labelledby="externalLabelId"
        id={getId()}
        helper="Choose an item"
        placeholder="Placeholder"
        clearButtonAriaLabel="Clear selection"
        options={options}
        onBlur={action('onBlur')}
        onChange={(change) => action('onChange')(change)}
        onFocus={action('onFocus')}
        toggleButtonAriaLabel="Open the combobox"
      />
    </div>
  );
};

WithExternalLabel.storyName = 'With external label';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const MultiSelectWithDefaultValue = (args: DefaultArgs) => {
  // this story also tests very long labels are displayed correctly.
  const optionsWithLongText = [
    { label: 'This is a long text that is wider than the container, but should still be visible' },
    ...options,
  ];
  return (
    <Combobox
      aria-labelledby="externalLabelId"
      id={getId()}
      helper="Choose an element"
      placeholder="Placeholder"
      clearButtonAriaLabel="Clear selection"
      options={optionsWithLongText}
      onBlur={action('onBlur')}
      onChange={(change) => action('onChange')(change)}
      onFocus={action('onFocus')}
      toggleButtonAriaLabel="Open the combobox"
      defaultValue={[optionsWithLongText[0], optionsWithLongText[1], optionsWithLongText[4]]}
      selectedItemRemoveButtonAriaLabel="Remove element {value}"
      multiselect
    />
  );
};

MultiSelectWithDefaultValue.storyName = 'Multi-select with pre-selected values';
