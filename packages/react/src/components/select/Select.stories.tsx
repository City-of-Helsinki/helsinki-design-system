import React, { useCallback, useRef } from 'react';

import { SelectProps } from '.';
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
      options: ['Fruits', 'Vegetables'],
    },
    {
      label: 'Bad choices',
      options: [
        { value: 'Candy with choco', label: 'Candy' },
        { value: 'Gasoline', label: 'Gasoline' },
      ],
    },
  ];
  const onChange: SelectProps['onChange'] = useCallback((selected, data) => {
    console.log('data', selected, data);
    const selectedValue = selected.length > 0 ? selected[0] : '';
    const isError = selectedValue === 'Gasoline';
    return {
      assistiveText: selectedValue && !isError ? `${selectedValue} is a good choice` : 'Choose one good option!',
      error: isError ? `${selectedValue}?! Really?` : '',
    };
  }, []);
  return (
    <Select groups={groups} label="Label" onChange={onChange}>
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
      options: ['Fruits', 'Vegetables'],
    },
    {
      label: 'Bad choices',
      options: [
        { value: 'Candy with choco', label: 'Candy' },
        { value: 'Gasoline', label: 'Gasoline' },
      ],
    },
  ];
  const hasSelectedSomething = useRef(false);
  const onChange: SelectProps['onChange'] = useCallback((selected, data) => {
    console.log('data', selected, data);
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
  return <Select groups={groups} label="Label" onChange={onChange} multiSelect />;
};
