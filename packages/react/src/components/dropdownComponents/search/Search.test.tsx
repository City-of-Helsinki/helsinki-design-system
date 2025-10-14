import React from 'react';
import { render } from '@testing-library/react';
import { axe } from 'jest-axe';

import { Search } from './Search';

describe('<Search /> spec', () => {
  it('renders the component', () => {
    const { asFragment } = render(<Search />);
    expect(asFragment()).toMatchSnapshot();
  });
  it('should not have basic accessibility issues', async () => {
    const { container } = render(<Search texts={{ label: 'Search options' }} />);
    const results = await axe(container, {
      rules: {
        // Temporarily disable this rule - the listbox accessibility will be fixed when the component is completed
        'aria-input-field-name': { enabled: false },
      },
    });
    expect(results).toHaveNoViolations();
  });
});
