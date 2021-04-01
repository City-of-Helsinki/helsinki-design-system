import React from 'react';
import { action } from '@storybook/addon-actions';

import { PhoneInput } from './PhoneInput';
import { Combobox } from '../dropdown/combobox';

export default {
  component: PhoneInput,
  title: 'Components/PhoneInput',
  decorators: [(storyFn) => <div style={{ maxWidth: '544px' }}>{storyFn()}</div>],
  parameters: {
    controls: { expanded: true },
  },
  args: {},
};

export const Default = (args) => <PhoneInput {...args} />;
Default.args = {
  id: 'Default',
  helperText: 'Assistive text',
  label: 'Label',
};

export const Disabled = (args) => <PhoneInput {...args} />;
Disabled.storyName = 'Disabled';
Disabled.args = {
  id: 'Disabled',
  helperText: 'Assistive text',
  defaultValue: '0451234567',
  label: 'Label for disabled',
  disabled: true,
};

export const WithDefaultValue = (args) => <PhoneInput {...args} />;
WithDefaultValue.storyName = 'With a default value';
WithDefaultValue.args = {
  id: 'WithDefaultValue',
  defaultValue: '0451234567',
  helperText: 'Assistive text',
  label: 'Label for default valued phone input',
};

export const WithCountryCode = (args) => {
  const options = [{ label: 'Finland (+358)' }, { label: 'UK (+46)' }];
  return (
    <>
      <p id="work-phone" style={{ fontSize: '18px', fontWeight: 'bold' }}>
        Work phone
      </p>
      <div style={{ display: 'grid', gridTemplateColumns: '200px 328px', columnGap: '16px' }}>
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
