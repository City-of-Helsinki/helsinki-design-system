import React from 'react';
import { render } from '@testing-library/react';
import { axe } from 'jest-axe';

import { Section, SectionProps } from './Section';
import { getElementAttributesMisMatches, getCommonElementTestProps } from '../../utils/testHelpers';

describe('<Section /> spec', () => {
  it('renders the component', () => {
    const { asFragment } = render(<Section />);
    expect(asFragment()).toMatchSnapshot();
  });
  it('should not have basic accessibility issues', async () => {
    const { container } = render(<Section />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
  it('Native html props are passed to the element', async () => {
    const divProps = getCommonElementTestProps<'div', Pick<SectionProps, 'color'>>('div');
    const { getByTestId } = render(<Section {...divProps} />);
    const element = getByTestId(divProps['data-testid']);
    expect(getElementAttributesMisMatches(element, divProps)).toHaveLength(0);
  });
});
