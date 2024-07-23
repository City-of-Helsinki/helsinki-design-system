import React from 'react';
import { action } from '@storybook/addon-actions';

import { PhoneInput, PhoneInputProps } from './PhoneInput';
import { Combobox } from '../dropdown/combobox';

export default {
  component: PhoneInput,
  title: 'Components/PhoneInput',
  decorators: [(storyFn) => <div style={{ maxWidth: '300px' }}>{storyFn()}</div>],
  parameters: {
    controls: { expanded: true },
  },
  args: {},
};

export const Default = (args: PhoneInputProps) => <PhoneInput {...args} />;
Default.args = {
  id: 'Default',
  helperText: 'Assistive text',
  label: 'Label',
};

export const Disabled = (args: PhoneInputProps) => <PhoneInput {...args} />;
Disabled.storyName = 'Disabled';
Disabled.args = {
  id: 'Disabled',
  helperText: 'Assistive text',
  defaultValue: '0451234567',
  label: 'Label for disabled',
  disabled: true,
};

export const WithDefaultValue = (args: PhoneInputProps) => <PhoneInput {...args} />;
WithDefaultValue.storyName = 'With a default value';
WithDefaultValue.args = {
  id: 'WithDefaultValue',
  defaultValue: '0451234567',
  helperText: 'Assistive text',
  label: 'Label for default value',
};

export const WithCountryCode = (args: PhoneInputProps) => {
  const options = [{ label: 'Finland (+358)' }, { label: 'UK (+46)' }];
  return (
    <>
      <p id="work-phone" style={{ fontSize: '18px', fontWeight: 'bold' }}>
        Work phone
      </p>
      <div style={{ display: 'grid', gridTemplateColumns: '200px 300px', columnGap: '16px' }}>
        <Combobox
          id="hds-select-1"
          label="Country code"
          helper="Assistive text"
          aria-describedby="work-phone"
          options={options}
          defaultValue={{ label: 'Finland (+358)' }}
          onBlur={() => action('onBlur')}
          onChange={(change) => action('onChange')(change)}
          onFocus={() => action('onFocus')}
          required
          toggleButtonAriaLabel="Choose country code"
        />
        <PhoneInput {...args} />
      </div>
    </>
  );
};

WithCountryCode.storyName = 'With select countrycode';
WithCountryCode.args = {
  id: 'WithCountryCode',
  defaultValue: '0451234567',
  'aria-describedby': 'work-phone',
  label: 'Phone number',
  required: true,
};
WithCountryCode.decorators = [(storyFn) => <div style={{ maxWidth: '516px' }}>{storyFn()}</div>];

export const Invalid = (args: PhoneInputProps) => <PhoneInput {...args} />;
Invalid.args = {
  id: 'Invalid',
  invalid: true,
  helperText: 'Assistive text',
  label: 'Label',
  errorText: 'Invalid value',
};

export const Success = (args: PhoneInputProps) => <PhoneInput {...args} />;
Success.args = {
  id: 'Default',
  helperText: 'Assistive text',
  label: 'Label',
  successText: 'Valid value',
};
