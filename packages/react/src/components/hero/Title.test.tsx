import React from 'react';
import { render } from '@testing-library/react';
import { axe } from 'jest-axe';

import { Hero } from './Hero';
import { getElementAttributesMisMatches, getCommonElementTestProps } from '../../utils/testHelpers';

describe('<Hero.Title /> spec', () => {
  const headingProps = getCommonElementTestProps('h1');
  // axe will complain if tabIndex > 0
  headingProps.tabIndex = 0;
  const Component = () => {
    return (
      <Hero.Title headingLevel={3} {...headingProps}>
        This is the heading
      </Hero.Title>
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
    const element = getByTestId(headingProps['data-testid']);
    expect(getElementAttributesMisMatches(element, headingProps)).toHaveLength(0);
  });
});
