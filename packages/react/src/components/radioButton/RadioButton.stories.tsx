import React, { useState } from 'react';
import { color, number } from '@storybook/addon-knobs';
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

export const RichLabel = () => {
  const label = (
    <span>
      Label with{' '}
      <a style={{ color: 'var(--color-bus)' }} href="/?path=/story/components-radiobutton--rich-label">
        link
      </a>
    </span>
  );
  return <RadioButton id="radio4" label={label} />;
};
RichLabel.storyName = 'With rich label';

export const Playground = () => {
  const [radioValue, setRadioValue] = useState(null);
  const options = ['foo', 'bar', 'baz'];

  const groupSize = 'Size';
  const groupColor = 'Color';
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
    0.5,
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
  const background = color('Background - unselected', '#ffffff', groupColor);
  const backgroundHover = color('Background - hover', '#ffffff', groupColor);
  const backgroundFocus = color('Background - focus', '#ffffff', groupColor);
  const backgroundUnselectedDisabled = color('Background - unselected - disabled', '#e5e5e5', groupColor);
  const backgroundSelectedDisabled = color('Background - selected - disabled', '#ffffff', groupColor);
  const borderFocus = color('Border - focus', '#1a1a1a', groupColor);
  const borderSelected = color('Border - selected', '#0000bf', groupColor);
  const borderSelectedHover = color('Border - selected - hover', '#000098', groupColor);
  const borderSelectedDisabled = color('Border - selected - disabled', '#cccccc', groupColor);
  const borderUnselected = color('Border - unselected', '#808080', groupColor);
  const borderUnselectedHover = color('Border - unselected - hover', '#1a1a1a', groupColor);
  const borderUnselectedDisabled = color('Border - unselected - disabled', '#e5e5e5', groupColor);
  const focusOutline = color('Focus outline', '#0072c6', groupColor);
  const iconUnselected = color('Icon - unselected', 'rgba(0, 0, 0, 0)', groupColor);
  const iconSelected = color('Icon - selected', '#0000bf', groupColor);
  const iconDisabled = color('Icon - disabled', '#e5e5e5', groupColor);
  const labelDefault = color('Label', '#1a1a1a', groupColor);
  const labelDisabled = color('Label - disabled', '#999898', groupColor);

  const styles = {
    '--size': `${size}px`,
    '--icon-scale': iconScale,
    '--border-width': `${borderWidth}px`,
    '--outline-width': `${outlineWidth}px`,
    '--label-font-size': `${fontSize}px`,
    '--label-padding': `${labelPadding}px`,
    '--background': background,
    '--background-hover': backgroundHover,
    '--background-focus': backgroundFocus,
    '--background-unselected-disabled': backgroundUnselectedDisabled,
    '--background-selected-disabled': backgroundSelectedDisabled,
    '--border-color-focus': borderFocus,
    '--border-color-selected': borderSelected,
    '--border-color-selected-hover': borderSelectedHover,
    '--border-color-selected-disabled': borderSelectedDisabled,
    '--border-color-unselected': borderUnselected,
    '--border-color-unselected-hover': borderUnselectedHover,
    '--border-color-unselected-disabled': borderUnselectedDisabled,
    '--focus-outline-color': focusOutline,
    '--icon-color-unselected': iconUnselected,
    '--icon-color-selected': iconSelected,
    '--icon-color-disabled': iconDisabled,
    '--label-color': labelDefault,
    '--label-color-disabled': labelDisabled,
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
