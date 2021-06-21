import React from 'react';
import { render } from '@testing-library/react';
import { axe } from 'jest-axe';

import { Fieldset } from './Fieldset';

describe('<Fieldset /> spec', () => {
  it('renders the component', () => {
    const { asFragment } = render(<Fieldset heading="Test fieldset" />);
    expect(asFragment()).toMatchSnapshot();
  });
  it('should not have basic accessibility issues', async () => {
    const { container } = render(<Fieldset heading="Test fieldset" />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
