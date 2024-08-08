import React from 'react';
import { render } from '@testing-library/react';
import { axe } from 'jest-axe';

import { Checkbox, CheckboxProps } from './Checkbox';
import { getCommonElementTestProps, getElementAttributesMisMatches } from '../../utils/testHelpers';

describe('<Checkbox /> spec', () => {
  const checkboxProps: CheckboxProps = {
    label: 'label text',
    id: 'test',
    helperText: 'Helper text',
    errorText: 'Error text',
    'data-testid': 'testId',
    onChange: (e: React.ChangeEvent) => {
      if (e) {
        //
      }
    },
  };

  it('renders the component', () => {
    const { asFragment } = render(<Checkbox {...checkboxProps} />);
    expect(asFragment()).toMatchSnapshot();
  });
  it('should not have basic accessibility issues', async () => {
    const { container } = render(<Checkbox {...checkboxProps} />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
  it('native html props are passed to the element', async () => {
    const inputProps = getCommonElementTestProps<'input', { value: string }>('input');
    const { getByTestId } = render(<Checkbox {...checkboxProps} {...inputProps} />);
    const element = getByTestId(inputProps['data-testid']);
    // className and style are set to the wrapper element, others to input
    expect(
      getElementAttributesMisMatches(element, { ...inputProps, style: undefined, className: undefined }),
    ).toHaveLength(0);
  });
});
