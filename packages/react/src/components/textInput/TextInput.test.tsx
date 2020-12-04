import React from 'react';
import { render } from '@testing-library/react';
import { axe } from 'jest-axe';

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
  it('should not have basic accessibility issues', async () => {
    const { container } = render(<TextInput {...textInputProps} />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
  it('renders the component with tooltip', () => {
    const { asFragment } = render(
      <TextInput tooltipText="Tooltip text" tooltipLabel="Tooltip label" {...textInputProps} />,
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
