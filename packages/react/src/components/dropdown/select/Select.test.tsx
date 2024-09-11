import React from 'react';
import { render } from '@testing-library/react';
import { axe } from 'jest-axe';

import { Select, SelectProps } from './Select';

const label = 'Select';
const options = [
  { label: 'Finland', value: 'FI' },
  { label: 'Sweden', value: 'SV' },
  { label: 'Norway', value: 'NO' },
  { label: 'Botswana', value: 'BW' },
  { label: 'Bolivia', value: 'BO' },
];
const defaultProps: SelectProps<{ label: string; value: string }> = {
  label,
  options,
  clearButtonAriaLabel: 'Clear all selections',
  selectedItemRemoveButtonAriaLabel: 'Remove item {value}',
  selectedItemSrLabel: 'Selected item {value}',
};

const getWrapper = (props?: Record<string, unknown>) => render(<Select {...defaultProps} {...props} />);

describe('<Select /> spec', () => {
  it('renders the component', () => {
    const { asFragment } = getWrapper();
    expect(asFragment()).toMatchSnapshot();
  });
  it('renders the component without label when aria-labelledby is given', () => {
    const { asFragment } = render(
      <Select
        aria-labelledby="some-external-label-id"
        options={options}
        clearButtonAriaLabel={defaultProps.clearButtonAriaLabel}
      />,
    );
    expect(asFragment()).toMatchSnapshot();
  });
  it('should not have basic accessibility issues', async () => {
    const { container } = getWrapper();
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
