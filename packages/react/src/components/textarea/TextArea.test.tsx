import React from 'react';
import { render } from '@testing-library/react';
import { axe } from 'jest-axe';

import { TextArea, TextAreaProps } from './TextArea';

describe('<Textarea /> spec', () => {
  const textAreaProps: TextAreaProps = {
    id: 'hdsInput',
    label: 'HDS input field',
    placeholder: 'A placeholder text',
  };

  it('renders the component', () => {
    const { asFragment } = render(<TextArea {...textAreaProps} />);
    expect(asFragment()).toMatchSnapshot();
  });
  it('should not have basic accessibility issues', async () => {
    const { container } = render(<TextArea {...textAreaProps} />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
  it('renders the component with tooltip', () => {
    const { asFragment } = render(
      <TextArea tooltipText="Tooltip text" tooltipLabel="Tooltip label" {...textAreaProps} />,
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
