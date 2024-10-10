import React from 'react';
import { render } from '@testing-library/react';
import { axe } from 'jest-axe';

import { FooterCustom } from './FooterCustom';
import { FooterWrapper } from '../../../../utils/test-utils';
import { getCommonElementTestProps, getElementAttributesMisMatches } from '../../../../utils/testHelpers';

describe('<Footer.Custom /> spec', () => {
  it('renders the component', () => {
    const { asFragment } = render(<FooterCustom />, {
      wrapper: FooterWrapper,
    });
    expect(asFragment()).toMatchSnapshot();
  });

  it('should not have basic accessibility issues', async () => {
    const { container } = render(<FooterCustom />, {
      wrapper: FooterWrapper,
    });
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
  it('native html props are passed to the element', async () => {
    const divProps = getCommonElementTestProps('div');
    const { getByTestId } = render(<FooterCustom {...divProps} />, {
      wrapper: FooterWrapper,
    });
    const element = getByTestId(divProps['data-testid']);
    expect(getElementAttributesMisMatches(element, divProps)).toHaveLength(0);
  });
});
