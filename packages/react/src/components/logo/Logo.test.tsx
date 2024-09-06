import React, { HTMLAttributes } from 'react';
import { render } from '@testing-library/react';
import { axe } from 'jest-axe';

import { Logo } from './Logo';
import { getCommonElementTestProps, getElementAttributesMisMatches } from '../../utils/testHelpers';

describe('<Logo /> spec', () => {
  it('renders the component', () => {
    const { asFragment } = render(<Logo src="dummyPath" alt="logo" title="Helsingin kaupunki" />);
    expect(asFragment()).toMatchSnapshot();
  });
  it('should not have basic accessibility issues', async () => {
    const { container } = render(<Logo src="dummyPath" alt="logo" title="Helsingin kaupunki" />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
  it('Native html props are passed to the element', async () => {
    // "aria-hidden" and "alt" are linked in LogoProps. If alt is set, aria-hidden must be false/undefined
    const imgProps = getCommonElementTestProps<'img' & { 'aria-hidden': undefined }>('img');
    const { getByTestId } = render(<Logo {...imgProps} src="dummyPath" alt="logo" title="Helsingin kaupunki" />);
    const element = getByTestId(imgProps['data-testid']);
    expect(
      getElementAttributesMisMatches(element, {
        ...imgProps,
      } as HTMLAttributes<HTMLImageElement>),
    ).toHaveLength(0);
  });
});
