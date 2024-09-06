import React from 'react';
import { render } from '@testing-library/react';
import { axe } from 'jest-axe';

import { ImageWithCard, ImageWithCardProps } from './ImageWithCard';
import { getElementAttributesMisMatches, getCommonElementTestProps } from '../../utils/testHelpers';

describe('<ImageWithCard /> spec', () => {
  it('renders the component', () => {
    const { asFragment } = render(<ImageWithCard src="" />);
    expect(asFragment()).toMatchSnapshot();
  });
  it('should not have basic accessibility issues', async () => {
    const { container } = render(<ImageWithCard src="" />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
  it('Native html props are passed to the element', async () => {
    const elementProps = getCommonElementTestProps<'div', Pick<ImageWithCardProps, 'color'>>('div');
    const { getByTestId } = render(<ImageWithCard {...elementProps} src="" />);
    const element = getByTestId(elementProps['data-testid']);
    expect(getElementAttributesMisMatches(element, elementProps)).toHaveLength(0);
  });
});
