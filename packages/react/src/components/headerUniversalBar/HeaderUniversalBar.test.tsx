import React from 'react';
import { render } from '@testing-library/react';
import { axe } from 'jest-axe';

import { HeaderUniversalBar } from './HeaderUniversalBar';

describe('<HeaderUniversalBar /> spec', () => {
  it('renders the component', () => {
    const { asFragment } = render(<HeaderUniversalBar primaryLinkText="hel.fi" primaryLinkHref="#" />);
    expect(asFragment()).toMatchSnapshot();
  });
  it('should not have basic accessibility issues', async () => {
    const { container } = render(<HeaderUniversalBar primaryLinkText="hel.fi" primaryLinkHref="#" />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
