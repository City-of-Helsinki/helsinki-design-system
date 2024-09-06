import React from 'react';
import { render } from '@testing-library/react';
import { axe } from 'jest-axe';

import { Hero } from './Hero';
import { getElementAttributesMisMatches, getCommonElementTestProps } from '../../utils/testHelpers';

describe('<Hero.Text /> spec', () => {
  const paragraphProps = getCommonElementTestProps('p');
  // axe will complain if tabIndex > 0
  paragraphProps.tabIndex = 0;
  const Component = () => {
    return (
      <Hero.Text {...paragraphProps}>
        Nullam ut nunc consectetur, accumsan nunc sed, luctus nisl. Curabitur lacinia!
      </Hero.Text>
    );
  };

  it('renders the component', () => {
    const { asFragment } = render(<Component />);
    expect(asFragment()).toMatchSnapshot();
  });
  it('should not have basic accessibility issues', async () => {
    const { container } = render(<Component />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
  it('Native html props are passed to the element', async () => {
    const { getByTestId } = render(<Component />);
    const element = getByTestId(paragraphProps['data-testid']);
    expect(getElementAttributesMisMatches(element, paragraphProps)).toHaveLength(0);
  });
});
