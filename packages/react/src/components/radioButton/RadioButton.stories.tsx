import React, { useState } from 'react';
import { ArgsTable, Stories, Title } from '@storybook/addon-docs/blocks';

import { RadioButton } from './RadioButton';

export default {
  component: RadioButton,
  title: 'Components/RadioButton',
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

export const Default = () => <RadioButton id="radio" label="Label" />;

export const Selected = () => <RadioButton id="radio2" label="Label" checked />;

export const Disabled = () => <RadioButton id="radio3" label="Label" disabled />;

export const SelectedDisabled = () => <RadioButton id="radio4" label="Label" checked disabled />;
SelectedDisabled.storyName = 'Selected & disabled';

export const Custom = () => {
  const [radioValue, setRadioValue] = useState('foo');
  const options = ['foo', 'bar'];

  const customStyles = {
    '--size': '36px',
    '--icon-scale': 0.65,
    '--border-width': '3px',
    '--outline-width': '4px',
    '--border-color-selected': 'var(--color-success)',
    '--border-color-selected-hover': 'var(--color-success-dark)',
    '--border-color-selected-focus': 'var(--color-success)',
    '--icon-color-selected': 'var(--color-success)',
    '--icon-color-hover': 'var(--color-success-dark)',
    '--focus-outline-color': 'var(--color-black-20)',
  } as React.CSSProperties;

  return (
    <>
      {options.map((option) => (
        <RadioButton
          key={`radio-${option}`}
          id={`radio-${option}`}
          value={option}
          label="Label"
          style={customStyles}
          checked={radioValue === option}
          onChange={(event) => setRadioValue((event.target as HTMLInputElement).value)}
        />
      ))}
    </>
  );
};
Custom.storyName = 'With custom styles';

export const Playground = (args) => {
  const [radioValue, setRadioValue] = useState(null);
  const options = ['foo', 'bar', 'baz'];

  const styles = {
    '--size': `${args.size}px`,
    '--icon-scale': args.iconScale,
    '--border-width': `${args.borderWidth}px`,
    '--outline-width': `${args.outlineWidth}px`,
    '--label-font-size': `${args.labelFontSize}px`,
    '--label-padding': `${args.labelPadding}px`,
    '--background': args.background,
    '--background-hover': args.backgroundHover,
    '--background-focus': args.backgroundFocus,
    '--background-unselected-disabled': args.backgroundUnselectedDisabled,
    '--background-selected-disabled': args.backgroundSelectedDisabled,
    '--border-color-focus': args.borderColorFocus,
    '--border-color-selected': args.borderColorSelected,
    '--border-color-selected-hover': args.borderColorSelectedHover,
    '--border-color-selected-disabled': args.borderColorSelectedDisabled,
    '--border-color-unselected': args.borderColorUnselected,
    '--border-color-unselected-hover': args.borderColorUnselectedHover,
    '--border-color-unselected-disabled': args.borderColorUnselectedDisabled,
    '--focus-outline-color': args.focusOutlineColor,
    '--icon-color-unselected': args.iconColorUnselected,
    '--icon-color-selected': args.iconColorSelected,
    '--icon-color-disabled': args.iconColorDisabled,
    '--label-color': args.labelColorDefault,
    '--label-color-disabled': args.labelColorDisabled,
  } as React.CSSProperties;

  return (
    <>
      {options.map((option) => (
        <RadioButton
          key={`radio-${option}`}
          id={`radio-${option}`}
          value={option}
          label="Label"
          style={styles}
          checked={radioValue === option}
          onChange={(event) => setRadioValue((event.target as HTMLInputElement).value)}
        />
      ))}
      <RadioButton id="radio4" label="Label" style={styles} disabled />
      <RadioButton id="radio5" label="Label" style={styles} disabled checked />
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
  iconScale: 0.5,
  borderWidth: 2,
  outlineWidth: 3,
  labelFontSize: 16,
  labelPadding: 8,
  background: '#ffffff',
  backgroundHover: '#ffffff',
  backgroundFocus: '#ffffff',
  backgroundUnselectedDisabled: '#e5e5e5',
  backgroundSelectedDisabled: '#ffffff',
  borderColorFocus: '#1a1a1a',
  borderColorSelected: '#0000bf',
  borderColorSelectedHover: '#000098',
  borderColorSelectedDisabled: '#cccccc',
  borderColorUnselected: '#808080',
  borderColorUnselectedHover: '#1a1a1a',
  borderColorUnselectedDisabled: '#e5e5e5',
  focusOutlineColor: '#0072c6',
  iconColorUnselected: 'rgba(0, 0, 0, 0)',
  iconColorSelected: '#0000bf',
  iconColorDisabled: '#e5e5e5',
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
      max: 0.9,
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
  background: { control: { type: 'color' } },
  backgroundHover: { control: { type: 'color' } },
  backgroundFocus: { control: { type: 'color' } },
  backgroundUnselectedDisabled: { control: { type: 'color' } },
  backgroundSelectedDisabled: { control: { type: 'color' } },
  borderColorFocus: { control: { type: 'color' } },
  borderColorSelected: { control: { type: 'color' } },
  borderColorSelectedHover: { control: { type: 'color' } },
  borderColorSelectedDisabled: { control: { type: 'color' } },
  borderColorUnselected: { control: { type: 'color' } },
  borderColorUnselectedHover: { control: { type: 'color' } },
  borderColorUnselectedDisabled: { control: { type: 'color' } },
  focusOutlineColor: { control: { type: 'color' } },
  iconColorUnselected: { control: { type: 'color' } },
  iconColorSelected: { control: { type: 'color' } },
  iconColorDisabled: { control: { type: 'color' } },
  labelColorDefault: { control: { type: 'color' } },
  labelColorDisabled: { control: { type: 'color' } },
};
