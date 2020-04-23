import React from 'react';
import { boolean, text, withKnobs } from '@storybook/addon-knobs';

import TextInput from './TextInput';

const textInputProps = {
  id: 'hdsInput',
  labelText: 'label',
  placeholder: 'placeholder text',
};

export default {
  component: TextInput,
  title: 'Components/TextInput',
  decorators: [withKnobs, (storyFn) => <div style={{ maxWidth: '400px' }}>{storyFn()}</div>],
};

/**
 * Default
 */
export const Default = () => <TextInput {...textInputProps} />;

/**
 * With default value
 */
export const WithDefaultValue = () => <TextInput {...textInputProps} defaultValue="default value" />;

WithDefaultValue.story = {
  name: 'With default value',
};

/**
 * Without placeholder
 */
export const WithoutPlaceholder = () => <TextInput {...textInputProps} placeholder={undefined} />;

WithoutPlaceholder.story = {
  name: 'Without placeholder',
};

/**
 * Disabled
 */
export const Disabled = () => <TextInput {...textInputProps} disabled />;

/**
 * Read-only
 */
export const ReadOnly = () => <TextInput {...textInputProps} readOnly defaultValue="default value" />;

ReadOnly.story = {
  name: 'Read-only',
};

/**
 * With label hidden
 */
export const WithLabelHidden = () => <TextInput {...textInputProps} hideLabel />;

WithLabelHidden.story = {
  name: 'With label hidden',
};

/**
 * With tooltip
 */
export const WithTooltip = () => (
  <TextInput
    {...textInputProps}
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
export const WithHelperText = () => <TextInput {...textInputProps} helperText="helper text" />;

WithHelperText.story = {
  name: 'With helper text',
};

/**
 * Invalid
 */
export const Invalid = () => <TextInput {...textInputProps} invalid invalidText="error text" />;

/**
 * Playground
 */
export const Playground = () => {
  const groupGeneral = 'General';
  const groupTooltip = 'Tooltip';

  const label = text('Label', textInputProps.labelText, groupGeneral);
  const placeholder = text('Placeholder', textInputProps.placeholder, groupGeneral);
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
    <TextInput
      {...textInputProps}
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
