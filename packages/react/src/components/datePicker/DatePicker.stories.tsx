import React from 'react';

import { DatePicker } from '.';
import { DateInput } from './DateInput';

export default {
  component: DatePicker,
  title: 'Components/DatePicker',
  decorators: [(storyFn) => <div style={{ maxWidth: '400px' }}>{storyFn()}</div>],
};

export const Default = () => {
  return <DateInput id="date" label="Pick a date" />;
};

export const WithoutConfirmation = () => {
  return <DateInput confirmDate={false} id="date" label="Pick a date" />;
};
WithoutConfirmation.storyName = 'Without confirmation';

export const Localization = () => {
  return (
    <div>
      <div style={{ marginBottom: 'var(--spacing-m)' }}>
        <DateInput
          id="date"
          label="Valitse päivämäärä"
          language="fi"
          selectButtonLabel="Valitse"
          closeButtonLabel="Sulje"
        />
      </div>
      <div style={{ marginBottom: 'var(--spacing-m)' }}>
        <DateInput id="date" label="Välj ett datum" language="sv" selectButtonLabel="Välj" closeButtonLabel="Stäng" />
      </div>
      <div style={{ marginBottom: 'var(--spacing-m)' }}>
        <DateInput id="date" label="Choose a date" language="en" />
      </div>
    </div>
  );
};
