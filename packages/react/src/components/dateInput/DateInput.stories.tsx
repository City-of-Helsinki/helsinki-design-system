import React, { useState } from 'react';
import parse from 'date-fns/parse';
import addDays from 'date-fns/addDays';
import format from 'date-fns/format';
import isWeekend from 'date-fns/isWeekend';
import isSameDay from 'date-fns/isSameDay';
import { addMonths } from 'date-fns';

import { DateInput } from '.';
import { Button } from '../button';
import { IconCrossCircle } from '../../icons';

const formatHelperTextEnglish = 'Use format D.M.YYYY';

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
    helperText: formatHelperTextEnglish,
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

export const WithMinAndMaxDate = (args) => {
  const minDate = new Date();
  minDate.setDate(4);
  const maxDate = addMonths(new Date(), 4);
  return <DateInput {...args} minDate={minDate} maxDate={maxDate} />;
};

WithMinAndMaxDate.parameters = { loki: { skip: true } };

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
        <DateInput
          {...args}
          id={`${args.id}-fi`}
          language="fi"
          label="Valitse päivämäärä"
          helperText={formatHelperTextEnglish}
        />
      </div>
      <div style={bottomMargin}>
        <DateInput
          {...args}
          id={`${args.id}-sv`}
          language="sv"
          label="Välj ett datum"
          helperText="Använd ett format D.M.ÅÅÅÅ"
        />
      </div>
      <div style={bottomMargin}>
        <DateInput
          {...args}
          id={`${args.id}-en`}
          language="en"
          label="Choose a date"
          helperText="Käytä muotoa P.K.VVVV"
        />
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

export const WithDisabledDates = (args) => {
  const [value, setValue] = useState<string>('');
  const [errorText, setErrorText] = useState<string | undefined>(undefined);
  const dateHelperText = 'Only weekdays are available.';
  const helperText = `${dateHelperText} ${formatHelperTextEnglish}`;

  React.useEffect(() => {
    if (!value) {
      setErrorText(undefined);
    } else {
      const selectedDate = parse(value, 'dd.M.yyyy', new Date());
      if (isWeekend(selectedDate)) {
        setErrorText(`The date is a weekend day. ${dateHelperText}`);
      } else {
        setErrorText(undefined);
      }
    }
  }, [value]);

  return (
    <DateInput
      {...args}
      value={value}
      onChange={setValue}
      isDateDisabledBy={isWeekend}
      helperText={helperText}
      errorText={errorText}
      invalid={!!errorText}
    />
  );
};
WithDisabledDates.storyName = 'With disabled dates';
WithDisabledDates.parameters = { loki: { skip: true } };

export const WithSelectedDisabledDates = (args) => {
  const dateFormat = 'dd.M.yyyy';
  const dateValue = new Date(2021, 10, 12);
  const [value, setValue] = useState<string>(format(dateValue, dateFormat));
  const [errorText, setErrorText] = useState<string | undefined>(undefined);
  const disabledDates = [addDays(dateValue, 12), addDays(dateValue, 14)];
  const helperText = `Dates ${disabledDates
    .map((d) => format(d, dateFormat))
    .join(' and ')} are disabled. Use other dates instead. ${formatHelperTextEnglish}`;
  const isDisabledDate = (date) => !!disabledDates.find((disabledDate) => isSameDay(disabledDate, date));

  React.useEffect(() => {
    if (!value) {
      setErrorText(undefined);
    } else {
      const selectedDate = parse(value, dateFormat, new Date());
      if (isDisabledDate(selectedDate)) {
        setErrorText(`This date is disabled. Please use another date instead.`);
      } else {
        setErrorText(undefined);
      }
    }
  }, [value]);

  return (
    <DateInput
      {...args}
      value={value}
      onChange={setValue}
      isDateDisabledBy={isDisabledDate}
      helperText={helperText}
      errorText={errorText}
      invalid={!!errorText}
    />
  );
};
WithSelectedDisabledDates.storyName = 'With selected disabled dates';
WithSelectedDisabledDates.parameters = { loki: { skip: true } };
