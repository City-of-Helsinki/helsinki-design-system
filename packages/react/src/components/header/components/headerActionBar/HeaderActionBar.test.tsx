import React from 'react';
import { render } from '@testing-library/react';
import { axe } from 'jest-axe';

import { HeaderActionBar } from '.';
import { HeaderWrapper } from '../../../../utils/test-utils';

describe('<HeaderActionBar /> spec', () => {
  it('renders the component', () => {
    const { asFragment } = render(<HeaderActionBar title="Test" />, { wrapper: HeaderWrapper });
    expect(asFragment()).toMatchSnapshot();
  });

  it('should not have basic accessibility issues', async () => {
    const { container } = render(<HeaderActionBar title="Test" />, { wrapper: HeaderWrapper });
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
