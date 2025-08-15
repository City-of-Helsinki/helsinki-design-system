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
jest.mock('../notification', () => ({
  Notification: (props: any) => {
    const React = require('react');
    if (props.invisible && props.notificationAriaLabel) {
      return React.createElement(
        'div', 
        { 
          'data-testid': 'notification', 
          'aria-live': props['aria-live'] || 'polite',
          role: 'status'
        }, 
        props.notificationAriaLabel
      );
    }
    return null;
  },
}));

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

  it('passes accessibility test', async () => {
    const { container } = render(<DateInput id="date" label="Foo" />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('informs screen reader users when month is changed', async () => {
    const testCases = [
      {
        language: 'en' as const,
        expectedTextPattern: /Calendar page has changed to/,
        expectedMonth: 'February 2021', // Next month from January 2021
        nextMonthLabel: 'Next month'
      },
      {
        language: 'fi' as const,
        expectedTextPattern: /Kalenterisivu on vaihtunut kuukauteen/,
        expectedMonth: 'helmikuu 2021', // Finnish for February 2021
        nextMonthLabel: 'Seuraava kuukausi'
      },
      {
        language: 'sv' as const,
        expectedTextPattern: /Kalendersidan har ändrats till/,
        expectedMonth: 'februari 2021', // Swedish for February 2021
        nextMonthLabel: 'Nästa månad'
      }
    ];

    for (const testCase of testCases) {
      const { rerender } = render(<DateInput id="date" label="Date" language={testCase.language} />);
      
      // Open the date picker
      await act(async () => {
        userEvent.click(screen.getByLabelText(
          testCase.language === 'en' ? 'Choose date' :
          testCase.language === 'fi' ? 'Valitse päivämäärä' :
          'Välj datum'
        ));
      });

      // Wait for the date picker to be visible
      expect(screen.getByRole('dialog')).toBeInTheDocument();

      // Click the next month button to change the month
      const nextMonthButton = screen.getByLabelText(testCase.nextMonthLabel);
      await act(async () => {
        userEvent.click(nextMonthButton);
      });

      // Wait for and check that an aria-live notification appears with the correct language message and month/year
      await waitFor(() => {
        const notification = screen.getByTestId('notification');
        expect(notification).toBeInTheDocument();
        expect(notification).toHaveAttribute('aria-live', 'polite');
        expect(notification.textContent).toMatch(testCase.expectedTextPattern);
        expect(notification.textContent).toContain(testCase.expectedMonth);
      });

      // Clean up for next iteration
      rerender(<div />);
    }
  });
});
