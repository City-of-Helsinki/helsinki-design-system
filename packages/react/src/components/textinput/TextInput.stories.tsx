import React from 'react';
import { storiesOf } from '@storybook/react';

import TextInput from './TextInput';

// A simple Wrapper to control max-width and the spacing around inputs.
const WrapperDecorator = storyFn => <div style={{ padding: '10px', maxWidth: '400px' }}> {storyFn()}</div>;

(TextInput as React.FC).displayName = 'TextInput';

const textInputProps = {
  id: 'hdsInput',
  labelText: 'label',
  placeholder: 'placeholder text',
};

storiesOf('TextInput', module)
  .addDecorator(WrapperDecorator)
  .add('default', () => <TextInput {...textInputProps} />)
  .add('with default value', () => <TextInput {...textInputProps} defaultValue="default value" />)
  .add('without placeholder', () => <TextInput {...textInputProps} placeholder={undefined} />)
  .add('disabled', () => <TextInput {...textInputProps} disabled />)
  .add('read only', () => <TextInput {...textInputProps} readOnly defaultValue="default value" />)
  .add('alternative', () => <TextInput {...textInputProps} alternative />)
  .add('alternative read only', () => (
    <TextInput {...textInputProps} alternative readOnly defaultValue="default value" />
  ))
  .add('with label hidden', () => <TextInput {...textInputProps} hideLabel />)
  .add('with tooltip', () => (
    <TextInput
      {...textInputProps}
      tooltipLabel="tooltip label"
      tooltipText="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris"
    />
  ))
  .add('alternative with tooltip', () => (
    <TextInput
      alternative
      {...textInputProps}
      tooltipLabel="tooltip label"
      tooltipText="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris"
    />
  ))
  .add('with helper text', () => <TextInput {...textInputProps} helperText="helper text" />)
  .add('with invalid input', () => <TextInput {...textInputProps} invalid invalidText="error text" />);
