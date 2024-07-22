import React from 'react';
import { render } from '@testing-library/react';
import { axe } from 'jest-axe';

import { Koros } from './Koros';
import { getElementAttributesMisMatches, getCommonElementTestProps } from '../../utils/testHelpers';

describe('<Koros /> spec', () => {
  it('renders the component', () => {
    const { asFragment } = render(
      <>
        <Koros />
        <Koros type="basic" />
        <Koros type="beat" />
        <Koros type="pulse" />
        <Koros type="vibration" />
        <Koros type="wave" />
      </>,
    );
    expect(asFragment()).toMatchSnapshot();
  });
  it('should not have basic accessibility issues', async () => {
    const { container } = render(
      <>
        <Koros />
        <Koros type="basic" />
        <Koros type="beat" />
        <Koros type="pulse" />
        <Koros type="vibration" />
        <Koros type="wave" />
      </>,
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
  it('Native html props are passed to the element', async () => {
    const divProps = getCommonElementTestProps('div');
    const { getByTestId } = render(<Koros type="basic" {...divProps} />);
    const element = getByTestId(divProps['data-testid']);
    expect(getElementAttributesMisMatches(element, divProps)).toHaveLength(0);
  });
});
