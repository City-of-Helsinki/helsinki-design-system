import React from 'react';
import { render } from '@testing-library/react';
import { axe } from 'jest-axe';

import { Checkbox, CheckboxProps } from './Checkbox';

describe('<Checkbox /> spec', () => {
  const checkboxProps: CheckboxProps = {
    label: 'label text',
    id: 'test',
  };

  it('renders the component', () => {
    const { asFragment } = render(<Checkbox {...checkboxProps} />);
    expect(asFragment()).toMatchSnapshot();
  });
  it('should not have basic accessibility issues', async () => {
    const { container } = render(<Checkbox {...checkboxProps} />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
