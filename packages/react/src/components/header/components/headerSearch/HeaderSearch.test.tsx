import React from 'react';
import { render } from '@testing-library/react';
import { axe } from 'jest-axe';

import { HeaderSearch } from './HeaderSearch';
import { HeaderWrapper } from '../../../../utils/test-utils';

describe('<Header.HeaderSearch /> spec', () => {
  it('renders the component', () => {
    const { asFragment } = render(<HeaderSearch label="Haku" />, { wrapper: HeaderWrapper });
    expect(asFragment()).toMatchSnapshot();
  });
  it('should not have basic accessibility issues', async () => {
    const { container } = render(<HeaderSearch label="Haku" />, { wrapper: HeaderWrapper });
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
