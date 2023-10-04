import React from 'react';
import { render } from '@testing-library/react';
import { axe } from 'jest-axe';

import { Logo } from './Logo';

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
});
