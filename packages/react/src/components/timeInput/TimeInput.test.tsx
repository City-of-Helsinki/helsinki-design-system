import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
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

  it('should update time value when numeric hours and minutes strings are typed', async () => {
    const { container } = render(<TimeInput id="time" label="timer" />);
    const hoursInput = screen.getByLabelText('Hours', { selector: 'input' });
    fireEvent.input(hoursInput, {
      target: {
        value: '12',
      },
    });
    fireEvent.keyUp(hoursInput, { key: '2' });

    const minutesInput = screen.getByLabelText('Minutes', { selector: 'input' });
    fireEvent.input(minutesInput, {
      target: {
        value: '00',
      },
    });
    fireEvent.keyUp(minutesInput, { key: '0' });
    expect(container.querySelector('#time')).toHaveValue('12:00');
  });

  it('should move focus to minutes input when numeric hours string is typed', async () => {
    render(<TimeInput id="time" label="timer" />);
    const hoursInput = screen.getByLabelText('Hours', { selector: 'input' });
    fireEvent.input(hoursInput, {
      target: {
        value: '12',
      },
    });
    fireEvent.keyUp(hoursInput, { key: '2' });
    expect(screen.getByLabelText('Minutes', { selector: 'input' })).toHaveFocus();
  });

  it('should not update hours value when non-numeric string is typed', async () => {
    render(<TimeInput id="time" label="timer" />);
    const hoursInput = screen.getByLabelText('Hours', { selector: 'input' });
    fireEvent.input(hoursInput, {
      target: {
        value: 'test',
      },
    });
    fireEvent.keyUp(hoursInput, { key: 't' });
    expect(hoursInput).toHaveValue('');
  });

  it('should not update minutes value when non-numeric string is typed', async () => {
    render(<TimeInput id="time" label="timer" />);
    const minutesInput = screen.getByLabelText('Minutes', { selector: 'input' });
    fireEvent.input(minutesInput, {
      target: {
        value: 'test',
      },
    });
    fireEvent.keyUp(minutesInput, { key: 't' });
    expect(minutesInput).toHaveValue('');
  });
});
