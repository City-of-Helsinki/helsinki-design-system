import React from 'react';
import { render } from '@testing-library/react';

import { TextArea } from './TextArea';

const textAreaProps = {
  id: 'hdsInput',
  label: 'HDS input field',
  placeholder: 'A placeholder text',
};

describe('<Textarea /> spec', () => {
  it('renders the component', () => {
    const { asFragment } = render(<TextArea {...textAreaProps} />);
    expect(asFragment()).toMatchSnapshot();
  });
  it('renders the component with tooltip', () => {
    const { asFragment } = render(
      <TextArea tooltipText="Tooltip text" tooltipLabel="Tooltip label" {...textAreaProps} />,
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
