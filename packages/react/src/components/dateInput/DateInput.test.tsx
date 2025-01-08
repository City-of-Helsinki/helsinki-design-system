/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable max-classes-per-file */
import React from 'react';
import { act } from 'react-dom/test-utils';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
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

  it('renders the component with default props', async () => {
    const { asFragment } = render(<DateInput id="date" />);
    await userEvent.click(screen.getByLabelText('Choose date'));
    expect(asFragment()).toMatchSnapshot();
  });

  it('renders the component with additional props', async () => {
    const { asFragment } = render(<DateInput id="date" label="Foo" disableConfirmation />);
    await act(async () => {
      await userEvent.click(screen.getByLabelText('Choose date'));
    });
    expect(asFragment()).toMatchSnapshot();
  });

  it('passes accessibility test', async () => {
    const { container } = render(<DateInput id="date" label="Foo" />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
