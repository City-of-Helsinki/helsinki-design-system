import React, { useCallback, useRef } from 'react';

import { SelectProps } from './types';
import { IconLocation } from '../../icons';
import { Select } from './Select';

export default {
  component: Select,
  title: 'Components/Select',
};

export const Example = () => {
  // const options: SelectProps['options'] = ['Label1', 'Label2', { value: 'c', label: 'Label3' }];
  const groups: SelectProps['groups'] = [
    {
      label: 'Healthy choices',
      options: ['Apple', 'Carrot', 'Kale', 'Broccoli', 'Cucumber', 'Tomato', 'Banana', 'Lettuce'],
    },
    {
      label: 'Bad choices',
      options: [
        { value: 'Candy with choco', label: 'Candy' },
        { value: 'Gasoline', label: 'Gasoline' },
      ],
    },
  ];
  const onChange: SelectProps['onChange'] = useCallback((selected) => {
    const selectedValue = selected.length > 0 ? selected[0] : '';
    const isError = selectedValue === 'Gasoline';
    return {
      assistiveText: selectedValue && !isError ? `${selectedValue} is a good choice` : 'Choose one good option!',
      error: isError ? `${selectedValue}?! Really?` : '',
    };
  }, []);
  return (
    <Select
      groups={groups}
      label="Label"
      onChange={onChange}
      showFiltering
      placeholder="Choose one"
      icon={<IconLocation />}
      required
    >
      <optgroup label="Group label">
        <option value="label">Text</option>
      </optgroup>
    </Select>
  );
};
export const MultiSelect = () => {
  // const options: SelectProps['options'] = ['Label1', 'Label2', { value: 'c', label: 'Label3' }];
  const groups: SelectProps['groups'] = [
    {
      label: 'Healthy choices',
      options: ['Apple', 'Carrot', 'Kale', 'Broccoli', 'Cucumber', 'Tomato', 'Banana', 'Lettuce'],
    },
    {
      label: 'Bad choices',
      options: [
        { value: 'Candy with choco', label: 'Candy', selected: true },
        { value: 'Gasoline', label: 'Gasoline', selected: true },
      ],
    },
  ];
  const hasSelectedSomething = useRef(false);
  const onChange: SelectProps['onChange'] = useCallback((selected) => {
    const hasClearedSelections = hasSelectedSomething.current && !selected.length;
    if (!hasSelectedSomething.current && selected.length) {
      hasSelectedSomething.current = true;
    }
    const requiredCount = 3;
    return {
      assistiveText:
        selected.length >= requiredCount ? `Good job!` : `Please select ${requiredCount - selected.length} more items`,
      error: hasClearedSelections ? `Please select something` : '',
    };
  }, []);
  return (
    <Select
      groups={groups}
      label="Label"
      onChange={onChange}
      multiSelect
      showFiltering
      placeholder="Choose many"
      icon={<IconLocation />}
    />
  );
};

const createFakeResults = (search: string) => {
  const groups: SelectProps['groups'] = [
    {
      label: 'result group 1',
      options: [
        {
          value: `${search} hit 1`,
          label: `${search} hit 1`,
        },
        {
          value: `${search} hit 2`,
          label: `${search} hit 2`,
        },
        {
          value: `${search} hit 3`,
          label: `${search} hit 3`,
        },
        {
          value: `match`,
          label: `same match`,
        },
      ],
    },
  ];
  return { groups };
};

export const Search = () => {
  // const options: SelectProps['options'] = ['Label1', 'Label2', { value: 'c', label: 'Label3' }];
  const groups: SelectProps['groups'] = [];
  const onChange: SelectProps['onChange'] = useCallback(() => {
    //
  }, []);
  const onSearch: SelectProps['onSearch'] = useCallback(async (searchValue) => {
    await new Promise((res) => {
      setTimeout(res, 1000);
    });
    return Promise.resolve(searchValue ? createFakeResults(searchValue) : {});
  }, []);
  return (
    <Select
      groups={groups}
      label="Label"
      onChange={onChange}
      onSearch={onSearch}
      multiSelect
      showSearch
      placeholder="Choose many"
    />
  );
};
