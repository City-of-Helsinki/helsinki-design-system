import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe } from 'jest-axe';

import { TimeInput } from './TimeInput';

describe('<TimeInput /> spec', () => {
  it('renders the component', () => {
    const { asFragment } = render(<TimeInput id="time" hoursLabel="hours" minutesLabel="minutes" />);
    expect(asFragment()).toMatchSnapshot();
  });

  it('should not have basic accessibility issues', async () => {
    const { container } = render(<TimeInput id="time" hoursLabel="hours" minutesLabel="minutes" />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('should update time value when numeric hours and minutes are typed', async () => {
    const { container } = render(<TimeInput id="time" label="timer" hoursLabel="Hours" minutesLabel="Minutes" />);
    userEvent.type(screen.getByLabelText('Hours', { selector: 'input' }), '12');
    userEvent.type(screen.getByLabelText('Minutes', { selector: 'input' }), '00');
    expect(container.querySelector('#time')).toHaveValue('12:00');
  });

  it('should move focus to minutes input when numeric hours is typed', async () => {
    render(<TimeInput id="time" label="timer" hoursLabel="Hours" minutesLabel="Minutes" />);
    userEvent.type(screen.getByLabelText('Hours', { selector: 'input' }), '12');
    expect(screen.getByLabelText('Minutes', { selector: 'input' })).toHaveFocus();
  });

  it('should not update hours value when non-numeric string is typed', async () => {
    render(<TimeInput id="time" label="timer" hoursLabel="Hours" minutesLabel="Minutes" />);
    const hoursInput = screen.getByLabelText('Hours', { selector: 'input' });
    userEvent.type(hoursInput, 'test');
    expect(hoursInput).toHaveValue('');
  });

  it('should not update minutes value when non-numeric string is typed', async () => {
    render(<TimeInput id="time" label="timer" hoursLabel="Hours" minutesLabel="Minutes" />);
    const minutesInput = screen.getByLabelText('Minutes', { selector: 'input' });
    userEvent.type(minutesInput, 'test');
    expect(minutesInput).toHaveValue('');
  });

  it('should remove colon from time value when both minutes and hours are missing', async () => {
    const { container } = render(
      <TimeInput id="time" label="timer" hoursLabel="Hours" minutesLabel="Minutes" defaultValue="00:00" />,
    );
    userEvent.type(screen.getByLabelText('Hours', { selector: 'input' }), '{backspace}');
    userEvent.type(screen.getByLabelText('Minutes', { selector: 'input' }), '{backspace}');
    expect(container.querySelector('#time')).toHaveValue('');
  });
});
