import React from 'react';
import { render } from '@testing-library/react';
import { axe } from 'jest-axe';

import { Footer } from './Footer';
import { Logo } from '../logo';

describe('<Footer /> spec', () => {
  it('renders the component', () => {
    const { asFragment } = render(
      <Footer title="Bar">
        <Footer.Base
          copyrightHolder="Copyright"
          copyrightText="All rights reserved"
          backToTopLabel="Ylös"
          logo={<Logo alt="logo" size="medium" aria-hidden="true" title="Helsingin kaupunki" src="dummyPath" />}
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
});
