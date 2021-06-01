import React, { useState } from 'react';
import { withKnobs } from '@storybook/addon-knobs';

import { Fieldset } from './Fieldset';
import { RadioButton } from '../radioButton/RadioButton';
import { TextInput } from '../textInput/TextInput';

export default {
  component: Fieldset,
  title: 'Components/Fieldset',
  decorators: [withKnobs, (storyFn) => <div style={{ maxWidth: '600px' }}>{storyFn()}</div>],
  parameters: {
    controls: { expanded: true },
  },
};

export const Default = () => {
  const options = [
    { label: 'Text', value: 'text' },
    { label: 'CSV', value: 'csv' },
    { label: 'HTML', value: 'html' },
  ];

  const [radioValue, setRadioValue] = useState<string>(options[0].value);

  return (
    <Fieldset heading="Output format">
      {options.map((option) => (
        <RadioButton
          key={`radio-${option.value}`}
          id={`radio-${option.value}`}
          value={option.value}
          label={option.label}
          checked={radioValue === option.value}
          onChange={(event) => setRadioValue((event.target as HTMLInputElement).value)}
        />
      ))}
    </Fieldset>
  );
};

export const WithBorders = () => {
  const options = [
    { label: 'Text', value: 'text' },
    { label: 'CSV', value: 'csv' },
    { label: 'HTML', value: 'html' },
  ];

  const [radioValue, setRadioValue] = useState<string>(options[0].value);

  return (
    <Fieldset heading="Output format" border>
      {options.map((option) => (
        <RadioButton
          key={`radio-${option.value}`}
          id={`radio-${option.value}`}
          value={option.value}
          label={option.label}
          checked={radioValue === option.value}
          onChange={(event) => setRadioValue((event.target as HTMLInputElement).value)}
        />
      ))}
    </Fieldset>
  );
};

export const DefaultFieldGroups = () => {
  return (
    <Fieldset heading="Applicant information">
      <div
        style={{ display: 'grid', gridGap: '12px 16px', gridTemplateColumns: 'repeat(auto-fill, minmax(245px, 1fr))' }}
      >
        <TextInput id="first-name" name="first-name" label="First name" />
        <TextInput id="last-name" name="last-name" label="Last name" />
      </div>
      <div
        style={{
          display: 'grid',
          gridGap: '12px 16px',
          gridTemplateColumns: 'repeat(auto-fill, minmax(245px, 1fr))',
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

export const FieldGroupsWithBorders = () => {
  return (
    <Fieldset heading="Applicant information" border>
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
          display: 'grid',
          gridGap: '12px 16px',
          gridTemplateColumns: 'repeat(auto-fill, minmax(245px, 1fr))',
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
