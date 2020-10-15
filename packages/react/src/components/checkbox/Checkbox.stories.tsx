import React, { useState } from 'react';
import { color, number } from '@storybook/addon-knobs';
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

export const RichLabel = () => {
  const label = (
    <span>
      I have read city&apos;s {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
      <a style={{ color: 'var(--color-bus)', textDecoration: 'underline' }}>data protection principles</a>.
    </span>
  );
  return <Checkbox id="radio4" label={label} />;
};
RichLabel.storyName = 'With rich label';

export const Playground = () => {
  const [checkedItems, setCheckedItems] = useState({});
  const options = ['Option 1', 'Option 2', 'Option 3'];
  const groupSize = 'Size';
  const groupColor = 'Color';

  const handleChange = (e) => {
    const item = e.target.name;
    const isChecked = e.target.checked;
    setCheckedItems({ ...checkedItems, [item]: isChecked });
  };
  const size = number(
    'Size',
    24,
    {
      range: true,
      min: 10,
      max: 100,
      step: 1,
    },
    groupSize,
  );
  const iconScale = number(
    'Icon scale',
    1,
    {
      range: true,
      min: 0.1,
      max: 1,
      step: 0.05,
    },
    groupSize,
  );
  const borderWidth = number(
    'Border width',
    2,
    {
      range: true,
      min: 1,
      max: 10,
      step: 1,
    },
    groupSize,
  );
  const outlineWidth = number(
    'Outline width',
    3,
    {
      range: true,
      min: 1,
      max: 10,
      step: 1,
    },
    groupSize,
  );
  const fontSize = number(
    'Font-size',
    16,
    {
      range: true,
      min: 12,
      max: 32,
      step: 1,
    },
    groupSize,
  );
  const labelPadding = number(
    'Label padding',
    8,
    {
      range: true,
      min: 4,
      max: 32,
      step: 2,
    },
    groupSize,
  );
  const backgroundUnselected = color('Background - unselected', 'rgba(0, 0, 0, 0)', groupColor);
  const backgroundSelected = color('Background - selected', '#0000bf', groupColor);
  const backgroundHover = color('Background - hover', '#000098', groupColor);
  const backgroundDisabled = color('Background - disabled', '#e5e5e5', groupColor);
  const borderSelected = color('Border - selected', '#0000bf', groupColor);
  const borderSelectedHover = color('Border - selected - hover', '#000098', groupColor);
  const borderSelectedFocus = color('Border - selected - focus', '#0000bf', groupColor);
  const borderUnselected = color('Border - unselected', '#808080', groupColor);
  const borderUnselectedHover = color('Border - unselected - hover', '#1a1a1a', groupColor);
  const borderUnselectedFocus = color('Border - unselected - focus', '#000000', groupColor);
  const borderDisabled = color('Border - disabled', '#e5e5e5', groupColor);
  const focusOutline = color('Focus outline', '#0072c6', groupColor);
  const iconUnselected = color('Icon - unselected', 'rgba(0, 0, 0, 0)', groupColor);
  const iconSelected = color('Icon - selected', '#ffffff', groupColor);
  const iconDisabled = color('Icon - disabled', '#ffffff', groupColor);
  const labelDefault = color('Label', '#1a1a1a', groupColor);
  const labelDisabled = color('Label - disabled', '#999898', groupColor);

  const styles = {
    '--size': `${size}px`,
    '--icon-scale': iconScale,
    '--border-width': `${borderWidth}px`,
    '--outline-width': `${outlineWidth}px`,
    '--label-font-size': `${fontSize}px`,
    '--label-padding': `${labelPadding}px`,
    '--background-unselected': backgroundUnselected,
    '--background-selected': backgroundSelected,
    '--background-hover': backgroundHover,
    '--background-disabled': backgroundDisabled,
    '--border-color-selected': borderSelected,
    '--border-color-selected-hover': borderSelectedHover,
    '--border-color-selected-focus': borderSelectedFocus,
    '--border-color-unselected': borderUnselected,
    '--border-color-unselected-hover': borderUnselectedHover,
    '--border-color-unselected-focus': borderUnselectedFocus,
    '--border-color-disabled': borderDisabled,
    '--focus-outline-color': focusOutline,
    '--icon-color-unselected': iconUnselected,
    '--icon-color-selected': iconSelected,
    '--icon-color-disabled': iconDisabled,
    '--label-color': labelDefault,
    '--label-color-disabled': labelDisabled,
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
