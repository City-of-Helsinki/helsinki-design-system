/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable max-classes-per-file */
import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { axe } from 'jest-axe';

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

  it('renders the component with default props', () => {
    const { asFragment } = render(<DateInput id="date" />);
    expect(asFragment()).toMatchSnapshot();
  });
  it('renders the component with additional props', () => {
    const { asFragment } = render(<DateInput id="date" label="Foo" disableConfirmation />);
    expect(asFragment()).toMatchSnapshot();
  });
  it('renders the component with different languages', () => {
    const { asFragment } = render(
      <>
        <DateInput id="date" language="en" />
        <DateInput id="date" language="fi" />
        <DateInput id="date" language="sv" />
      </>,
    );
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
    fireEvent.click(screen.getByLabelText('Choose date'));

    // Calendar dialog should be visible
    expect(screen.getByRole('dialog')).toBeVisible();

    // Close with the close button
    fireEvent.click(screen.getByTestId('closeButton'));

    // Calendar should be hidden
    expect(screen.queryByRole('dialog')).toBeNull();
  });

  it('has current date selected by default', async () => {
    const { container } = render(<DateInput id="date" label="Foo" />);

    // Click the calendar button
    fireEvent.click(screen.getByLabelText('Choose date'));

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
    fireEvent.click(screen.getByLabelText('Choose date'));

    // Change month to February and year to 2022
    fireEvent.change(screen.getByLabelText('Month'), { target: { value: '1' } });
    fireEvent.change(screen.getByLabelText('Year'), { target: { value: '2022' } });

    // Current date should not be visible anymore
    expect(container.querySelector('td[aria-current="date"]')).toBeNull();

    // Select the date 2022-02-10
    fireEvent.click(container.querySelector('button[data-date="2022-02-10"]'));

    // The button should now have aria-pressed="true" attribute and selected class
    const currentDateButton = container.querySelector('button[data-date="2022-02-10"]');
    expect(currentDateButton).toHaveAttribute('aria-pressed', 'true');
    expect(currentDateButton).toHaveClass('hds-datepicker__day--selected');
  });

  it('sets the correct input value with confirmation mode on', async () => {
    const { container } = render(<DateInput id="date" label="Foo" />);

    // Click the calendar button
    fireEvent.click(screen.getByLabelText('Choose date'));

    // Change month to February and year to 2022
    fireEvent.change(screen.getByLabelText('Month'), { target: { value: '1' } });
    fireEvent.change(screen.getByLabelText('Year'), { target: { value: '2022' } });

    // Select the date 2022-02-10
    fireEvent.click(container.querySelector('button[data-date="2022-02-10"]'));

    // Confirm the date selection by clicking the Select button
    fireEvent.click(screen.getByTestId('selectButton'));

    // Calendar should be hidden
    expect(screen.queryByRole('dialog')).toBeNull();

    // TextInput should have the correct value
    expect(screen.getByRole('textbox')).toHaveValue('10.2.2022');
  });

  it('does not set the input value when close button is pressed', async () => {
    const { container } = render(<DateInput id="date" label="Foo" />);

    // Click the calendar button
    fireEvent.click(screen.getByLabelText('Choose date'));

    // Change month to February and year to 2022
    fireEvent.change(screen.getByLabelText('Month'), { target: { value: '1' } });
    fireEvent.change(screen.getByLabelText('Year'), { target: { value: '2022' } });

    // Select the date 2022-02-10
    fireEvent.click(container.querySelector('button[data-date="2022-02-10"]'));

    // Close with the Close button
    fireEvent.click(screen.getByTestId('closeButton'));

    // Calendar should be hidden
    expect(screen.queryByRole('dialog')).toBeNull();

    // TextInput should have any value
    expect(screen.getByRole('textbox')).toHaveValue('');
  });

  it('does not set the input value when clicked outside the modal', async () => {
    const { container } = render(<DateInput id="date" label="Foo" />);

    // Click the calendar button
    fireEvent.click(screen.getByLabelText('Choose date'));

    // Change month to February and year to 2022
    fireEvent.change(screen.getByLabelText('Month'), { target: { value: '1' } });
    fireEvent.change(screen.getByLabelText('Year'), { target: { value: '2022' } });

    // Select the date 2022-02-10
    fireEvent.click(container.querySelector('button[data-date="2022-02-10"]'));

    // Click outside the calendar
    fireEvent.click(container);

    // Calendar should be hidden
    expect(screen.queryByRole('dialog')).toBeNull();

    // TextInput should have any value
    expect(screen.getByRole('textbox')).toHaveValue('');
  });

  it('sets the correct input value with confirmation mode off', async () => {
    const { container } = render(<DateInput id="date" label="Foo" disableConfirmation />);

    // Click the calendar button
    fireEvent.click(screen.getByLabelText('Choose date'));

    // Change month to February and year to 2022
    fireEvent.change(screen.getByLabelText('Month'), { target: { value: '1' } });
    fireEvent.change(screen.getByLabelText('Year'), { target: { value: '2022' } });

    // Select the date 2022-02-10
    fireEvent.click(container.querySelector('button[data-date="2022-02-10"]'));

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
    fireEvent.click(screen.getByLabelText('Choose date'));

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
    fireEvent.click(screen.getByLabelText('Choose date'));

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
    fireEvent.click(screen.getByLabelText('Choose date'));

    // Month select should have correct value
    expect(screen.getByLabelText('Month')).toHaveValue('1');
    expect(screen.getByLabelText('Year')).toHaveValue('2022');

    // The corresponding button should now have aria-pressed="true" attribute and selected class
    const currentDateButton = container.querySelector('button[data-date="2022-02-10"]');
    expect(currentDateButton).toHaveAttribute('aria-pressed', 'true');
    expect(currentDateButton).toHaveClass('hds-datepicker__day--selected');

    // Set invalid date as the input value
    fireEvent.change(screen.getByRole('textbox'), { target: { value: '20' } });

    // No date should be selected in the calendar
    expect(container.querySelector('[aria-pressed="true"')).toBeNull();
  });
});
