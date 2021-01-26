import React from 'react';
import { render } from '@testing-library/react';
import { axe } from 'jest-axe';

import { [-replace-name-capital-] } from './[-replace-name-capital-]';

describe('<[-replace-name-capital-] /> spec', () => {
  it('renders the component', () => {
    const { asFragment } = render(<[-replace-name-capital-] />);
    expect(asFragment()).toMatchSnapshot();
  });
  it('should not have basic accessibility issues', async () => {
    const { container } = render(<[-replace-name-capital-] />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
