import React, { useState } from 'react';
import { ArgsTable, Stories, Title } from '@storybook/addon-docs/blocks';

import { Checkbox } from './Checkbox';

export default {
  component: Checkbox,
  title: 'Components/Checkbox',
  parameters: {
    controls: { hideNoControlsWarning: true },
    docs: {
      page: () => (
        <>
          <Title>Props</Title>
          <ArgsTable />
          <Stories title="Examples" includePrimary />
        </>
      ),
    },
  },
};

export const Default = () => <Checkbox id="checkbox" label="Label" />;

export const Selected = () => <Checkbox id="checkbox2" label="Label" checked />;

export const Disabled = () => <Checkbox id="checkbox3" label="Label" disabled />;

export const Invalid = () => <Checkbox id="checkbox" label="Label" errorText="Error text" />;

export const SelectedDisabled = () => <Checkbox id="checkbox4" label="Label" checked disabled />;
SelectedDisabled.storyName = 'Selected & disabled';

export const Custom = () => {
  const [checked, setChecked] = useState(false);
  const customStyles = {
    '--size': '40px',
    '--icon-scale': 0.6,
    '--border-width': '3px',
    '--outline-width': '4px',
    '--background-selected': 'var(--color-success)',
    '--background-hover': 'var(--color-success-dark)',
    '--border-color-selected': 'var(--color-success)',
    '--border-color-selected-hover': 'var(--color-success-dark)',
    '--border-color-selected-focus': 'var(--color-success)',
    '--focus-outline-color': 'var(--color-black-20)',
  } as React.CSSProperties;
  return (
    <Checkbox
      id="checkbox5"
      label="Label"
      style={customStyles}
      checked={checked}
      onChange={() => setChecked(!checked)}
    />
  );
};
Custom.storyName = 'With custom styles';

export const Playground = (args) => {
  const [checkedItems, setCheckedItems] = useState({});
  const options = ['Option 1', 'Option 2', 'Option 3'];

  const handleChange = (e) => {
    const item = e.target.name;
    const isChecked = e.target.checked;
    setCheckedItems({ ...checkedItems, [item]: isChecked });
  };

  const styles = {
    '--size': `${args.size}px`,
    '--icon-scale': args.iconScale,
    '--border-width': `${args.borderWidth}px`,
    '--outline-width': `${args.outlineWidth}px`,
    '--label-font-size': `${args.labelFontSize}px`,
    '--label-padding': `${args.labelPadding}px`,
    '--background-unselected': args.backgroundUnselected,
    '--background-selected': args.backgroundSelected,
    '--background-hover': args.backgroundHover,
    '--background-disabled': args.backgroundDisabled,
    '--border-color-selected': args.borderColorSelected,
    '--border-color-selected-hover': args.borderColorSelectedHover,
    '--border-color-selected-focus': args.borderColorSelectedFocus,
    '--border-color-unselected': args.borderColorUnselected,
    '--border-color-unselected-hover': args.borderColorUnselectedHover,
    '--border-color-unselected-focus': args.borderColorUnselectedFocus,
    '--border-color-disabled': args.borderColorDisabled,
    '--focus-outline-color': args.focusOutlineColor,
    '--icon-color-unselected': args.iconColorUnselected,
    '--icon-color-selected': args.iconColorSelected,
    '--icon-color-disabled': args.iconColorDisabled,
    '--label-color': args.labelColorDefault,
    '--label-color-disabled': args.labelColorDisabled,
  } as React.CSSProperties;

  return (
    <>
      {options.map((item) => (
        <Checkbox
          key={`checkbox-${item}`}
          id={`checkbox-${item}`}
          label={item}
          name={item}
          checked={checkedItems[item]}
          onChange={handleChange}
          style={styles}
        />
      ))}
      <Checkbox id="checkbox7" label="Option 4" style={styles} disabled />
      <Checkbox id="checkbox8" label="Option 5" style={styles} checked disabled />
    </>
  );
};
Playground.parameters = {
  previewTabs: {
    'storybook/docs/panel': {
      hidden: true,
    },
  },
  docs: {
    disable: true,
  },
};

Playground.args = {
  size: 24,
  iconScale: 1,
  borderWidth: 2,
  outlineWidth: 3,
  labelFontSize: 16,
  labelPadding: 8,
  backgroundUnselected: 'rgba(0, 0, 0, 0)',
  backgroundSelected: '#0000bf',
  backgroundHover: '#000098',
  backgroundDisabled: '#e5e5e5',
  borderColorSelected: '#0000bf',
  borderColorSelectedHover: '#000098',
  borderColorSelectedFocus: '#0000bf',
  borderColorUnselected: '#808080',
  borderColorUnselectedHover: '#1a1a1a',
  borderColorUnselectedFocus: '#000000',
  borderColorDisabled: '#e5e5e5',
  focusOutlineColor: '#0072c6',
  iconColorUnselected: 'rgba(0, 0, 0, 0)',
  iconColorSelected: '#ffffff',
  iconColorDisabled: '#ffffff',
  labelColorDefault: '#1a1a1a',
  labelColorDisabled: '#999898',
};

Playground.argTypes = {
  size: {
    control: {
      type: 'range',
      min: 10,
      max: 100,
      step: 1,
    },
  },
  iconScale: {
    control: {
      type: 'range',
      min: 0.1,
      max: 1,
      step: 0.05,
    },
  },
  borderWidth: {
    control: {
      type: 'range',
      min: 1,
      max: 10,
      step: 1,
    },
  },
  outlineWidth: {
    control: {
      type: 'range',
      min: 1,
      max: 10,
      step: 1,
    },
  },
  labelFontSize: {
    control: {
      type: 'range',
      min: 12,
      max: 32,
      step: 1,
    },
  },
  labelPadding: {
    control: {
      type: 'range',
      min: 4,
      max: 32,
      step: 2,
    },
  },
  backgroundUnselected: { control: { type: 'color' } },
  backgroundSelected: { control: { type: 'color' } },
  backgroundHover: { control: { type: 'color' } },
  backgroundDisabled: { control: { type: 'color' } },
  borderColorSelected: { control: { type: 'color' } },
  borderColorSelectedHover: { control: { type: 'color' } },
  borderColorSelectedFocus: { control: { type: 'color' } },
  borderColorUnselected: { control: { type: 'color' } },
  borderColorUnselectedHover: { control: { type: 'color' } },
  borderColorUnselectedFocus: { control: { type: 'color' } },
  borderColorDisabled: { control: { type: 'color' } },
  focusOutlineColor: { control: { type: 'color' } },
  iconColorUnselected: { control: { type: 'color' } },
  iconColorSelected: { control: { type: 'color' } },
  iconColorDisabled: { control: { type: 'color' } },
  labelColorDefault: { control: { type: 'color' } },
  labelColorDisabled: { control: { type: 'color' } },
};
