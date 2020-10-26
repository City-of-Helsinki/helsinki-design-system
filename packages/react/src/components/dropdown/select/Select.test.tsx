/* eslint-disable @typescript-eslint/ban-ts-ignore */
import React from 'react';
import { render } from '@testing-library/react';

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

const getWrapper = (props?: unknown) => render(<Select {...defaultProps} {...props} />);

describe('<Select /> spec', () => {
  it('renders the component', () => {
    const { asFragment } = getWrapper();
    expect(asFragment()).toMatchSnapshot();
  });
});
