import React from 'react';
import { render } from '@testing-library/react';
import { axe } from 'jest-axe';

import { PhoneInput, PhoneInputProps } from './PhoneInput';
import { getCommonElementTestProps, getElementAttributesMisMatches } from '../../utils/testHelpers';

describe('<PhoneInput /> spec', () => {
  it('renders the component', () => {
    const { asFragment } = render(<PhoneInput id="phone-input" label="test label" />);
    expect(asFragment()).toMatchSnapshot();
  });
  it('should not have basic accessibility issues', async () => {
    const { container } = render(<PhoneInput id="phone-input" label="test label" />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
  it('Native html props are passed to the element', async () => {
    const inputProps = getCommonElementTestProps<'input', Pick<PhoneInputProps, 'value' | 'defaultValue'>>('input');
    const { getByTestId } = render(<PhoneInput {...inputProps} id="phone-input" label="test label" />);
    const element = getByTestId(inputProps['data-testid']);
    // id, className and style are set to the wrapper element, others to input
    expect(
      getElementAttributesMisMatches(element, { ...inputProps, id: undefined, style: undefined, className: undefined }),
    ).toHaveLength(0);
  });
});
