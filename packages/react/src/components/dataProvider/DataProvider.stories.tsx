import React, { ChangeEventHandler, MouseEventHandler, PropsWithChildren } from 'react';

import { TextInput } from '../textInput/TextInput';
import { Button } from '../button/Button';
import { DataProvider, DataProviderProps } from './DataProvider';
import { useContextDataHandlers } from './hooks';
import { StorageData } from './storage';
import { RadioButton } from '../radioButton/RadioButton';
import { ErrorSummary } from '../errorSummary/ErrorSummary';
import { Notification } from '../notification/Notification';
import { Checkbox } from '../checkbox';
import { Fieldset } from '../fieldset';

export default {
  component: DataProvider,
  title: 'Components/DataProvider',
};

type NumericStepperData = {
  value: number;
  max: number;
  min: number;
  error: string;
};

export const NumericStepper = () => {
  const props: DataProviderProps<NumericStepperData, StorageData> = {
    initialData: { value: 1, max: 500, min: -5, error: '' },
    metaData: {},
    onChange: (event, { getData, updateData }) => {
      const { payload, id, type } = event;
      const { value, min, max } = getData();
      const resolveNewValue = () => {
        if (type !== 'click') {
          return parseInt(String((payload && payload.value) || '0'), 10);
        }
        const diff = id === 'increment' ? 1 : -1;
        return value + diff;
      };
      const resolveErrorMessage = (newValue) => {
        if (newValue > max) {
          return `Max is ${max}`;
        }
        if (newValue < min) {
          return `Min is ${min}`;
        }
        return ``;
      };

      const newValue = resolveNewValue();

      updateData({
        error: resolveErrorMessage(newValue),
        value: Math.max(Math.min(newValue, max), min),
      });
      return true;
    },
  };

  const Input = () => {
    const id = 'value';
    const handlers = useContextDataHandlers<NumericStepperData>();
    const { value } = handlers.getData();
    const onChange: ChangeEventHandler<HTMLInputElement> = (e) => {
      handlers.trigger({
        id,
        type: 'change',
        payload: { value: e.currentTarget.value, originalEvent: e },
      });
    };
    return <TextInput id={id} onChange={onChange} value={String(value)} />;
  };

  const Action = (buttonProps: PropsWithChildren<{ id: string }>) => {
    const { id, children } = buttonProps;
    const { trigger } = useContextDataHandlers();
    const onClick: MouseEventHandler<HTMLButtonElement> = () => {
      trigger({
        id,
        type: 'click',
      });
    };
    return <Button onClick={onClick}>{children}</Button>;
  };

  const Error = () => {
    const handlers = useContextDataHandlers<NumericStepperData>();
    const { error } = handlers.getData();
    return error ? <p>{error}</p> : null;
  };

  return (
    <DataProvider {...props}>
      <Input />
      <Action id="decrement">-</Action>
      <Action id="increment">+</Action>
      <Error />
    </DataProvider>
  );
};

NumericStepper.parameters = {
  loki: { skip: true },
};

type FormData = {
  firstName: string;
  lastName: string;
  selectedAgeRange: string;
  ageRanges: string[];
};

type FormMetaData = {
  hasBeenSubmitted: boolean;
  finished: boolean;
  errors: string[];
};

export const Form = () => {
  const validate = (data: FormData): FormMetaData['errors'] => {
    const errors: FormMetaData['errors'] = [];
    if (!data.firstName) {
      errors.push('Firstname is required');
    }
    if (!data.lastName) {
      errors.push('Lastname is required');
    }
    if (!data.selectedAgeRange) {
      errors.push('Pick an age range');
    }
    return errors;
  };
  const props: DataProviderProps<FormData, FormMetaData> = {
    initialData: {
      firstName: '',
      lastName: '',
      ageRanges: ['0-17', '18-40', '41-65', '66+'],
      selectedAgeRange: '',
    },
    metaData: { hasBeenSubmitted: false, errors: [], finished: false },

    onChange: (event, { getData, updateData, updateMetaData, getMetaData }) => {
      const { payload, id } = event;
      const value = String(payload && payload.value);
      const isSubmit = id === 'submit';
      if (isSubmit) {
        const errors = validate(getData());
        updateMetaData({
          errors,
          hasBeenSubmitted: true,
          finished: errors.length === 0,
        });
        return true;
      }
      const isAgeRange = id === 'ageRanges';
      const newData = isAgeRange
        ? {
            selectedAgeRange: value,
          }
        : {
            [id]: value,
          };

      updateData({
        ...newData,
      });
      if (getMetaData().hasBeenSubmitted) {
        updateMetaData({
          errors: validate(getData()),
        });
      }
      return true;
    },
  };

  const Input = ({ id }: { id: keyof FormData }) => {
    const handlers = useContextDataHandlers<FormData, FormMetaData>();
    const value = handlers.getData()[id];
    const { trigger } = useContextDataHandlers();
    const onChange: ChangeEventHandler<HTMLInputElement> = (e) => {
      trigger({
        id,
        type: 'change',
        payload: { value: e.currentTarget.value, originalEvent: e },
      });
    };
    const idToLabel = (idStr: string) => {
      const splitPos = idStr.indexOf('N');
      const split = `${idStr.substring(0, splitPos)} ${idStr.substring(splitPos).toLowerCase()}`;
      return split.substring(0, 1).toUpperCase() + split.substring(1);
    };
    return <TextInput id={id} onChange={onChange} value={String(value)} label={`${idToLabel(id)}:`} />;
  };

  const AgeRanges = ({ id }: { id: keyof FormData }) => {
    const handlers = useContextDataHandlers<FormData, FormMetaData>();
    const { ageRanges, selectedAgeRange } = handlers.getData();
    const handleChange: ChangeEventHandler<HTMLInputElement> = (e) => {
      handlers.trigger({
        id,
        type: 'change',
        payload: { value: e.currentTarget.value, originalEvent: e },
      });
    };
    return (
      <div>
        <p>
          <strong>Age:</strong>
        </p>
        {ageRanges.map((value, i) => {
          return (
            <RadioButton
              id={`radio${i}`}
              label={value}
              key={value} // eslint-disable-line react/no-array-index-key
              value={value}
              name="radio"
              checked={selectedAgeRange === value}
              onChange={handleChange}
            />
          );
        })}
        <p>&nbsp;</p>
      </div>
    );
  };

  const Action = (buttonProps: PropsWithChildren<{ id: string }>) => {
    const { id, children } = buttonProps;
    const { trigger } = useContextDataHandlers();
    const onClick: MouseEventHandler<HTMLButtonElement> = () => {
      trigger({
        id,
        type: 'click',
      });
    };
    return <Button onClick={onClick}>{children}</Button>;
  };

  const Errors = () => {
    const handlers = useContextDataHandlers<FormData, FormMetaData>();
    const { errors } = handlers.getMetaData();
    return errors.length ? (
      <ErrorSummary label="Please fix these errors">
        <ul>
          {errors.map((error, i) => {
            return (
              <li>
                Error {i + 1}: {error}
              </li>
            );
          })}
        </ul>
      </ErrorSummary>
    ) : null;
  };

  const Note = () => {
    const handlers = useContextDataHandlers<FormData, FormMetaData>();
    const { finished } = handlers.getMetaData();
    return finished ? <Notification type="success">Form sent!</Notification> : null;
  };
  const FormElements = () => {
    const handlers = useContextDataHandlers<FormData, FormMetaData>();
    const { finished } = handlers.getMetaData();
    return finished ? null : (
      <>
        <Errors />
        <Input id="firstName" />
        <Input id="lastName" />
        <AgeRanges id="ageRanges" />
        <Action id="submit">Submit</Action>
      </>
    );
  };
  return (
    <DataProvider {...props}>
      <FormElements />
      <Note />
    </DataProvider>
  );
};

Form.parameters = {
  loki: { skip: true },
};

type SelectionGroupWithParentData = {
  options: string[];
  selectedValues: Set<string>;
};

type SelectionGroupWithParentMetaData = {
  selectPercentage: number;
};

// this is a simpler way to create SelectionGroup/WithParent example
export const GroupedCheckBoxes = () => {
  const props: DataProviderProps<SelectionGroupWithParentData, SelectionGroupWithParentMetaData> = {
    initialData: {
      options: [1, 2, 3, 4, 5, 6, 7].map((num) => `Option ${num}`),
      selectedValues: new Set(),
    },
    metaData: { selectPercentage: 0 },

    onChange: (event, { getData, updateData, updateMetaData, getMetaData }) => {
      const { payload } = event;
      const value = String(payload && payload.value);
      const { selectedValues, options } = getData();
      const { selectPercentage } = getMetaData();
      if (value === 'all') {
        const shouldSelectAll = selectPercentage === 1;
        selectedValues.clear();
        if (!shouldSelectAll) {
          options.forEach((v) => selectedValues.add(v));
        }
      } else {
        const isSelected = selectedValues.has(value);
        if (isSelected) {
          selectedValues.delete(value);
        } else {
          selectedValues.add(value);
        }
      }
      updateData({
        selectedValues,
      });
      updateMetaData({
        selectPercentage: selectedValues.size / options.length,
      });

      return true;
    },
  };

  const Group = () => {
    const handlers = useContextDataHandlers<SelectionGroupWithParentData, SelectionGroupWithParentMetaData>();
    const { selectedValues, options } = handlers.getData();
    const { selectPercentage } = handlers.getMetaData();
    const handleChange: ChangeEventHandler<HTMLInputElement> = (e) => {
      handlers.trigger({
        id: 'unknown',
        type: 'change',
        payload: { value: e.currentTarget.value, originalEvent: e },
      });
    };
    return (
      <Fieldset heading="Group label *">
        <Checkbox
          id="parent"
          label="Select all"
          key="parent" // eslint-disable-line react/no-array-index-key
          value="all"
          name="parent"
          checked={selectPercentage === 1}
          indeterminate={selectPercentage !== 1 && selectPercentage !== 0}
          onChange={handleChange}
        />

        {options.map((value, i) => {
          return (
            <Checkbox
              id={`option${i}`}
              label={value}
              key={value} // eslint-disable-line react/no-array-index-key
              value={value}
              checked={selectedValues.has(value)}
              onChange={handleChange}
            />
          );
        })}
      </Fieldset>
    );
  };

  return (
    <DataProvider {...props}>
      <Group />
    </DataProvider>
  );
};

GroupedCheckBoxes.parameters = {
  loki: { skip: true },
};
