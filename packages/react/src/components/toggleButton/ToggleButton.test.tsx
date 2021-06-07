import React from 'react';
import { render } from '@testing-library/react';
import { axe } from 'jest-axe';

import { ToggleButton } from './ToggleButton';

describe('<ToggleButton /> spec', () => {
  it('renders the component', () => {
    const { asFragment } = render(<ToggleButton id="toggle-button" value={false} label="Test label" />);
    expect(asFragment()).toMatchSnapshot();
  });

  it('should not have basic accessibility issues', async () => {
    const { container } = render(<ToggleButton id="toggle-button" value={false} label="Test label" />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
