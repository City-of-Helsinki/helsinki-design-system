import React from 'react';
import { render } from '@testing-library/react';
import { axe } from 'jest-axe';

import { Stepper } from './MultiPageFormStepper';

describe('<MultiPageFormStepper /> spec', () => {
  it('renders the component', () => {
    const { asFragment } = render(<Stepper />);
    expect(asFragment()).toMatchSnapshot();
  });
  it('should not have basic accessibility issues', async () => {
    const { container } = render(<Stepper />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
