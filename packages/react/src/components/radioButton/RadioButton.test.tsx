import React from 'react';
import { render } from '@testing-library/react';
import { axe } from 'jest-axe';

import { RadioButton } from './RadioButton';
import { getCommonElementTestProps, getElementAttributesMisMatches } from '../../utils/testHelpers';

const radioProps = {
  label: 'label text',
  id: 'test',
};

describe('<RadioButton /> spec', () => {
  it('renders the component', () => {
    const { asFragment } = render(<RadioButton {...radioProps} />);
    expect(asFragment()).toMatchSnapshot();
  });
  it('should not have basic accessibility issues', async () => {
    const { container } = render(<RadioButton {...radioProps} />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
  it('native html props are passed to the element', async () => {
    const inputProps = getCommonElementTestProps('input');
    const { getByTestId } = render(<RadioButton {...radioProps} {...inputProps} />);
    const element = getByTestId(inputProps['data-testid']);
    // className and style are set to the wrapper element, others to input
    expect(
      getElementAttributesMisMatches(element, { ...inputProps, style: undefined, className: undefined }),
    ).toHaveLength(0);
  });
});
