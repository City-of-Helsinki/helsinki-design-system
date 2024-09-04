import React from 'react';
import { render } from '@testing-library/react';
import { axe } from 'jest-axe';

import { Footer } from './Footer';
import { Logo } from '../logo';
import { getCommonElementTestProps, getElementAttributesMisMatches } from '../../utils/testHelpers';

describe('<Footer /> spec', () => {
  it('renders the component', () => {
    const { asFragment } = render(
      <Footer title="Bar">
        <Footer.Base
          copyrightHolder="Copyright"
          copyrightText="All rights reserved"
          backToTopLabel="Ylös"
          logo={<Logo alt="Helsingin kaupunki" size="medium" title="Helsingin kaupunki" src="dummyPath" />}
        />
      </Footer>,
    );
    expect(asFragment()).toMatchSnapshot();
  });
  it('should not have basic accessibility issues', async () => {
    const { container } = render(<Footer title="Bar" />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('native html props are passed to the element', async () => {
    const footerProps = getCommonElementTestProps<'footer'>('footer');
    // footer has "ariaLabel", which should override "aria-label"
    footerProps['aria-label'] = 'Real ariaLabel';
    const { getByTestId } = render(
      // eslint-disable-next-line react/forbid-component-props
      <Footer footerProps={footerProps} aria-label="Is overridden" ariaLabel="Real ariaLabel" title="Bar" />,
    );
    const element = getByTestId(footerProps['data-testid']);
    expect(getElementAttributesMisMatches(element, footerProps)).toHaveLength(0);
  });
});
