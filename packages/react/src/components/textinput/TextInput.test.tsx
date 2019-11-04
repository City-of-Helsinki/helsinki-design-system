import React from 'react';
import { render } from '@testing-library/react';

import TextInput from './TextInput';

const textInputProps = {
  id: 'hdsInput',
  labelText: 'HDS input field',
  placeholder: 'A placeholder text',
};

describe('<TextInput /> spec', () => {
  it('renders the component', () => {
    const { asFragment } = render(<TextInput {...textInputProps} />);
    expect(asFragment()).toMatchSnapshot();
  });
});
