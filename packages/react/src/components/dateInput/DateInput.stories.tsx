import React, { useState } from 'react';
import isSameDay from 'date-fns/isSameDay';
import parse from 'date-fns/parse';

import { DateInput } from '.';
import { Button } from '../button';
import { IconCrossCircle } from '../../icons';

export default {
  component: DateInput,
  title: 'Components/DateInput',
  decorators: [(storyFn) => <div style={{ maxWidth: '400px' }}>{storyFn()}</div>],
  parameters: {
    controls: { hideNoControlsWarning: true },
  },
  args: {
    id: 'date',
    label: 'Choose a date',
    helperText: 'Assistive text',
    language: 'en',
    disableConfirmation: false,
    disableDatePicker: false,
    onChange: (value: string, valueAsDate: Date) => {
      // eslint-disable-next-line no-console
      console.log(value, valueAsDate);
    },
  },
};

export const Default = (args) => {
  return <DateInput {...args} />;
};

export const WithMinDate = (args) => {
  const minDate = new Date();
  minDate.setDate(4);
  return <DateInput {...args} minDate={minDate} />;
};

export const WithoutConfirmation = (args) => {
  return <DateInput {...args} />;
};
WithoutConfirmation.storyName = 'Without confirmation';
WithoutConfirmation.args = {
  disableConfirmation: true,
};

export const Localisation = (args) => {
  const bottomMargin = { marginBottom: 'var(--spacing-m)' };
  return (
    <div>
      <div style={bottomMargin}>
        <DateInput {...args} id={`${args.id}-fi`} language="fi" label="Valitse päivämäärä" />
      </div>
      <div style={bottomMargin}>
        <DateInput {...args} id={`${args.id}-sv`} language="sv" label="Välj ett datum" />
      </div>
      <div style={bottomMargin}>
        <DateInput {...args} id={`${args.id}-en`} language="en" label="Choose a date" />
      </div>
    </div>
  );
};

export const WithoutDatePicker = (args) => {
  return <DateInput {...args} />;
};
WithoutDatePicker.storyName = 'Without date picker';
WithoutDatePicker.args = {
  disableDatePicker: true,
};

export const WithExternalClearValueButton = (args) => {
  const [value, setValue] = useState<string>('10.2.2022');
  return (
    <div className="date-input--external-clear-value-button">
      <DateInput {...args} value={value} onChange={setValue} />
      <Button variant="supplementary" onClick={() => setValue('')} iconLeft={<IconCrossCircle aria-hidden />}>
        Clear value
      </Button>
    </div>
  );
};
WithExternalClearValueButton.storyName = 'With external clear value button';

export const WithExcludedDates = (args) => {
  const excludedDates = [
    new Date(2021, 10, 1),
    new Date(2021, 10, 10),
    new Date(2021, 10, 11),
    new Date(2021, 10, 12),
    new Date(2021, 10, 13),
    new Date(2021, 10, 14),
    new Date(2021, 10, 15),
    new Date(2021, 10, 16),
    new Date(2021, 10, 17),
    new Date(2021, 10, 18),
    new Date(2021, 10, 19),
    new Date(2021, 10, 20),
  ];
  const [value, setValue] = useState<string>('');
  const [errorText, setErrorText] = useState<string | undefined>(undefined);

  React.useEffect(() => {
    if (!value) {
      setErrorText(undefined);
    } else {
      const selectedDate = parse(value, 'dd.M.yyyy', new Date());
      const isNotExcludedDate = excludedDates.every((excludedDate) => !isSameDay(excludedDate, selectedDate));
      if (isNotExcludedDate) {
        setErrorText(undefined);
      } else {
        setErrorText('Selected date is not available');
      }
    }
  }, [value]);

  return (
    <DateInput
      {...args}
      value={value}
      onChange={setValue}
      excludedDates={excludedDates}
      errorText={errorText}
      invalid={!!errorText}
    />
  );
};
WithExcludedDates.storyName = 'With excluded dates';
WithExcludedDates.parameters = { loki: { skip: true } };
