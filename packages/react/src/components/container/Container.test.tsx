import React from 'react';
import { render } from '@testing-library/react';
import { axe } from 'jest-axe';

import { Container } from './Container';
import { getCommonElementTestProps, getElementAttributesMisMatches } from '../../utils/testHelpers';

describe('<Container /> spec', () => {
  it('renders the component', () => {
    const { asFragment } = render(
      <Container className="extra-class" alignWithHeader>
        Foo
      </Container>,
    );
    expect(asFragment()).toMatchSnapshot();
  });
  it('should not have basic accessibility issues', async () => {
    const { container } = render(
      <Container className="extra-class" alignWithHeader>
        Foo
      </Container>,
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
  it('Native html props are passed to the element', async () => {
    const divProps = getCommonElementTestProps('div');
    const { getByTestId } = render(
      <Container className="extra-class" alignWithHeader {...divProps}>
        Bar
      </Container>,
    );
    const element = getByTestId(divProps['data-testid']);
    expect(getElementAttributesMisMatches(element, divProps)).toHaveLength(0);
  });
});
