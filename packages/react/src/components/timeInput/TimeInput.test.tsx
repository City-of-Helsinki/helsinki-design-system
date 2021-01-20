import React from 'react';
import { render } from '@testing-library/react';
import { axe } from 'jest-axe';

import { TimeInput } from './TimeInput';

describe('<TimeInput /> spec', () => {
  it('renders the component', () => {
    const { asFragment } = render(<TimeInput id="time" />);
    expect(asFragment()).toMatchSnapshot();
  });
  it('should not have basic accessibility issues', async () => {
    const { container } = render(<TimeInput id="time" />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
