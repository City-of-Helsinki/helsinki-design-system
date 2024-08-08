import React, { useState } from 'react';
import parse from 'date-fns/parse';
import isWeekend from 'date-fns/isWeekend';
import isSameDay from 'date-fns/isSameDay';
import { addMonths, addDays, format, subDays, isValid } from 'date-fns';

import { DateInput, DateInputProps } from '.';
import { Button } from '../button';
import { IconCrossCircle } from '../../icons';
import { LegendItem } from './components/datePicker';

const formatHelperTextEnglish = 'Use format D.M.YYYY';

const argTypes = {
  minDate: {
    control: 'date',
  },
  maxDate: {
    control: 'date',
  },
};

export default {
  component: DateInput,
  title: 'Components/DateInput',
  decorators: [(storyFn) => <div style={{ maxWidth: '400px' }}>{storyFn()}</div>],
  parameters: {
    controls: { hideNoControlsWarning: true },
  },
  argTypes,
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

export const Invalid = (args) => {
  return <DateInput {...args} />;
};
Invalid.args = {
  id: 'Invalid',
  invalid: true,
  errorText: 'Date invalid',
};

export const Success = (args) => {
  return <DateInput {...args} />;
};
Success.args = {
  id: 'Success',
  successText: 'Date is valid',
};

export const WithCustomDayStyles = (args: DateInputProps) => {
  const dateFormat = 'dd.M.yyyy';
  const dateValue = new Date(2021, 10, 12);
  const [value, setValue] = useState<string>(format(dateValue, dateFormat));
  const helperText = `Custom styles for days with limited available timeslots in the date picker calendar. Use format D.M.YYYY.`;

  const littleSpaceLeftDate: LegendItem = {
    elementId: 'little-space-left',
    label: 'Only a few free timeslots available',
    relatedClassName: 'little-space-left',
  };
  /* When days have different backgrounds, it's good practice to explain selected dates as well */
  const selectedDate: LegendItem = {
    label: 'Date is selected',
    selected: true,
  };
  const legend = [littleSpaceLeftDate, selectedDate];

  const dayHasLittleSpace = (day: number) =>
    day === 3 || day === 4 || day === 17 || day === 19 || day === 23 || day === 24;

  const getDateLegendId = (date: Date) => {
    const day = date.getDate();
    if (dayHasLittleSpace(day)) return littleSpaceLeftDate.elementId;
    if (isSameDay(parse(value, dateFormat, date), date)) return selectedDate.elementId;
    return undefined;
  };

  const setDateClassName = (date: Date) => {
    const legendId = getDateLegendId(date);
    if (legendId === littleSpaceLeftDate.elementId) return littleSpaceLeftDate.relatedClassName;
    return undefined;
  };

  const setDateAriaDescribedBy = (date: Date) => {
    return getDateLegendId(date);
  };

  return (
    <>
      <style>
        {`
          .little-space-left {
              --date-background: var(--color-summer-medium-light);
              --date-border: 1px solid black;
          }
        `}
      </style>
      <DateInput
        {...args}
        value={value}
        onChange={setValue}
        helperText={helperText}
        setDateClassName={setDateClassName}
        setDateAriaDescribedBy={setDateAriaDescribedBy}
        legend={legend}
      />
    </>
  );
};
WithCustomDayStyles.storyName = 'With custom day styles';
WithCustomDayStyles.parameters = { loki: { skip: true } };

export const WithRange = (args) => {
  const [range, setRange] = useState<Array<Date | null>>([null, null]);
  const [errors, setErrors] = useState<Array<string>>(['', '']);
  const storeDate = (index: number, date: Date | null) => {
    const newRange = [...range];
    newRange[index] = date;
    setRange(newRange);
  };
  const validate = (index: number, date: Date | null) => {
    if (!date) {
      setErrors(['', '']);
      return true;
    }
    const comparison = range[index === 0 ? 1 : 0];
    if (!comparison) {
      setErrors(['', '']);
      return true;
    }
    if (index === 0 && comparison <= date) {
      setErrors(['The start date cannot be the same or after the end date', '']);
      return false;
    }
    if (index === 1 && comparison >= date) {
      setErrors(['', 'The end date cannot be the same or before the start date']);
      return false;
    }
    setErrors(['', '']);
    return true;
  };

  const setMinDate: DateInputProps['onChange'] = (str, date) => {
    if (!validate(0, date)) {
      return;
    }
    storeDate(0, date);
  };
  const setMaxDate: DateInputProps['onChange'] = (str, date) => {
    if (!validate(1, date)) {
      return;
    }
    storeDate(1, date);
  };

  const startMinDate = undefined;
  const startMaxDate = range[1] ? subDays(range[1], 1) : undefined;

  const endMinDate = range[0] ? addDays(range[0], 1) : undefined;
  const endMaxDate = undefined;

  const dateToString = (date: Date | null) => {
    return date && isValid(date) ? format(date, 'dd.MM.yyyy') : '';
  };

  const rangeToString = () => {
    if (range[0] && range[1]) {
      return `You have selected a range between ${dateToString(range[0])} and ${dateToString(range[1])}.`;
    }
    if (range[0] && isValid(range[0])) {
      return `You have selected a start date of ${dateToString(range[0])}.`;
    }
    if (range[1] && isValid(range[1])) {
      return `You have selected a end date of ${dateToString(range[0])}.`;
    }
    return `Please select a range!`;
  };

  return (
    <div>
      <DateInput
        {...args}
        disableConfirmation
        minDate={startMinDate}
        maxDate={startMaxDate}
        label="Select start date"
        onChange={setMinDate}
        helperText=""
        invalid={!!errors[0]}
        errorText={errors[0]}
      />
      <DateInput
        {...args}
        disableConfirmation
        minDate={endMinDate}
        maxDate={endMaxDate}
        label="Select end date"
        onChange={setMaxDate}
        helperText=""
        invalid={!!errors[1]}
        errorText={errors[1]}
      />
      <p>{rangeToString()}</p>
      <p>{formatHelperTextEnglish}</p>
    </div>
  );
};

WithRange.parameters = { loki: { skip: true } };
