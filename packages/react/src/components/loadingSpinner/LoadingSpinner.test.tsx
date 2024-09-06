import React from 'react';
import { render } from '@testing-library/react';
import { axe } from 'jest-axe';

import { LoadingSpinner } from './LoadingSpinner';
import { getCommonElementTestProps, getElementAttributesMisMatches } from '../../utils/testHelpers';

describe('<LoadingSpinner /> spec', () => {
  it('renders the component', () => {
    const { asFragment } = render(<LoadingSpinner />);
    expect(asFragment()).toMatchSnapshot();
  });
  it('should not have basic accessibility issues', async () => {
    const { container } = render(<LoadingSpinner />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
  it('Native html props are passed to the element', async () => {
    const divProps = getCommonElementTestProps('div');
    const { getByTestId } = render(<LoadingSpinner {...divProps} />);
    const element = getByTestId(divProps['data-testid']);
    expect(getElementAttributesMisMatches(element, divProps)).toHaveLength(0);
  });
});
