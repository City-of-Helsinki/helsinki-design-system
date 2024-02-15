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

function generateRandomArray() {
  // Arrays containing names of fruits and vegetables and adjectives
  const fruitsAndVegetables = [
    'apple',
    'banana',
    'orange',
    'grape',
    'strawberry',
    'watermelon',
    'kiwi',
    'pineapple',
    'mango',
    'peach',
    'carrot',
    'broccoli',
    'potato',
    'tomato',
    'cucumber',
    'lettuce',
    'spinach',
    'bell pepper',
    'eggplant',
    'zucchini',
    'blueberry',
    'raspberry',
    'blackberry',
    'avocado',
    'pear',
    'lemon',
    'lime',
    'cherry',
    'pumpkin',
    'apricot',
    'cranberry',
    'fig',
    'grapefruit',
    'guava',
    'honeydew',
    'kale',
    'nectarine',
    'olive',
    'papaya',
    'pea',
    'plum',
    'radish',
    'rutabaga',
    'tangerine',
    'turnip',
    'watercress',
    'yam',
    'yucca',
    'zucchini',
  ];

  const adjectives = [
    'sweet',
    'juicy',
    'ripe',
    'fresh',
    'tasty',
    'delicious',
    'crisp',
    'tangy',
    'fragrant',
    'colorful',
    'nutritious',
    'succulent',
    'flavorful',
    'sour',
    'satisfying',
    'exotic',
    'vibrant',
    'healthy',
    'aromatic',
    'wholesome',
    'tender',
    'zesty',
    'bitter',
    'spicy',
    'crunchy',
    'mellow',
    'sugary',
    'scented',
    'sapid',
    'mouthwatering',
  ];

  // Generate random length between 1 and 10
  const length = Math.floor(Math.random() * 10) + 1;

  // Create the random array
  const randomArray: string[] = [];
  for (let i = 0; i < length; i += 1) {
    // Randomly select a fruit or vegetable and an adjective
    const randomFruitIndex = Math.floor(Math.random() * fruitsAndVegetables.length);
    const randomAdjectiveIndex = Math.floor(Math.random() * adjectives.length);
    const randomFruit = fruitsAndVegetables[randomFruitIndex];
    const randomAdjective = adjectives[randomAdjectiveIndex];
    const description = `${randomAdjective} ${randomFruit}`;
    randomArray.push(description);
  }

  return randomArray;
}

const createFakeResults = (search: string) => {
  if (search === 'none') {
    return { groups: [] };
  }
  const groups: SelectProps['groups'] = [
    {
      label: 'Result group 1',
      options: [
        ...generateRandomArray().map((value) => {
          return {
            value,
            label: value,
          };
        }),
        {
          value: `${search}`,
          label: `Option for ${search}`,
        },
        {
          value: `match`,
          label: `Same option`,
        },
      ],
    },
  ];
  return { groups };
};

export const Search = () => {
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
