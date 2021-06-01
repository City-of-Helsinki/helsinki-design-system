import React from 'react';
import { withKnobs } from '@storybook/addon-knobs';

import { Fieldset } from './Fieldset';
import { TextInput } from '../textInput/TextInput';

export default {
  component: Fieldset,
  title: 'Components/Fieldset',
  decorators: [withKnobs, (storyFn) => <div style={{ maxWidth: '600px' }}>{storyFn()}</div>],
  parameters: {
    controls: { expanded: true },
  },
  args: {
    border: false,
    heading: 'Applicant information',
  },
};

export const Default = (args) => {
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

export const WithBorder = (args) => {
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

WithBorder.args = {
  border: true,
  heading: 'Applicant information',
};
