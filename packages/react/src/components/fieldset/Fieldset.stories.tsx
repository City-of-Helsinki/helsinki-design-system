import React, { useState } from 'react';

import { Fieldset, FieldsetProps } from './Fieldset';
import { TextInput } from '../textInput/TextInput';
import { RadioButton } from '../radioButton/RadioButton';
import { SelectionGroup } from '../selectionGroup/SelectionGroup';
import { Tooltip } from '../tooltip';

export default {
  component: Fieldset,
  title: 'Components/Fieldset',
  decorators: [(storyFn) => <div style={{ maxWidth: '600px' }}>{storyFn()}</div>],
  parameters: {
    controls: { expanded: true },
  },
  args: {
    border: false,
    heading: 'Applicant information',
  },
};

export const Default = (args: FieldsetProps) => {
  return (
    <Fieldset heading={args.heading} border={args.border}>
      <div
        style={{ display: 'grid', gridGap: '12px 16px', gridTemplateColumns: 'repeat(auto-fill, minmax(245px, 1fr))' }}
      >
        <TextInput id="first-name" name="first-name" label="First name" />
        <TextInput id="last-name" name="last-name" label="Last name" />
      </div>
      <div
        style={{
          marginTop: '12px',
        }}
      >
        <TextInput
          id="social-security-number"
          name="social-security-number"
          label="Social security number"
          placeholder="Eg. 111299-1234"
        />
      </div>
    </Fieldset>
  );
};

export const WithBorder = (args: FieldsetProps) => {
  return (
    <Fieldset heading={args.heading} border={args.border}>
      <div
        style={{
          display: 'grid',
          gridGap: '12px 16px',
          gridTemplateColumns: 'repeat(auto-fill, minmax(245px, 1fr))',
        }}
      >
        <TextInput id="first-name" name="first-name" label="First name" />
        <TextInput id="last-name" name="last-name" label="Last name" />
      </div>
      <div
        style={{
          marginTop: '12px',
        }}
      >
        <TextInput
          id="social-security-number"
          name="social-security-number"
          label="Social security number"
          placeholder="Eg. 111299-1234"
        />
      </div>
    </Fieldset>
  );
};

WithBorder.args = {
  border: true,
};

export const WithSelectionGroup = (args: FieldsetProps) => {
  const fileFormats = [
    { label: 'Text', value: 'txt' },
    { label: 'CSV', value: 'csv' },
    { label: 'HTML', value: 'html' },
  ];

  const [radioValue, setRadioValue] = useState<string>(fileFormats[0].value);

  return (
    <Fieldset heading={args.heading} border={args.border}>
      <TextInput id="file-name" name="file-name" label="File name" />
      <SelectionGroup label="File format" style={{ marginTop: '12px' }}>
        {fileFormats.map(({ value, label }) => (
          <RadioButton
            key={`radio-${value}`}
            id={`radio-${value}`}
            value={value}
            label={label}
            checked={radioValue === value}
            onChange={(event) => setRadioValue((event.target as HTMLInputElement).value)}
          />
        ))}
      </SelectionGroup>
    </Fieldset>
  );
};

WithSelectionGroup.args = {
  border: true,
  heading: 'File information',
};

export const WithTooltip = (args: FieldsetProps) => {
  return (
    <Fieldset {...args}>
      <div
        style={{
          display: 'grid',
          gridGap: '12px 16px',
          gridTemplateColumns: 'repeat(auto-fill, minmax(245px, 1fr))',
        }}
      >
        <TextInput id="first-name" name="first-name" label="First name" />
        <TextInput id="last-name" name="last-name" label="Last name" />
      </div>
      <div
        style={{
          marginTop: '12px',
        }}
      >
        <TextInput
          id="social-security-number"
          name="social-security-number"
          label="Social security number"
          placeholder="Eg. 111299-1234"
        />
      </div>
    </Fieldset>
  );
};

WithTooltip.args = {
  tooltip: (
    <Tooltip tooltipLabel="tooltip text aria label" buttonLabel="tooltip button aria label">
      tooltip text
    </Tooltip>
  ),
};

export const WithHelperText = (args: FieldsetProps) => {
  return (
    <Fieldset {...args}>
      <div
        style={{
          display: 'grid',
          gridGap: '12px 16px',
          gridTemplateColumns: 'repeat(auto-fill, minmax(245px, 1fr))',
        }}
      >
        <TextInput id="first-name" name="first-name" label="First name" />
        <TextInput id="last-name" name="last-name" label="Last name" />
      </div>
      <div
        style={{
          marginTop: '12px',
        }}
      >
        <TextInput
          id="social-security-number"
          name="social-security-number"
          label="Social security number"
          placeholder="Eg. 111299-1234"
        />
      </div>
    </Fieldset>
  );
};

WithHelperText.args = {
  heading: 'Fieldset with Assistive text',
  helperText: 'Assistive text',
};
