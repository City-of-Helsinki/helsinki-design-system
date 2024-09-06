import React from 'react';
import { render } from '@testing-library/react';
import { axe } from 'jest-axe';

import { Columns } from './Columns';
import { getCommonElementTestProps, getElementAttributesMisMatches } from '../../utils/testHelpers';

describe('<Columns /> spec', () => {
  it('renders the component', () => {
    const { asFragment } = render(<Columns className="extra-class" />);
    expect(asFragment()).toMatchSnapshot();
  });
  it('should not have basic accessibility issues', async () => {
    const { container } = render(<Columns className="extra-class" />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
  it('native html props are passed to the element', async () => {
    const divProps = getCommonElementTestProps('div');
    const { getByTestId } = render(<Columns className="extra-class" {...divProps} />);
    const element = getByTestId(divProps['data-testid']);
    expect(getElementAttributesMisMatches(element, divProps)).toHaveLength(0);
  });
});
