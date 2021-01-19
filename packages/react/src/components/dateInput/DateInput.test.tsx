/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable max-classes-per-file */
import React from 'react';
import { render } from '@testing-library/react';
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
});
