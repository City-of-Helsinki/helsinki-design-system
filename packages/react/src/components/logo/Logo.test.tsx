import React, { HTMLAttributes } from 'react';
import { render } from '@testing-library/react';
import { axe } from 'jest-axe';

import { Logo, LogoProps } from './Logo';
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
    const imgProps = getCommonElementTestProps<'img', Pick<LogoProps, 'dataTestId'> & { 'aria-hidden': undefined }>(
      'img',
    );
    // the component has "dataTestId" prop
    imgProps.dataTestId = imgProps['data-testid'];
    const { getByTestId } = render(<Logo {...imgProps} src="dummyPath" alt="logo" title="Helsingin kaupunki" />);
    const element = getByTestId(imgProps['data-testid']);
    expect(
      getElementAttributesMisMatches(element, {
        ...imgProps,
        dataTestId: undefined,
        'data-testid': imgProps.dataTestId,
      } as HTMLAttributes<HTMLImageElement>),
    ).toHaveLength(0);
  });
  it('The data-testid works and overrides dataTestId', async () => {
    const propsWithDataTestId = {
      'data-testid': 'data-testid',
      dataTestId: 'dataTestId',
    };
    const { getByTestId } = render(
      <Logo {...propsWithDataTestId} src="dummyPath" alt="logo" title="Helsingin kaupunki" />,
    );
    const element = getByTestId(propsWithDataTestId['data-testid']);
    expect(
      getElementAttributesMisMatches(element, {
        ...propsWithDataTestId,
        dataTestId: undefined,
      } as HTMLAttributes<HTMLImageElement>),
    ).toHaveLength(0);
  });
});
