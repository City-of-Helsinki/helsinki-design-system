import React, { useState } from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe } from 'jest-axe';
import { act } from 'react-dom/test-utils';

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
    const numberInput = screen.getByLabelText('Test label number input', { selector: 'input' });
    expect(numberInput).toHaveValue(20);
  });

  it('should decrease value correct amount when user clicks step down button', async () => {
    render(<NumberInput defaultValue={10} step={10} {...numberInputProps} />);
    userEvent.click(screen.getByRole('button', { name: 'Decrease 10 euros' }));
    const numberInput = screen.getByLabelText('Test label number input', { selector: 'input' });
    expect(numberInput).toHaveValue(0);
  });

  it('should call onChange when input value is changed directly from input field', async () => {
    const onChange = jest.fn();
    render(<NumberInput onChange={onChange} step={10} {...numberInputProps} />);
    const numberInput = screen.getByLabelText('Test label number input', { selector: 'input' });
    await act(async () => {
      userEvent.type(numberInput, '20');
    });
    expect(numberInput).toHaveValue(20);
    expect(onChange.mock.calls.length).toBe(2);
  });

  it('should call onChange when user clicks step up button', async () => {
    const onChange = jest.fn();
    render(<NumberInput onChange={onChange} defaultValue={10} step={10} {...numberInputProps} />);
    await act(async () => {
      userEvent.click(screen.getByRole('button', { name: 'Add 10 euros' }));
    });
    expect(onChange.mock.calls.length).toBe(1);
  });

  it('should call onChange when user clicks step down button', async () => {
    const onChange = jest.fn();
    render(<NumberInput onChange={onChange} defaultValue={10} step={10} {...numberInputProps} />);
    await act(async () => {
      userEvent.click(screen.getByRole('button', { name: 'Decrease 10 euros' }));
    });
    expect(onChange.mock.calls.length).toBe(1);
  });

  it('should be able to reset a controlled NumberInput to an empty value', async () => {
    const TestComponent = () => {
      const [value, setValue] = useState<'' | number>(10);
      return (
        <div>
          <button
            type="button"
            onClick={() => {
              setValue('');
            }}
          >
            Reset number input
          </button>
          <NumberInput step={10} value={value} {...numberInputProps} />
        </div>
      );
    };

    render(<TestComponent />);
    await act(async () => {
      userEvent.click(screen.getByRole('button', { name: 'Reset number input' }));
    });
    const numberInput = screen.getByLabelText('Test label number input', { selector: 'input' });
    expect(numberInput).toHaveValue(null); // Empty string is converted to null by react/html
  });
});
