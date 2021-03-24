import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe } from 'jest-axe';

import { NumberInput } from './NumberInput';

const numberInputProps = {
  id: 'numberInputTestId',
  label: 'Test label number input',
  plusStepButtonAriaLabel: 'Add 10 euros',
  minusStepButtonAriaLabel: 'Decrease 10 euros',
};

describe('<NumberInput /> spec', () => {
  it('renders the component', () => {
    const { asFragment } = render(<NumberInput {...numberInputProps} />);
    expect(asFragment()).toMatchSnapshot();
  });
  it('renders the component with steppers', () => {
    const { asFragment } = render(<NumberInput step={10} {...numberInputProps} />);
    expect(asFragment()).toMatchSnapshot();
  });
  it('should not have basic accessibility issues', async () => {
    const { container } = render(<NumberInput step={10} {...numberInputProps} />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
  it('should increase value correct amount when user clicks step up button', async () => {
    render(<NumberInput defaultValue={10} step={10} {...numberInputProps} />);
    userEvent.click(screen.getByRole('button', { name: 'Add 10 euros' }));
    const numberInput = screen.getByLabelText('Testi label number input', { selector: 'input' });
    expect(numberInput).toHaveValue(20);
  });
  it('should decrease value correct amount when user clicks step down button', async () => {
    render(<NumberInput defaultValue={10} step={10} {...numberInputProps} />);
    userEvent.click(screen.getByRole('button', { name: 'Decrease 10 euros' }));
    const numberInput = screen.getByLabelText('Testi label number input', { selector: 'input' });
    expect(numberInput).toHaveValue(0);
  });
});
