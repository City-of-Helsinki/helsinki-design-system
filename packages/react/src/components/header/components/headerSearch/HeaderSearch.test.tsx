import React from 'react';
import { render } from '@testing-library/react';
import { axe } from 'jest-axe';

import { HeaderSearch } from './HeaderSearch';
import { NavigationWrapper } from '../../../../utils/test-utils';

describe('<Header.HeaderSearch /> spec', () => {
  it('renders the component', () => {
    const { asFragment } = render(<HeaderSearch label="Haku" />, { wrapper: NavigationWrapper });
    expect(asFragment()).toMatchSnapshot();
  });
  it('should not have basic accessibility issues', async () => {
    const { container } = render(<HeaderSearch label="Haku" />, { wrapper: NavigationWrapper });
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
