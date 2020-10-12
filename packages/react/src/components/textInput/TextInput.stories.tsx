import React, { useRef } from 'react';
import { boolean, text, withKnobs } from '@storybook/addon-knobs';
import { ArgsTable, Stories, Title } from '@storybook/addon-docs/blocks';

import { TextInput } from './TextInput';
import { Button } from '../button';

const textInputProps = {
  helperText: 'Assistive text',
  id: 'hdsInput',
  label: 'Label',
  placeholder: 'Placeholder',
};

export default {
  component: TextInput,
  title: 'Components/TextInput',
  decorators: [withKnobs, (storyFn) => <div style={{ maxWidth: '400px' }}>{storyFn()}</div>],
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

export const Default = () => <TextInput {...textInputProps} />;

export const ReadOnly = () => <TextInput {...textInputProps} readOnly defaultValue="Text input value" />;
ReadOnly.storyName = 'Read-only';

export const Disabled = () => <TextInput {...textInputProps} disabled defaultValue="Text input value" />;

export const Invalid = () => <TextInput {...textInputProps} invalid helperText="Error text" />;

export const WithLabelHidden = () => <TextInput {...textInputProps} hideLabel />;
WithLabelHidden.storyName = 'With label hidden';

export const WithTooltip = () => (
  <TextInput
    {...textInputProps}
    tooltipLabel="tooltip label"
    tooltipText="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris"
    tooltipOpenButtonLabelText="show tooltip"
    tooltipCloseButtonLabelText="close tooltip"
  />
);
WithTooltip.storyName = 'With tooltip';

export const NumberInput = () => <TextInput {...textInputProps} type="number" />;

export const UsingRef = () => {
  const ref = useRef(null);

  return (
    <>
      <Button onClick={() => ref?.current?.focus()} style={{ marginBottom: '1rem' }} theme="black" size="small">
        Focus input
      </Button>
      <TextInput {...textInputProps} ref={ref} />
    </>
  );
};
UsingRef.storyName = 'Using ref';

export const Playground = () => {
  const groupGeneral = 'General';
  const groupTooltip = 'Tooltip';

  const label = text('Label', textInputProps.label, groupGeneral);
  const placeholder = text('Placeholder', textInputProps.placeholder, groupGeneral);
  const helperText = text('Helper text', textInputProps.helperText, groupGeneral);
  const type = text('Type', 'text', groupGeneral);
  const disabled = boolean('Disabled', false, groupGeneral);
  const required = boolean('Required', false, groupGeneral);
  const readOnly = boolean('Read-only', false, groupGeneral);
  const invalid = boolean('Invalid', false, groupGeneral);
  const hideLabel = boolean('Hide label', false, groupGeneral);

  const tooltipLabel = text('Tooltip label', 'Tooltip label', groupTooltip);
  const tooltipText = text(
    'Tooltip text',
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    groupTooltip,
  );
  const tooltipOpenButtonLabelText = text('Tooltip open label', 'Show tooltip', groupTooltip);
  const tooltipCloseButtonLabelText = text('Tooltip close label', 'Close tooltip', groupTooltip);

  return (
    <TextInput
      {...textInputProps}
      type={type}
      label={label}
      helperText={helperText}
      placeholder={placeholder}
      readOnly={readOnly}
      disabled={disabled}
      invalid={invalid}
      hideLabel={hideLabel}
      required={required}
      tooltipLabel={tooltipLabel}
      tooltipText={tooltipText}
      tooltipOpenButtonLabelText={tooltipOpenButtonLabelText}
      tooltipCloseButtonLabelText={tooltipCloseButtonLabelText}
    />
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
