import React, { useCallback, useRef } from 'react';

import { SelectProps } from './types';
import { IconLocation } from '../../icons';
import { Select } from './Select';

export default {
  component: Select,
  title: 'Components/Select',
};

function generateOptionArray(count = -1) {
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
  const length = count > 0 ? count : Math.floor(Math.random() * 20) + 1;

  const toUpperCase = (str: string) => str[0].toUpperCase() + str.slice(1);
  // Create the random array
  const randomArray: string[] = [];
  for (let i = 0; i < length; i += 1) {
    // Randomly select a fruit or vegetable and an adjective
    const randomFruitIndex = Math.floor(Math.random() * fruitsAndVegetables.length);
    const randomAdjectiveIndex = Math.floor(Math.random() * adjectives.length);
    const randomFruit = fruitsAndVegetables[randomFruitIndex];
    const randomAdjective = adjectives[randomAdjectiveIndex];
    const description = `${toUpperCase(randomAdjective)} ${randomFruit}`;
    randomArray.push(description);
  }

  return randomArray;
}

export const Example = () => {
  const options = generateOptionArray(20);
  const onChange: SelectProps['onChange'] = useCallback(() => {
    //
  }, []);
  return (
    <Select
      options={options}
      label="Label"
      onChange={onChange}
      placeholder="Choose one"
      icon={<IconLocation />}
      required
    />
  );
};
export const OptionsAsHtml = () => {
  const onChange: SelectProps['onChange'] = useCallback((selected) => {
    const selectedValue = selected.length > 0 ? selected[0] : '';
    const isError = selectedValue === 'Gasoline';
    return {
      assistiveText: selectedValue && !isError ? `${selectedValue} is a good choice` : 'Choose one good option!',
      error: isError ? `${selectedValue}?! Really?` : '',
    };
  }, []);
  return (
    <Select label="Label" onChange={onChange} placeholder="Choose one">
      <optgroup label="Group 1">
        <option value="opt1">Option 1</option>
        <option value="opt2">Option 2</option>
      </optgroup>
      <optgroup label="Group 2">
        <option value="opt3">Option 3</option>
        <option value="opt4">Option 4</option>
      </optgroup>
    </Select>
  );
};
export const WithGroups = () => {
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
    <Select groups={groups} label="Label" onChange={onChange} placeholder="Choose one" icon={<IconLocation />} required>
      <optgroup label="Group label">
        <option value="label">Text</option>
      </optgroup>
    </Select>
  );
};
export const WithFilter = () => {
  const groups: SelectProps['groups'] = [
    {
      label: 'Healthy choices',
      options: generateOptionArray(4),
    },
    {
      label: 'More healthy choices',
      options: generateOptionArray(4),
    },
    {
      label: 'Even more healthy choices',
      options: generateOptionArray(10),
    },
    {
      label: 'Bad choices',
      options: [
        { value: 'Candy', label: 'Candy' },
        { value: 'Poison', label: 'Poison' },
      ],
    },
  ];
  const onChange: SelectProps['onChange'] = useCallback((selected) => {
    const selectedValue = selected.length > 0 ? selected[0] : '';
    const isError = selectedValue === 'Poison';
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
export const WithMultiselect = () => {
  const groups: SelectProps['groups'] = [
    {
      label: 'Healthy choices',
      options: generateOptionArray(4),
    },
    {
      label: 'More healthy choices',
      options: generateOptionArray(4),
    },
  ];
  const hasSelectedSomething = useRef(false);
  const requiredCount = 3;
  const getAssistiveText = (selectedCount: number) => {
    return selectedCount >= requiredCount
      ? `Required number of selections done!`
      : `Please select ${requiredCount - selectedCount} more items`;
  };
  const onChange: SelectProps['onChange'] = useCallback((selected) => {
    const hasClearedSelections = hasSelectedSomething.current && !selected.length;
    if (!hasSelectedSomething.current && selected.length) {
      hasSelectedSomething.current = true;
    }

    return {
      assistiveText: getAssistiveText(selected.length),
      error: hasClearedSelections ? `Please select three items` : '',
    };
  }, []);
  return (
    <Select
      groups={groups}
      label="Label"
      onChange={onChange}
      multiSelect
      showFiltering
      placeholder="Choose three or more"
      icon={<IconLocation />}
      assistiveText={getAssistiveText(0)}
    />
  );
};

export const WithPreselectedMultiselect = () => {
  const groups: SelectProps['groups'] = [
    {
      label: 'Healthy choices',
      options: generateOptionArray(8).map((value, i) => {
        return {
          label: value,
          value,
          selected: i > 2,
        };
      }),
    },
    {
      label: 'More healthy choices',
      options: generateOptionArray(8).map((value, i) => {
        return {
          label: value,
          value,
          selected: i === 0,
        };
      }),
    },
  ];
  const onChange: SelectProps['onChange'] = useCallback(() => {
    //
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

const createRandomGroups = (search: string) => {
  if (search === 'none') {
    return { groups: [] };
  }
  const groups: SelectProps['groups'] = [
    {
      label: 'Random items',
      options: [
        ...generateOptionArray().map((value) => {
          return {
            value,
            label: value,
          };
        }),
      ],
    },
    {
      label: 'Common items',
      options: [
        {
          value: `${search}`,
          label: `Searched for ${search}`,
        },
        {
          value: `match`,
          label: `Same option everytime`,
        },
      ],
    },
  ];
  return { groups };
};

export const WithSearch = () => {
  const groups: SelectProps['groups'] = [];
  const onChange: SelectProps['onChange'] = useCallback(() => {
    //
  }, []);
  const onSearch: SelectProps['onSearch'] = useCallback(async (searchValue) => {
    await new Promise((res) => {
      setTimeout(res, 1000);
    });
    return Promise.resolve(searchValue ? createRandomGroups(searchValue) : {});
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
