import React from 'react';
import { storiesOf } from '@storybook/react';

import TextInput from './TextInput';

(TextInput as React.FC).displayName = 'TextInput';

const textInputProps = {
  id: 'myInput',
  label: 'A text input',
  placeholder: 'A placeholder text',
};

storiesOf('TextInput', module).add('default', () => <TextInput {...textInputProps} />);
storiesOf('TextInput', module).add('disabled', () => <TextInput {...textInputProps} disabled />);
storiesOf('TextInput', module).add('read only', () => (
  <TextInput {...textInputProps} readOnly defaultValue="This is the default value" />
));
storiesOf('TextInput', module).add('alternative', () => <TextInput {...textInputProps} alternative />);
storiesOf('TextInput', module).add('alternative read only', () => (
  <TextInput {...textInputProps} alternative readOnly defaultValue="This is the default value" />
));
storiesOf('TextInput', module).add('with label hidden', () => <TextInput {...textInputProps} hideLabel />);
storiesOf('TextInput', module).add('with tooltip', () => (
  <TextInput {...textInputProps} tooltipText="Tooltip goes here" />
));
storiesOf('TextInput', module).add('with helper text', () => (
  <TextInput {...textInputProps} helperText="Helper text goes here" />
));
storiesOf('TextInput', module).add('with invalid input', () => (
  <TextInput {...textInputProps} invalid invalidText="This explains why the value is invalid" />
));
