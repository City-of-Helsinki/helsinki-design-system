/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable max-classes-per-file */
import React, { useState } from 'react';
import { act } from 'react-dom/test-utils';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom/extend-expect';
import { axe } from 'jest-axe';
import isWeekend from 'date-fns/isWeekend';

import { DateInput } from './DateInput';

describe('<DateInput /> spec', () => {
  const RealDate = Date;
  const mockDate = (isoDate: string) => {
    (global as any).Date = class extends RealDate {
      constructor(...theArgs: [number, number, number, number, number, number]) {
        super(...theArgs);
        if (theArgs.length) {
          return new RealDate(...theArgs);
        }
        return new RealDate(isoDate);
      }

      static now() {
        return new RealDate(isoDate).getTime();
      }
    };
  };

  beforeEach(() => {
    mockDate('2021-01-17T12:49:00');
  });

  afterEach(() => {
    global.Date = RealDate;
  });

  it('renders the component with default props', async () => {
    const { asFragment } = render(<DateInput id="date" />);
    await act(async () => {
      userEvent.click(screen.getByLabelText('Choose date'));
    });
    expect(asFragment()).toMatchSnapshot();
  });

  it('renders the component with additional props', async () => {
    const { asFragment } = render(<DateInput id="date" label="Foo" disableConfirmation />);
    await act(async () => {
      userEvent.click(screen.getByLabelText('Choose date'));
    });
    expect(asFragment()).toMatchSnapshot();
  });

  it('renders the component with Finnish language', async () => {
    const { asFragment } = render(<DateInput id="date" language="fi" />);
    await act(async () => {
      userEvent.click(screen.getByLabelText('Valitse päivämäärä'));
    });
    expect(asFragment()).toMatchSnapshot();
  });

  it('renders the component with Swedish language', async () => {
    const { asFragment } = render(<DateInput id="date" language="sv" />);
    await act(async () => {
      userEvent.click(screen.getByLabelText('Välj datum'));
    });
    expect(asFragment()).toMatchSnapshot();
  });

  it('passes accessibility test', async () => {
    const { container } = render(<DateInput id="date" label="Foo" />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('opens and closes the date picker', async () => {
    render(<DateInput id="date" label="Foo" />);

    // Calendar dialog should be hidden by default
    expect(screen.queryByRole('dialog')).toBeNull();

    // Click the calendar button
    await act(async () => {
      userEvent.click(screen.getByLabelText('Choose date'));
    });

    // Calendar dialog should be visible
    expect(screen.getByRole('dialog')).toBeVisible();

    // Close with the close button
    userEvent.click(screen.getByTestId('closeButton'));

    // Calendar should be hidden
    expect(screen.queryByRole('dialog')).toBeNull();
  });

  it('has current date selected by default', async () => {
    const { container } = render(<DateInput id="date" label="Foo" />);

    // Click the calendar button
    await act(async () => {
      userEvent.click(screen.getByLabelText('Choose date'));
    });

    // Current date should be selected
    expect(screen.getByLabelText('Month')).toHaveValue('0');
    expect(screen.getByLabelText('Year')).toHaveValue('2021');

    // Get the current date cell
    const cellElement = container.querySelector('td[aria-current="date"]');

    // Current date cell should have a button with the current date as content
    expect(cellElement.querySelectorAll('button > span')[0]).toHaveTextContent('17');
    expect(cellElement.querySelectorAll('button > span')[1]).toHaveTextContent('January 17');
  });

  it('sets the correct attributes when date is selected', async () => {
    const { container } = render(<DateInput id="date" label="Foo" />);

    // Click the calendar button
    await act(async () => {
      userEvent.click(screen.getByLabelText('Choose date'));
    });

    // Change month to February and year to 2022
    userEvent.selectOptions(screen.getByLabelText('Month'), '1');
    userEvent.selectOptions(screen.getByLabelText('Year'), '2022');

    // Current date should not be visible anymore
    expect(container.querySelector('td[aria-current="date"]')).toBeNull();

    // Select the date 2022-02-10
    userEvent.click(container.querySelector('button[data-date="2022-02-10"]'));

    // The button should now have aria-pressed="true" attribute and selected class
    const currentDateButton = container.querySelector('button[data-date="2022-02-10"]');
    expect(currentDateButton).toHaveAttribute('aria-pressed', 'true');
    expect(currentDateButton).toHaveClass('hds-datepicker__day--selected');
  });

  it('sets the correct input value with confirmation mode on', async () => {
    const { container } = render(<DateInput id="date" label="Foo" />);

    // Click the calendar button
    await act(async () => {
      userEvent.click(screen.getByLabelText('Choose date'));
    });

    // Change month to February and year to 2022
    userEvent.selectOptions(screen.getByLabelText('Month'), '1');
    userEvent.selectOptions(screen.getByLabelText('Year'), '2022');

    // Select the date 2022-02-10
    userEvent.click(container.querySelector('button[data-date="2022-02-10"]'));

    // Confirm the date selection by clicking the Select button
    userEvent.click(screen.getByTestId('selectButton'));

    // Calendar should be hidden
    expect(screen.queryByRole('dialog')).toBeNull();

    // TextInput should have the correct value
    expect(screen.getByRole('textbox')).toHaveValue('10.2.2022');
  });

  it('does not set the input value when close button is pressed', async () => {
    const { container } = render(<DateInput id="date" label="Foo" />);

    // Click the calendar button
    await act(async () => {
      userEvent.click(screen.getByLabelText('Choose date'));
    });

    // Change month to February and year to 2022
    userEvent.selectOptions(screen.getByLabelText('Month'), '1');
    userEvent.selectOptions(screen.getByLabelText('Year'), '2022');

    // Select the date 2022-02-10
    userEvent.click(container.querySelector('button[data-date="2022-02-10"]'));

    // Close with the Close button
    userEvent.click(screen.getByTestId('closeButton'));

    // Calendar should be hidden
    expect(screen.queryByRole('dialog')).toBeNull();

    // TextInput should have any value
    expect(screen.getByRole('textbox')).toHaveValue('');
  });

  it('does not set the input value when clicked outside the modal', async () => {
    const { container } = render(<DateInput id="date" label="Foo" />);

    // Click the calendar button
    await act(async () => {
      userEvent.click(screen.getByLabelText('Choose date'));
    });

    // Change month to February and year to 2022
    userEvent.selectOptions(screen.getByLabelText('Month'), '1');
    userEvent.selectOptions(screen.getByLabelText('Year'), '2022');

    // Select the date 2022-02-10
    userEvent.click(container.querySelector('button[data-date="2022-02-10"]'));

    // Click outside the calendar
    await act(async () => {
      userEvent.click(container);
    });

    // Calendar should be hidden
    expect(screen.queryByRole('dialog')).toBeNull();

    // TextInput should have any value
    expect(screen.getByRole('textbox')).toHaveValue('');
  });

  it('sets the correct input value with confirmation mode off', async () => {
    const { container } = render(<DateInput id="date" label="Foo" disableConfirmation />);

    // Click the calendar button
    await act(async () => {
      userEvent.click(screen.getByLabelText('Choose date'));
    });

    // Change month to February and year to 2022
    userEvent.selectOptions(screen.getByLabelText('Month'), '1');
    userEvent.selectOptions(screen.getByLabelText('Year'), '2022');

    // Select the date 2022-02-10
    userEvent.click(container.querySelector('button[data-date="2022-02-10"]'));

    // Calendar should become hidden
    expect(screen.queryByRole('dialog')).toBeNull();

    // TextInput should have the correct value
    expect(screen.getByRole('textbox')).toHaveValue('10.2.2022');
  });

  it('has correct date selected when defaultValue is provided', async () => {
    const { container } = render(<DateInput id="date" label="Foo" defaultValue="10.02.2022" />);

    // TextInput should have the correct value
    expect(screen.getByRole('textbox')).toHaveValue('10.02.2022');

    // Click the calendar button
    await act(async () => {
      userEvent.click(screen.getByLabelText('Choose date'));
    });

    // Month select should have correct value
    expect(screen.getByLabelText('Month')).toHaveValue('1');
    expect(screen.getByLabelText('Year')).toHaveValue('2022');

    // The corresponding button should now have aria-pressed="true" attribute and selected class
    const currentDateButton = container.querySelector('button[data-date="2022-02-10"]');
    expect(currentDateButton).toHaveAttribute('aria-pressed', 'true');
    expect(currentDateButton).toHaveClass('hds-datepicker__day--selected');
  });

  it('has correct date selected when value is provided', async () => {
    const { container } = render(<DateInput id="date" label="Foo" value="10.02.2022" />);

    // TextInput should have the correct value
    expect(screen.getByRole('textbox')).toHaveValue('10.02.2022');

    // Click the calendar button
    await act(async () => {
      userEvent.click(screen.getByLabelText('Choose date'));
    });

    // Month select should have correct value
    expect(screen.getByLabelText('Month')).toHaveValue('1');
    expect(screen.getByLabelText('Year')).toHaveValue('2022');

    // The corresponding button should now have aria-pressed="true" attribute and selected class
    const currentDateButton = container.querySelector('button[data-date="2022-02-10"]');
    expect(currentDateButton).toHaveAttribute('aria-pressed', 'true');
    expect(currentDateButton).toHaveClass('hds-datepicker__day--selected');
  });

  it('setting invalid date as the input value resets the selected date in calendar', async () => {
    const { container } = render(<DateInput id="date" label="Foo" value="10.02.2022" />);

    // TextInput should have the correct value
    expect(screen.getByRole('textbox')).toHaveValue('10.02.2022');

    // Click the calendar button
    await act(async () => {
      userEvent.click(screen.getByLabelText('Choose date'));
    });

    // Month select should have correct value
    expect(screen.getByLabelText('Month')).toHaveValue('1');
    expect(screen.getByLabelText('Year')).toHaveValue('2022');

    // The corresponding button should now have aria-pressed="true" attribute and selected class
    const currentDateButton = container.querySelector('button[data-date="2022-02-10"]');
    expect(currentDateButton).toHaveAttribute('aria-pressed', 'true');
    expect(currentDateButton).toHaveClass('hds-datepicker__day--selected');

    // Set invalid date as the input value
    await act(async () => {
      userEvent.type(screen.getByRole('textbox'), '20');
    });

    // No date should be selected in the calendar
    expect(container.querySelector('[aria-pressed="true"]')).toBeNull();
  });

  it('should be able to clear the value with external button', async () => {
    const clearButtonText = 'Clear value';
    const DatePickerWithClearButton = () => {
      const [value, setValue] = useState<string>('10.02.2022');
      return (
        <>
          <button type="button" onClick={() => setValue('')}>
            {clearButtonText}
          </button>
          <DateInput id="date" label="Foo" value={value} />
        </>
      );
    };
    render(<DatePickerWithClearButton />);

    // The initial value should be there
    expect(screen.getByRole('textbox')).toHaveValue('10.02.2022');

    // Click the calendar button to show datepicker
    await act(async () => {
      userEvent.click(screen.getByLabelText('Choose date'));
    });

    expect(screen.getByLabelText('Month')).toHaveValue('1');
    expect(screen.getByLabelText('Year')).toHaveValue('2022');

    // Set an empty string as the input value
    await act(async () => {
      userEvent.click(
        screen.getByRole('button', {
          name: clearButtonText,
        }),
      );
    });
    // The initial value should be cleared
    expect(screen.getByRole('textbox')).toHaveValue('');

    // Click the calendar button to show datepicker
    await act(async () => {
      userEvent.click(screen.getByLabelText('Choose date'));
    });

    expect(screen.getByLabelText('Month')).toHaveValue('0');
    expect(screen.getByLabelText('Year')).toHaveValue('2021');
  });

  it('should be able to navigate dates with keyboard when minDate is set', async () => {
    const minDate = new Date();

    const { container } = render(
      <DateInput
        disableConfirmation
        helperText="Assistive text"
        id="date"
        minDate={minDate}
        initialMonth={new Date()}
        label="Choose a date"
        language="en"
      />,
    );

    // Click the calendar button
    await act(async () => {
      userEvent.click(screen.getByLabelText('Choose date'));
    });

    await act(async () => {
      userEvent.tab();
      userEvent.tab();
      userEvent.tab();
      userEvent.tab();
    });

    const currentDateButton = container.querySelector('button[data-date="2021-01-17"]');

    expect(currentDateButton).toHaveFocus();
  });

  it('should skip weekend dates with keyboard navigation when weekend dates are disabled', async () => {
    const { container } = render(
      <DateInput
        id="date"
        initialMonth={new Date()}
        label="Choose a date"
        language="en"
        isDateDisabledBy={isWeekend}
      />,
    );

    // Click the calendar button
    await act(async () => {
      userEvent.click(screen.getByLabelText('Choose date'));
    });

    // Move focus into first calendar date button
    await act(async () => {
      userEvent.tab();
      userEvent.tab();
      userEvent.tab();
      userEvent.tab();
    });

    const fridayButton = container.querySelector('button[data-date="2021-01-01"]');
    expect(fridayButton).toHaveFocus();
    await act(async () => {
      userEvent.type(fridayButton, '{arrowright}');
    });
    const nextMondayButton = container.querySelector('button[data-date="2021-01-04"]');
    expect(nextMondayButton).toHaveFocus();
  });
});
