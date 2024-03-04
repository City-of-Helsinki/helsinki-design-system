import React, { useCallback, useMemo, useRef, useState } from 'react';

import { SelectProps, Option, OptionInProps } from './types';
import { IconLocation } from '../../icons';
import { Select } from './Select';
import { Button } from '../button/Button';
import useForceRender from '../../hooks/useForceRender';
import { useExternalGroupStorage, useSelectionHistory } from './controlHelpers';
import { getSelectedOptions } from './utils';
import { Tag } from '../tag/Tag';

export default {
  component: Select,
  title: 'Components/Select',
};

const capitalise = (str: string) => str[0].toUpperCase() + str.slice(1);

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

function generateOptionLabels(count = -1): string[] {
  // Arrays containing names of fruits and vegetables and adjectives

  const length = count > 0 ? count : Math.floor(Math.random() * 20) + 1;

  // Using set to avoid duplicates
  const randomSet: Set<string> = new Set();
  while (randomSet.size < length) {
    // Randomly select a fruit or vegetable and an adjective
    const randomFruitIndex = Math.floor(Math.random() * fruitsAndVegetables.length);
    const randomAdjectiveIndex = Math.floor(Math.random() * adjectives.length);
    const randomFruit = fruitsAndVegetables[randomFruitIndex];
    const randomAdjective = adjectives[randomAdjectiveIndex];
    const description = `${capitalise(randomAdjective)} ${randomFruit}`;
    randomSet.add(description);
  }

  return Array.from(randomSet);
}

export const Example = () => {
  const options = generateOptionLabels(20);
  const onChange: SelectProps['onChange'] = useCallback(() => {
    // track changes
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

export const Disabled = () => {
  const options = generateOptionLabels(20);
  const onChange: SelectProps['onChange'] = useCallback(() => {
    // track changes
  }, []);
  return (
    <Select
      options={options}
      label="Label"
      onChange={onChange}
      placeholder="Choose one"
      icon={<IconLocation />}
      required
      disabled
    />
  );
};

export const OptionsAsHtml = () => {
  const onChange: SelectProps['onChange'] = useCallback(() => {
    // track changes
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
  const groups: SelectProps['groups'] = [
    {
      label: 'Healthy choices',
      options: generateOptionLabels(40),
    },
    {
      label: 'Bad choices',
      options: [
        { value: 'Candy cane', label: 'Candy cane' },
        { value: 'Sugar bomb', label: 'Sugar bomb' },
        { value: 'Dr. Pepper', label: 'Dr. Pepper' },
      ],
    },
  ];
  const onChange: SelectProps['onChange'] = useCallback(() => {
    // track changess
  }, []);
  return (
    <Select groups={groups} label="Label" onChange={onChange} placeholder="Choose one" icon={<IconLocation />} required>
      <optgroup label="Group label">
        <option value="label">Text</option>
      </optgroup>
    </Select>
  );
};

export const WithSelectionValidation = () => {
  const groups: SelectProps['groups'] = [
    {
      label: 'Healthy choices',
      options: ['Apple', 'Carrot', 'Kale', 'Broccoli', 'Cucumber', 'Tomato', 'Banana', 'Lettuce'],
    },
    {
      label: 'Bad choices',
      options: [
        { value: 'Candy with choco', label: 'Candy' },
        { value: 'wrong', label: 'Do not choose me!' },
      ],
    },
  ];
  const onChange: SelectProps['onChange'] = useCallback((selected) => {
    const selectedValue = selected.length > 0 ? selected[0].value : '';
    const isError = selectedValue === 'wrong';
    return {
      assistiveText: selectedValue && !isError ? `${selectedValue} is a good choice` : 'Choose a healthy option!',
      error: isError ? `You choose poorly!` : '',
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
      options: generateOptionLabels(14),
    },
    {
      label: 'More healthy choices',
      options: generateOptionLabels(4),
    },
    {
      label: 'Even more healthy choices',
      options: generateOptionLabels(10),
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
    const selectedValue = selected.length > 0 ? selected[0].value : '';
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
    />
  );
};

export const WithMultiselect = () => {
  const groups: SelectProps['groups'] = [
    {
      label: 'Healthy choices',
      options: generateOptionLabels(4),
    },
    {
      label: 'More healthy choices',
      options: generateOptionLabels(4),
    },
  ];

  const onChange: SelectProps['onChange'] = useCallback(() => {
    // track changes
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
    />
  );
};

export const WithDisabledOptions = () => {
  const groups: SelectProps['groups'] = [
    {
      label: 'Healthy choices',
      options: generateOptionLabels(4).map((option, i) => {
        return { label: option, value: option, disabled: i === 3 };
      }),
    },
    {
      label: 'Only disabled choices',
      options: generateOptionLabels(4).map((option) => {
        return { label: option, value: option, disabled: true };
      }),
    },
  ];

  const onChange: SelectProps['onChange'] = useCallback(() => {
    // track changes
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
    />
  );
};

export const WithMinAndMax = () => {
  const initialGroups = [
    {
      label: 'Healthy choices',
      options: generateOptionLabels(6).map((option) => {
        return { label: option, value: option, disabled: false };
      }),
    },
    {
      label: 'More healthy choices',
      options: generateOptionLabels(6).map((option) => {
        return { label: option, value: option, disabled: false };
      }),
    },
  ];
  const groupStorage = useExternalGroupStorage({ groups: initialGroups });
  const history = useSelectionHistory();
  const [error, setError] = useState<string | undefined>(undefined);
  const selectionCount = useRef(0);
  const hasSelectedSomething = useRef(false);
  const requiredCount = 1;
  const maxCount = 2;
  const getAssistiveText = (selectedCount: number) => {
    return selectedCount >= requiredCount
      ? `Required number of selections done!`
      : `Please select ${requiredCount - selectedCount} more items. Up to ${maxCount} items.`;
  };
  const onChange: SelectProps['onChange'] = useCallback((selectedValues, lastClickedOption) => {
    const hasClearedSelections = hasSelectedSomething.current && !selectedValues.length;
    if (!hasSelectedSomething.current && selectedValues.length) {
      hasSelectedSomething.current = true;
    }
    // If a group was selected, there might be an overflow of selections.
    const getAllowedSelections = (allSelections: Option[]) => {
      const overflow = allSelections.length - maxCount;
      if (lastClickedOption && lastClickedOption.isGroupLabel && history.getLatestOptions().length === maxCount) {
        return [];
      }
      if (overflow > 0) {
        const newSelections = [...history.getLatestOptions(), ...history.filterNewSelections(allSelections)];
        const allowed = newSelections.slice(0, maxCount);
        return allowed;
      }
      return allSelections;
    };
    const filteredSelections = getAllowedSelections(selectedValues).map((option) => option.value);
    selectionCount.current = filteredSelections.length;
    const maxReached = filteredSelections.length === maxCount;

    groupStorage.update(groupStorage.get(), (option) => {
      const isSelected = filteredSelections.includes(option.value);
      return {
        ...option,
        selected: isSelected,
        disabled: maxReached ? !isSelected : false,
      };
    });
    history.add(getSelectedOptions(groupStorage.get()), lastClickedOption);

    const returnProps = {
      assistiveText: getAssistiveText(filteredSelections.length),
      error: hasClearedSelections ? `Please select ${requiredCount}-${maxCount} items` : '',
      groups: groupStorage.getAsProp(),
    };

    return returnProps;
  }, []);

  const onBlur: SelectProps['onBlur'] = useCallback(async () => {
    if (selectionCount.current < requiredCount) {
      setError(getAssistiveText(selectionCount.current));
    }
  }, []);
  return (
    <Select
      groups={groupStorage.getAsProp()}
      label="Label"
      onChange={onChange}
      multiSelect
      showFiltering
      placeholder="Choose three or more"
      icon={<IconLocation />}
      assistiveText={getAssistiveText(0)}
      onBlur={onBlur}
      error={error}
    />
  );
};

export const WithPreselectedOptions = () => {
  const groups: SelectProps['groups'] = [
    {
      label: 'Healthy choices',
      options: generateOptionLabels(8).map((value, i) => {
        return {
          label: value,
          value,
          selected: i > 2,
        };
      }),
    },
    {
      label: 'More healthy choices',
      options: generateOptionLabels(8).map((value, i) => {
        return {
          label: value,
          value,
          selected: i === 0,
        };
      }),
    },
  ];
  const onChange: SelectProps['onChange'] = useCallback(() => {
    // track changes
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
        ...generateOptionLabels().map((value) => {
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
    // track changes
  }, []);
  const onSearch: SelectProps['onSearch'] = useCallback(async (searchValue) => {
    await new Promise((res) => {
      setTimeout(res, 1000);
    });
    return Promise.resolve(searchValue ? createRandomGroups(searchValue) : {});
  }, []);
  return (
    <div>
      <Select
        groups={groups}
        label="Label"
        onChange={onChange}
        onSearch={onSearch}
        multiSelect
        showSearch
        placeholder="Choose many"
      />
      <p>Search with &quot;none&quot; to return an empty set</p>
    </div>
  );
};

export const WithExternalControls = () => {
  const initialGroups = [
    {
      label: 'Healthy choices',
      options: generateOptionLabels(4),
    },
    {
      label: 'More healthy choices',
      options: generateOptionLabels(4),
    },
  ];

  const groupStorage = useExternalGroupStorage({ groups: initialGroups });

  const propsRef = useRef<Partial<SelectProps>>({});

  const reRender = useForceRender();

  const resetSelections = () => {
    groupStorage.update(groupStorage.get(), (option) => {
      return {
        ...option,
        selected: false,
        disabled: false,
      };
    });
    propsRef.current.open = false;
    reRender();
  };
  const invertSelections = () => {
    groupStorage.update(groupStorage.get(), (option) => {
      return {
        ...option,
        selected: !option.selected,
        disabled: false,
      };
    });
    propsRef.current.open = false;
    reRender();
  };
  const selectAll = () => {
    groupStorage.update(groupStorage.get(), (option) => {
      return {
        ...option,
        selected: true,
        disabled: false,
      };
    });
    propsRef.current.open = false;
    reRender();
  };
  const toggleGroupDisable = () => {
    groupStorage.update(groupStorage.get(), (option) => {
      return {
        ...option,
        selected: true,
        disabled: !option.disabled,
      };
    });
    propsRef.current.open = false;
    reRender();
  };
  const toggleDisable = () => {
    propsRef.current = { ...propsRef.current, disabled: !propsRef.current.disabled };
    reRender();
  };
  const toggleMenu = () => {
    propsRef.current = { ...propsRef.current, open: !propsRef.current.open };
    reRender();
  };

  const onChange: SelectProps['onChange'] = useCallback((selected) => {
    const selectedValues = selected.map((option) => option.value);
    groupStorage.update(groupStorage.get(), (option) => {
      return {
        ...option,
        selected: selectedValues.includes(option.value),
        disabled: !option.disabled,
      };
    });
  }, []);
  return (
    <>
      <style>
        {`
          .buttons{
            margin-top: 20px;
          }
          .buttons > *{
            margin-right: 10px;
          }
      `}
      </style>
      <div>
        <Select
          groups={groupStorage.getAsProp()}
          label="Controlled select"
          onChange={onChange}
          multiSelect
          showFiltering
          placeholder="Choose"
          disabled={propsRef.current.disabled}
          open={propsRef.current.open}
        />
        <div className="buttons">
          <Button onClick={resetSelections}>Reset selections</Button>
          <Button onClick={invertSelections}>Invert selections</Button>
          <Button onClick={selectAll}>Select all</Button>
          <Button onClick={toggleDisable}>Disable/enable component</Button>
          <Button onClick={toggleGroupDisable}>Disable/enable options</Button>
          <Button onClick={toggleMenu}>Open/Close list</Button>
        </div>
      </div>
    </>
  );
};

export const WithVirtualizationMultiselect = () => {
  let count = 0;
  const makeUniqueOption = (value: string) => {
    const valueWithCount = `${value} ${count}`;
    count += 1;
    return {
      label: value,
      value: valueWithCount,
    };
  };
  const groups: SelectProps['groups'] = [
    {
      label: 'Healthy choices',
      options: generateOptionLabels(1000).map(makeUniqueOption),
    },
    {
      label: 'More healthy choices',
      options: generateOptionLabels(1000).map(makeUniqueOption),
    },
  ];

  const onChange: SelectProps['onChange'] = useCallback((selected) => {
    return {
      assistiveText: `You have selected ${selected.length} options`,
    };
  }, []);
  return (
    <Select
      groups={groups}
      label="Label"
      onChange={onChange}
      multiSelect
      virtualize
      showFiltering
      placeholder="Choose many"
      icon={<IconLocation />}
    />
  );
};

export const WithFocusListeners = () => {
  const [isFocused, setIsFocused] = useState(false);
  const groups: SelectProps['groups'] = useMemo(
    () => [
      {
        label: 'Healthy choices',
        options: generateOptionLabels(4),
      },
      {
        label: 'More healthy choices',
        options: generateOptionLabels(4),
      },
    ],
    [],
  );
  const onFocus: SelectProps['onFocus'] = useCallback(async () => {
    setIsFocused(true);
  }, []);
  const onBlur: SelectProps['onBlur'] = useCallback(async () => {
    setIsFocused(false);
  }, []);
  const onChange: SelectProps['onChange'] = useCallback(() => {
    //
  }, []);
  return (
    <>
      <style>
        {`
          .focused,
          .blurred {
            padding: 10px;
          }

          .focused {
            background-color: #defcde;
          }

          .blurred {
            background-color: #ececec;
          }

          .indicators {
            display: flex;
            flex-direction: column;
            margin-top: 20px;

            .indicator {
              padding-left: 20px;
              position: relative;
            }

            .indicator:before {
              background: #defcde;
              content: ' ';
              display: block;
              height: 10px;
              left: 0;
              position: absolute;
              top: 5px;
              width: 10px;
            }

            .indicator.blurIndicator:before {
              background: #ececec;
            }
          }

        `}
      </style>
      <div className={isFocused ? 'focused' : 'blurred'}>
        <Select
          groups={groups}
          label="Label"
          onChange={onChange}
          multiSelect
          showFiltering
          placeholder="Choose three or more"
          icon={<IconLocation />}
          onFocus={onFocus}
          onBlur={onBlur}
        />
      </div>
      <div className="indicators">
        <div className="indicator">Focused</div>
        <div className="indicator blurIndicator">Blurred</div>
      </div>
    </>
  );
};

export const WithCollaboration = () => {
  const [selectedTopCategory, updateSelectedTopCategory] = useState<Option | null>(null);
  const [subCategoryOptions, updateSubcategoryOptions] = useState<OptionInProps[]>([]);
  const [selectedItems, updateSelectedItems] = useState<Record<string, Option[]>>({});
  const topCategoryOptions = fruitsAndVegetables.sort().map((option) => {
    return {
      label: capitalise(option),
      value: option,
      selected: !!(selectedTopCategory && selectedTopCategory.value === option),
    };
  });
  const addToSelectedItems = (topCat: string, selections: Option[]) => {
    if (topCat) {
      const copy = { ...selectedItems };
      copy[topCat] = selections.map((s) => ({ ...s }));
      updateSelectedItems(copy);
    }
  };
  const removeFromSelectedItems = (topCat: string, subCat: string) => {
    const items = selectedItems[topCat] || [];
    const newItems = items.filter((e) => e.value !== subCat);
    addToSelectedItems(topCat, newItems);
    if (selectedTopCategory?.value === topCat) {
      updateSubcategoryOptions(
        subCategoryOptions.map((opt) => {
          return {
            ...opt,
            selected: !!newItems.find((o) => o.value === opt.value),
          };
        }),
      );
    }
  };

  const onTopCategoryChange: SelectProps['onChange'] = (selectedValues) => {
    const selection = selectedValues[0] || {};
    updateSelectedTopCategory(selection);
    if (selection.value) {
      const newSubCategoryOptions: OptionInProps[] = [];
      const selected = selectedItems[selection.value] || [];
      adjectives.sort().forEach((value) => {
        const label = capitalise(`${value} ${selection.value}`);
        newSubCategoryOptions.push({ label, value, selected: !!selected.find((opt) => opt.value === value) });
      });
      updateSubcategoryOptions(newSubCategoryOptions);
    } else {
      updateSubcategoryOptions([]);
    }
  };
  const onSubCategoryChange: SelectProps['onChange'] = (selectedValues) => {
    addToSelectedItems(String(selectedTopCategory && selectedTopCategory.value), selectedValues);
  };

  const SelectedValues = () => {
    const selectedTopCategories = Object.keys(selectedItems);
    if (!selectedTopCategories.length) {
      return null;
    }
    const values: OptionInProps[] = [];
    selectedTopCategories.forEach((key) => {
      const options = selectedItems[key];
      options.forEach((option) => {
        const value = `${key}: ${option.value}`;
        values.push({ label: capitalise(value), value });
      });
    });
    return (
      <>
        <style>
          {`
          .tags{
            margin-top: 20px;
          }
          .tags > *{
            margin-right: 10px;
          }
      `}
        </style>

        <div>
          <h3>Selected</h3>
          <div className="tags">
            {values.map((opt) => {
              const onDelete = () => {
                const [cat, subCat] = String(opt.label).split(': ');
                removeFromSelectedItems(cat, subCat);
              };
              return (
                <Tag onDelete={onDelete} key={opt.value}>
                  {opt.label}
                </Tag>
              );
            })}
          </div>
        </div>
      </>
    );
  };

  return (
    <div>
      <Select
        options={topCategoryOptions}
        label="Select your favourite"
        onChange={onTopCategoryChange}
        placeholder="Choose one"
      />
      {subCategoryOptions.length ? (
        <Select
          options={subCategoryOptions}
          label="Select types"
          onChange={onSubCategoryChange}
          placeholder="Choose multiple"
          multiSelect
          noTags
        />
      ) : null}
      <SelectedValues />
    </div>
  );
};
