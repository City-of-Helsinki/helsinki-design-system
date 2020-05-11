import React, { useState } from 'react';
import { color, number } from '@storybook/addon-knobs';
import { Props, Stories, Subtitle, Title } from '@storybook/addon-docs/dist/blocks';

import Checkbox from './Checkbox';

export default {
  component: Checkbox,
  title: 'Components/Checkbox',
  parameters: {
    docs: {
      page: () => (
        <>
          <Title>Props</Title>
          <Subtitle>Props, which are not mentioned below, are passed to the native element</Subtitle>
          <Props />
          <Stories title="Examples" includePrimary />
        </>
      ),
    },
  },
};

export const Default = () => <Checkbox id="checkbox" labelText="Label" />;

export const Selected = () => <Checkbox id="checkbox2" labelText="Label" checked />;

export const Disabled = () => <Checkbox id="checkbox3" labelText="Label" disabled />;

export const SelectedDisabled = () => <Checkbox id="checkbox4" labelText="Label" checked disabled />;

SelectedDisabled.story = {
  name: 'Selected & disabled',
};

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
      labelText="Label"
      style={customStyles}
      checked={checked}
      onChange={() => setChecked(!checked)}
    />
  );
};

Custom.story = {
  name: 'With custom styles',
};

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
    0.75,
    {
      range: true,
      min: 0.1,
      max: 0.9,
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
          labelText={item}
          name={item}
          checked={checkedItems[item]}
          onChange={handleChange}
          style={styles}
        />
      ))}
      <Checkbox id="checkbox7" labelText="Option 4" style={styles} disabled />
      <Checkbox id="checkbox8" labelText="Option 5" style={styles} checked disabled />
    </>
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
