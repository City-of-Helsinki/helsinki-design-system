import React from 'react';
import { boolean, text, withKnobs } from '@storybook/addon-knobs';

import NumberInput from './NumberInput';

const numberInputProps = {
  id: 'hdsInput',
  labelText: 'label',
  placeholder: 'placeholder text',
};

export default {
  component: NumberInput,
  title: 'Components/NumberInput',
  decorators: [withKnobs, (storyFn) => <div style={{ maxWidth: '400px' }}>{storyFn()}</div>],
};

/**
 * Default
 */
export const Default = () => <NumberInput {...numberInputProps} step={0.1} />;

/**
 * With default value
 */
export const WithDefaultValue = () => <NumberInput {...numberInputProps} defaultValue={10.1} step={0.1} />;

WithDefaultValue.story = {
  name: 'With default value',
};

/**
 * Without placeholder
 */
export const WithoutPlaceholder = () => <NumberInput {...numberInputProps} placeholder={undefined} />;

WithoutPlaceholder.story = {
  name: 'Without placeholder',
};

/**
 * Disabled
 */
export const Disabled = () => <NumberInput {...numberInputProps} disabled />;

/**
 * Read-only
 */
export const ReadOnly = () => <NumberInput {...numberInputProps} readOnly defaultValue={10.1} />;

ReadOnly.story = {
  name: 'Read-only',
};

/**
 * With label hidden
 */
export const WithLabelHidden = () => <NumberInput {...numberInputProps} hideLabel />;

WithLabelHidden.story = {
  name: 'With label hidden',
};

/**
 * With tooltip
 */
export const WithTooltip = () => (
  <NumberInput
    {...numberInputProps}
    tooltipLabel="tooltip label"
    tooltipText="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris"
    tooltipOpenButtonLabelText="show tooltip"
    tooltipCloseButtonLabelText="close tooltip"
  />
);

WithTooltip.story = {
  name: 'With tooltip',
};

/**
 * With helper text
 */
export const WithHelperText = () => <NumberInput {...numberInputProps} helperText="helper text" />;

WithHelperText.story = {
  name: 'With helper text',
};

/**
 * Invalid
 */
export const Invalid = () => <NumberInput {...numberInputProps} invalid invalidText="error text" />;

/**
 * Playground
 */
export const Playground = () => {
  const groupGeneral = 'General';
  const groupTooltip = 'Tooltip';

  const label = text('Label', numberInputProps.labelText, groupGeneral);
  const placeholder = text('Placeholder', numberInputProps.placeholder, groupGeneral);
  const helperText = text('Helper text', 'helper text', groupGeneral);
  const invalidText = text('Invalid text', 'error text', groupGeneral);
  const disabled = boolean('Disabled', false, groupGeneral);
  const readOnly = boolean('Read-only', false, groupGeneral);
  const invalid = boolean('Invalid', false, groupGeneral);
  const hideLabel = boolean('Hide label', false, groupGeneral);

  const tooltipLabel = text('Tooltip label', 'tooltip label', groupTooltip);
  const tooltipText = text(
    'Tooltip text',
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    groupTooltip,
  );
  const tooltipOpenButtonLabelText = text('Tooltip open label', 'show tooltip', groupTooltip);
  const tooltipCloseButtonLabelText = text('Tooltip close label', 'close tooltip', groupTooltip);

  return (
    <NumberInput
      {...numberInputProps}
      labelText={label}
      helperText={helperText}
      invalidText={invalidText}
      placeholder={placeholder}
      readOnly={readOnly}
      disabled={disabled}
      invalid={invalid}
      hideLabel={hideLabel}
      tooltipLabel={tooltipLabel}
      tooltipText={tooltipText}
      tooltipOpenButtonLabelText={tooltipOpenButtonLabelText}
      tooltipCloseButtonLabelText={tooltipCloseButtonLabelText}
    />
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
