import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe } from 'jest-axe';

import { TimeInput, TimeInputProps } from './TimeInput';

describe('<TimeInput /> spec', () => {
  const inputProps: TimeInputProps = {
    id: 'time',
    hoursLabel: 'hours',
    minutesLabel: 'minutes',
    helperText: 'Helper text',
    errorText: 'Error text',
  };

  const inputWithCapsProps: TimeInputProps = {
    ...inputProps,
    label: 'timer',
    hoursLabel: 'Hours',
    minutesLabel: 'Minutes',
  };

  it('renders the component', () => {
    const { asFragment } = render(<TimeInput {...inputProps} />);
    expect(asFragment()).toMatchSnapshot();
  });

  it('should not have basic accessibility issues', async () => {
    const { container } = render(<TimeInput {...inputProps} />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('should use value property as input value', async () => {
    const { container } = render(<TimeInput {...{ ...inputWithCapsProps, value: '12:30' }} />);
    expect(screen.getByLabelText('Hours', { selector: 'input' })).toHaveValue('12');
    expect(screen.getByLabelText('Minutes', { selector: 'input' })).toHaveValue('30');
    expect(container.querySelector('#time')).toHaveValue('12:30');
  });

  it('should use defaultValue property as input value', async () => {
    const { container } = render(<TimeInput {...{ ...inputWithCapsProps, value: '12:30' }} />);
    expect(screen.getByLabelText('Hours', { selector: 'input' })).toHaveValue('12');
    expect(screen.getByLabelText('Minutes', { selector: 'input' })).toHaveValue('30');
    expect(container.querySelector('#time')).toHaveValue('12:30');
  });

  it('should update time value when numeric hours and minutes are typed', async () => {
    const { container } = render(<TimeInput {...inputWithCapsProps} />);
    userEvent.type(screen.getByLabelText('Hours', { selector: 'input' }), '12');
    userEvent.type(screen.getByLabelText('Minutes', { selector: 'input' }), '00');
    expect(container.querySelector('#time')).toHaveValue('12:00');
  });

  it('should move focus to minutes input when numeric hours is typed', async () => {
    render(<TimeInput {...inputWithCapsProps} />);
    userEvent.type(screen.getByLabelText('Hours', { selector: 'input' }), '12');
    expect(screen.getByLabelText('Minutes', { selector: 'input' })).toHaveFocus();
  });

  it('should not update hours value when non-numeric string is typed', async () => {
    render(<TimeInput {...inputWithCapsProps} />);
    const hoursInput = screen.getByLabelText('Hours', { selector: 'input' });
    userEvent.type(hoursInput, 'test');
    expect(hoursInput).toHaveValue('');
  });

  it('should not update minutes value when non-numeric string is typed', async () => {
    render(<TimeInput {...inputWithCapsProps} />);
    const minutesInput = screen.getByLabelText('Minutes', { selector: 'input' });
    userEvent.type(minutesInput, 'test');
    expect(minutesInput).toHaveValue('');
  });

  it('should remove colon from time value when both minutes and hours are missing', async () => {
    const { container } = render(<TimeInput {...{ ...inputWithCapsProps, defaultValue: '00:00' }} />);
    userEvent.type(screen.getByLabelText('Hours', { selector: 'input' }), '{backspace}');
    userEvent.type(screen.getByLabelText('Minutes', { selector: 'input' }), '{backspace}');
    expect(container.querySelector('#time')).toHaveValue('');
  });
});
