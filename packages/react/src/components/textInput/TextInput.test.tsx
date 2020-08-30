import React from 'react';
import { render } from '@testing-library/react';

import { TextInput } from './TextInput';

const textInputProps = {
  id: 'hdsInput',
  label: 'HDS input field',
  placeholder: 'A placeholder text',
};

describe('<TextInput /> spec', () => {
  it('renders the component', () => {
    const { asFragment } = render(<TextInput {...textInputProps} />);
    expect(asFragment()).toMatchSnapshot();
  });
  it('renders the component with tooltip', () => {
    const { asFragment } = render(
      <TextInput tooltipText="Tooltip text" tooltipLabel="Tooltip label" {...textInputProps} />,
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
