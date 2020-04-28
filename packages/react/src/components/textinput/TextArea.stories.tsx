import React from 'react';
import { boolean, text, withKnobs } from '@storybook/addon-knobs';

import TextArea from './TextArea';

const textAreaProps = {
  id: 'hdsInput',
  labelText: 'label',
  placeholder: 'placeholder text',
};

export default {
  component: TextArea,
  title: 'Components/TextArea',
  decorators: [withKnobs, (storyFn) => <div style={{ maxWidth: '400px' }}>{storyFn()}</div>],
};

/**
 * Default
 */
export const Default = () => <TextArea {...textAreaProps} />;

/**
 * With default value
 */
export const WithDefaultValue = () => <TextArea {...textAreaProps} defaultValue="default value" />;

WithDefaultValue.story = {
  name: 'With default value',
};

/**
 * Without placeholder
 */
export const WithoutPlaceholder = () => <TextArea {...textAreaProps} placeholder={undefined} />;

WithoutPlaceholder.story = {
  name: 'Without placeholder',
};

/**
 * Disabled
 */
export const Disabled = () => <TextArea {...textAreaProps} disabled />;

/**
 * Read-only
 */
export const ReadOnly = () => <TextArea {...textAreaProps} readOnly defaultValue="default value" />;

ReadOnly.story = {
  name: 'Read-only',
};

/**
 * With label hidden
 */
export const WithLabelHidden = () => <TextArea {...textAreaProps} hideLabel />;

WithLabelHidden.story = {
  name: 'With label hidden',
};

/**
 * With tooltip
 */
export const WithTooltip = () => (
  <TextArea
    {...textAreaProps}
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
export const WithHelperText = () => <TextArea {...textAreaProps} helperText="helper text" />;

WithHelperText.story = {
  name: 'With helper text',
};

/**
 * Invalid
 */
export const Invalid = () => <TextArea {...textAreaProps} invalid invalidText="error text" />;

/**
 * Playground
 */
export const Playground = () => {
  const groupGeneral = 'General';
  const groupTooltip = 'Tooltip';

  const label = text('Label', textAreaProps.labelText, groupGeneral);
  const placeholder = text('Placeholder', textAreaProps.placeholder, groupGeneral);
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
    <TextArea
      {...textAreaProps}
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
