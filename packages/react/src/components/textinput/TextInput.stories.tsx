import React from 'react';
import { storiesOf } from '@storybook/react';

import TextInput from './TextInput';

// A simple Wrapper to control max-width and the spacing around inputs.
const WrapperDecorator = storyFn => <div style={{ padding: '10px', maxWidth: '400px' }}> {storyFn()}</div>;

(TextInput as React.FC).displayName = 'TextInput';

const textInputProps = {
  id: 'hdsInput',
  labelText: 'HDS input field',
  placeholder: 'A placeholder text',
};

storiesOf('TextInput', module)
  .addDecorator(WrapperDecorator)
  .add('default', () => <TextInput {...textInputProps} />);

storiesOf('TextInput', module)
  .addDecorator(WrapperDecorator)
  .add('with default value', () => <TextInput {...textInputProps} defaultValue="This is the default value" />);

storiesOf('TextInput', module)
  .addDecorator(WrapperDecorator)
  .add('without placeholder', () => <TextInput {...textInputProps} placeholder={undefined} />);

storiesOf('TextInput', module)
  .addDecorator(WrapperDecorator)
  .add('disabled', () => <TextInput {...textInputProps} disabled />);

storiesOf('TextInput', module)
  .addDecorator(WrapperDecorator)
  .add('read only', () => <TextInput {...textInputProps} readOnly defaultValue="This is the default value" />);

storiesOf('TextInput', module)
  .addDecorator(WrapperDecorator)
  .add('alternative', () => <TextInput {...textInputProps} alternative />);

storiesOf('TextInput', module)
  .addDecorator(WrapperDecorator)
  .add('alternative read only', () => (
    <TextInput {...textInputProps} alternative readOnly defaultValue="This is the default value" />
  ));

storiesOf('TextInput', module)
  .addDecorator(WrapperDecorator)
  .add('with label hidden', () => <TextInput {...textInputProps} hideLabel />);

storiesOf('TextInput', module)
  .addDecorator(WrapperDecorator)
  .add('with tooltip', () => <TextInput {...textInputProps} tooltipText="Tooltip goes here" />);

storiesOf('TextInput', module)
  .addDecorator(WrapperDecorator)
  .add('with helper text', () => <TextInput {...textInputProps} helperText="Helper text goes here" />);

storiesOf('TextInput', module)
  .addDecorator(WrapperDecorator)
  .add('with invalid input', () => (
    <TextInput {...textInputProps} invalid invalidText="This explains why the value is invalid" />
  ));
