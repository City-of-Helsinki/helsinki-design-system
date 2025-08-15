/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable max-classes-per-file */
import React from 'react';
import { act } from 'react-dom/test-utils';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom/extend-expect';
import { axe } from 'jest-axe';

import { DateInput } from './DateInput';

// Mock the Notification component to be able to test aria-live announcements
jest.mock('../notification', () => {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const mockReact = jest.requireActual('react');
  return {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    Notification: (props: any) => {
      if (props.invisible && props.notificationAriaLabel) {
        return mockReact.createElement(
          'div',
          {
            'data-testid': 'notification',
            'aria-live': props['aria-live'] || 'polite',
            role: 'status',
          },
          props.notificationAriaLabel,
        );
      }
      return null;
    },
  };
});

describe('<DateInput /> spec', () => {
  const RealDate = Date;
  const mockDate = (isoDate: string) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (global as any).Date = class extends RealDate {
      constructor(...theArgs: ConstructorParameters<typeof RealDate>) {
        super();
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

  it('passes accessibility test', async () => {
    const { container } = render(<DateInput id="date" label="Foo" />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('informs screen reader users when month is changed - English', async () => {
    const { rerender } = render(<DateInput id="date" label="Date" language="en" />);

    // Open the date picker
    await act(async () => {
      userEvent.click(screen.getByLabelText('Choose date'));
    });

    // Wait for the date picker to be visible
    expect(screen.getByRole('dialog')).toBeInTheDocument();

    // Click the next month button to change the month
    const nextMonthButton = screen.getByLabelText('Next month');
    await act(async () => {
      userEvent.click(nextMonthButton);
    });

    // Wait for and check that an aria-live notification appears with the correct language message and month/year
    await waitFor(() => {
      const notification = screen.getByTestId('notification');
      expect(notification).toBeInTheDocument();
      expect(notification).toHaveAttribute('aria-live', 'polite');
      expect(notification.textContent).toMatch(/Calendar page has changed to/);
      expect(notification.textContent).toContain('February 2021');
    });

    // Clean up
    rerender(<div />);
  });

  it('informs screen reader users when month is changed - Finnish', async () => {
    const { rerender } = render(<DateInput id="date" label="Date" language="fi" />);

    // Open the date picker
    await act(async () => {
      userEvent.click(screen.getByLabelText('Valitse päivämäärä'));
    });

    // Wait for the date picker to be visible
    expect(screen.getByRole('dialog')).toBeInTheDocument();

    // Click the next month button to change the month
    const nextMonthButton = screen.getByLabelText('Seuraava kuukausi');
    await act(async () => {
      userEvent.click(nextMonthButton);
    });

    // Wait for and check that an aria-live notification appears with the correct language message and month/year
    await waitFor(() => {
      const notification = screen.getByTestId('notification');
      expect(notification).toBeInTheDocument();
      expect(notification).toHaveAttribute('aria-live', 'polite');
      expect(notification.textContent).toMatch(/Kalenterisivu on vaihtunut kuukauteen/);
      expect(notification.textContent).toContain('helmikuu 2021');
    });

    // Clean up
    rerender(<div />);
  });

  it('informs screen reader users when month is changed - Swedish', async () => {
    const { rerender } = render(<DateInput id="date" label="Date" language="sv" />);

    // Open the date picker
    await act(async () => {
      userEvent.click(screen.getByLabelText('Välj datum'));
    });

    // Wait for the date picker to be visible
    expect(screen.getByRole('dialog')).toBeInTheDocument();

    // Click the next month button to change the month
    const nextMonthButton = screen.getByLabelText('Nästa månad');
    await act(async () => {
      userEvent.click(nextMonthButton);
    });

    // Wait for and check that an aria-live notification appears with the correct language message and month/year
    await waitFor(() => {
      const notification = screen.getByTestId('notification');
      expect(notification).toBeInTheDocument();
      expect(notification).toHaveAttribute('aria-live', 'polite');
      expect(notification.textContent).toMatch(/Kalendersidan har ändrats till/);
      expect(notification.textContent).toContain('februari 2021');
    });

    // Clean up
    rerender(<div />);
  });
});
