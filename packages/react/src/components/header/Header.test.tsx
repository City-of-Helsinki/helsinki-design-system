import React from 'react';
import { render } from '@testing-library/react';
import { axe } from 'jest-axe';

import { Header } from './Header';
import { getElementAttributesMisMatches, getCommonElementTestProps } from '../../utils/testHelpers';

describe('<Header /> spec', () => {
  it('renders the component', () => {
    const { asFragment } = render(<Header />);
    expect(asFragment()).toMatchSnapshot();
  });

  it('should not have basic accessibility issues', async () => {
    const { container } = render(<Header />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
  it('Native html props are passed to the element', async () => {
    const headerProps = getCommonElementTestProps<'header'>('header');
    // header has "ariaLabel", which should override "aria-label"
    headerProps['aria-label'] = 'Real ariaLabel';
    // eslint-disable-next-line react/forbid-component-props
    const { getByTestId } = render(<Header {...headerProps} aria-label="Is overridden" ariaLabel="Real ariaLabel" />);
    const element = getByTestId(headerProps['data-testid']);
    expect(getElementAttributesMisMatches(element, headerProps)).toHaveLength(0);
  });
});
