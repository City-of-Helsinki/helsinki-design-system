import React from 'react';
import { render } from '@testing-library/react';
import { axe } from 'jest-axe';

import { TextArea, TextAreaProps } from './TextArea';
import { getCommonElementTestProps, getElementAttributesMisMatches } from '../../utils/testHelpers';

describe('<Textarea /> spec', () => {
  const textAreaProps: TextAreaProps = {
    id: 'hdsInput',
    label: 'HDS input field',
    placeholder: 'A placeholder text',
    helperText: 'Helper text',
    errorText: 'Error text',
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
  it('native html props are passed to the element', async () => {
    const textAreaAdditionalProps = getCommonElementTestProps<
      'textarea',
      Pick<TextAreaProps, 'value' | 'onChange' | 'defaultValue'>
    >('textarea');
    const { getByTestId } = render(<TextArea {...textAreaProps} {...textAreaAdditionalProps} />);
    const element = getByTestId(textAreaAdditionalProps['data-testid']);
    // className and style is set to the input element, others to wrapper
    expect(
      getElementAttributesMisMatches(element, { ...textAreaAdditionalProps, className: undefined, style: undefined }),
    ).toHaveLength(0);
  });
});
