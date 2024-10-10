import React from 'react';
import { render } from '@testing-library/react';
import { axe } from 'jest-axe';

import { HeaderNavigationMenu } from './HeaderNavigationMenu';
import { getCommonElementTestProps, getElementAttributesMisMatches } from '../../../../utils/testHelpers';

describe('<HeaderNavigationMenu /> spec', () => {
  it('renders the component', () => {
    const { asFragment } = render(<HeaderNavigationMenu />);
    expect(asFragment()).toMatchSnapshot();
  });

  it('should not have basic accessibility issues', async () => {
    const { container } = render(<HeaderNavigationMenu />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
  it('Native html props are passed to the element', async () => {
    const navProps = getCommonElementTestProps('nav');
    const { getByTestId } = render(<HeaderNavigationMenu {...navProps} />);
    const element = getByTestId(navProps['data-testid']);
    expect(getElementAttributesMisMatches(element, navProps)).toHaveLength(0);
  });
});
